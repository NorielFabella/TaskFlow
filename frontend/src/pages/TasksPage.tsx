import { useMemo, useState } from "react";

import TasksToolbar from "../features/tasks/components/TasksToolbar";
import TaskCard from "../features/tasks/components/TaskCard";
import EmptyTasks from "../features/tasks/components/EmptyTasks";
import TaskModal from "../features/tasks/components/TaskModal";

import ConfirmDialog from "../components/ui/ConfirmDialog";
import PageHeader from "../components/common/PageHeader";

import { toast } from "sonner";

import type {
    Task,
    TaskFormData,
} from "../types/task";

import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";


type TaskStatusFilter =
    | "All"
    | "Completed"
    | "Pending";


type PriorityFilter =
    | "All"
    | "High"
    | "Medium"
    | "Low";



export default function TasksPage() {

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



    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState<TaskStatusFilter>("All");

    const [priority, setPriority] =
        useState<PriorityFilter>("All");



    const [modalOpen, setModalOpen] =
        useState(false);


    const [editingTask, setEditingTask] =
        useState<Task | undefined>();


    const [deletingTask, setDeletingTask] =
        useState<Task | undefined>();



    const completedTasks =
        tasks.filter(
            (task) =>
                task.completed
        ).length;



    const filteredTasks = useMemo(() => {

        return tasks.filter((task) => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchesStatus =
                status === "All" ||
                (
                    status === "Completed" &&
                    task.completed
                ) ||
                (
                    status === "Pending" &&
                    !task.completed
                );


            const matchesPriority =
                priority === "All" ||
                task.priority === priority;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );

        });

    }, [
        tasks,
        search,
        status,
        priority,
    ]);



    function openCreateModal() {

        setEditingTask(undefined);

        setModalOpen(true);

    }



    function handleCreateTask(
        data: TaskFormData
    ) {

        createTask(data);

        toast.success(
            `"${data.title}" created.`
        );

        setModalOpen(false);

    }



    function handleToggleComplete(
        task: Task
    ) {

        toggleTaskCompleted(
            task.id
        );


        toast.success(
            task.completed
                ? `"${task.title}" marked as pending.`
                : `"${task.title}" completed.`
        );

    }



    function handleEditTask(
        task: Task
    ) {

        setEditingTask(task);

        setModalOpen(true);

    }



    function handleUpdateTask(
        data: TaskFormData
    ) {

        if (!editingTask) {
            return;
        }


        updateTask(
            editingTask.id,
            data
        );


        toast.success(
            `"${data.title}" updated.`
        );


        setEditingTask(undefined);

        setModalOpen(false);

    }



    function handleDeleteTask() {

        if (!deletingTask) {
            return;
        }


        deleteTask(
            deletingTask.id
        );


        toast.success(
            `"${deletingTask.title}" deleted.`
        );


        setDeletingTask(undefined);

    }



    function closeModal() {

        setModalOpen(false);

        setEditingTask(undefined);

    }



    return (

        <div className="space-y-8">


            <PageHeader

                title="Tasks"

                subtitle={
                    `${tasks.length} tasks • ${completedTasks} completed`
                }

            >

                <TasksToolbar

                    search={search}

                    status={status}

                    priority={priority}

                    onSearchChange={setSearch}

                    onStatusChange={setStatus}

                    onPriorityChange={setPriority}

                    onCreateTask={openCreateModal}

                />

            </PageHeader>



            {filteredTasks.length > 0 ? (

                <div className="space-y-4">

                    {filteredTasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            projects={projects}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEditTask}
                            onDelete={(task) => setDeletingTask(task)}
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

                onClose={closeModal}

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

                onCancel={() =>
                    setDeletingTask(undefined)
                }

            />


        </div>

    );

}