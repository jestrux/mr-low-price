export interface Product {
	type: string;
	brand: string;
	model: string;
	price: number;
	tags?: string[];
}

const data: Product[] = [
	{ type: "Simu", brand: "Huawei", model: "Honor 9S", price: 120000 },
	{ type: "Simu", brand: "Huawei", model: "Nova 3i", price: 131000 },
	{
		type: "Simu",
		brand: "Huawei",
		model: "Honor 10 Lite",
		price: 110000,
	},
	{ type: "Simu", brand: "Huawei", model: "Honor 8X", price: 131000 },
	{ type: "Simu", brand: "Huawei", model: "P20 Lite", price: 149000 },
	{ type: "Simu", brand: "Huawei", model: "Y9 2019", price: 125000 },
	{ type: "Simu", brand: "Huawei", model: "P30 Lite", price: 155000 },
	{ type: "Simu", brand: "Huawei", model: "P40 Lite", price: 185000 },
	{ type: "Simu", brand: "Huawei", model: "P30 Pro", price: 450000 },
	{ type: "Simu", brand: "Huawei", model: "P30 Proo", price: 450000 },

	{ type: "Simu", brand: "VIVO", model: "Y50", price: 135000 },
	{ type: "Simu", brand: "VIVO", model: "S1", price: 135000 },

	{ type: "Simu", brand: "Redmi", model: "13C", price: 160000 },
	{ type: "Simu", brand: "Redmi", model: "14C", price: 2013000 },
	{ type: "Simu", brand: "Redmi", model: "A9", price: 125000 },

	{ type: "Simu", brand: "OPPO", model: "Reno 9 Pro", price: 135000 },
	{ type: "Simu", brand: "OPPO", model: "A78", price: 155000 },
	{ type: "Simu", brand: "OPPO", model: "F17", price: 150000 },
	{ type: "Simu", brand: "OPPO", model: "A9", price: 135000 },

	{ type: "Simu", brand: "Redmi", model: "POCO C75", price: 155000 },
	{ type: "Simu", brand: "Redmi", model: "POCO M3", price: 155000 },

	{ type: "Simu", brand: "Samsung", model: "S10", price: 250600 },
	{ type: "Simu", brand: "Samsung", model: "S8", price: 178600 },
	{ type: "Simu", brand: "Samsung", model: "S9", price: 194600 },
	{ type: "Simu", brand: "Samsung", model: "S8+", price: 190600 },
	{ type: "Simu", brand: "Samsung", model: "S9+", price: 206600 },
	{ type: "Simu", brand: "Samsung", model: "Note 9", price: 226600 },
	{ type: "Simu", brand: "Samsung", model: "A15", price: 262600 },
	{ type: "Simu", brand: "Samsung", model: "A25", price: 298600 },

	{
		type: "Simu",
		brand: "Google Pixel",
		model: "Pixel 6 Pro",
		price: 505000,
	},
	{
		type: "Simu",
		brand: "Google Pixel",
		model: "Pixel 7 Pro",
		price: 685000,
	},

	{
		type: "Simu",
		brand: "Motorola",
		model: "Moto G 2022",
		price: 215000,
	},
	{
		type: "Simu",
		brand: "Motorola",
		model: "Moto G 2024",
		price: 265000,
	},

	{ type: "Simu", brand: "Nokia", model: "Nokia 2.1", price: 55000 },

	{ type: "Simu", brand: "Tecno", model: "Spark 10C", price: 184600 },
	{
		type: "Simu",
		brand: "Tecno",
		model: "Spark Go 2024",
		price: 165000,
	},
	{ type: "Simu", brand: "Tecno", model: "A60", price: 145000 },

	{ type: "Simu", brand: "iPhone", model: "16 Pro Max", price: 355000 },

	{ type: "Simu", brand: "OPPO", model: "F5", price: 87000 },
	{ type: "Simu", brand: "OPPO", model: "F9 Pro", price: 105000 },
	{ type: "Simu", brand: "OPPO", model: "A3S", price: 89000 },
	{ type: "Simu", brand: "OPPO", model: "A5S", price: 101000 },
	{ type: "Simu", brand: "OPPO", model: "A18/A38", price: 115000 },
	{ type: "Simu", brand: "OPPO", model: "A53S 5G", price: 115000 },
	{ type: "Simu", brand: "OPPO", model: "F11", price: 125000 },
	{ type: "Simu", brand: "OPPO", model: "Reno 9", price: 120600 },
	{ type: "Simu", brand: "OPPO", model: "A15S", price: 145000 },
	{ type: "Simu", brand: "OPPO", model: "A76/A36", price: 164600 },
	{ type: "Simu", brand: "OPPO", model: "A3 Pro 5G", price: 173000 },
	{ type: "Simu", brand: "OPPO", model: "F27 Pro", price: 135000 },
	{ type: "Simu", brand: "OPPO", model: "Find X7", price: 135000 },

	{ type: "Simu", brand: "VIVO", model: "Y71", price: 93000 },
	{ type: "Simu", brand: "VIVO", model: "Y55", price: 55000 },
	{ type: "Simu", brand: "VIVO", model: "Y67", price: 65000 },
	{ type: "Simu", brand: "VIVO", model: "Y66", price: 60000 },
	{ type: "Simu", brand: "VIVO", model: "Y17", price: 113000 },
	{ type: "Simu", brand: "VIVO", model: "Y16", price: 125000 },
	{ type: "Simu", brand: "VIVO", model: "Y18", price: 155000 },
	{ type: "Simu", brand: "VIVO", model: "Y19", price: 145000 },
	{ type: "Simu", brand: "VIVO", model: "Y15S", price: 125000 },
	{ type: "Simu", brand: "VIVO", model: "Y20S", price: 153000 },
	{ type: "Simu", brand: "VIVO", model: "V15", price: 125000 },
	{ type: "Simu", brand: "VIVO", model: "Y03", price: 125000 },
	{ type: "Simu", brand: "VIVO", model: "Y36 5G", price: 155000 },
	{ type: "Simu", brand: "VIVO", model: "Y56 5G", price: 155000 },
	{ type: "Simu", brand: "VIVO", model: "V23 India 5G", price: 145000 },
	{ type: "Simu", brand: "VIVO", model: "Y33S", price: 145000 },
	{ type: "Simu", brand: "VIVO", model: "Y30", price: 155000 },
	{ type: "Simu", brand: "VIVO", model: "Y77e", price: 165000 },
	{ type: "Simu", brand: "Redmi", model: "A3", price: 135000 },
];

export default data;
