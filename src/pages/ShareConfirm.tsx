import { useState, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Phone } from "../context/AppContext";
import { useApp } from "../context/AppContext";
import { formatShareMessage } from "../utils/shareHelpers";
import { generateShareImage, COLOR_PALETTE } from "../utils/canvasShare";
import ShareImagePreview from "../components/ShareImagePreview";

type ShareMode = "text" | "image";

interface ShareConfirmState {
	phones: Phone[];
	title?: string;
}

function ShareConfirm() {
	const location = useLocation();
	const { formatPrice } = useApp();
	const [searchParams] = useSearchParams();

	const state = location.state as ShareConfirmState;
	const phones = state?.phones || [];
	// Check if single brand
	const allBrands = Array.from(new Set(phones.map((p) => p.brand))).sort();
	const isSingleBrand = allBrands.length === 1;

	// Read mode from query param
	const mode = (searchParams.get("mode") || "image") as ShareMode;

	const [showHeader, setShowHeader] = useState(true);
	const [selectedColor, setSelectedColor] = useState<string>(
		COLOR_PALETTE[0]
	);
	const [striped, setStriped] = useState(true);
	const [separateBrands, setSeparateBrands] = useState(allBrands.length > 1);
	const [, setIsSending] = useState(false);
	const [isSendingBrand, setIsSendingBrand] = useState<string>("");

	// Group phones by type
	const phonesByType = useMemo(() => {
		const groups: { [key: string]: Phone[] } = {};
		phones.forEach((phone) => {
			if (!groups[phone.type]) {
				groups[phone.type] = [];
			}
			groups[phone.type].push(phone);
		});
		return groups;
	}, [phones]);

	const types = Object.keys(phonesByType).sort();

	// Dynamic default header text
	const defaultHeaderText = useMemo(() => {
		if (isSingleBrand) {
			return `Bei za ${allBrands[0]}`;
		}
		return "Bei za Bidhaa";
	}, [isSingleBrand, allBrands]);

	const [headerText, setHeaderText] = useState(defaultHeaderText);

	// Generate text message
	const textMessage = useMemo(() => {
		return formatShareMessage(phones, formatPrice);
	}, [phones, formatPrice]);

	// Handle send for individual brand
	const handleSendBrand = async (type: string, brand: string) => {
		setIsSendingBrand(`${type}-${brand}`);
		try {
			// Filter phones for this specific brand and type
			const brandPhones = phonesByType[type].filter(
				(p) => p.brand === brand
			);
			const brandIndex = allBrands.indexOf(brand);
			const brandColor = COLOR_PALETTE[brandIndex % COLOR_PALETTE.length];

			// Generate the image
			const blob = await generateShareImage(
				brandPhones,
				formatPrice,
				showHeader ? `Bei za ${brand}` : "",
				brandColor,
				striped
			);

			// Share the image
			const file = new File([blob], `order-${type}-${brand}.png`, {
				type: "image/png",
			});

			if (navigator.share && navigator.canShare?.({ files: [file] })) {
				await navigator.share({
					files: [file],
					title: `Bei za ${brand}`,
				});
			} else {
				// Fallback: download
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `order-${type}-${brand}.png`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.error("Error generating/sharing brand image:", error);
		} finally {
			setIsSendingBrand("");
		}
	};

	// Handle send
	const handleSend = async () => {
		if (mode === "text") {
			// Send as WhatsApp text
			const whatsappNumber = "+255719796574";
			const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
				/[^0-9]/g,
				""
			)}?text=${encodeURIComponent(textMessage)}`;
			window.open(whatsappUrl, "_blank");
		} else {
			// Generate and send images
			setIsSending(true);
			try {
				const blobs: {
					type: string;
					brand: string;
					blob: Blob;
				}[] = [];

				if (separateBrands) {
					// Generate separate images for each brand within each type
					for (const type of types) {
						const typePhones = phonesByType[type];
						const brandsInType = Array.from(
							new Set(typePhones.map((p) => p.brand))
						).sort();

						for (const brand of brandsInType) {
							const brandPhones = typePhones.filter(
								(p) => p.brand === brand
							);
							const brandIndex = allBrands.indexOf(brand);
							const brandColor =
								COLOR_PALETTE[
									brandIndex % COLOR_PALETTE.length
								];

							const blob = await generateShareImage(
								brandPhones,
								formatPrice,
								showHeader ? `Bei za ${brand}` : "",
								brandColor,
								striped
							);
							blobs.push({ type, brand, blob });
						}
					}
				} else {
					// Generate one image per type (current behavior)
					for (const type of types) {
						const typePhones = phonesByType[type];
						const blob = await generateShareImage(
							typePhones,
							formatPrice,
							showHeader ? headerText : "",
							isSingleBrand ? selectedColor : undefined,
							striped
						);
						blobs.push({ type, brand: "", blob });
					}
				}

				// Share or download the generated images
				if (blobs.length === 1) {
					// Single image - share directly
					const file = new File([blobs[0].blob], "order.png", {
						type: "image/png",
					});

					if (
						navigator.share &&
						navigator.canShare?.({ files: [file] })
					) {
						await navigator.share({
							files: [file],
							title: "Order from Mr. Low Price",
						});
					} else {
						// Fallback: download
						downloadImage(blobs[0].blob, "order.png");
					}
				} else {
					// Multiple images - download all
					blobs.forEach((item) => {
						const filename = item.brand
							? `order-${item.type}-${item.brand}.png`
							: `order-${item.type}.png`;
						downloadImage(item.blob, filename);
					});
				}
			} catch (error) {
				console.error("Error generating/sharing images:", error);
			} finally {
				setIsSending(false);
			}
		}
	};

	const downloadImage = (blob: Blob, filename: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="pb-24 max-w-4xl mx-auto spx-4">
			{/* Options (only show for image mode) */}
			{mode === "image" && (
				<div className="mt-4s mb-4 bg-background sborder sborder-border srounded-lg overflow-hidden divide-y divide-border">
					{/* Separate Brands toggle (only if multiple brands) */}
					{allBrands.length > 1 && (
						<div className="p-4">
							<div className="flex items-center justify-between">
								<label className="text-sm font-medium text-foreground">
									Tuma kila brand peke yake
								</label>
								<button
									onClick={() =>
										setSeparateBrands(!separateBrands)
									}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
										separateBrands
											? "bg-primary"
											: "bg-muted"
									}`}
									role="switch"
									aria-checked={separateBrands}
								>
									<span
										className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
											separateBrands
												? "translate-x-6"
												: "translate-x-1"
										}`}
									/>
								</button>
							</div>
						</div>
					)}

					{/* Header toggle and input */}
					<div className="p-4">
						<div className="flex items-center justify-between">
							<label className="text-sm font-medium text-foreground">
								Neno la juu
							</label>
							<button
								onClick={() => setShowHeader(!showHeader)}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
									showHeader ? "bg-primary" : "bg-muted"
								}`}
								role="switch"
								aria-checked={showHeader}
							>
								<span
									className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
										showHeader
											? "translate-x-6"
											: "translate-x-1"
									}`}
								/>
							</button>
						</div>
						{showHeader && !separateBrands && (
							<input
								type="text"
								value={
									separateBrands
										? defaultHeaderText
										: headerText
								}
								onChange={(e) => setHeaderText(e.target.value)}
								placeholder={defaultHeaderText}
								className="mt-3 w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
							/>
						)}
					</div>

					{/* Color Picker (only for single brand and not separate brands) */}
					{!separateBrands && isSingleBrand && (
						<div className="p-4">
							<label className="block text-sm font-medium text-foreground mb-3">
								Chagua rangi
							</label>
							<div className="flex flex-wrap gap-1.5 pb-2">
								{COLOR_PALETTE.map((color) => (
									<button
										key={color}
										onClick={() => setSelectedColor(color)}
										className={`w-7 h-7 rounded-full flex-shrink-0 transition-all ${
											selectedColor === color
												? "ring-2 ring-primary ring-offset-1"
												: "hover:ring-2 hover:ring-primary/50"
										}`}
										style={{ backgroundColor: color }}
										aria-label={`Select color ${color}`}
									/>
								))}
							</div>
						</div>
					)}

					{/* Striped toggle */}
					<div className="p-4">
						<div className="flex items-center justify-between">
							<label className="text-sm font-medium text-foreground">
								Mistari yenye rangi mbadala
							</label>
							<button
								onClick={() => setStriped(!striped)}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
									striped ? "bg-primary" : "bg-muted"
								}`}
								role="switch"
								aria-checked={striped}
							>
								<span
									className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
										striped
											? "translate-x-6"
											: "translate-x-1"
									}`}
								/>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Preview Area */}
			<div className="px-4">
				{mode === "text" ? (
					/* Text Preview */
					<div className="bg-muted rounded-lg p-4">
						<pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
							{textMessage}
						</pre>
					</div>
				) : (
					/* Image Preview */
					<ShareImagePreview
						phonesByType={phonesByType}
						types={types}
						allBrands={allBrands}
						isSingleBrand={isSingleBrand}
						separateBrands={separateBrands}
						showHeader={showHeader}
						headerText={headerText}
						selectedColor={selectedColor}
						striped={striped}
						formatPrice={formatPrice}
						onSendBrand={handleSendBrand}
						isSendingBrand={isSendingBrand}
					/>
				)}
			</div>

			{/* Action Button - Fixed at bottom */}

			<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
				<div className="max-w-4xl mx-auto px-4 py-3">
					<button
						onClick={handleSend}
						// disabled={isSending}
						className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{/* {isSending && (
								<div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
							)}
							{isSending ? "Inaandaa picha..." : "Tuma"} */}
						{separateBrands ? "Tuma zote" : "Tuma"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ShareConfirm;
