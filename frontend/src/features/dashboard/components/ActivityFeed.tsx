import {
    CheckCircle2,
    FolderKanban,
    ListTodo,
    Settings,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import { useActivity } from "../../../hooks/useActivity";


const iconMap = {
    project: FolderKanban,
    task: ListTodo,
    completed: CheckCircle2,
    settings: Settings,
};


export default function ActivityFeed() {

    const {
        activities,
    } = useActivity();


    const recentActivities =
        activities.slice(0, 5);


    return (
        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Activity Feed"
                subtitle="Recent workspace activity."
            />


            {recentActivities.length > 0 ? (

                <div className="space-y-5">

                    {recentActivities.map(
                        (activity, index) => {

                            const Icon =
                                iconMap[
                                    activity.type
                                ];


                            return (

                                <div
                                    key={activity.id}
                                    className="flex gap-4"
                                >

                                    {/* Timeline */}

                                    <div className="flex flex-col items-center">

                                        <div className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-zinc-800
                                            bg-zinc-950
                                            text-zinc-300
                                        ">
                                            <Icon size={18} />
                                        </div>


                                        {index !==
                                            recentActivities.length - 1 && (
                                            <div className="
                                                mt-2
                                                h-full
                                                w-px
                                                bg-zinc-800
                                            " />
                                        )}

                                    </div>



                                    {/* Content */}

                                    <div className="pb-5">

                                        <h3 className="font-medium text-white">
                                            {activity.title}
                                        </h3>


                                        <p className="text-sm text-zinc-400">
                                            {activity.description}
                                        </p>


                                        <p className="mt-1 text-xs text-zinc-500">
                                            {activity.time}
                                        </p>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            ) : (

                <div className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    py-12
                    text-sm
                    text-zinc-500
                ">
                    No recent activity.
                </div>

            )}

        </Card>
    );
}