import { useTasksContext } from "../features/tasks/context/TasksContext";

export function useTasks() {
    return useTasksContext();
}