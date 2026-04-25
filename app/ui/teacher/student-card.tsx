"use client";

import StudentChart from "./student-chart";
import { Goal, Student } from "@/app/lib/teacher/types";
import { calculateDuration, minutesToTime } from "@/app/lib/practice/utils";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { totalHoursThisWeek } from "@/app/lib/practice/utils";

type Props = {
    student: Student;
    expanded: boolean;
    onToggle: () => void;
    onRemove: (id: string) => void;
    onAssignGoal: (student: Student) => void;
    onEditGoal: (goal: Goal, studentId: string) => void;
    onDeleteGoal: (goalId: string, studentId:string) => void;
    goals?: Goal[];
};

export default function StudentCard({
    student, 
    expanded,
    onToggle,
    onRemove,
    onAssignGoal,
    onEditGoal,
    onDeleteGoal,
    goals,
}: Props) {
    const lastPractice = student.entries[0]
        ? new Date(student.entries[0].date).toLocaleDateString()
        : "No sessions yet.";

    return (
        <div className="bg-thyme-100">

            {/* Card Header */}
            <div className="p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-thyme-500">{student.name}</h3>
                    <p  className="text-sm text-thyme-300">{student.email}</p>
                </div>

                {/* Stats */}
                <div className="text-right text-sm hidden md:block">
                    <p className="text-thyme-400">
                        This week:{" "}
                        <span className="font-medium">
                            {totalHoursThisWeek(student.entries)}
                        </span>
                    </p>
                    <p className="text-thyme-300 text-xs">Last: {lastPractice}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                    <button
                        type="button"
                        onClick={() => onAssignGoal(student)}
                        className="text-xs bg-thyme-100 text-thyme-600 px-3 py-1 rounded-full hover:bg-thyme-200"
                    >
                        <PlusIcon className="w-2 h-2" /> Goal
                    </button>
                    <button
                        type="button"
                        onClick={() => onRemove(student.id)}
                        className="p-1 text-thyme-300 hover:text-red-500"
                        title="Remove Student"
                    >
                        <TrashIcon className="w-4 h-4" /> 
                    </button>
                    <button
                        type="button"
                        onClick={onToggle}
                        className="p-1 text-thyme-300 hover:text-thyme-500"
                    >
                        {expanded
                            ? <ChevronUpIcon className="w-4 h-4" />
                            : <ChevronDownIcon className="w-4 h-4" />
                        }
                    </button>
                </div>
            </div>

            {/* Expanded section */}
            {expanded && (
                <div className="border-t border-thyme-100 p-4 space-y-4">

                    {/* Weekly chart */}
                    <div>
                        <h4 className="text-sm font-medium text-thyme-400 mb-2">
                            Last 7 days
                        </h4>
                        <StudentChart 
                            entries={student.entries}
                            targetMins={goals?.[0]?.targetMins}
                        />
                    </div>

                    {/* Goals list */}
                    {goals && goals.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-thyme-400 mb-2">
                                Assigned goals
                            </h4>
                            <div className="space-y-2">
                                {goals.map(goal => (
                                    <div 
                                        key={goal.id}
                                        className="flex justify-between items-center bg-thyme-100 rounded p-2 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-thyme-500">{goal.title}</p>
                                            {goal.description && (
                                            <p className="text-xs text-thyme-300">{goal.description}</p>
                                            )}
                                        </div>
                                        <span className="text-xs bg-thyme-100 text-thyme-500 px-2 py-1 rounded-full whitespace-nowrap">
                                            {goal.targetMins} min/day
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => onEditGoal(goal, student.id)}
                                            className="text-yellow-500 hover:text-yellow-300"
                                        >
                                            <PencilIcon className="w-2 h-2" /> Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteGoal(goal.id, student.id)}
                                            className="text-red-500 hover:text-red-300"
                                        >
                                            <TrashIcon className="w-2 h-2" /> Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent sessions */}
                    <div>
                        <h4 className="text-sm font-medium text-thyme-400 mb-2">
                            Recent sessions
                        </h4>
                        {student.entries.length === 0 ? (
                            <p className="text-sm text-gray-400">No sessions logged yet.</p>
                        ) : (
                            student.entries.map(entry => (
                                <div
                                    key={entry.id}
                                    className="text-sm border border-thyme-100 rounded p-3 mb-2"
                                >
                                    <div className="flex justify-between">
                                        <span className="font-medium">{entry.instrument}</span>
                                        <span className="text-gray-400">
                                            {calculateDuration(entry.startTime, entry.endTime)}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {new Date(entry.date).toLocaleDateString()} · {minutesToTime(entry.startTime)} → {minutesToTime(entry.endTime)}
                                    </p>
                                    {entry.piece.length > 0 && (
                                        <p className="text-xs mt-1">Piece/Song {entry.piece.join(", ")}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}