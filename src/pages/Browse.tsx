import { useMemo, useEffect } from "react";
import { useApp, Phone } from "../context/AppContext";
// import PriceChecker from "../components/PriceChecker";
// import BrandSelector from "../components/BrandSelector";
import { useNavigate, useParams } from "react-router";

function Browse() {
	const navigate = useNavigate();
	const { type } = useParams<{ type: string }>();
	const {
		allPhoneData,
		formatPrice,
		cart,
		toggleItemSelection,
		isItemSelected,
		clearCart,
	} = useApp();

	// Redirect to /browse/Simu if no type specified (root path)
	useEffect(() => {
		if (!type) {
			navigate("/browse/Simu", { replace: true });
		}
	}, [type, navigate]);

	// Filter data by type from URL
	const phoneData = useMemo(() => {
		if (!type) return [];
		return allPhoneData.filter((phone) => phone.type === type);
	}, [allPhoneData, type]);

	// Selection mode is active when cart has items
	const isSelectionMode = cart.length > 0;

	const scrollToTop = () => {
		window.scrollTo({ top: 0 });
	};

	const handleProductClick = (phone: Phone) => {
		toggleItemSelection(phone);
	};

	const handleClearSelections = () => {
		clearCart();
	};

	const handleGoToOrder = () => {
		navigate("/order");
		window.scrollTo({ top: 0 });
	};

	// const scrollToBrand = (brand: string) => {
	// 	const brandIndex = brandOrder.indexOf(brand);

	// 	if (brandIndex === 0) {
	// 		// window.scrollTo({ top: 0, behavior: "smooth" });
	// 		window.scrollTo({ top: 0 });
	// 		return;
	// 	}

	// 	const previousBrand = brandOrder[brandIndex - 1];
	// 	const element = document.getElementById(`brand-${previousBrand}-last`);
	// 	if (element) {
	// 		element.scrollIntoView({ block: "start" });
	// 		// element.scrollIntoView({ behavior: "smooth", block: "start" });
	// 	}
	// };

	const phonesByBrand = useMemo(() => {
		const groups: { [key: string]: typeof phoneData } = {};
		phoneData.forEach((phone) => {
			if (!groups[phone.brand]) {
				groups[phone.brand] = [];
			}
			groups[phone.brand].push(phone);
		});
		return groups;
	}, [phoneData]);

	const brandOrder = Object.keys(phonesByBrand);

	return (
		<div className="max-w-4xl mx-auto pb-24 md:pb-32">
			{/* <PriceChecker type={type} /> */}
			{/* <BrandSelector onBrandClick={scrollToBrand} /> */}

			<div className="">
				{brandOrder.map((brand) => (
					<div key={brand}>
						<div className="sticky top-[57px] md:top-[85px] px-4 py-3 bg-muted border-b border-border z-10">
							<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
								{brand}
							</h2>
						</div>
						{phonesByBrand[brand].map((phone, index) => {
							const isSelected = isItemSelected(phone);
							return (
								<button
									key={index}
									id={
										index ===
										phonesByBrand[brand].length - 1
											? `brand-${brand}-last`
											: undefined
									}
									onClick={() => handleProductClick(phone)}
									className={`w-full flex items-center justify-between px-4 py-4 border-b border-border transition-colors md:hover:bg-muted/50 text-left cursor-pointer ${
										isSelected ? "bg-muted/50" : ""
									}`}
								>
									<div className="flex items-center gap-3 flex-1 min-w-0">
										{/* Checkbox - only show in selection mode */}
										{isSelectionMode && (
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
										)}
										<h3 className="text-base font-medium text-card-foreground">
											{phone.model}
										</h3>
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
				))}
			</div>

			{/* Sticky action bar - compact version */}
			{isSelectionMode && (
				<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
					<div className="max-w-4xl mx-auto px-2 py-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="">
									<span className="font-normal text-foreground opacity-75">
										Umechagua bidhaa
									</span>{" "}
									<span className="text-base font-semibold px-2 py-1 bg-foreground/10 rounded-full">
										{cart.length}
									</span>
								</span>
								<button
									onClick={handleClearSelections}
									className="text-sm font-medium underline"
								>
									Ondoa zote
								</button>
							</div>
							<button
								onClick={handleGoToOrder}
								className="pl-3 pr-2 py-1.5 text-sm font-semibold flex items-center justify-center gap-1 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
								aria-label="Continue to order"
							>
								Oda
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14"></path>
									<path d="m12 5 7 7-7 7"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Scroll to top button - only show when not in selection mode */}
			{!isSelectionMode && (
				<button
					onClick={scrollToTop}
					className="hidden fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 p-3 md:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity z-50"
					aria-label="Scroll to top"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="md:w-6 md:h-6"
					>
						<polyline points="18 15 12 9 6 15"></polyline>
					</svg>
				</button>
			)}
		</div>
	);
}

export default Browse;
