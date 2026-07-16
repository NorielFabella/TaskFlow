import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

export default function AboutSection() {

    return (

        <Card>

            <SectionHeader
                title="About"
                subtitle="Information about this application."
            />

            <div className="space-y-4">

                <div>

                    <h2 className="text-lg font-semibold text-white">
                        TaskFlow
                    </h2>

                    <p className="text-sm text-zinc-400">
                        Version 1.0
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-3">

                    {[
                        "React",
                        "TypeScript",
                        "TailwindCSS",
                        "Vite",
                    ].map((tech) => (

                        <div
                            key={tech}
                            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-sm text-zinc-300"
                        >
                            {tech}
                        </div>

                    ))}

                </div>

            </div>

        </Card>

    );

}