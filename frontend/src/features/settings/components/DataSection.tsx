import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";
import Badge from "../../../components/ui/Badge";

export default function DataSection() {

    return (

        <Card>

            <SectionHeader
                title="Data"
                subtitle="Import or export your workspace."
            />

            <div className="space-y-4">

                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                    <div>

                        <h3 className="font-medium text-white">
                            Export Data
                        </h3>

                        <p className="text-sm text-zinc-400">
                            Download all projects and tasks.
                        </p>

                    </div>

                    <Badge variant="info">
                        Coming Soon
                    </Badge>

                </div>

                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                    <div>

                        <h3 className="font-medium text-white">
                            Import Data
                        </h3>

                        <p className="text-sm text-zinc-400">
                            Restore a previously exported workspace.
                        </p>

                    </div>

                    <Badge variant="info">
                        Coming Soon
                    </Badge>

                </div>

            </div>

        </Card>

    );

}