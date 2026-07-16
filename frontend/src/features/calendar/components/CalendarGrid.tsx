import clsx from "clsx";

import {
    getCalendarDays,
    getTasksForDate,
    isToday,
} from "../../../services/calendar.service";

import type { Task } from "../../../types/task";

interface CalendarGridProps {
    currentDate: Date;
    tasks: Task[];
    onDayClick: (date: Date) => void;
}

const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

export default function CalendarGrid({
    currentDate,
    tasks,
    onDayClick,
}: CalendarGridProps) {

    const days = getCalendarDays(currentDate);

    return (

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

            {/* Week Header */}

            <div className="grid grid-cols-7">

                {weekDays.map((day) => (

                    <div
                        key={day}
                        className="border-b border-zinc-800 bg-zinc-950 py-4 text-center text-sm font-semibold text-zinc-400"
                    >
                        {day}
                    </div>

                ))}

            </div>

            {/* Calendar */}

            <div className="grid grid-cols-7">

                {days.map((day) => {

                    const dayTasks = getTasksForDate(
                        tasks,
                        day.date
                    );

                    return (

                        <button
                            key={day.date.toISOString()}
                            type="button"
                            onClick={() => onDayClick(day.date)}
                            className={clsx(
                                "flex h-32 flex-col border border-zinc-800 p-3 text-left transition-colors hover:bg-zinc-800/40",

                                !day.isCurrentMonth &&
                                    "bg-zinc-950 text-zinc-600"
                            )}
                        >

                            {/* Day Number */}

                            <div
                                className={clsx(
                                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",

                                    isToday(day.date) &&
                                        "bg-white text-black",

                                    !isToday(day.date) &&
                                        day.isCurrentMonth &&
                                        "text-white"
                                )}
                            >
                                {day.dayNumber}
                            </div>

                            {/* Tasks */}

                            <div className="mt-2 flex-1 space-y-1 overflow-hidden">

                                {dayTasks
                                    .slice(0, 2)
                                    .map((task) => (

                                        <div
                                            key={task.id}
                                            className="truncate rounded-md bg-zinc-800 px-2 py-1 text-xs text-white"
                                        >
                                            {task.title}
                                        </div>

                                    ))}

                                {dayTasks.length > 2 && (

                                    <div className="text-xs text-zinc-500">

                                        +{dayTasks.length - 2} more

                                    </div>

                                )}

                            </div>

                        </button>

                    );

                })}

            </div>

        </div>

    );

}