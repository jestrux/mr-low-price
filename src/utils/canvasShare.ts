import { Phone } from "../context/AppContext";

// 10-color palette that works with white text and borders
export const COLOR_PALETTE = [
	"#1e40af", // Deep Blue
	"#0891b2", // Cyan
	"#047857", // Emerald
	"#84cc16", // Lime
	"#dc2626", // Red
	"#ea580c", // Orange
	"#d946ef", // Fuchsia
	"#8b5cf6", // Violet
	"#0284c7", // Sky Blue
	"#16a34a", // Green
];

// Get color for a brand (cycles through palette)
const getBrandColor = (brand: string, brandList: string[]): string => {
	const index = brandList.indexOf(brand);
	return COLOR_PALETTE[index % COLOR_PALETTE.length];
};

// Lighten a color by a percentage (0-1)
const lightenColor = (color: string, amount: number): string => {
	const hex = color.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	const newR = Math.min(255, Math.round(r + (255 - r) * amount));
	const newG = Math.min(255, Math.round(g + (255 - g) * amount));
	const newB = Math.min(255, Math.round(b + (255 - b) * amount));

	return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

export async function generateShareImage(
	phones: Phone[],
	formatPrice: (price: number) => string,
	headerText: string = "Mr. Low Price",
	customColor?: string,
	striped: boolean = true
): Promise<Blob> {
	// Create canvas
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	// Canvas dimensions
	const width = 800;
	const padding = 40;
	const headerHeight = headerText ? 60 : 0; // No header if text is empty

	// Group phones by type
	const phonesByType: { [key: string]: Phone[] } = {};
	phones.forEach((phone) => {
		if (!phonesByType[phone.type]) {
			phonesByType[phone.type] = [];
		}
		phonesByType[phone.type].push(phone);
	});

	const types = Object.keys(phonesByType).sort();
	const isSingleType = types.length === 1;

	// Get all unique brands
	const allBrands = Array.from(new Set(phones.map(p => p.brand))).sort();
	const isSingleBrand = allBrands.length === 1;

	// Calculate height needed
	let contentHeight = headerHeight + padding;
	types.forEach((type) => {
		if (!isSingleType) {
			contentHeight += 35; // Type header (only if multiple types)
		}

		const typePhonesArray = phonesByType[type];

		if (isSingleBrand) {
			// Single brand: just items
			contentHeight += typePhonesArray.length * 51; // Each phone item (50px + 1px border)
		} else {
			// Multiple brands: need brand headers + items
			const brandsInType = Array.from(
				new Set(typePhonesArray.map(p => p.brand))
			);

			brandsInType.forEach(brand => {
				contentHeight += 30; // Brand header
				const brandPhones = typePhonesArray.filter(p => p.brand === brand);
				contentHeight += brandPhones.length * 51; // Each phone item (50px + 1px border)
			});
		}
	});
	contentHeight += 40; // Bottom padding

	const height = contentHeight;
	canvas.width = width;
	canvas.height = height;

	// Background
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, width, height);

	let y = padding;

	// Header (only if headerText provided)
	if (headerText) {
		ctx.fillStyle = "#1f2937";
		ctx.font = "bold 32px Arial";
		ctx.textAlign = "center";
		ctx.fillText(headerText, width / 2, y + 35);
		y += headerHeight;
	}

	// Draw each type section
	types.forEach((type) => {
		const typePhonesArray = phonesByType[type];

		// Type header with background (only if multiple types)
		if (!isSingleType) {
			ctx.fillStyle = "#374151";
			ctx.fillRect(padding, y, width - padding * 2, 35);

			ctx.fillStyle = "#ffffff";
			ctx.font = "bold 18px Arial";
			ctx.textAlign = "left";
			ctx.fillText(type, padding + 15, y + 23);

			y += 35;
		}

		if (isSingleBrand) {
			// Single brand: just list items
			const phoneColor = customColor || getBrandColor(allBrands[0], allBrands);

			typePhonesArray.forEach((phone, index) => {
				// Striped or solid color
				const isEven = index % 2 === 0;
				const bgColor = striped && isEven ? lightenColor(phoneColor, 0.2) : phoneColor;

				// Full colored background
				ctx.fillStyle = bgColor;
				ctx.fillRect(padding, y, width - padding * 2, 50);

				// 1px border below (white)
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(padding, y + 50, width - padding * 2, 1);

				// Model name (white text) - no brand
				ctx.fillStyle = "#ffffff";
				ctx.font = "bold 16px Arial";
				ctx.textAlign = "left";
				ctx.fillText(phone.model, padding + 15, y + 29);

				// Price (white text)
				ctx.fillStyle = "#ffffff";
				ctx.font = "bold 16px Arial";
				ctx.textAlign = "right";
				ctx.fillText(
					`Tsh. ${formatPrice(phone.price)}`,
					width - padding - 15,
					y + 29
				);

				y += 51; // 50px item + 1px border
			});
		} else {
			// Multiple brands: group by brand with plain headers
			const brandsInType = Array.from(
				new Set(typePhonesArray.map(p => p.brand))
			).sort();

			brandsInType.forEach(brand => {
				// Plain brand header
				ctx.fillStyle = "#e5e7eb";
				ctx.fillRect(padding, y, width - padding * 2, 30);

				ctx.fillStyle = "#374151";
				ctx.font = "bold 14px Arial";
				ctx.textAlign = "left";
				ctx.fillText(brand, padding + 15, y + 19);

				y += 30;

				// Items for this brand
				const brandPhones = typePhonesArray.filter(p => p.brand === brand);
				const phoneColor = getBrandColor(brand, allBrands);

				brandPhones.forEach((phone, index) => {
					// Striped or solid color
					const isEven = index % 2 === 0;
					const bgColor = striped && isEven ? lightenColor(phoneColor, 0.2) : phoneColor;

					// Full colored background
					ctx.fillStyle = bgColor;
					ctx.fillRect(padding, y, width - padding * 2, 50);

					// 1px border below (white)
					ctx.fillStyle = "#ffffff";
					ctx.fillRect(padding, y + 50, width - padding * 2, 1);

					// Model name (white text) - no brand since we have brand header
					ctx.fillStyle = "#ffffff";
					ctx.font = "bold 16px Arial";
					ctx.textAlign = "left";
					ctx.fillText(phone.model, padding + 15, y + 29);

					// Price (white text)
					ctx.fillStyle = "#ffffff";
					ctx.font = "bold 16px Arial";
					ctx.textAlign = "right";
					ctx.fillText(
						`Tsh. ${formatPrice(phone.price)}`,
						width - padding - 15,
						y + 29
					);

					y += 51; // 50px item + 1px border
				});
			});
		}
	});

	// Convert canvas to blob
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) {
				resolve(blob);
			} else {
				reject(new Error("Failed to create blob from canvas"));
			}
		}, "image/png");
	});
}
