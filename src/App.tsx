import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Browse from "./pages/Browse";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import HowToPay from "./pages/HowToPay";
import Info from "./pages/Info";
import Search from "./pages/Search";
import Share from "./pages/Share";
import ShareConfirm from "./pages/ShareConfirm";
import CustomShare from "./pages/CustomShare";
import PageHeader from "./components/PageHeader";

// Declare global window property for TypeScript
declare global {
	interface Window {
		lastBrowseRoute?: string;
	}
}

function App() {
	const location = useLocation();

	// Scroll to top when route changes and store browse routes
	useEffect(() => {
		window.scrollTo({ top: 0 });

		// Store browse routes on window object
		if (
			location.pathname === "/" ||
			location.pathname.startsWith("/browse")
		) {
			window.lastBrowseRoute = location.pathname;
		}
	}, [location.pathname]);

	return (
		<div className="min-h-screen bg-canvas">
			<PageHeader />

			{/* Routes */}
			<Routes>
				<Route path="/" element={<Browse />} />
				<Route path="/browse/:type" element={<Browse />} />
				<Route path="/order" element={<Order />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/how-to-pay" element={<HowToPay />} />
				<Route path="/info" element={<Info />} />
				<Route path="/search" element={<Search />} />
				<Route path="/share" element={<Share />} />
				<Route path="/share/confirm" element={<ShareConfirm />} />
				<Route path="/custom-share" element={<CustomShare />} />
			</Routes>
		</div>
	);
}

export default App;
