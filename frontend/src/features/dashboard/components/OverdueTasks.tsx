import { CalendarX2 } from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import { useProjects } from "../../../hooks/useProjects";
import { useTasks } from "../../../hooks/useTasks";

export default function OverdueTasks() {

    const { tasks } = useTasks();

    const { projects } = useProjects();

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const overdueTasks = tasks

        .filter((task) => !task.completed)

        .filter((task) => {

            const due = new Date(task.dueDate);

            due.setHours(0, 0, 0, 0);

            return due < today;

        })

        .sort(

            (a, b) =>

                new Date(a.dueDate).getTime() -

                new Date(b.dueDate).getTime()

        )

        .slice(0, 5);

    function overdueLabel(

        dueDate: string

    ) {

        const due = new Date(dueDate);

        due.setHours(0, 0, 0, 0);

        const days = Math.abs(

            Math.round(

                (today.getTime() - due.getTime()) /

                (1000 * 60 * 60 * 24)

            )

        );

        return days === 1

            ? "Overdue by 1 day"

            : `Overdue by ${days} days`;

    }

    return (

        <Card className="flex h-full flex-col">

            <SectionHeader

                title="Overdue Tasks"

                subtitle="Tasks that need immediate attention."

            />

            {overdueTasks.length > 0 ? (

                <div className="space-y-4">

                    {overdueTasks.map((task) => {

                        const project = projects.find(

                            (project) =>

                                project.id === task.projectId

                        );

                        return (

                            <div

                                key={task.id}

                                className="rounded-xl border border-red-900 bg-red-950/20 p-4"

                            >

                                <div className="flex items-start gap-3">

                                    <CalendarX2

                                        size={18}

                                        className="text-red-400"

                                    />

                                    <div className="min-w-0 flex-1">

                                        <h3 className="truncate font-medium text-white">

                                            {task.title}

                                        </h3>

                                        <p className="mt-1 text-sm text-red-300">

                                            {overdueLabel(task.dueDate)}

                                            {project && (

                                                <> • {project.name}</>

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

                            </div>

                        );

                    })}

                </div>

            ) : (

                <div className="flex flex-1 items-center justify-center py-12 text-sm text-zinc-500">

                    🎉 No overdue tasks.

                </div>

            )}

        </Card>

    );

}