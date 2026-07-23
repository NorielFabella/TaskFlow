import Modal from "../../../components/ui/Modal";

import type { Project } from "../../../types/project";
import type { Task } from "../../../types/task";

interface CalendarDayModalProps {
    open: boolean;
    date: Date | null;
    tasks: Task[];
    projects: Project[];
    onClose: () => void;
}

export default function CalendarDayModal({
    open,
    date,
    tasks,
    projects,
    onClose,
}: CalendarDayModalProps) {

    return (

        <Modal
            open={open}
            title={
                date
                    ? date.toLocaleDateString(
                          "en-US",
                          {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                          }
                      )
                    : "Tasks"
            }
            onClose={onClose}
        >

            {tasks.length === 0 ? (

                <p className="text-zinc-400">
                    No tasks scheduled.
                </p>

            ) : (

                <div className="space-y-3">

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                        >

                            <h3 className="font-semibold text-white">
                                {task.title}
                            </h3>

                            <p className="mt-1 text-sm text-zinc-400">
                                {task.description}
                            </p>

                            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-zinc-500">

                                <span className="min-w-0 truncate">
                                    {projects.find(
                                        (project) =>
                                            project.id === task.projectId
                                    )?.name ?? "Unknown Project"}
                                </span>

                                <span className="shrink-0">
                                    {task.priority}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </Modal>

    );

}
