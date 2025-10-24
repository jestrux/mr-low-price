import { useMemo, useState } from "react";
import { useApp, Phone } from "../context/AppContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

type PriceRange = "all" | "low" | "mid" | "high";

function CustomShare() {
	const { allPhoneData, formatPrice } = useApp();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedPhones, setSelectedPhones] = useState<Set<string>>(
		new Set()
	);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [priceRange, setPriceRange] = useState<PriceRange>("all");

	const searchQuery = searchParams.get("q") || "";

	// Get unique ID for a phone
	const getPhoneId = (phone: Phone) => `${phone.brand}-${phone.model}`;

	// Configure Fuse.js for fuzzy search
	const fuse = useMemo(
		() =>
			new Fuse(allPhoneData, {
				keys: [
					{ name: "brand", weight: 0.4 },
					{ name: "model", weight: 0.6 },
					{ name: "type", weight: 0.2 },
				],
				threshold: 0.4,
				includeScore: true,
				ignoreLocation: true,
			}),
		[allPhoneData]
	);

	// Get all unique tags
	const availableTags = useMemo(() => {
		const tagsSet = new Set<string>();
		allPhoneData.forEach((phone) => {
			phone.tags?.forEach((tag) => tagsSet.add(tag));
		});
		return Array.from(tagsSet).sort();
	}, [allPhoneData]);

	// Filter products by search, tag, and price range
	const filteredPhones = useMemo(() => {
		let phones = allPhoneData;

		// Apply search filter
		if (searchQuery.trim()) {
			const results = fuse.search(searchQuery);
			phones = results.map((result) => result.item);
		}

		// Apply tag filter
		if (selectedTag) {
			phones = phones.filter((phone) => phone.tags?.includes(selectedTag));
		}

		// Apply price range filter
		if (priceRange !== "all") {
			phones = phones.filter((phone) => {
				if (priceRange === "low") return phone.price < 150000;
				if (priceRange === "mid")
					return phone.price >= 150000 && phone.price < 250000;
				if (priceRange === "high") return phone.price >= 250000;
				return true;
			});
		}

		return phones;
	}, [allPhoneData, searchQuery, fuse, selectedTag, priceRange]);

	// Group filtered phones by type
	const phonesByType = useMemo(() => {
		const groups: { [key: string]: Phone[] } = {};
		filteredPhones.forEach((phone) => {
			if (!groups[phone.type]) {
				groups[phone.type] = [];
			}
			groups[phone.type].push(phone);
		});
		return groups;
	}, [filteredPhones]);

	// Group filtered phones by brand
	const phonesByBrand = useMemo(() => {
		const groups: { [key: string]: Phone[] } = {};
		filteredPhones.forEach((phone) => {
			if (!groups[phone.brand]) {
				groups[phone.brand] = [];
			}
			groups[phone.brand].push(phone);
		});
		return groups;
	}, [filteredPhones]);

	const typeOrder = Object.keys(phonesByType).sort();

	// Get selected phones as array
	const selectedPhonesArray = useMemo(() => {
		return allPhoneData.filter((phone) =>
			selectedPhones.has(getPhoneId(phone))
		);
	}, [selectedPhones, allPhoneData]);

	// Calculate total
	const total = selectedPhonesArray.reduce(
		(sum, phone) => sum + phone.price,
		0
	);

	// Toggle single phone selection
	const togglePhone = (phone: Phone) => {
		const id = getPhoneId(phone);
		setSelectedPhones((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	// Select all phones of a specific type
	const toggleType = (type: string) => {
		const phonesOfType = phonesByType[type] || [];
		const allSelected = phonesOfType.every((phone) =>
			selectedPhones.has(getPhoneId(phone))
		);

		setSelectedPhones((prev) => {
			const newSet = new Set(prev);
			phonesOfType.forEach((phone) => {
				const id = getPhoneId(phone);
				if (allSelected) {
					newSet.delete(id);
				} else {
					newSet.add(id);
				}
			});
			return newSet;
		});
	};

	// Select all phones of a specific brand
	const toggleBrand = (brand: string) => {
		const phonesOfBrand = phonesByBrand[brand] || [];
		const allSelected = phonesOfBrand.every((phone) =>
			selectedPhones.has(getPhoneId(phone))
		);

		setSelectedPhones((prev) => {
			const newSet = new Set(prev);
			phonesOfBrand.forEach((phone) => {
				const id = getPhoneId(phone);
				if (allSelected) {
					newSet.delete(id);
				} else {
					newSet.add(id);
				}
			});
			return newSet;
		});
	};

	// Select all filtered phones
	const selectAllFiltered = () => {
		setSelectedPhones((prev) => {
			const newSet = new Set(prev);
			filteredPhones.forEach((phone) => {
				newSet.add(getPhoneId(phone));
			});
			return newSet;
		});
	};

	// Clear all selections
	const clearAll = () => {
		setSelectedPhones(new Set());
	};

	// Handle search change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value) {
			setSearchParams({ q: value });
		} else {
			setSearchParams({});
		}
	};

	// Check if any filters are active
	const hasActiveFilters =
		searchQuery.trim() !== "" || selectedTag !== null || priceRange !== "all";

	// Navigate to share confirm page with selected phones
	const handlePreviewAndShare = () => {
		if (selectedPhonesArray.length === 0) return;

		navigate("/share/confirm", {
			state: {
				phones: selectedPhonesArray,
				title: "Bidhaa Zilizochaguliwa",
			},
		});
	};

	return (
		<div className="pb-32 max-w-4xl mx-auto">
			{/* Search bar */}
			<div className="px-4 pt-4 pb-3">
				<input
					type="text"
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder="Tafuta bidhaa..."
					className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			{/* Tag filter chips */}
			{availableTags.length > 0 && (
				<div className="px-4 pb-3">
					<div className="flex gap-2 overflow-x-auto">
						{availableTags.map((tag) => (
							<button
								key={tag}
								onClick={() =>
									setSelectedTag((current) =>
										current === tag ? null : tag
									)
								}
								className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
									selectedTag === tag
										? "bg-primary text-primary-foreground"
										: "bg-muted text-foreground hover:bg-muted/80"
								}`}
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Price range filter chips */}
			<div className="px-4 pb-3">
				<div className="flex gap-2 overflow-x-auto">
					<button
						onClick={() => setPriceRange("low")}
						className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
							priceRange === "low"
								? "bg-primary text-primary-foreground"
								: "bg-muted text-foreground hover:bg-muted/80"
						}`}
					>
						&lt; 150k
					</button>
					<button
						onClick={() => setPriceRange("mid")}
						className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
							priceRange === "mid"
								? "bg-primary text-primary-foreground"
								: "bg-muted text-foreground hover:bg-muted/80"
						}`}
					>
						150k - 250k
					</button>
					<button
						onClick={() => setPriceRange("high")}
						className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
							priceRange === "high"
								? "bg-primary text-primary-foreground"
								: "bg-muted text-foreground hover:bg-muted/80"
						}`}
					>
						&gt; 250k
					</button>
					{priceRange !== "all" && (
						<button
							onClick={() => setPriceRange("all")}
							className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap bg-muted text-foreground hover:bg-muted/80"
						>
							Ondoa chujio
						</button>
					)}
				</div>
			</div>

			{/* Quick action buttons */}
			{(hasActiveFilters || selectedPhones.size > 0) && (
				<div className="px-4 pb-3 flex gap-2">
					{hasActiveFilters && (
						<button
							onClick={selectAllFiltered}
							className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
						>
							Chagua Zote Zilizochujwa ({filteredPhones.length})
						</button>
					)}
					{selectedPhones.size > 0 && (
						<button
							onClick={clearAll}
							className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
						>
							Ondoa Zote
						</button>
					)}
				</div>
			)}

			{/* Product list grouped by type */}
			{typeOrder.length > 0 ? (
				<div>
					{typeOrder.map((type) => {
						const phonesOfType = phonesByType[type];
						const typeSelected = phonesOfType.every((phone) =>
							selectedPhones.has(getPhoneId(phone))
						);

						// Group by brand within this type
						const brandsByType: { [brand: string]: Phone[] } = {};
						phonesOfType.forEach((phone) => {
							if (!brandsByType[phone.brand]) {
								brandsByType[phone.brand] = [];
							}
							brandsByType[phone.brand].push(phone);
						});

						return (
							<div key={type}>
								{/* Type header - tappable to select all of this type */}
								<button
									onClick={() => toggleType(type)}
									className="w-full px-4 py-3 bg-muted border-b border-border text-left hover:bg-muted/80 transition-colors"
								>
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
											{type}
										</h3>
										<div className="flex items-center gap-2">
											<span className="text-xs text-muted-foreground">
												bidhaa {phonesOfType.length}
											</span>
											<div
												className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
													typeSelected
														? "bg-primary border-primary"
														: "border-muted-foreground/30"
												}`}
											>
												{typeSelected && (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="3"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="text-primary-foreground"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												)}
											</div>
										</div>
									</div>
								</button>

								{/* Brands within this type */}
								{Object.keys(brandsByType)
									.sort()
									.map((brand) => {
										const phonesOfBrand = brandsByType[brand];
										const brandSelected = phonesOfBrand.every((phone) =>
											selectedPhones.has(getPhoneId(phone))
										);

										return (
											<div key={`${type}-${brand}`}>
												{/* Brand header - tappable to select all of this brand */}
												<button
													onClick={() => toggleBrand(brand)}
													className="w-full px-4 py-2 bg-background border-b border-border text-left hover:bg-muted/30 transition-colors"
												>
													<div className="flex items-center justify-between">
														<h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
															{brand}
														</h4>
														<div
															className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
																brandSelected
																	? "bg-primary border-primary"
																	: "border-muted-foreground/20"
															}`}
														>
															{brandSelected && (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="12"
																	height="12"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="3"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	className="text-primary-foreground"
																>
																	<polyline points="20 6 9 17 4 12"></polyline>
																</svg>
															)}
														</div>
													</div>
												</button>

												{/* Individual products */}
												{phonesOfBrand.map((phone, index) => {
													const isSelected = selectedPhones.has(
														getPhoneId(phone)
													);

													return (
														<button
															key={index}
															onClick={() => togglePhone(phone)}
															className={`w-full flex items-center justify-between px-4 py-4 border-b border-border transition-colors hover:bg-muted/30 text-left ${
																isSelected ? "bg-muted/50" : ""
															}`}
														>
															<div className="flex items-center gap-3 flex-1 min-w-0">
																{/* Checkbox */}
																<div
																	className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
																		isSelected
																			? "bg-primary border-primary"
																			: "border-muted-foreground/30"
																	}`}
																>
																	{isSelected && (
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="14"
																			height="14"
																			viewBox="0 0 24 24"
																			fill="none"
																			stroke="currentColor"
																			strokeWidth="3"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			className="text-primary-foreground"
																		>
																			<polyline points="20 6 9 17 4 12"></polyline>
																		</svg>
																	)}
																</div>
																<div className="flex-1 min-w-0">
																	<h3 className="text-base font-medium text-card-foreground">
																		{phone.model}
																		{/* Tag badges */}
																		{phone.tags &&
																			phone.tags.length > 0 && (
																				<div className="inline-flex gap-1 ml-2">
																					{phone.tags.map((tag) => (
																						<span
																							key={tag}
																							className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
																						>
																							{tag}
																						</span>
																					))}
																				</div>
																			)}
																	</h3>
																</div>
															</div>
															<div className="text-right ml-4 flex-shrink-0">
																<div className="text-lg font-semibold text-card-foreground">
																	{formatPrice(phone.price)}
																</div>
															</div>
														</button>
													);
												})}
											</div>
										);
									})}
							</div>
						);
					})}
				</div>
			) : (
				<div className="pt-8 px-4 text-center">
					<p className="text-muted-foreground">Hakuna matokeo yaliyopatikana</p>
				</div>
			)}

			{/* Sticky footer with actions */}
			{selectedPhones.size > 0 && (
				<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
					<div className="max-w-4xl mx-auto px-4 py-3">
						<div className="flex items-center justify-between mb-3">
							<div>
								<p className="text-sm text-muted-foreground">
									Umechagua bidhaa {selectedPhones.size}
								</p>
								<p className="text-lg font-bold text-primary">
									{formatPrice(total)}
								</p>
							</div>
						</div>
						<button
							onClick={handlePreviewAndShare}
							className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
						>
							Tuma Bidhaa ({selectedPhones.size})
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CustomShare;
