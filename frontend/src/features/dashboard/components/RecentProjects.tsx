import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import EmptyProjects from "../../projects/components/EmptyProjects";
import ProjectCard from "../../projects/components/ProjectCard";

import { useProjects } from "../../../hooks/useProjects";
import { useTasks } from "../../../hooks/useTasks";

export default function RecentProjects() {

    const { projects } = useProjects();

    const { tasks } = useTasks();

    const recentProjects = projects.slice(0, 3);

    return (

        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Recent Projects"
                subtitle="Your latest active projects."
            />

            {recentProjects.length > 0 ? (

                <div className="space-y-4">

                    {recentProjects.map((project) => (

                        <ProjectCard
                            key={project.id}
                            project={project}
                            tasks={tasks}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        />

                    ))}

                </div>

            ) : (

                <EmptyProjects />

            )}

        </Card>

    );

}