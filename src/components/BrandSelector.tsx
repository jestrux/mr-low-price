import { useMemo } from "react";
import { useApp } from "../context/AppContext";

interface BrandSelectorProps {
	onBrandClick: (brand: string) => void;
}

function BrandSelector({ onBrandClick }: BrandSelectorProps) {
	const { phoneData } = useApp();
	const brands = useMemo(() => {
		const uniqueBrands = new Set<string>();
		phoneData.forEach((phone) => uniqueBrands.add(phone.brand));
		return Array.from(uniqueBrands).sort();
	}, [phoneData]);

	return (
		<div className="max-w-4xl mx-auto bg-card">
			<div className="px-4 py-3 bg-muted border-b border-border">
				<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
					Chagua Aina
				</h2>
			</div>
			<div className="px-4 py-4 bg-canvas">
				<div className="grid grid-cols-2 gap-3">
					{brands.map((brand) => (
						<button
							key={brand}
							onClick={() => onBrandClick(brand)}
							className="px-6 py-5 bg-card border border-border rounded-2xl text-left md:hover:bg-muted/30 transition-colors"
						>
							<span className="text-base font-semibold text-card-foreground capitalize">
								{brand.toLowerCase()}
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default BrandSelector;
