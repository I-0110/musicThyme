"use client";

import { useEffect, useState } from "react";
import { Goal } from "@/app/lib/teacher/types";
import { useSession } from "next-auth/react";
import { formatMins } from "@/app/lib/practice/utils";

export default function TeacherGoals() {
    const { data: session } = useSession();
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user) return;

        fetch(`/api/goals/mine`)
            .then(res => res.json())
            .then(data => {
                setGoals(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [session]);

    if (loading) {
        return (
            <p className="text-sm text-thyme-300 animate-pulse">
                Loading your goals...
            </p>
        );
    }

    if (goals.length === 0) {
        return (
            <p className="text-sm text-thyme-300">
                Set a goal with your teacher!
            </p>
        );
    }

    return(
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-thyme-400">Goals from your teacher</h3>
            {goals.map(goal => (
                <div
                key={goal.id}
                className="bg-white border border-thyme-200 rounded-lg p-4"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-thyme-500">{goal.title}</h3>
                        <span className="text-xs bg-thyme-100 text-thyme-500 px-2 py-1 rounded-full">
                        {formatMins(goal.targetMins)}/day
                        </span>
                    </div>
                    {goal.description && (
                        <p className="text-sm text-thyme-300 mt-1">{goal.description}</p>
                    )}
            </div>
            ))}
        </div>
    )
}