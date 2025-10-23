import { paymentMethods } from "../data/paymentMethods";
import CopyButton from "../components/CopyButton";

function Info() {
	// Coordinates extracted from the Google Maps link: -6.8217272, 39.2785027
	const latitude = -6.8217272;
	const longitude = 39.2785027;
	const locationUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
	const locationName = "Kariakoo, mtaa wa Mtaa wa Livingston na Uhuru";
	const phoneNumber = "+255719796574";
	const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`;

	// Using OpenStreetMap static map API with custom styling
	const mapImageUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
		longitude - 0.005
	},${latitude - 0.005},${longitude + 0.005},${
		latitude + 0.005
	}&layer=mapnik&marker=${latitude},${longitude}`;

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
		<div className="pb-24 md:pb-32 max-w-4xl mx-auto px-4">
			<div className="mt-4 space-y-4">
				{/* Contact Information Card */}
				<div>
					<div className="block text-sm font-medium text-foreground mb-0.5 ml-px">
						Jinsi ya Kutupata
					</div>
					<div className="bg-background border border-border rounded-lg overflow-hidden">
						{/* Map */}
						<div className="w-full h-48 bg-muted relative">
							<iframe
								width="100%"
								height="100%"
								src={mapImageUrl}
								style={{
									border: 0,
									pointerEvents: "none",
								}}
							></iframe>
						</div>

						{/* Location Info */}
						<div className="p-4 border-b border-border">
							<a
								href={locationUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between gap-3 group"
							>
								<div className="flex items-start gap-3">
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
										className="flex-shrink-0 mt-0.5 text-primary"
									>
										<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
										<circle cx="12" cy="10" r="3"></circle>
									</svg>
									<div>
										<div className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
											{locationName}
										</div>
										{/* <div className="text-sm text-muted-foreground">
											Mahali tulipo
										</div> */}
									</div>
								</div>
								{chevronIcon}
							</a>
						</div>

						{/* Phone Number Info */}
						<div className="p-4 border-b border-border">
							<a
								href={`tel:${phoneNumber}`}
								className="flex items-center justify-between gap-3 group"
							>
								<div className="flex items-start gap-3">
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
										className="flex-shrink-0 mt-0.5 text-primary"
									>
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
									</svg>
									<div>
										<div className="text-base font-medium font-mono text-foreground group-hover:text-primary transition-colors">
											{phoneNumber}
										</div>
										{/* <div className="text-sm text-muted-foreground">
											Tupigie
										</div> */}
									</div>
								</div>
								{chevronIcon}
							</a>
						</div>

						{/* WhatsApp Info */}
						<div className="p-4">
							<a
								href={whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between gap-3 group"
							>
								<div className="flex items-start gap-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="flex-shrink-0 mt-0.5 text-primary"
									>
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
									</svg>
									<div>
										<div className="text-base font-medium font-mono text-foreground group-hover:text-primary transition-colors">
											{phoneNumber}
										</div>
										{/* <div className="text-sm text-muted-foreground">
											Tutumie ujumbe
										</div> */}
									</div>
								</div>
								{chevronIcon}
							</a>
						</div>
					</div>
				</div>

				{/* Payment Methods Card */}
				<div>
					<div className="block text-sm font-medium text-foreground mb-0.5 ml-px">
						Njia za Malipo
					</div>
					<div className="bg-background border border-border rounded-lg overflow-hidden divide-y divide-border">
						{paymentMethods.map((method, index) => (
							<div key={index} className="p-4">
								<CopyButton text={method.account.number}>
									{(copied) => (
										<div className="flex items-start justify-between gap-3 group">
											<div className="flex items-start gap-3">
												<img
													className="h-8 mt-1"
													src={`/img/payment-options/${method.logo}.png`}
													alt={method.title}
												/>
												<div>
													<div className="text-base font-medium text-foreground">
														{method.title}
													</div>
													<div className="text-sm text-muted-foreground font-mono">
														{method.account.number}
													</div>
												</div>
											</div>

											{/* Trailing copy/copied indicator */}
											<div className="flex-shrink-0 flex flex-col items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
												{copied ? (
													<>
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
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
														<span className="text-xs text-primary">
															copied
														</span>
													</>
												) : (
													<>
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
														>
															<rect
																x="9"
																y="9"
																width="13"
																height="13"
																rx="2"
																ry="2"
															></rect>
															<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
														</svg>
														<span className="text-xs">
															copy
														</span>
													</>
												)}
											</div>
										</div>
									)}
								</CopyButton>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Info;
