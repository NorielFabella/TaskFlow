import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
}

export default function Button({
    children,
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",

                {
                    "bg-white text-black hover:bg-zinc-200":
                        variant === "primary",

                    "border border-zinc-800 bg-zinc-900 text-white hover:border-white":
                        variant === "secondary",

                    "text-zinc-400 hover:bg-zinc-900 hover:text-white":
                        variant === "ghost",
                },

                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}