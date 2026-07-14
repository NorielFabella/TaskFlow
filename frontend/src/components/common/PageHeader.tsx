import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
}

export default function PageHeader({
    title,
    subtitle,
    children,
}: PageHeaderProps) {
    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-white">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 text-zinc-400">
                        {subtitle}
                    </p>
                )}

            </div>

            {children}

        </div>
    );
}