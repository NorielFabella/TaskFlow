import type { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
}

export default function SectionHeader({
    title,
    subtitle,
    action,
}: SectionHeaderProps) {
    return (
        <div className="mb-6 flex items-start justify-between gap-4">

            <div>
                <h2 className="text-xl font-semibold text-white">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-1 text-sm text-zinc-400">
                        {subtitle}
                    </p>
                )}
            </div>

            {action}

        </div>
    );
}