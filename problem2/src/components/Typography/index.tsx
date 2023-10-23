import classNames from "classnames";
import React, { AllHTMLAttributes, CSSProperties, PropsWithChildren } from "react";

type TTypographyProps = {
	color?: "base" | "success" | "error" | "warning" | "primary" | "info";
	variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small";
	as?: keyof HTMLElementTagNameMap;
	fontWeight?: "thin" | "light" | "extralight" | "normal" | "medium" | "bold" | "semibold" | "extrabold";
} & Pick<CSSProperties, "textAlign" | "verticalAlign"> &
	AllHTMLAttributes<HTMLElement> &
	PropsWithChildren;

const Typography: React.FC<TTypographyProps> = ({
	fontWeight = "medium",
	textAlign = "left",
	verticalAlign = "middle",
	color = "base",
	variant: Element = "p",
	...props
}) => {
	const className = classNames(
		{
			"font-medium": fontWeight.includes("medium"),
			"font-semibold": fontWeight.includes("semibold"),
			"font-bold": fontWeight.includes("bold"),
			"font-extrabold": fontWeight.includes("extrabold"),
			// text align
			"text-center": textAlign.includes("center"),
			"font-left": textAlign.includes("left"),
			"font-right": textAlign.includes("right"),

			// color
			"text-base-content": color.includes("base"),
			"text-primary": color.includes("primary"),
			"text-secondary": color.includes("secondary"),
			"text-info": color.includes("info"),
			"text-success": color.includes("success"),
			"text-error": color.includes("error"),
			"text-disabled": color.includes("disabled"),
			// size
			"text-6xl sm:text-4xl": Element === "h1",
			"text-5xl sm:text-3xl": Element === "h2",
			"text-4xl sm:text-2xl": Element === "h3",
			"text-3xl sm:text-xl": Element === "h4",
			"text-base": Element === "p",
			"text-xs": Element === "small"
		},
		props.className
	);
	if (props.as) Element = props.as as typeof Element;
	return (
		<Element {...props} style={{ ...props.style, verticalAlign }} className={className}>
			{props.children}
		</Element>
	);
};

Typography.defaultProps = {
	variant: "p"
};

export default Typography;
