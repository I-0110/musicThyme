"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceLine,
} from "recharts";
import { Entry } from "@/app/lib/practice/types";
import { getLast7Days } from "@/app/lib/teacher/utils";

type Props = {
    entries: Entry[];
    targetMins?: number; 
};

export default function StudentChart({ entries, targetMins }: Props) {
    const data = getLast7Days(entries);
    const hasAnyData = data.some(d => d.minutes > 0);

    if (!hasAnyData) {
        return (
            <p className="text-sm text-red-700 py-4 text-center">
                This student hasn&apos;t practice in the last 7 days!
            </p>
        );
    }

    return(
        <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid 
                strokeDasharray="3 3" vertical={false} stroke="#588157" 
            />
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

                    if (hrs === 0) return [`${rem} min`, "Practiced"];
                    if (rem === 0) return [`${hrs} hr`, "Practiced"];
                    return [`${hrs} hr ${rem} min`, "Practiced"];
                }}
                cursor={{ fill: "#d1d5c3" }}
            />
            {/* Dotted goal line */}
            {targetMins && (
            <ReferenceLine
                y={targetMins}
                stroke="#344e41"
                strokeDasharray="4 4"
                label={{
                value: `Goal: ${targetMins}m`,
                position: "insideTopRight",
                fontSize: 11,
                fill: "#4f7c5a",
                }}
            />
            )}
            <Bar
                dataKey="minutes"
                fill="#4f7c5a"
                radius={[4, 4, 0, 0]}
            />
        </BarChart>
        </ResponsiveContainer>
    )
}