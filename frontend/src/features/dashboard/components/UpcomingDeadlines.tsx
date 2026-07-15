import { CalendarDays } from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import { useTasks } from "../../../hooks/useTasks";

export default function UpcomingDeadlines() {

    const { tasks } = useTasks();


    const upcomingDeadlines = tasks
        .filter((task) => !task.completed)
        .filter((task) => task.dueDate)
        .sort(
            (a, b) =>
                new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime()
        )
        .slice(0, 5);


    function getDueLabel(
        dueDate: string
    ) {

        const today = new Date();

        const deadline = new Date(dueDate);

        const difference =
            Math.ceil(
                (
                    deadline.getTime() -
                    today.getTime()
                ) /
                (1000 * 60 * 60 * 24)
            );


        if (difference <= 0) {
            return "Due today";
        }


        if (difference === 1) {
            return "Due tomorrow";
        }


        return `Due in ${difference} days`;

    }


    return (
        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Upcoming Deadlines"
                subtitle="Stay ahead of your upcoming work."
            />


            {upcomingDeadlines.length > 0 ? (

                <div className="space-y-4">

                    {upcomingDeadlines.map((task) => (

                        <div
                            key={task.id}
                            className="
                                flex
                                items-start
                                gap-3
                                rounded-xl
                                border
                                border-zinc-800
                                bg-zinc-950
                                p-4
                                transition-colors
                                hover:border-white
                            "
                        >

                            <div className="rounded-lg bg-zinc-900 p-2">

                                <CalendarDays size={18} />

                            </div>


                            <div className="min-w-0 flex-1">

                                <h3 className="truncate font-medium text-white">

                                    {task.title}

                                </h3>


                                <p className="mt-1 text-sm text-zinc-400">

                                    {getDueLabel(task.dueDate)}

                                    {task.project && (
                                        <>
                                            {" "}
                                            • {task.project}
                                        </>
                                    )}

                                </p>


                                <div className="mt-3">

                                    <Badge
                                        variant={
                                            task.priority === "High"
                                                ? "danger"
                                                : task.priority === "Medium"
                                                ? "warning"
                                                : "default"
                                        }
                                    >
                                        {task.priority} Priority
                                    </Badge>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="flex flex-1 items-center justify-center py-12 text-sm text-zinc-500">

                    No upcoming deadlines.

                </div>

            )}

        </Card>
    );
}