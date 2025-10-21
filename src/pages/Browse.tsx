import { useMemo } from "react";
import { useApp, Phone } from "../context/AppContext";
import AddToCartButton from "../components/AddToCartButton";
import BrandSelector from "../components/BrandSelector";
import { useNavigate } from "react-router";

function Browse() {
	const navigate = useNavigate();
	const {
		phoneData,
		addToCart,
		formatPrice,
		setSelectedBrand,
		setSelectedModel,
	} = useApp();

	const scrollToTop = () => {
		window.scrollTo({ top: 0 });
	};

	const handleProductClick = (phone: Phone) => {
		setSelectedBrand(phone.brand);
		setSelectedModel(phone.model);
		addToCart(phone);
		navigate("/order");
		window.scrollTo({ top: 0 });
	};

	const scrollToBrand = (brand: string) => {
		const brandIndex = brandOrder.indexOf(brand);

		if (brandIndex === 0) {
			// window.scrollTo({ top: 0, behavior: "smooth" });
			window.scrollTo({ top: 0 });
			return;
		}

		const previousBrand = brandOrder[brandIndex - 1];
		const element = document.getElementById(`brand-${previousBrand}-last`);
		if (element) {
			element.scrollIntoView({ block: "start" });
			// element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

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
			<BrandSelector onBrandClick={scrollToBrand} />

			<div className="">
				{brandOrder.map((brand) => (
					<div key={brand}>
						<div className="sticky top-[57px] md:top-[85px] px-4 py-3 bg-muted border-b border-border z-10">
							<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
								{brand}
							</h2>
						</div>
						{phonesByBrand[brand].map((phone, index) => (
							<button
								key={index}
								id={
									index === phonesByBrand[brand].length - 1
										? `brand-${brand}-last`
										: undefined
								}
								onClick={() => handleProductClick(phone)}
								className="w-full flex items-center justify-between px-4 py-4 border-b border-border transition-colors md:hover:bg-muted/50 text-left cursor-pointer"
							>
								<div className="flex-1 min-w-0">
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
						))}
					</div>
				))}
			</div>

			<button
				onClick={scrollToTop}
				className="fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 p-3 md:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity z-50"
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
		</div>
	);
}

export default Browse;
