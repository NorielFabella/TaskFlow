import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";
import Badge from "../../../components/ui/Badge";

export default function AppearanceSection() {
    return (

        <Card>

            <SectionHeader
                title="Appearance"
                subtitle="Customize how TaskFlow looks."
            />

            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                <div>

                    <h3 className="font-medium text-white">
                        Dark Theme
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                        Light mode support is coming soon.
                    </p>

                </div>

                <Badge variant="info">
                    Coming Soon
                </Badge>

            </div>

        </Card>

    );
}