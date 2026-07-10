import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import ProjectCard from "../../projects/components/ProjectCard";

import { projects } from "../../../data/projects";

export default function RecentProjects() {
    return (
        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Recent Projects"
                subtitle="Your latest active projects."
            />

            <div className="space-y-4">

                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}

            </div>

        </Card>
    );
}