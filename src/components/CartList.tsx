import { useMemo } from "react";
import { useApp } from "../context/AppContext";

function CartList() {
	const { cart, formatPrice, updateCartQuantity } = useApp();

	const handleQuantityChange = (
		item: (typeof cart)[0],
		newQuantity: number
	) => {
		updateCartQuantity(item.phone, newQuantity);
	};

	const handleIncrement = (item: (typeof cart)[0]) => {
		updateCartQuantity(item.phone, item.quantity + 1);
	};

	const handleDecrement = (item: (typeof cart)[0]) => {
		if (item.quantity > 1) {
			updateCartQuantity(item.phone, item.quantity - 1);
		} else {
			updateCartQuantity(item.phone, 0);
		}
	};

	// Group cart items by type
	const cartByType = useMemo(() => {
		const groups: { [key: string]: typeof cart } = {};
		cart.forEach((item) => {
			const type = item.phone.type;
			if (!groups[type]) {
				groups[type] = [];
			}
			groups[type].push(item);
		});
		return groups;
	}, [cart]);

	const typeOrder = Object.keys(cartByType).sort();

	if (cart.length === 0) return null;

	return (
		<div className="max-w-4xl mx-auto">
			{/* Cart Items grouped by type */}
			{typeOrder.map((type) => (
				<div key={type}>
					{/* Type heading (not section title) */}
					{/* <div className="px-4 pt-4 pb-2">
						<h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-widest">
							{type}
						</h3>
					</div> */}
					<div className="px-4 py-3 bg-muted border-b border-border">
						<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
							{type}
						</h3>
					</div>
					<div>
						{cartByType[type].map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between px-4 py-4 border-b border-border"
							>
								<div className="flex-1 min-w-0">
									<h3 className="text-base font-medium text-card-foreground">
										{item.phone.model}
									</h3>
									<p className="text-sm text-muted-foreground">
										{item.phone.brand}
									</p>
								</div>
								<div className="flex items-center gap-3 ml-4">
									<div className="flex items-center gap-2 bg-muted rounded-lg">
										<button
											onClick={() =>
												handleDecrement(item)
											}
											className="px-3 py-1 text-foreground hover:bg-muted/50 transition-colors"
										>
											-
										</button>
										<input
											type="number"
											value={item.quantity}
											onChange={(e) =>
												handleQuantityChange(
													item,
													parseInt(e.target.value) ||
														0
												)
											}
											className="w-12 text-center bg-transparent text-foreground focus:outline-none"
											min="0"
										/>
										<button
											onClick={() =>
												handleIncrement(item)
											}
											className="px-3 py-1 text-foreground hover:bg-muted/50 transition-colors"
										>
											+
										</button>
									</div>
									<div className="text-right w-24">
										<p className="text-lg font-semibold text-card-foreground">
											{formatPrice(
												item.phone.price * item.quantity
											)}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default CartList;
