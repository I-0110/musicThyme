"use client";

import { Entry } from "@/app/lib/practice/types";
import { getTotalMinsThisWeek, formatMins, getCurrentStreak } from "@/app/lib/practice/utils";

type Props = {
  entries: Entry[];
};

export default function PracticeSummary({ entries }: Props) {
    const totalMins = getTotalMinsThisWeek(entries);
    const totalSessions = entries.length;
    const streak = getCurrentStreak(entries);

    const stats = [
        {
            label: "This week",
            value: formatMins(totalMins),
        },
        {
            label: "Total sessions",
            value: totalSessions.toString(),
        },
        {
            label: "Day streak",
            value: streak === 0 ? "-" : `${streak}!`,
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map(stat => (
                <div
                key={stat.label}
                className="bg-thyme-100 rounded-lg p-4 text-center"
                >
                <p className="text-xs text-thyme-300 mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-thyme-500">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}
    
   