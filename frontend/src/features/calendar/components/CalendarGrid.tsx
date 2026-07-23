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
                        className="border-b border-zinc-800 bg-zinc-950 py-2 text-center text-xs font-semibold text-zinc-400 sm:py-4 sm:text-sm"
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
                                "flex h-20 flex-col border border-zinc-800 p-1.5 text-left transition-colors hover:bg-zinc-800/40 sm:h-32 sm:p-3",

                                !day.isCurrentMonth &&
                                    "bg-zinc-950 text-zinc-600"
                            )}
                        >

                            {/* Day Number */}

                            <div
                                className={clsx(
                                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold sm:h-8 sm:w-8 sm:text-sm",

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

                            <div className="mt-1 flex-1 space-y-1 overflow-hidden sm:mt-2">

                                {dayTasks
                                    .slice(0, 2)
                                    .map((task) => (

                                        <div
                                            key={task.id}
                                            className="hidden truncate rounded-md bg-zinc-800 px-2 py-1 text-xs text-white sm:block"
                                        >
                                            {task.title}
                                        </div>

                                    ))}

                                {dayTasks.length > 0 && (

                                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-white sm:hidden" />

                                )}

                                {dayTasks.length > 2 && (

                                    <div className="hidden text-xs text-zinc-500 sm:block">

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
