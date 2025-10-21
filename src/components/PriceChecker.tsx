import { useApp } from "../context/AppContext";

function PriceChecker() {
	const { formatPrice, priceChecker, setSelectedBrand, setSelectedModel } =
		useApp();
	const { selectedBrand, selectedModel, brands, models, selectedPhone } =
		priceChecker;

	const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedBrand(e.target.value);
	};

	const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(e.target.value);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="px-4 py-3 bg-muted border-b border-border">
				<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
					Tafuta
				</h2>
			</div>
			<div className="px-4 md:px-0 py-4">
				<div className="flex gap-2">
					{/* Brand Select */}
					<select
						value={selectedBrand}
						onChange={handleBrandChange}
						className="flex-1 py-2 bg-transparent text-foreground text-sm border-b border-border focus:outline-none focus:border-primary transition-colors cursor-pointer"
					>
						<option value="" disabled>
							Chagua Aina
						</option>
						{brands.map((brand) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>

					{/* Model Select */}
					<select
						value={selectedModel}
						onChange={handleModelChange}
						className="flex-1 py-2 bg-transparent text-foreground text-sm border-b border-border focus:outline-none focus:border-primary transition-colors cursor-pointer"
					>
						<option value="" disabled>
							Chagua Model
						</option>
						{models.map((phone, index) => (
							<option key={index} value={phone.model}>
								{phone.model}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Price Display */}
			{selectedPhone && (
				<div className="px-4 md:px-0">
					<div className="p-6 bg-card border border-border rounded-2xl text-center">
						<p className="text-sm text-muted-foreground mb-1">
							{selectedPhone.brand} - {selectedPhone.model}
						</p>
						<p className="text-3xl font-bold mt-2">
							{formatPrice(selectedPhone.price)}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default PriceChecker;
