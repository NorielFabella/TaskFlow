import PageHeader from "../components/common/PageHeader";

import AppearanceSection from "../features/settings/components/AppearanceSection";
import WorkspaceSection from "../features/settings/components/WorkspaceSection";
import DataSection from "../features/settings/components/DataSection";
import AboutSection from "../features/settings/components/AboutSection";

export default function SettingsPage() {

    return (

        <div className="space-y-8">

            <PageHeader
                title="Settings"
                subtitle="Manage your workspace and application preferences."
            />

            <div className="grid gap-8 xl:grid-cols-2">

                <AppearanceSection />

                <WorkspaceSection />

                <DataSection />

                <AboutSection />

            </div>

        </div>

    );

}