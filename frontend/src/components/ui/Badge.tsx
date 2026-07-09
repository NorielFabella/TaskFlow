import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
    children,
    padding = "md",
    className,
    ...props
}: CardProps) {
    return (
        <div
            className={clsx(
                "rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm transition-colors duration-200",

                {
                    "p-0": padding === "none",
                    "p-4": padding === "sm",
                    "p-6": padding === "md",
                    "p-8": padding === "lg",
                },

                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}