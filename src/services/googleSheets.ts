import {
	SHEETS_CONFIG,
	CACHE_DURATION_MS,
	CACHE_KEY,
	CACHE_TIMESTAMP_KEY,
} from "../config/sheets";
import phonesData from "../data/phones";
import viooData from "../data/vioo";

export interface Product {
	type: string;
	brand: string;
	model: string;
	price: number;
	tags?: string[];
}

interface SheetTab {
	name: string;
	gid: string;
}

// Parse Google Visualization API response
function parseVisualizationResponse(text: string): any {
	// Response format: google.visualization.Query.setResponse({...});
	// We need to extract the JSON object
	const jsonString = text.substring(47).slice(0, -2);
	return JSON.parse(jsonString);
}

// Convert Google Sheets rows to Product objects
function convertRowsToProducts(rows: any[]): Product[] {
	if (!rows || rows.length === 0) return [];

	return rows
		.map((row) => {
			const cells = row.c || [];

			// Extract values from cells (may be null)
			const type = cells[0]?.v || "";
			const brand = cells[1]?.v || "";
			const model = cells[2]?.v || "";
			const price = cells[3]?.v || 0;
			const tagsString = cells[4]?.v || "";

			// Parse tags (comma-separated string to array)
			const tags = tagsString
				? tagsString
						.split(",")
						.map((tag: string) => tag.trim())
						.filter(Boolean)
				: undefined;

			return {
				type,
				brand,
				model,
				price: Number(price),
				tags,
			};
		})
		.filter((product) => product.brand && product.model); // Filter out empty rows
}

// Fetch all tabs/sheets from a spreadsheet
async function fetchAllSheetTabs(spreadsheetId: string): Promise<SheetTab[]> {
	try {
		const url = `https://backend.wakyj07.workers.dev/google-sheet/?url=https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing`;
		const response = await fetch(url);
		const json = await response.json();
		if (!json?.tabs) return [];
		return json.tabs;
	} catch (error) {}
	return [];

	try {
		// Use gviz API to get sheet metadata
		// This endpoint returns information about all sheets in the spreadsheet
		const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`;

		const response = await fetch(url);
		const text = await response.text();
		const data = parseVisualizationResponse(text);

		// The first request to gviz without gid gives us access to the first sheet
		// To get all sheets, we need to use the Sheets API or parse from HTML
		// For now, we'll use a workaround: try multiple gids and see which ones work

		// Alternative: Extract from the spreadsheet's HTML page
		const htmlUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
		const htmlResponse = await fetch(htmlUrl);
		const html = await htmlResponse.text();

		// Extract sheet information from HTML
		// Look for sheet data in the page (this is a bit hacky but works without API key)
		const sheetMatches = html.matchAll(
			/"sheetId":(\d+),"title":"([^"]+)"/g
		);
		const tabs: SheetTab[] = [];

		for (const match of sheetMatches) {
			tabs.push({
				gid: match[1],
				name: match[2],
			});
		}

		return tabs;
	} catch (error) {
		console.error(
			`Failed to fetch sheet tabs for ${spreadsheetId}:`,
			error
		);
		return [];
	}
}

// Fetch data from a specific sheet tab
async function fetchSheetData(
	spreadsheetId: string,
	gid: string
): Promise<Product[]> {
	try {
		const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=${gid}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();
		const data = parseVisualizationResponse(text);

		const rows = data.table?.rows || [];
		return convertRowsToProducts(rows);
	} catch (error) {
		console.error(
			`Failed to fetch sheet data (${spreadsheetId}, gid:${gid}):`,
			error
		);
		return [];
	}
}

// Fetch all products from a spreadsheet (all tabs)
async function fetchSpreadsheetProducts(
	spreadsheetId: string
): Promise<Product[]> {
	try {
		const tabs = await fetchAllSheetTabs(spreadsheetId);

		if (tabs.length === 0) {
			console.warn(`No tabs found for spreadsheet ${spreadsheetId}`);
			return [];
		}

		// console.log(
		// 	`Found ${tabs.length} tabs in spreadsheet ${spreadsheetId}`
		// );

		// Fetch data from all tabs in parallel
		const tabDataPromises = tabs.map((tab) =>
			fetchSheetData(spreadsheetId, tab.gid)
		);
		const tabDataArrays = await Promise.all(tabDataPromises);

		// Flatten all products from all tabs
		return tabDataArrays.flat();
	} catch (error) {
		console.error(
			`Failed to fetch products from spreadsheet ${spreadsheetId}:`,
			error
		);
		return [];
	}
}

// Check if cache is valid
function isCacheValid(): boolean {
	const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
	if (!timestamp) return false;

	const age = Date.now() - parseInt(timestamp, 10);
	return age < CACHE_DURATION_MS;
}

// Get cached products
export function getCachedProducts(): Product[] | null {
	if (!isCacheValid()) return null;

	const cached = localStorage.getItem(CACHE_KEY);
	if (!cached) return null;

	try {
		return JSON.parse(cached);
	} catch (error) {
		console.error("Failed to parse cached products:", error);
		return null;
	}
}

// Set cached products
function setCachedProducts(products: Product[]): void {
	try {
		localStorage.setItem(CACHE_KEY, JSON.stringify(products));
		localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
	} catch (error) {
		console.error("Failed to cache products:", error);
	}
}

// Clear cache
export function clearProductsCache(): void {
	localStorage.removeItem(CACHE_KEY);
	localStorage.removeItem(CACHE_TIMESTAMP_KEY);
}

function extractSpreadsheetId(url: string): string {
	const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
	if (!match) return "";

	return match[1];
}

// Fetch all products from both spreadsheets
export async function fetchAllProducts(): Promise<Product[]> {
	try {
		// console.log("Fetching products from Google Sheets...");

		// Fetch from both spreadsheets in parallel
		const getProducts = async () => {
			const products = (
				await Promise.all(
					SHEETS_CONFIG.products.map((url) =>
						fetchSpreadsheetProducts(extractSpreadsheetId(url))
					)
				)
			).flat();

			// console.log(
			// 	`Fetched ${products.length} products from Google Sheets`
			// );

			// Cache the results
			setCachedProducts(products);

			return products;
		};

		// Check cache first
		const cached = getCachedProducts();
		if (cached) {
			getProducts();
			console.log("Using cached products");
			return cached;
		}

		return await getProducts();
	} catch (error) {
		console.error("Failed to fetch products from Google Sheets:", error);

		// Fallback to local data
		console.log("Falling back to local data");
		return [...phonesData, ...viooData];
	}
}

// Refresh products (bypass cache)
export async function refreshProducts(): Promise<Product[]> {
	clearProductsCache();
	return fetchAllProducts();
}
