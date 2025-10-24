import { Phone } from "../context/AppContext";
import { COLOR_PALETTE } from "../utils/canvasShare";

interface ShareImagePreviewProps {
	phonesByType: { [key: string]: Phone[] };
	types: string[];
	allBrands: string[];
	isSingleBrand: boolean;
	separateBrands: boolean;
	showHeader: boolean;
	headerText: string;
	selectedColor: string;
	striped: boolean;
	formatPrice: (price: number) => string;
	onSendBrand?: (type: string, brand: string) => void;
	isSendingBrand?: string; // Format: "type-brand"
}

// Helper to get brand color
const getBrandColor = (brand: string, brandList: string[]): string => {
	const index = brandList.indexOf(brand);
	return COLOR_PALETTE[index % COLOR_PALETTE.length];
};

// Helper to lighten color
const lightenColor = (color: string, amount: number): string => {
	const hex = color.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	const newR = Math.min(255, Math.round(r + (255 - r) * amount));
	const newG = Math.min(255, Math.round(g + (255 - g) * amount));
	const newB = Math.min(255, Math.round(b + (255 - b) * amount));

	return `#${newR.toString(16).padStart(2, "0")}${newG
		.toString(16)
		.padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

function ShareImagePreview({
	phonesByType,
	types,
	allBrands,
	isSingleBrand,
	separateBrands,
	showHeader,
	headerText,
	selectedColor,
	striped,
	formatPrice,
	onSendBrand,
	// isSendingBrand,
}: ShareImagePreviewProps) {
	const isSingleType = types.length === 1;

	if (separateBrands) {
		// Render separate preview for each brand within each type
		return (
			<div className="space-y-4">
				{types.map((type) => {
					const typePhones = phonesByType[type];
					const brandsInType = Array.from(
						new Set(typePhones.map((p) => p.brand))
					).sort();

					return brandsInType.map((brand) => {
						const brandPhones = typePhones.filter(
							(p) => p.brand === brand
						);
						const brandIndex = allBrands.indexOf(brand);
						const brandColor =
							COLOR_PALETTE[brandIndex % COLOR_PALETTE.length];
						const heading = showHeader ? `Bei za ${brand}` : "";

						return (
							<div
								key={`${type}-${brand}`}
								className="bg-white rounded-lg overflow-hidden shadow-sm"
							>
								{/* Header */}
								{heading && (
									<div className="text-black text-center py-2">
										<h2 className="text-lg font-bold">
											{heading}
										</h2>
									</div>
								)}

								{/* Type header (only if multiple types) */}
								{!isSingleType && (
									<div className="bg-gray-700 text-white px-4 py-2">
										<p className="font-bold text-lg">
											{type}
										</p>
									</div>
								)}

								{/* Items */}
								<div>
									{brandPhones.map((phone, index) => {
										const isEven = index % 2 === 0;
										const bgColor =
											striped && isEven
												? lightenColor(brandColor, 0.2)
												: brandColor;

										return (
											<div key={index}>
												<div
													className="flex items-center justify-between px-4 py-3"
													style={{
														backgroundColor:
															bgColor,
													}}
												>
													<span className="text-white font-bold">
														{phone.model}
													</span>
													<span className="text-white font-bold">
														Tsh.{" "}
														{formatPrice(
															phone.price
														)}
													</span>
												</div>
												{index <
													brandPhones.length - 1 && (
													<div className="h-px bg-white" />
												)}
											</div>
										);
									})}
								</div>

								{/* Send Button */}
								{onSendBrand && (
									<div className="px-4 pb-4 pt-2">
										<button
											onClick={() =>
												onSendBrand(type, brand)
											}
											// disabled={isSendingBrand === `${type}-${brand}`}
											className="w-full py-3s font-semibold text-primary border-border hover:bg-muted/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
										>
											{/* {isSendingBrand === `${type}-${brand}` && (
												<div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent"></div>
											)}
											{isSendingBrand === `${type}-${brand}` ? "Inaandaa..." : "Tuma"} */}
											Tuma
										</button>
									</div>
								)}
							</div>
						);
					});
				})}
			</div>
		);
	}

	// Render single preview for all phones
	return (
		<div className="bg-white rounded-lg overflow-hidden shadow-sm">
			{/* Header */}
			{showHeader && (
				<div className="text-black text-center py-2">
					<h2 className="text-lg font-bold">{headerText}</h2>
				</div>
			)}

			{/* Content by type */}
			{types.map((type) => {
				const typePhonesArray = phonesByType[type];

				return (
					<div key={type}>
						{/* Type header (only if multiple types) */}
						{!isSingleType && (
							<div className="bg-gray-700 text-white px-4 py-2">
								<p className="font-bold text-lg">{type}</p>
							</div>
						)}

						{isSingleBrand ? (
							// Single brand: just list items
							<div>
								{typePhonesArray.map((phone, index) => {
									const phoneColor =
										selectedColor ||
										getBrandColor(allBrands[0], allBrands);
									const isEven = index % 2 === 0;
									const bgColor =
										striped && isEven
											? lightenColor(phoneColor, 0.2)
											: phoneColor;

									return (
										<div key={index}>
											<div
												className="flex items-center justify-between px-4 py-3"
												style={{
													backgroundColor: bgColor,
												}}
											>
												<span className="text-white font-bold">
													{phone.model}
												</span>
												<span className="text-white font-bold">
													Tsh.{" "}
													{formatPrice(phone.price)}
												</span>
											</div>
											{index <
												typePhonesArray.length - 1 && (
												<div className="h-px bg-white" />
											)}
										</div>
									);
								})}
							</div>
						) : (
							// Multiple brands: group by brand with headers
							<div>
								{Array.from(
									new Set(typePhonesArray.map((p) => p.brand))
								)
									.sort()
									.map((brand) => {
										const brandPhones =
											typePhonesArray.filter(
												(p) => p.brand === brand
											);
										const phoneColor = getBrandColor(
											brand,
											allBrands
										);

										return (
											<div key={brand}>
												{/* Brand header */}
												<div className="bg-gray-200 text-gray-700 px-4 py-2">
													<p className="font-bold text-sm">
														{brand}
													</p>
												</div>

												{/* Brand items */}
												{brandPhones.map(
													(phone, index) => {
														const isEven =
															index % 2 === 0;
														const bgColor =
															striped && isEven
																? lightenColor(
																		phoneColor,
																		0.2
																  )
																: phoneColor;

														return (
															<div key={index}>
																<div
																	className="flex items-center justify-between px-4 py-3"
																	style={{
																		backgroundColor:
																			bgColor,
																	}}
																>
																	<span className="text-white font-bold">
																		{
																			phone.model
																		}
																	</span>
																	<span className="text-white font-bold">
																		Tsh.{" "}
																		{formatPrice(
																			phone.price
																		)}
																	</span>
																</div>
																{index <
																	brandPhones.length -
																		1 && (
																	<div className="h-px bg-white" />
																)}
															</div>
														);
													}
												)}
											</div>
										);
									})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default ShareImagePreview;
