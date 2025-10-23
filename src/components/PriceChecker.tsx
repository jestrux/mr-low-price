import { useApp, Phone } from "../context/AppContext";
import { useMemo, useState, useEffect } from "react";

interface PriceCheckerProps {
	type?: string;
	selectedPhone?: Phone | null;
}

function PriceChecker({ type, selectedPhone }: PriceCheckerProps) {
	const {
		formatPrice,
		allPhoneData,
		addToCart,
		availableTypes,
		isItemSelected,
	} = useApp();
	const [internalType, setInternalType] = useState<string>("");
	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const [selectedModel, setSelectedModel] = useState<string>("");

	// Initialize internal type when no type prop is provided
	useEffect(() => {
		if (!type && availableTypes.length > 0 && !internalType) {
			setInternalType(availableTypes[0]);
		}
	}, [type, availableTypes, internalType]);

	// Use either the prop type or internal type
	const activeType = type || internalType;

	// Filter phone data by active type
	const phoneData = useMemo(() => {
		if (!activeType) return allPhoneData;
		return allPhoneData.filter((phone) => phone.type === activeType);
	}, [activeType, allPhoneData]);

	// Get unique brands from filtered data
	const brands = useMemo(() => {
		const uniqueBrands = new Set<string>();
		phoneData.forEach((phone) => uniqueBrands.add(phone.brand));
		return Array.from(uniqueBrands).sort();
	}, [phoneData]);

	// Get models for selected brand
	const models = useMemo(() => {
		if (!selectedBrand) return [];
		return phoneData.filter((phone) => phone.brand === selectedBrand);
	}, [selectedBrand, phoneData]);

	// Find selected phone (use prop if provided, otherwise find from selections)
	const displayPhone = useMemo(() => {
		if (selectedPhone) return selectedPhone;
		if (!selectedBrand || !selectedModel) return null;
		return (
			phoneData.find(
				(phone) =>
					phone.brand === selectedBrand &&
					phone.model === selectedModel
			) || null
		);
	}, [selectedPhone, selectedBrand, selectedModel, phoneData]);

	// Auto-select first brand and model when type is not provided as prop and no selectedPhone
	useEffect(() => {
		if (
			!selectedPhone &&
			!type &&
			activeType &&
			brands.length > 0 &&
			!selectedBrand
		) {
			setSelectedBrand(brands[0]);
		}
	}, [selectedPhone, type, activeType, brands, selectedBrand]);

	// Set first model when brand changes
	useEffect(() => {
		if (models.length > 0) {
			setSelectedModel(models[0].model);
		}
	}, [models]);

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newType = e.target.value;
		setInternalType(newType);
		// Clear selections when type changes
		setSelectedBrand("");
		setSelectedModel("");
	};

	const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedBrand(e.target.value);
	};

	const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(e.target.value);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="px-4 py-3 bg-muted border-b border-border">
				<div className="flex items-center justify-between">
					<h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
						Tafuta Chap
					</h2>
					{/* Show type selector only when type prop is not provided */}
					{!type && (
						<select
							value={internalType}
							onChange={handleTypeChange}
							className="py-1 px-2 bg-background text-foreground text-xs border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
						>
							{availableTypes.map((t) => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
					)}
				</div>
			</div>
			<div className="px-4 md:px-0 py-4">
				<div className="flex gap-2">
					{/* Brand Select */}
					<select
						value={selectedBrand}
						onChange={handleBrandChange}
						className="flex-1 py-2 bg-transparent text-foreground text-sm border-b border-foreground/30 focus:outline-none focus:border-primarys transition-colors cursor-pointer"
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
						className="flex-1 py-2 bg-transparent text-foreground text-sm border-b border-foreground/30 focus:outline-none focus:border-primarys transition-colors cursor-pointer"
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
			{displayPhone && (
				<>
					<div className="px-4 md:px-0">
						<div className="p-6 bg-card border border-border rounded-2xl text-center">
							<p className="text-sm text-muted-foreground mb-1">
								{displayPhone.brand} - {displayPhone.model}
							</p>
							<p className="text-3xl font-bold mt-2">
								<span className="-translate-y-0.5 inline-block text-base pb-0.5 font-normal opacity-75">
									Tsh.
								</span>{" "}
								{formatPrice(displayPhone.price)}
							</p>
						</div>
					</div>
					{isItemSelected(displayPhone) ? (
						<div className="px-4 md:px-0">
							<button
								onClick={() => {}}
								className="w-full py-3 font-medium text-primary border-border hover:bg-muted/30 transition-colors"
							>
								Ongeza kwenye Oda
							</button>
						</div>
					) : (
						<div className="px-4 md:px-0">
							<button
								onClick={() => {
									if (isItemSelected(displayPhone))
										return alert(
											"Bidhaa tayari ipo kwenye oda"
										);

									addToCart(displayPhone);
									if (!selectedPhone) {
										setSelectedModel("");
										setSelectedBrand("");
									}
								}}
								className={`${
									isItemSelected(displayPhone) && "opacity-50"
								} w-full py-3 font-medium text-primary border-border hover:bg-muted/30 transition-colors`}
							>
								Ongeza kwenye Oda
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default PriceChecker;
