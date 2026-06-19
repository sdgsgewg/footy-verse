import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    let variantStyles = "";
    if (variant === "default") {
      variantStyles = "bg-primary text-white hover:opacity-90";
    } else if (variant === "outline") {
      variantStyles =
        "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 text-dark";
    } else if (variant === "ghost") {
      variantStyles = "hover:bg-gray-100 dark:hover:bg-gray-800 text-dark";
    }

    let sizeStyles = "";
    if (size === "default") {
      sizeStyles = "h-10 px-4 py-2";
    } else if (size === "sm") {
      sizeStyles = "h-9 rounded-md px-3";
    } else if (size === "lg") {
      sizeStyles = "h-11 rounded-md px-8";
    } else if (size === "icon") {
      sizeStyles = "h-10 w-10";
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
