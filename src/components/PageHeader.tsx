import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";

function PageHeader() {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	// Check if we're on a browse route
	const isBrowseRoute =
		location.pathname === "/" || location.pathname.startsWith("/browse");

	// Check if we're on search route
	const isSearchRoute = location.pathname === "/search";

	// Get page title based on route
	const getPageTitle = () => {
		if (location.pathname === "/order") return "Oda yako";
		if (location.pathname === "/checkout") return "Kamilisha Oda";
		if (location.pathname === "/how-to-pay") return "Jinsi ya Kulipa";
		if (location.pathname === "/info") return "Taarifa";

		return "Mr. Low Price";
	};

	const handleBack = () => {
		if (["/how-to-pay", "/checkout"].includes(location.pathname))
			return navigate(-1);

		navigate(window.lastBrowseRoute || "/browse/Simu");
	};

	// For browse routes, show type navigation
	if (isBrowseRoute) {
		return (
			<>
				{/* Desktop header */}
				<header className="hidden md:block sticky top-0 z-20 bg-background border-b border-border">
					<div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
						<div className="flex items-center gap-6">
							<h1 className="text-3xl font-semibold text-foreground">
								Mr. Low Price
							</h1>

							{/* Desktop pages */}
							<div className="flex gap-6">
								<Link
									to="/browse/Simu"
									className={`text-lg font-medium whitespace-nowrap transition-colors ${
										location.pathname === "/browse/Simu" ||
										location.pathname === "/"
											? "text-primary"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									Simu
								</Link>
								<Link
									to="/browse/Vioo"
									className={`text-lg font-medium whitespace-nowrap transition-colors ${
										location.pathname === "/browse/Vioo"
											? "text-primary"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									Vioo
								</Link>
							</div>
						</div>

						{/* Icons */}
						<div className="flex items-center gap-2">
							{/* Search icon */}
							<Link
								to="/search"
								className="size-9 flex items-center justify-center bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors"
								aria-label="Search"
							>
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
									<circle cx="11" cy="11" r="8"></circle>
									<path d="m21 21-4.35-4.35"></path>
								</svg>
							</Link>

							{/* Info icon */}
							<Link
								to="/info"
								className="size-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
								aria-label="Information"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<line
										x1="12"
										y1="16"
										x2="12"
										y2="12"
									></line>
									<line
										x1="12"
										y1="8"
										x2="12.01"
										y2="8"
									></line>
								</svg>
							</Link>
						</div>
					</div>
				</header>

				{/* Mobile header */}
				<header className="md:hidden bg-background px-4 pt-4">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-semibold text-foreground">
							Mr. Low Price
						</h1>
						<div className="flex items-center gap-2">
							{/* Search icon */}
							<Link
								to="/search"
								className="size-9 flex items-center justify-center bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors"
								aria-label="Search"
							>
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
									<circle cx="11" cy="11" r="8"></circle>
									<path d="m21 21-4.35-4.35"></path>
								</svg>
							</Link>

							{/* Info icon */}
							<Link
								to="/info"
								className="size-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
								aria-label="Information"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<line
										x1="12"
										y1="16"
										x2="12"
										y2="12"
									></line>
									<line
										x1="12"
										y1="8"
										x2="12.01"
										y2="8"
									></line>
								</svg>
							</Link>
						</div>
					</div>
				</header>

				{/* Mobile pages */}
				<div className="md:hidden sticky top-0 bg-background border-b border-border px-4 py-4 z-20 flex gap-6 overflow-x-auto">
					<Link
						to="/browse/Simu"
						className={`text-lg font-medium whitespace-nowrap transition-colors ${
							location.pathname === "/browse/Simu" ||
							location.pathname === "/"
								? "text-primary"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						Simu
					</Link>
					<Link
						to="/browse/Vioo"
						className={`text-lg font-medium whitespace-nowrap transition-colors ${
							location.pathname === "/browse/Vioo"
								? "text-primary"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						Vioo
					</Link>
				</div>
			</>
		);
	}

	// For search route, show back button with search input
	if (isSearchRoute) {
		const searchQuery = searchParams.get("q") || "";

		const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			if (value) {
				setSearchParams({ q: value });
			} else {
				setSearchParams({});
			}
		};

		return (
			<header className="sticky top-0 z-20 bg-background border-b border-border">
				<div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
					<button
						onClick={handleBack}
						className="size-9 -ml-2 flex items-center justify-center bg-muted rounded-full transition-colors flex-shrink-0"
						aria-label="Go back"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="size-7"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
					</button>
					<input
						id="headerSearchInput"
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Tafuta bidhaa..."
						className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
						autoFocus
					/>
				</div>
			</header>
		);
	}

	// For other routes, show back button with page title
	const pageTitle = getPageTitle();

	return (
		<header className="sticky top-0 z-20 bg-background border-b border-border">
			<div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
				<button
					onClick={handleBack}
					className="size-9 -ml-2 flex items-center justify-center bg-muted rounded-full transition-colors"
					aria-label="Go back"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="size-7"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<h1 className="text-xl md:text-2xl font-semibold text-foreground">
					{pageTitle}
				</h1>
			</div>
		</header>
	);
}

export default PageHeader;
