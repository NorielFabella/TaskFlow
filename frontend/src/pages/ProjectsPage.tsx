import { useState } from "react";

import ProjectsToolbar from "../features/projects/components/ProjectsToolbar";
import ProjectCard from "../features/projects/components/ProjectCard";

import { projects } from "../data/projects";

export default function ProjectsPage() {

    const [search, setSearch] = useState("");


    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">

            <ProjectsToolbar
                search={search}
                onSearchChange={setSearch}
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}

            </div>

        </div>
    );
}