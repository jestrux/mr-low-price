import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
	getPhonesByType,
	getPhonesByBrand,
	getPhonesByTag,
	getBrandsInType,
	getTagsInType,
} from "../utils/shareHelpers";

function Share() {
	const { allPhoneData, formatPrice, availableTypes } = useApp();
	const navigate = useNavigate();
	const [selectedType, setSelectedType] = useState<string>(
		availableTypes[0] || "Simu"
	);

	// Get phones for selected type
	const phonesInType = useMemo(() => {
		return getPhonesByType(allPhoneData, selectedType);
	}, [allPhoneData, selectedType]);

	// Get brands in selected type
	const brandsInType = useMemo(() => {
		return getBrandsInType(allPhoneData, selectedType);
	}, [allPhoneData, selectedType]);

	// Get tags in selected type
	const tagsInType = useMemo(() => {
		return getTagsInType(allPhoneData, selectedType);
	}, [allPhoneData, selectedType]);

	// Handle quick share card click
	const handleQuickShare = (
		groupType: "all" | "brand" | "tag",
		groupValue: string
	) => {
		let phones = phonesInType;

		if (groupType === "brand") {
			phones = getPhonesByBrand(allPhoneData, selectedType, groupValue);
		} else if (groupType === "tag") {
			phones = getPhonesByTag(allPhoneData, selectedType, groupValue);
		}

		navigate("/share/confirm", {
			state: {
				phones,
				title:
					groupType === "all"
						? `${selectedType} Zote`
						: groupType === "brand"
						? groupValue
						: groupValue,
			},
		});
	};

	// Handle custom share button
	const handleCustomShare = () => {
		navigate("/custom-share");
	};

	// Calculate totals for cards
	const getTotalForGroup = (phones: any[]) => {
		return phones.reduce((sum, phone) => sum + phone.price, 0);
	};

	const chevronIcon = (
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
			className="text-muted-foreground"
		>
			<polyline points="9 18 15 12 9 6"></polyline>
		</svg>
	);

	return (
		<div className="pb-8 max-w-4xl mx-auto px-4">
			{/* Segmented Control for Type Selection */}
			<div className="mt-4 mb-6">
				<div className="inline-flex bg-muted rounded-lg p-1 w-full">
					{availableTypes.map((type) => (
						<button
							key={type}
							onClick={() => setSelectedType(type)}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
								selectedType === type
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{type}
						</button>
					))}
				</div>
			</div>

			{/* Quick Share Cards */}
			<div className="space-y-4">
				{/* Share All Type Card */}
				<div>
					{/* <div className="block text-sm font-medium text-foreground mb-0.5 ml-px">
						Tuma Kwa Kikundi
					</div> */}
					<div className="bg-background border border-border rounded-lg overflow-hidden">
						<button
							onClick={() =>
								handleQuickShare("all", selectedType)
							}
							className="w-full p-4 hover:bg-muted/30 transition-colors text-left"
						>
							<div className="flex items-center justify-between gap-3">
								<div className="flex-1">
									<h3 className="text-base font-semibold text-foreground mb-1">
										{/* {selectedType} Zote */}
										Tuma List Nzima
									</h3>
									<p className="text-sm text-muted-foreground">
										bidhaa {phonesInType.length} • Tsh.{" "}
										{formatPrice(
											getTotalForGroup(phonesInType)
										)}
									</p>
								</div>
								{chevronIcon}
							</div>
						</button>
					</div>
				</div>

				{/* Brand Cards */}
				{brandsInType.length > 0 && (
					<div>
						<div className="block text-sm font-medium text-foreground mb-0.5 ml-px">
							Tuma Brand
						</div>
						<div className="bg-background border border-border rounded-lg overflow-hidden divide-y divide-border">
							{brandsInType.map((brand) => {
								const brandPhones = getPhonesByBrand(
									allPhoneData,
									selectedType,
									brand
								);
								return (
									<button
										key={brand}
										onClick={() =>
											handleQuickShare("brand", brand)
										}
										className="w-full p-4 hover:bg-muted/30 transition-colors text-left"
									>
										<div className="flex items-center justify-between gap-3">
											<div className="flex-1">
												<h3 className="text-base font-semibold text-foreground mb-1">
													{brand}
												</h3>
												<p className="text-sm text-muted-foreground">
													bidhaa {brandPhones.length}{" "}
													• Tsh.{" "}
													{formatPrice(
														getTotalForGroup(
															brandPhones
														)
													)}
												</p>
											</div>
											{chevronIcon}
										</div>
									</button>
								);
							})}
						</div>
					</div>
				)}

				{/* Tag Cards */}
				{tagsInType.length > 0 && (
					<div>
						<div className="block text-sm font-medium text-foreground mb-0.5 ml-px">
							Tuma Kwa Tag
						</div>
						<div className="bg-background border border-border rounded-lg overflow-hidden divide-y divide-border">
							{tagsInType.map((tag) => {
								const tagPhones = getPhonesByTag(
									allPhoneData,
									selectedType,
									tag
								);
								return (
									<button
										key={tag}
										onClick={() =>
											handleQuickShare("tag", tag)
										}
										className="w-full p-4 hover:bg-muted/30 transition-colors text-left"
									>
										<div className="flex items-center justify-between gap-3">
											<div className="flex-1">
												<h3 className="text-base font-semibold text-foreground mb-1">
													{tag}
												</h3>
												<p className="text-sm text-muted-foreground">
													bidhaa {tagPhones.length} •
													Tsh.{" "}
													{formatPrice(
														getTotalForGroup(
															tagPhones
														)
													)}
												</p>
											</div>
											{chevronIcon}
										</div>
									</button>
								);
							})}
						</div>
					</div>
				)}

				{/* Custom Share Card */}
				<div className="hidden">
					<div className="block text-sm font-medium text-foreground mb-0.5 ml-px">
						Chagua mwenyewe
					</div>
					<div className="bg-background border-2 border-primary/20 rounded-lg overflow-hidden">
						<button
							onClick={handleCustomShare}
							className="w-full p-4 hover:bg-primary/5 transition-colors text-left"
						>
							<div className="flex items-center justify-between gap-3">
								<div className="flex-1">
									<h3 className="text-base font-semibold text-primary mb-1">
										Chagua Bidhaa za Kutuma
									</h3>
									<p className="text-sm text-muted-foreground">
										Chagua bidhaa moja moja
									</p>
								</div>
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
									className="text-primary"
								>
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Share;
