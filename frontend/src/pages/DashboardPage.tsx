import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import StatsGrid from "../features/dashboard/components/StatsGrid";
import RecentProjects from "../features/dashboard/components/RecentProjects";
import UpcomingDeadlines from "../features/dashboard/components/UpcomingDeadlines";
import RecentTasks from "../features/dashboard/components/RecentTasks";
import ActivityFeed from "../features/dashboard/components/ActivityFeed";

export default function DashboardPage() {
    return (
        <div className="space-y-8">

            <DashboardHeader />

            <StatsGrid />

            <div className="grid items-stretch gap-6 xl:grid-cols-12">

                <div className="xl:col-span-8">
                    <RecentProjects />
                </div>

                <div className="xl:col-span-4">
                    <UpcomingDeadlines />
                </div>

                <div className="xl:col-span-8">
                    <RecentTasks />
                </div>

                <div className="xl:col-span-4">
                    <ActivityFeed />
                </div>

                

                

            </div>

        </div>
    );
}