import { useState } from "react";

import TasksToolbar from "../features/tasks/components/TasksToolbar";
import TaskCard from "../features/tasks/components/TaskCard";
import EmptyTasks from "../features/tasks/components/EmptyTasks";
import TaskModal from "../features/tasks/components/TaskModal";

import ConfirmDialog from "../components/ui/ConfirmDialog";

import type {
    Task,
    TaskFormData,
} from "../types/task";

import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";
import PageHeader from "../components/common/PageHeader";

export default function TasksPage() {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [priority, setPriority] = useState("All");

    const [modalOpen, setModalOpen] = useState(false);

    const [editingTask, setEditingTask] =
        useState<Task | undefined>();

    const [deletingTask, setDeletingTask] =
        useState<Task | undefined>();

    const {
        tasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskCompleted,
    } = useTasks();

    const {
        projects,
    } = useProjects();

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            status === "All" ||
            (status === "Completed" && task.completed) ||
            (status === "Pending" && !task.completed);

        const matchesPriority =
            priority === "All" ||
            task.priority === priority;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });

    function handleCreateTask(
        newTask: TaskFormData
    ) {

        createTask(newTask);

        setModalOpen(false);

    }

    function handleToggleComplete(task: Task) {

        toggleTaskCompleted(task.id);

    }

    function handleEditTask(task: Task) {

        setEditingTask(task);

        setModalOpen(true);

    }

    function handleUpdateTask(
        updatedTask: TaskFormData
    ) {

        if (!editingTask) return;

        updateTask(
            editingTask.id,
            updatedTask
        );

        setEditingTask(undefined);
        setModalOpen(false);

    }

    function handleDeleteTask() {

        if (!deletingTask) return;

        deleteTask(
            deletingTask.id
        );

        setDeletingTask(undefined);

    }

    return (
        <div className="space-y-8">

            <PageHeader
                title="Tasks"
                subtitle="Stay organized and keep track of your work."
            >

                <TasksToolbar
                    search={search}
                    status={status}
                    priority={priority}
                    onSearchChange={setSearch}
                    onStatusChange={setStatus}
                    onPriorityChange={setPriority}
                    onCreateTask={() => setModalOpen(true)}
                />

            </PageHeader>

            {filteredTasks.length > 0 ? (

                <div className="space-y-4">

                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEditTask}
                            onDelete={(task) =>
                                setDeletingTask(task)
                            }
                        />
                    ))}

                </div>

            ) : (

                <EmptyTasks />

            )}

            <TaskModal
                open={modalOpen}
                task={editingTask}
                projects={projects}
                title={
                    editingTask
                        ? "Edit Task"
                        : "Create Task"
                }
                submitLabel={
                    editingTask
                        ? "Save Changes"
                        : "Create Task"
                }
                onClose={() => {
                    setModalOpen(false);
                    setEditingTask(undefined);
                }}
                onSubmit={
                    editingTask
                        ? handleUpdateTask
                        : handleCreateTask
                }
            />

            <ConfirmDialog
                open={!!deletingTask}
                title="Delete Task"
                description={
                    deletingTask
                        ? `Are you sure you want to delete "${deletingTask.title}"?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleDeleteTask}
                onCancel={() => setDeletingTask(undefined)}
            />

        </div>
    );
}