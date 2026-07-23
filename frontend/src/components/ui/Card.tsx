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
                "w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6 shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}