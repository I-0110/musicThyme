"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { Entry } from "@/app/lib/practice/types";
import { getChartData } from "@/app/lib/practice/utils";

type Props = {
    entries: Entry[];
}

export default function PracticeChart({ entries }: Props) {
    const data = getChartData(entries);

    if (data.length === 0) {
        return (
            <p className="text-thyme-500 text-sm">
                No data yet - log a practice session to see your progress!
            </p>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top:10, right: 10, left:-10, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#588157" />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#344e41" }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis 
                    tickFormatter={(value) => {
                        const mins = Number(value) || 0;

                        if (mins < 60) return `${mins}m`;

                        const hours = mins / 60;

                        // Clean numbers like 1h instead of 1.0h
                        return Number.isInteger(hours)
                            ? `${hours}h`
                            : `${hours.toFixed(1)}h`
                    }}
                    tick={{ fontSize: 12 , fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    formatter={(value) => {
                    const mins = Number(value) || 0;

                    const hrs = Math.floor(mins / 60);
                    const rem = mins % 60;

                    if (hrs === 0) return [`${rem} min`, "Practice time"];
                    if (rem === 0) return [`${hrs} hr`, "Practice time"];
                    return [`${hrs} hr ${rem} min`, "Practice time"];
                }}
                cursor={{ fill: "#d1d5c3" }}
                />
                <Bar
                    dataKey="minutes"
                    fill="#4f7c5a"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}