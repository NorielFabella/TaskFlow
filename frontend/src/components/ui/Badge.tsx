import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info";
}

export default function Badge({
    children,
    variant = "default",
    className,
    ...props
}: BadgeProps) {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",

                {
                    "bg-zinc-800 text-zinc-200": variant === "default",

                    "bg-emerald-500/15 text-emerald-400":
                        variant === "success",

                    "bg-amber-500/15 text-amber-400":
                        variant === "warning",

                    "bg-red-500/15 text-red-400":
                        variant === "danger",

                    "bg-sky-500/15 text-sky-400":
                        variant === "info",
                },

                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}