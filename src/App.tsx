import { Routes, Route, Link, useLocation } from "react-router-dom";
import Browse from "./pages/Browse";
import Order from "./pages/Order";

function App() {
	const location = useLocation();

	return (
		<div className="min-h-screen bg-canvas">
			{/* Mobile header */}
			<header className="md:hidden bg-background px-4 pt-4">
				<h1 className="text-2xl font-semibold text-foreground">
					Mr. Low Price
				</h1>
			</header>

			{/* Desktop sticky header */}
			<header className="hidden md:block sticky top-0 z-20 bg-background border-b border-border">
				<div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
					<h1 className="text-3xl font-semibold text-foreground">
						Mr. Low Price
					</h1>

					{/* Desktop pages */}
					<div className="flex gap-6">
						<Link
							to="/"
							className={`text-lg font-medium whitespace-nowrap transition-colors ${
								location.pathname === "/"
									? "text-primary"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							Bidhaa Zilizopo
						</Link>
						<Link
							to="/order"
							className={`text-lg font-medium whitespace-nowrap transition-colors ${
								location.pathname === "/order"
									? "text-primary"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							Angalia Mzigo
						</Link>
					</div>
				</div>
			</header>

			{/* Mobile pages */}
			<div className="md:hidden sticky top-0 bg-background border-b border-border px-4 py-4 z-20 flex gap-6 overflow-x-auto">
				<Link
					to="/"
					className={`text-lg font-medium whitespace-nowrap transition-colors ${
						location.pathname === "/"
							? "text-primary"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					Bidhaa Zilizopo
				</Link>
				<Link
					to="/order"
					className={`text-lg font-medium whitespace-nowrap transition-colors ${
						location.pathname === "/order"
							? "text-primary"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					Angalia Mzigo
				</Link>
			</div>

			{/* Routes */}
			<Routes>
				<Route path="/" element={<Browse />} />
				<Route path="/order" element={<Order />} />
			</Routes>
		</div>
	);
}

export default App;
