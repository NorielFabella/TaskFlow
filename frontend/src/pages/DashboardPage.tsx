import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import StatsGrid from "../features/dashboard/components/StatsGrid";
import RecentProjects from "../features/dashboard/components/RecentProjects";
import UpcomingDeadlines from "../features/dashboard/components/UpcomingDeadlines";
import RecentTasks from "../features/dashboard/components/RecentTasks";
import ActivityFeed from "../features/dashboard/components/ActivityFeed";
import OverdueTasks from "../features/dashboard/components/OverdueTasks";

export default function DashboardPage() {

    return (

        <div className="space-y-8">

            <DashboardHeader />

            <StatsGrid />

            <div className="grid items-stretch gap-6 xl:grid-cols-12">

                {/* Projects */}

                <div className="xl:col-span-8">

                    <RecentProjects />

                </div>

                {/* Upcoming Deadlines */}

                <div className="xl:col-span-4">

                    <UpcomingDeadlines />

                </div>

                {/* Recent Tasks */}

                <div className="xl:col-span-8">

                    <RecentTasks />

                </div>

                {/* Overdue Tasks */}

                <div className="xl:col-span-4">

                    <OverdueTasks />

                </div>

                {/* Activity Feed */}

                <div className="xl:col-span-12">

                    <ActivityFeed />

                </div>

            </div>

        </div>

    );

}