import CopyButton from "../components/CopyButton";
import { paymentMethods } from "../data/paymentMethods";

function HowToPay() {
	return (
		<div className="pb-24 md:pb-32 max-w-4xl mx-auto px-4">
			<div className="mt-6">
				<p className="text-lg text-foreground opacity-70">
					Chagua njia yoyote kati ya hizi hapa chini kulipa oda yako
				</p>
			</div>

			<div className="mt-6 grid gap-6 md:grid-cols-2">
				{paymentMethods.map((method, index) => (
					<div
						key={index}
						className="bg-background border border-border rounded-lg overflow-hidden"
					>
						{/* Header with logo */}
						<div className="px-4 py-2 bg-muted border-b border-border">
							<div className="flex items-center gap-3">
								{method.logo === "vodacom" && (
									<div className="size-12 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">
										M
									</div>
								)}
								{["tigo", "crdb", "nmb"].includes(
									method.logo
								) && (
									<img
										className="h-10"
										src={`/img/payment-options/${method.logo}.png`}
										alt=""
									/>
								)}
								{/* {method.logo === "tigo" && (
									<div className="size-12 bg-blue-700 rounded flex items-center justify-center text-white font-bold text-sm">
										T
									</div>
								)}
								{method.logo === "nmb" && (
									<div className="size-12 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">
										NMB
									</div>
								)}
								{method.logo === "crdb" && (
									<div className="size-12 bg-green-700 rounded flex items-center justify-center text-white font-bold text-xs">
										CRDB
									</div>
								)} */}
								<h3 className="text-lg font-semibold text-foreground">
									{method.title}
								</h3>
							</div>
						</div>

						{/* Content */}
						<div className="px-4 py-4">
							<CopyButton text={method.account.number}>
								{(copied) => (
									<div className="flex items-center justify-between gap-3 group">
										<div className="space-y-3 flex-1">
											<div>
												<div className="text-sm font-medium text-muted-foreground mb-1">
													Namba
												</div>
												<div className="text-base font-semibold text-foreground font-mono">
													{method.account.number}
												</div>
											</div>

											<div>
												<div className="text-sm font-medium text-muted-foreground mb-1">
													Jina
												</div>
												<div className="text-base font-semibold text-foreground">
													{method.account.name}
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
													<span className="text-xs">copy</span>
												</>
											)}
										</div>
									</div>
								)}
							</CopyButton>
						</div>
					</div>
				))}
			</div>

			{/* <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
				<p className="text-sm text-foreground/80">
					<strong>Kumbuka:</strong> Baada ya kulipa, tuma screenshot
					ya malipo pamoja na oda yako kupitia WhatsApp ili
					tuhakikishe malipo yako.
				</p>
			</div> */}
		</div>
	);
}

export default HowToPay;
