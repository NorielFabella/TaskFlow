import { CalendarDays } from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import { deadlines } from "../../../data/deadlines";

export default function UpcomingDeadlines() {
    return (
        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Upcoming Deadlines"
                subtitle="Stay ahead of your upcoming work."
            />

            <div className="space-y-4">

                {deadlines.map((deadline) => (

                    <div
                        key={deadline.id}
                        className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-white"
                    >

                        <div className="rounded-lg bg-zinc-900 p-2">
                            <CalendarDays size={18} />
                        </div>

                        <div className="min-w-0 flex-1">

                            <h3 className="truncate font-medium text-white">
                                {deadline.title}
                            </h3>

                            <p className="mt-1 text-sm text-zinc-400">
                                Due {deadline.dueDate} in {deadline.project}
                            </p>

                            <div className="mt-3">

                                {deadline.priority === "High" && (
                                    <Badge variant="danger">
                                        High Priority
                                    </Badge>
                                )}

                                {deadline.priority === "Medium" && (
                                    <Badge variant="warning">
                                        Medium Priority
                                    </Badge>
                                )}

                                {deadline.priority === "Low" && (
                                    <Badge>
                                        Low Priority
                                    </Badge>
                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </Card>
    );
}