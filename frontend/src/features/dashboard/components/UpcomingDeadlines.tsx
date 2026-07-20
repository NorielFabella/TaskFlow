import { CalendarDays } from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import { useTasks } from "../../../hooks/useTasks";
import { useProjects } from "../../../hooks/useProjects";

export default function UpcomingDeadlines() {

    const { tasks } = useTasks();
    const { projects } = useProjects();


    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const upcomingDeadlines = tasks
        .filter((task) => !task.completed)
        .filter((task) => {
            const due = new Date(task.dueDate);
            due.setHours(0, 0, 0, 0);
            return due >= today;
        })
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

        today.setHours(0, 0, 0, 0);

        const deadline = new Date(dueDate);

        deadline.setHours(0, 0, 0, 0);

        const difference =
            Math.round(
                (
                    deadline.getTime() -
                    today.getTime()
                ) /
                (1000 * 60 * 60 * 24)
            );

        if (difference < 0) {

            const overdue = Math.abs(difference);

            return overdue === 1
                ? "Overdue by 1 day"
                : `Overdue by ${overdue} days`;

        }

        if (difference === 0) {
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

                    {upcomingDeadlines.map((task) => {

                        const project = projects.find(
                            (project) =>
                                project.id === task.projectId
                        );

                        return (

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

                                        {project && (
                                            <>
                                                {" "}
                                                • {project.name}
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

                        );

                    })}

                </div>

            ) : (

                <div className="flex flex-1 items-center justify-center py-12 text-sm text-zinc-500">

                    No upcoming deadlines.

                </div>

            )}

        </Card>
    );
}