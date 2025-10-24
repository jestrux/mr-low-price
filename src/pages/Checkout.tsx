import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
	const { cart, formatPrice } = useApp();
	const navigate = useNavigate();
	const [location, setLocation] = useState(() => {
		return sessionStorage.getItem("checkout_location") || "";
	});
	const [phoneNumber, setPhoneNumber] = useState(() => {
		return sessionStorage.getItem("checkout_phone") || "";
	});

	// Save to sessionStorage whenever location or phoneNumber changes
	useEffect(() => {
		sessionStorage.setItem("checkout_location", location);
	}, [location]);

	useEffect(() => {
		sessionStorage.setItem("checkout_phone", phoneNumber);
	}, [phoneNumber]);

	// Group cart items by type
	const groupedByType = cart.reduce((acc, item) => {
		const type = item.phone.type;
		if (!acc[type]) {
			acc[type] = { count: 0, total: 0 };
		}
		acc[type].count += item.quantity;
		acc[type].total += item.phone.price * item.quantity;
		return acc;
	}, {} as Record<string, { count: number; total: number }>);

	const total = cart.reduce(
		(sum, item) => sum + item.phone.price * item.quantity,
		0
	);

	const handleHowToPay = () => {
		navigate("/how-to-pay");
	};

	const handleSendOrder = () => {
		const salutation = "Mambo vipi, naomba niwekee order ya hivi vitu.";

		// Group cart items by type
		const cartByType = cart.reduce((acc, item) => {
			const type = item.phone.type;
			if (!acc[type]) {
				acc[type] = [];
			}
			acc[type].push(item);
			return acc;
		}, {} as Record<string, typeof cart>);

		// Build order message grouped by type
		const orderSections = Object.keys(cartByType)
			.sort()
			.map((type) => {
				const items = cartByType[type];
				// const typeTotal = items.reduce(
				// 	(sum, item) => sum + item.phone.price * item.quantity,
				// 	0
				// );

				const itemsList = items
					.map((item) => {
						const itemTotal = item.phone.price * item.quantity;
						return `*${item.phone.brand}* - ${item.phone.model} (x${
							item.quantity
						}) - ${formatPrice(itemTotal)}`;
					})
					.join("\n");

				return `*${type}*\n${itemsList}\n`;
				// return `*${type}*\n${itemsList}\n_Jumla ${type}: ${formatPrice(typeTotal)}_`;
			})
			.join("\n\n");

		const summary = `\n*Jumla:* ${formatPrice(total)}`;

		let customerInfo = "";
		if (location || phoneNumber) {
			customerInfo = "\n\n*Taarifa za Mteja:*";
			if (location) customerInfo += `\nMahali: ${location}`;
			if (phoneNumber) customerInfo += `\nNamba ya Simu: ${phoneNumber}`;
		}

		const message = `${salutation}\n\n${orderSections}${summary}${customerInfo}`;
		const whatsappNumber = "+255719796574";
		const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
			/[^0-9]/g,
			""
		)}?text=${encodeURIComponent(message)}`;

		window.open(whatsappUrl, "_blank");
	};

	return (
		<div className="pt-6 pb-24 md:pb-32 max-w-4xl mx-auto px-4">
			{/* Receipt-like order summary */}
			<div className="block text-sm font-medium text-foreground mb-0.5 ml-px">
				Bidhaa Ulizoagiza
			</div>
			<div className="bg-background border border-border rounded-lg overflow-hidden">
				<div className="divide-y divide-border">
					{Object.entries(groupedByType).map(([type, data]) => (
						<div key={type} className="flex items-center">
							<div className="flex-1 px-4 py-3 text-left font-medium text-foreground">
								<span className="pr-2">{type}</span>
								<span className="text-sm font-medium px-2 py-1 bg-foreground/10 rounded-full">
									{data.count}
								</span>
							</div>
							<div className="flex-1 px-4 py-3 text-right">
								<div className="flex items-baseline justify-end gap-0.5">
									<span className="text-sm font-normal text-muted-foreground">
										Tsh.
									</span>
									<span className="font-semibold text-foreground">
										{formatPrice(data.total)}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="px-4 pb-3 pt-2 bg-muted border-t border-border">
					<div className="flex items-center justify-between">
						<span className="text-lg font-semibold text-foreground">
							Jumla
						</span>
						<div className="flex items-baseline gap-2">
							<span className="text-sm font-normal text-muted-foreground">
								Tsh.
							</span>
							<span className="text-2xl font-bold text-primary">
								{formatPrice(total)}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Customer information inputs */}
			<div className="mt-6 space-y-4">
				<div>
					<label
						htmlFor="location"
						className="block text-sm font-medium text-foreground mb-0.5 ml-px"
					>
						Mahali
					</label>
					<input
						id="location"
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						placeholder="Weka mahali unakotoka"
						className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-foreground mb-0.5 ml-px"
					>
						Namba ya Simu
					</label>
					<input
						id="phone"
						type="tel"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						placeholder="07XX XXX XXX"
						className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>

			{/* How to pay button */}
			<button
				onClick={handleHowToPay}
				className="w-full mt-6 py-3 px-4 bg-muted border border-border rounded-lg font-medium text-foreground hover:bg-muted/80 transition-colors"
			>
				Jinsi ya Kulipa
			</button>

			{/* Send order button */}
			<button
				onClick={handleSendOrder}
				className="w-full mt-4 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
			>
				Tuma Oda
			</button>
		</div>
	);
}

export default Checkout;
