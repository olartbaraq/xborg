"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-borg-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

    const variants = {
      primary:
        "bg-gradient-to-r from-borg-green to-borg-green-light text-white hover:from-borg-green-light hover:to-borg-green focus:ring-borg-green shadow-lg shadow-borg-green/20",
      secondary:
        "bg-borg-card text-white hover:bg-borg-card-hover border border-borg-border focus:ring-borg-green",
      outline:
        "bg-transparent border-2 border-borg-green text-borg-green hover:bg-borg-green hover:text-white focus:ring-borg-green",
      ghost:
        "bg-transparent text-borg-gray hover:text-white hover:bg-white/5 focus:ring-borg-green",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm gap-1.5",
      md: "h-11 px-6 text-base gap-2",
      lg: "h-14 px-8 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
