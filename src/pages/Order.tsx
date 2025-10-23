import CartList from "../components/CartList";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Order() {
	const { cart, formatPrice } = useApp();
	const navigate = useNavigate();

	const total = cart.reduce(
		(sum, item) => sum + item.phone.price * item.quantity,
		0
	);

	const hasItems = cart.length > 0;

	const handleProceedToCheckout = () => {
		navigate("/checkout");
	};

	return (
		<div className="pb-24 md:pb-32 max-w-4xl mx-auto md:px-4">
			{/* <PriceChecker /> */}

			<div className="pb-12">
				<CartList />
			</div>

			{hasItems && (
				<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
					<div className="max-w-4xl mx-auto">
						<div className="px-4 py-3 flex items-center justify-between">
							<h3 className="text-base font-semibold text-foreground">
								Jumla
							</h3>
							<span className="ml-auto font-normal text-foreground opacity-75 scale-90 inline-block origin-bottom">
								Tsh.
							</span>{" "}
							<p className="text-xl font-bold text-primary">
								{formatPrice(total)}
							</p>
						</div>
						<button
							onClick={handleProceedToCheckout}
							className="w-full py-3 font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
						>
							Kamilisha Oda
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Order;
