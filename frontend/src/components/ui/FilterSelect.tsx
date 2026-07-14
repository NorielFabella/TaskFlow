import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

interface FilterSelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function FilterSelect({
    children,
    className,
    ...props
}: FilterSelectProps) {
    return (
        <select
            className={clsx(
                "rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition-colors",
                "hover:border-zinc-700",
                "focus:border-white",
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
}