import { useApp } from "../context/AppContext";

function AddToCartButton() {
	const { priceChecker, addToCart } = useApp();
	const { selectedPhone } = priceChecker;

	const handleClick = () => {
		if (selectedPhone) {
			addToCart(selectedPhone);
		}
	};

	if (!selectedPhone) {
		return null;
	}

	return (
		<button
			onClick={handleClick}
			className="w-full py-3 font-medium text-primary border-border hover:bg-muted/30 transition-colors"
		>
			Ongeza kwenye Mzigo
		</button>
	);
}

export default AddToCartButton;
