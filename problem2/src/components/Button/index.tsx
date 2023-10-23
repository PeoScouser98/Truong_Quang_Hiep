import classNames from "classnames";
import React, { AllHTMLAttributes, useMemo, useRef } from "react";
import LoadingSpinner from "../LoadingSpinner";

export type TButtonProps = {
	as?: keyof HTMLElementTagNameMap | React.ComponentType<any>;
	size?: "xs" | "sm" | "md" | "lg";
	shape?: "circle" | "square" | "pill";
	loading?: boolean;
	variant: "primary" | "secondary" | "outline" | "ghost" | "info" | "success" | "error";
	icon?: React.ComponentType<any>;
	text?: string;
} & AllHTMLAttributes<HTMLButtonElement | HTMLElement>;

const Button = React.forwardRef<React.Ref<HTMLElement>, TButtonProps>(
	(
		{
			variant,
			size = "md",
			shape,
			disabled = false,
			loading,
			text,
			as: Element = "button", // Polymorphic button has behaviors as other tag
			...props
		},
		ref
	) => {
		const localRef = useRef(null);
		const resolvedRef = ref || localRef;

		const buttonClassNames = useMemo(() => {
			if (disabled) return "btn-disabled";
			return classNames(
				{
					btn: true,
					/* Variant */
					"btn-primary": variant === "primary",
					"btn-secondary": variant === "secondary",
					"btn-outline": variant === "outline",
					"btn-ghost": variant === "ghost",
					"btn-info": variant === "info",
					"btn-success": variant === "success",
					"btn-error": variant === "error",
					/* Shape */
					"btn-square": shape === "square",
					"btn-circle": shape === "circle",
					"btn-pill": shape === "pill",
					/* Size */
					"btn-xs": size === "xs",
					"btn-sm": size === "sm",
					"btn-md": size === "md",
					"btn-lg": size === "lg"
				},
				props.className
			);
		}, [variant, shape, size]);

		return (
			<Element
				className={buttonClassNames}
				ref={resolvedRef}
				disabled={disabled}
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					if (props.onClick) props.onClick(e);
				}}>
				{loading && <LoadingSpinner size='sm' />}
				{props.icon && !loading && (
					<props.icon
						className={classNames("aspect-square", {
							"h-4": !size || size === "xs" || size === "sm",
							"h-6": size === "md" || size === "lg"
						})}
					/>
				)}
				{text || props.children}
			</Element>
		);
	}
);

export default React.memo(Button);
