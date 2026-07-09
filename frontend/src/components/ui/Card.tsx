import clsx from "clsx";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({
    children,
    className,
    ...props
}: CardProps) {
    return (
        <div
            className={clsx(
                "rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}