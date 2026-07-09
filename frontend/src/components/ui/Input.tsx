import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
    className,
    ...props
}: InputProps) {
    return (
        <input
            className={clsx(
                "w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 transition-all duration-200",
                "focus:border-white focus:outline-none focus:ring-2 focus:ring-white/10",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
}