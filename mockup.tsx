import React, { useState, useMemo } from "react";
import {
	Search,
	Smartphone,
	Filter,
	TrendingUp,
	Package,
	DollarSign,
} from "lucide-react";

const phoneData = [
	{ brand: "OPPO & VIVO", model: "A59", price: 15000 },
	{ brand: "OPPO & VIVO", model: "A15", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A54", price: 17500 },
	{ brand: "OPPO & VIVO", model: "A5/A35", price: 17000 },
	{ brand: "OPPO & VIVO", model: "Realme 7i", price: 18000 },
	{ brand: "OPPO & VIVO", model: "Z7x", price: 18000 },
	{ brand: "OPPO & VIVO", model: "C55", price: 19000 },
	{ brand: "OPPO & VIVO", model: "K11", price: 19000 },
	{ brand: "OPPO & VIVO", model: "Y67", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A11x", price: 17000 },
	{ brand: "OPPO & VIVO", model: "Y20", price: 17000 },
	{ brand: "OPPO & VIVO", model: "Y22", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A52", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A12", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A1k", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A16", price: 15000 },
	{ brand: "OPPO & VIVO", model: "A57", price: 17000 },
	{ brand: "OPPO & VIVO", model: "Y82", price: 17000 },
	{ brand: "OPPO & VIVO", model: "Y85", price: 17000 },
	{ brand: "OPPO & VIVO", model: "F11 Pro", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A7", price: 17000 },
	{ brand: "OPPO & VIVO", model: "A3", price: 16000 },
	{ brand: "OPPO & VIVO", model: "Y5s", price: 16000 },
	{ brand: "OPPO & VIVO", model: "A83", price: 16000 },
	{ brand: "OPPO & VIVO", model: "A9/F11", price: 18000 },
	{ brand: "OPPO & VIVO", model: "S1", price: 18000 },
	{ brand: "OPPO & VIVO", model: "C11", price: 18000 },
	{ brand: "NOKIA", model: "C2", price: 19000 },
	{ brand: "NOKIA", model: "C1P", price: 17000 },
	{ brand: "NOKIA", model: "3.4", price: 17000 },
	{ brand: "NOKIA", model: "4.2", price: 17000 },
	{ brand: "NOKIA", model: "3.2", price: 17000 },
	{ brand: "NOKIA", model: "C21", price: 17500 },
	{ brand: "NOKIA", model: "2.4", price: 17500 },
	{ brand: "NOKIA", model: "2.2", price: 17500 },
	{ brand: "NOKIA", model: "2.4P", price: 17000 },
	{ brand: "NOKIA", model: "G10", price: 17000 },
	{ brand: "NOKIA", model: "G1.2ND", price: 17000 },
	{ brand: "NOKIA", model: "2.3", price: 17000 },
	{ brand: "VIOO VIDOGO", model: "17 Big", price: 2800 },
	{ brand: "VIOO VIDOGO", model: "37 Big", price: 2850 },
	{ brand: "VIOO VIDOGO", model: "37 Small", price: 2450 },
	{ brand: "VIOO VIDOGO", model: "24 Small", price: 2450 },
	{ brand: "VIOO VIDOGO", model: "16 Pin", price: 1750 },
	{ brand: "VIOO VIDOGO", model: "20 Pin", price: 1750 },
	{ brand: "VIOO VIDOGO", model: "16 Pin / 302", price: 2450 },
	{ brand: "VIOO VIDOGO", model: "12 Pin", price: 2000 },
	{ brand: "VIOO VIDOGO", model: "MIC", price: 70 },
	{ brand: "VIOO VIDOGO", model: "System Charge", price: 70 },
	{ brand: "SAMSUNG (OLED)", model: "Note 10+", price: 150000 },
	{ brand: "SAMSUNG (OLED)", model: "Note 20 Ultra", price: 170000 },
	{ brand: "SAMSUNG (OLED)", model: "S20 Ultra", price: 165000 },
	{ brand: "SAMSUNG (OLED)", model: "S20+", price: 150000 },
	{ brand: "SAMSUNG (OLED)", model: "S21 Ultra", price: 170000 },
	{ brand: "SAMSUNG (OLED)", model: "S22 Ultra", price: 175000 },
	{ brand: "SAMSUNG (OLED)", model: "S22+", price: 160000 },
	{ brand: "SAMSUNG (OLED)", model: "S21+", price: 150000 },
	{ brand: "SAMSUNG (OLED)", model: "A20", price: 60000 },
	{ brand: "SAMSUNG (OLED)", model: "A32", price: 67000 },
	{ brand: "SAMSUNG (OLED)", model: "A30", price: 60000 },
	{ brand: "SAMSUNG (OLED)", model: "A15", price: 67000 },
	{ brand: "SAMSUNG (OLED)", model: "A31", price: 60000 },
	{ brand: "REDMI", model: "Redmi 10", price: 17000 },
	{ brand: "REDMI", model: "7A", price: 15000 },
	{ brand: "REDMI", model: "8A", price: 15000 },
	{ brand: "REDMI", model: "9A", price: 17000 },
	{ brand: "REDMI", model: "Note 7", price: 17000 },
	{ brand: "REDMI", model: "Note 8", price: 17000 },
	{ brand: "REDMI", model: "Note 9", price: 17000 },
	{ brand: "REDMI", model: "Note 10 5G", price: 18000 },
	{ brand: "REDMI", model: "Note 11 4G", price: 18500 },
	{ brand: "REDMI", model: "Note 8 Pro", price: 18000 },
	{ brand: "REDMI", model: "A1+", price: 18500 },
	{ brand: "REDMI", model: "13C", price: 17000 },
	{ brand: "iPhone", model: "iPhone 6G", price: 15000 },
	{ brand: "iPhone", model: "iPhone 6P", price: 17000 },
	{ brand: "iPhone", model: "iPhone 7G", price: 15000 },
	{ brand: "iPhone", model: "iPhone 7P", price: 17000 },
	{ brand: "iPhone", model: "iPhone 8G", price: 15000 },
	{ brand: "iPhone", model: "iPhone 8P", price: 17000 },
	{ brand: "iPhone", model: "iPhone X", price: 22000 },
	{ brand: "iPhone", model: "iPhone XS", price: 23000 },
	{ brand: "iPhone", model: "iPhone XR", price: 23000 },
	{ brand: "iPhone", model: "iPhone X GRX", price: 43000 },
	{ brand: "iPhone", model: "iPhone 11", price: 25000 },
	{ brand: "iPhone", model: "iPhone 11 Pro", price: 36000 },
	{ brand: "iPhone", model: "iPhone 11 Pro Max", price: 39000 },
	{ brand: "iPhone", model: "iPhone 12", price: 60000 },
	{ brand: "iPhone", model: "iPhone 12 Pro", price: 65000 },
	{ brand: "iPhone", model: "iPhone 12 Pro Max", price: 65000 },
	{ brand: "iPhone", model: "iPhone 13", price: 56000 },
	{ brand: "iPhone", model: "iPhone 13 Pro Max", price: 120000 },
	{ brand: "iPhone", model: "iPhone 14", price: 56000 },
	{ brand: "iPhone", model: "iPhone 14 Pro", price: 170000 },
	{ brand: "iPhone", model: "iPhone 14 Pro Max", price: 180000 },
];

export default function PhoneCatalogue() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedBrand, setSelectedBrand] = useState("All");
	const [sortBy, setSortBy] = useState("default");

	const brands = useMemo(() => {
		const brandSet = new Set(phoneData.map((phone) => phone.brand));
		return ["All", ...Array.from(brandSet)];
	}, []);

	const filteredAndSortedPhones = useMemo(() => {
		let filtered = phoneData.filter((phone) => {
			const matchesSearch =
				phone.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
				phone.brand.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesBrand =
				selectedBrand === "All" || phone.brand === selectedBrand;
			return matchesSearch && matchesBrand;
		});

		if (sortBy === "price-low") {
			filtered.sort((a, b) => a.price - b.price);
		} else if (sortBy === "price-high") {
			filtered.sort((a, b) => b.price - a.price);
		} else if (sortBy === "name") {
			filtered.sort((a, b) => a.model.localeCompare(b.model));
		}

		return filtered;
	}, [searchQuery, selectedBrand, sortBy]);

	const stats = useMemo(() => {
		const prices = filteredAndSortedPhones.map((p) => p.price);
		return {
			total: filteredAndSortedPhones.length,
			avgPrice: prices.length
				? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
				: 0,
			minPrice: prices.length ? Math.min(...prices) : 0,
			maxPrice: prices.length ? Math.max(...prices) : 0,
		};
	}, [filteredAndSortedPhones]);

	const formatPrice = (price) => {
		return new Intl.NumberFormat("en-TZ").format(price);
	};

	const getBrandColor = (brand) => {
		const colors = {
			"OPPO & VIVO": "bg-gradient-to-r from-green-400 to-emerald-500",
			NOKIA: "bg-gradient-to-r from-blue-400 to-blue-500",
			"VIOO VIDOGO": "bg-gradient-to-r from-purple-400 to-purple-500",
			"SAMSUNG (OLED)": "bg-gradient-to-r from-indigo-400 to-blue-600",
			REDMI: "bg-gradient-to-r from-orange-400 to-red-500",
			iPhone: "bg-gradient-to-r from-gray-600 to-gray-800",
		};
		return colors[brand] || "bg-gradient-to-r from-gray-400 to-gray-500";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
			{/* Header */}
			<div className="sticky top-0 z-50 bg-white shadow-lg">
				<div className="px-4 py-4">
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
							<Smartphone className="w-6 h-6 text-white" />
						</div>
						<h1 className="text-2xl font-bold text-gray-800">
							Bei za Simu
						</h1>
					</div>

					{/* Search Bar */}
					<div className="relative mb-4">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search phones..."
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* Brand Filters */}
					<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
						{brands.map((brand) => (
							<button
								key={brand}
								onClick={() => setSelectedBrand(brand)}
								className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
									selectedBrand === brand
										? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								{brand}
							</button>
						))}
					</div>

					{/* Sort Options */}
					<div className="flex gap-2 mt-3">
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-purple-400 focus:outline-none"
						>
							<option value="default">Default Order</option>
							<option value="price-low">
								Price: Low to High
							</option>
							<option value="price-high">
								Price: High to Low
							</option>
							<option value="name">Name: A to Z</option>
						</select>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="px-4 py-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="bg-white rounded-xl p-4 shadow-md">
						<div className="flex items-center gap-2 mb-2">
							<Package className="w-4 h-4 text-purple-500" />
							<span className="text-xs text-gray-500">
								Total Items
							</span>
						</div>
						<p className="text-2xl font-bold text-gray-800">
							{stats.total}
						</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-md">
						<div className="flex items-center gap-2 mb-2">
							<TrendingUp className="w-4 h-4 text-green-500" />
							<span className="text-xs text-gray-500">
								Avg Price
							</span>
						</div>
						<p className="text-2xl font-bold text-gray-800">
							{formatPrice(stats.avgPrice)}
						</p>
					</div>
				</div>
			</div>

			{/* Phone List */}
			<div className="px-4 pb-6">
				{filteredAndSortedPhones.length === 0 ? (
					<div className="text-center py-12">
						<div className="mb-4">
							<Search className="w-12 h-12 text-gray-300 mx-auto" />
						</div>
						<p className="text-gray-500">No phones found</p>
						<p className="text-sm text-gray-400 mt-2">
							Try adjusting your search or filters
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{filteredAndSortedPhones.map((phone, index) => (
							<div
								key={index}
								className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
							>
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<div
											className={`inline-block px-2 py-1 rounded-lg text-xs text-white font-medium mb-2 ${getBrandColor(
												phone.brand
											)}`}
										>
											{phone.brand}
										</div>
										<h3 className="text-lg font-semibold text-gray-800">
											{phone.model}
										</h3>
									</div>
									<div className="text-right">
										<p className="text-xs text-gray-500 mb-1">
											Price
										</p>
										<p className="text-xl font-bold text-purple-600">
											{formatPrice(phone.price)}
										</p>
										<p className="text-xs text-gray-400">
											TSH
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Bottom Padding for Mobile */}
			<div className="h-20"></div>
		</div>
	);
}
