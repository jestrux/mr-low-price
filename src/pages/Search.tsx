import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PriceChecker from "../components/PriceChecker";
import Fuse from "fuse.js";
import { Phone } from "../context/AppContext";

function Search() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { allPhoneData, formatPrice, recentSearches, addToRecentSearches } =
		useApp();

	const searchQuery = searchParams.get("q") || "";
	const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

	// Configure Fuse.js for fuzzy search
	const fuse = useMemo(
		() =>
			new Fuse(allPhoneData, {
				keys: [
					{ name: "brand", weight: 0.4 },
					{ name: "model", weight: 0.6 },
				],
				threshold: 0.4,
				includeScore: true,
				ignoreLocation: true,
			}),
		[allPhoneData]
	);

	// Perform fuzzy search
	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) return {};

		const results = fuse.search(searchQuery);

		// Group by type
		const grouped: { [key: string]: typeof results } = {};
		results.forEach((result) => {
			const type = result.item.type;
			if (!grouped[type]) {
				grouped[type] = [];
			}
			grouped[type].push(result);
		});

		return grouped;
	}, [searchQuery, fuse]);

	const hasResults = Object.keys(searchResults).length > 0;
	const typeOrder = Object.keys(searchResults).sort();

	const focusSearch = () => {
		(
			document.querySelector("#headerSearchInput") as HTMLInputElement
		).select();
	};

	const clearSearch = () => setSearchParams({});

	const handleSearchResultClick = (result: Phone) => {
		clearSearch();
		focusSearch();
		setSelectedPhone(result);
		addToRecentSearches(result);
		window.scrollTo({ top: 0 });
	};

	const handleRecentSearchClick = (phone: Phone) => {
		clearSearch();
		setSelectedPhone(phone);
		window.scrollTo({ top: 0 });
	};

	return (
		<div className="pb-8">
			{/* When there's a search query (with or without selection) */}
			{searchQuery.trim() && (
				<>
					{selectedPhone && (
						<div>
							<PriceChecker
								type={selectedPhone.type}
								selectedPhone={selectedPhone}
							/>
						</div>
					)}

					{hasResults ? (
						<div>
							{typeOrder.map((type) => (
								<div key={type} className="max-w-4xl mx-auto">
									<div className="px-4 py-3 bg-muted border-b border-border">
										<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
											{type}
										</h3>
									</div>
									<div>
										{searchResults[type].map(
											(result, index) => (
												<button
													key={index}
													onClick={() =>
														handleSearchResultClick(
															result.item
														)
													}
													className="w-full flex items-center justify-between px-4 py-4 border-b border-border hover:bg-muted/30 transition-colors text-left"
												>
													<div>
														<h3 className="text-base font-medium text-card-foreground">
															{result.item.model}
														</h3>
														<p className="text-sm text-muted-foreground">
															{result.item.brand}
														</p>
													</div>
													<div className="text-right">
														<p className="text-lg font-semibold text-card-foreground">
															{formatPrice(
																result.item
																	.price
															)}
														</p>
													</div>
												</button>
											)
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="pt-8 px-4 text-center">
							<p className="text-muted-foreground">
								Hakuna matokeo yaliyopatikana
							</p>
						</div>
					)}
				</>
			)}

			{/* When there's no search query */}
			{!searchQuery.trim() && (
				<>
					<div>
						<PriceChecker
							{...(selectedPhone
								? {
										type: selectedPhone.type,
										selectedPhone: selectedPhone,
								  }
								: {})}
						/>
					</div>

					{/* Recent Searches */}
					{recentSearches.length > 0 && (
						<div className="max-w-4xl mx-auto">
							<div className="px-4 py-3 bg-muted border-b border-border">
								<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
									Zilizotafutwa Hivi Karibuni
								</h2>
							</div>
							<div>
								{recentSearches.map((phone, index) => (
									<button
										key={index}
										onClick={() =>
											handleRecentSearchClick(phone)
										}
										className="w-full flex items-center justify-between px-4 py-4 border-b border-border hover:bg-muted/30 transition-colors text-left"
									>
										<div>
											<h3 className="text-base font-medium text-card-foreground">
												{phone.model}
											</h3>
											<p className="text-sm text-muted-foreground">
												{phone.brand} • {phone.type}
											</p>
										</div>
										<div className="text-right">
											<p className="text-lg font-semibold text-card-foreground">
												{formatPrice(phone.price)}
											</p>
										</div>
									</button>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Search;
