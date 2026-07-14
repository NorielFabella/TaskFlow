import type {
    Task,
    TaskFormData,
} from "../types/task";

export function createTask(
    tasks: Task[],
    newTask: TaskFormData
): Task[] {

    const task: Task = {
        id: Date.now(),
        completed: false,
        ...newTask,
    };

    return [
        task,
        ...tasks,
    ];

}

export function updateTask(
    tasks: Task[],
    id: number,
    updatedTask: TaskFormData
): Task[] {

    return tasks.map((task) =>
        task.id === id
            ? {
                  ...task,
                  ...updatedTask,
              }
            : task
    );

}

export function deleteTask(
    tasks: Task[],
    id: number
): Task[] {

    return tasks.filter(
        (task) => task.id !== id
    );

}

export function toggleTaskCompleted(
    tasks: Task[],
    id: number
): Task[] {

    return tasks.map((task) =>
        task.id === id
            ? {
                  ...task,
                  completed: !task.completed,
              }
            : task
    );

}