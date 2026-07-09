import type { ReactNode } from "react";
import Card from "./Card";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    badge?: ReactNode;
}

export default function StatCard({
    title,
    value,
    icon,
    badge,
}: StatCardProps) {
    return (
        <Card className="flex items-start justify-between">
            <div className="space-y-3">
                <p className="text-sm text-zinc-400">
                    {title}
                </p>

                <h2 className="text-3xl font-bold text-white">
                    {value}
                </h2>

                {badge}
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-300">
                {icon}
            </div>
        </Card>
    );
}