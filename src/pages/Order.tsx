import PriceChecker from "../components/PriceChecker";
import CartList from "../components/CartList";
import AddToCartButton from "../components/AddToCartButton";
import { useApp } from "../context/AppContext";

function Order() {
	const { cart, formatPrice } = useApp();

	const total = cart.reduce(
		(sum, item) => sum + item.phone.price * item.quantity,
		0
	);

	const hasItems = cart.length > 0;

	const handleSendOrder = () => {
		const salutation = "Mambo vipi, naomba niwekee order ya hivi vitu.";
		const orderItems = cart
			.map((item) => {
				const itemTotal = item.phone.price * item.quantity;
				return `*${item.phone.brand}* - ${item.phone.model} (x${
					item.quantity
				}) - ${formatPrice(itemTotal)}`;
			})
			.join("\n");
		const summary = `\n*Jumla:* ${formatPrice(total)}`;

		const message = `${salutation}\n\n${orderItems}\n\n${summary}`;
		const phoneNumber = "+255719796574";
		const whatsappUrl = `https://wa.me/${phoneNumber.replace(
			/[^0-9]/g,
			""
		)}?text=${encodeURIComponent(message)}`;

		window.open(whatsappUrl, "_blank");
	};

	return (
		<div className="pb-24 md:pb-32 max-w-4xl mx-auto md:px-4">
			<PriceChecker />
			<div className="px-4 md:px-0 pb-4">
				<AddToCartButton />
			</div>
			<div className="pb-12">
				<CartList />
			</div>

			{hasItems && (
				<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
					<div className="max-w-4xl mx-auto px-4 py-4">
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-lg font-semibold text-foreground">
								Jumla
							</h3>
							<p className="text-2xl font-bold text-primary">
								{formatPrice(total)}
							</p>
						</div>
						<button
							onClick={handleSendOrder}
							className="w-full py-3 font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
						>
							Tuma Mzigo
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Order;
