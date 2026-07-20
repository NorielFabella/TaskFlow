import { useEffect, useState } from "react";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import type { Project } from "../../../types/project";


import type {
    Task,
    TaskFormData,
} from "../../../types/task";
import FilterSelect from "../../../components/ui/FilterSelect";

interface TaskModalProps {
    open: boolean;
    onClose: () => void;

    onSubmit: (task: TaskFormData) => void;

    task?: Task;

    projects: Project[];

    title?: string;
    submitLabel?: string;
}

export default function TaskModal({
    open,
    onClose,
    onSubmit,
    task,
    projects,
    title = "Create Task",
    submitLabel = "Create Task",
}: TaskModalProps) {

    const [titleValue, setTitleValue] = useState("");
    const [description, setDescription] = useState("");
    const [projectId, setProjectId] = useState(0);
    const [priority, setPriority] =
        useState<"Low" | "Medium" | "High">("Medium");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {

        if (task) {
            setTitleValue(task.title);
            setDescription(task.description);
            setProjectId(task.projectId);
            setPriority(task.priority);
            setDueDate(task.dueDate);
        } else {
            setTitleValue("");
            setDescription("");
            setProjectId(0);
            setPriority("Medium");
            setDueDate("");
        }

    }, [task, open]);

    function handleSubmit() {

        if (!titleValue.trim()) return;

        onSubmit({
            title: titleValue,
            description,
            projectId,
            priority,
            dueDate,
        });

    }

    return (
        <Modal
            open={open}
            title={title}
            onClose={onClose}
        >
            <div className="space-y-5">

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Title
                    </label>

                    <Input
                        value={titleValue}
                        placeholder="Task title..."
                        onChange={(e) =>
                            setTitleValue(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Description
                    </label>

                    <Input
                        value={description}
                        placeholder="Description..."
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Project
                    </label>

                    <FilterSelect
                        value={projectId.toString()}
                        onChange={(e) =>
                            setProjectId(Number(e.target.value))
                        }
                    >
                        <option value="">
                            Select Project
                        </option>

                        {projects.map((projectItem) => (
                            <option
                                key={projectItem.id}
                                value={projectItem.id}
                            >
                                {projectItem.name}
                            </option>
                        ))}
                    </FilterSelect>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Priority
                    </label>

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(
                                e.target.value as
                                    "Low" |
                                    "Medium" |
                                    "High"
                            )
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white outline-none focus:border-white"
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Due Date
                    </label>

                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                    >
                        {submitLabel}
                    </Button>

                </div>

            </div>
        </Modal>
    );
}