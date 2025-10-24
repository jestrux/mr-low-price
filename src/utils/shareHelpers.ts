import { Phone } from "../context/AppContext";

// Get all phones of a specific type
export function getPhonesByType(phones: Phone[], type: string): Phone[] {
	return phones.filter((phone) => phone.type === type);
}

// Get all phones of a specific brand within a type
export function getPhonesByBrand(
	phones: Phone[],
	type: string,
	brand: string
): Phone[] {
	return phones.filter((phone) => phone.type === type && phone.brand === brand);
}

// Get all phones with a specific tag within a type
export function getPhonesByTag(
	phones: Phone[],
	type: string,
	tag: string
): Phone[] {
	return phones.filter(
		(phone) => phone.type === type && phone.tags?.includes(tag)
	);
}

// Get all unique brands within a type
export function getBrandsInType(phones: Phone[], type: string): string[] {
	const brandsSet = new Set<string>();
	phones
		.filter((phone) => phone.type === type)
		.forEach((phone) => brandsSet.add(phone.brand));
	return Array.from(brandsSet).sort();
}

// Get all unique tags within a type
export function getTagsInType(phones: Phone[], type: string): string[] {
	const tagsSet = new Set<string>();
	phones
		.filter((phone) => phone.type === type)
		.forEach((phone) => {
			phone.tags?.forEach((tag) => tagsSet.add(tag));
		});
	return Array.from(tagsSet).sort();
}

// Format WhatsApp message grouped by type
export function formatShareMessage(
	phones: Phone[],
	formatPrice: (price: number) => string
): string {
	if (phones.length === 0) return "";

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

	// Build message
	const messageParts: string[] = [];

	types.forEach((type) => {
		const typePhonesArray = phonesByType[type];

		// Type header (only if multiple types)
		if (!isSingleType) {
			messageParts.push(`*${type}*`);
		}

		if (isSingleBrand) {
			// Single brand: just list items without brand
			const items = typePhonesArray
				.map((phone) => {
					return `${phone.model} - Tsh. ${formatPrice(phone.price)}`;
				})
				.join("\n");
			messageParts.push(items);
		} else {
			// Multiple brands: group by brand with brand headers
			const brandsInType = Array.from(
				new Set(typePhonesArray.map(p => p.brand))
			).sort();

			brandsInType.forEach(brand => {
				// Brand header
				messageParts.push(`*${brand}*`);

				// Items for this brand (without brand name)
				const brandPhones = typePhonesArray.filter(p => p.brand === brand);
				const items = brandPhones
					.map((phone) => {
						return `${phone.model} - Tsh. ${formatPrice(phone.price)}`;
					})
					.join("\n");
				messageParts.push(items);
			});
		}
	});

	return messageParts.join("\n\n");
}
