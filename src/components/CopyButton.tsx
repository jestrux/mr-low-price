import { useRef, useState, ReactNode } from "react";

interface CopyButtonProps {
	text: string;
	size?: "sm" | "lg";
	children?: ReactNode | ((copied: boolean) => ReactNode);
}

function CopyButton({ text, size = "sm", children }: CopyButtonProps) {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleCopy = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);

			timeoutRef.current = setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	// If children is provided, use custom render
	if (children) {
		return (
			<button
				onClick={handleCopy}
				className="transition-colors w-full text-left"
			>
				{typeof children === "function" ? children(copied) : children}
			</button>
		);
	}

	// Default render with icon and text
	const iconSize = size === "lg" ? 16 : 12;
	const textSize = size === "lg" ? "text-sm" : "text-xs";
	const width = size === "lg" ? "w-20" : "w-16";

	return (
		<button
			onClick={handleCopy}
			className={`ml-2 ${width} ${textSize} inline-flex items-center gap-1 transition-colors ${
				copied
					? "text-primary"
					: "text-muted-foreground hover:text-foreground"
			}`}
		>
			{copied ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={iconSize}
					height={iconSize}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={iconSize}
					height={iconSize}
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
			)}
			{copied ? "copied" : "copy"}
		</button>
	);
}

export default CopyButton;
