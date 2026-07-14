import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
    default:
        "bg-zinc-800 text-zinc-200",

    success:
        "bg-emerald-500/15 text-emerald-400",

    warning:
        "bg-amber-500/15 text-amber-400",

    danger:
        "bg-red-500/15 text-red-400",

    info:
        "bg-sky-500/15 text-sky-400",
};

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
                badgeVariants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}