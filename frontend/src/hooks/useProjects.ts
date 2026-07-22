import { useProjectsContext } from "../features/projects/context/ProjectsContext";

export function useProjects() {
    return useProjectsContext();
}