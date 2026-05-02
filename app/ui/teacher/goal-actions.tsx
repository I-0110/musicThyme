"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import GoalForm from "./goal-form";
import { Student, Goal } from "@/app/lib/teacher/types";

type Props = {
  students: Student[];
  goalTarget: Student | null;
  setGoalTarget: (student: Student | null) => void;
  editingGoal: { goal: Goal; studentId: string } | null;
  setEditingGoal: (goal: { goal: Goal; studentId: string } | null) => void;
  setGoalsByStudent: (fn: (prev: Record<string, Goal[]>) => Record<string, Goal[]>) => void;
  fetchGoalsForStudent: (id: string) => void;
};

export default function GoalActions({
  students,
  goalTarget,
  setGoalTarget,
  editingGoal,
  setEditingGoal,
  setGoalsByStudent,
  fetchGoalsForStudent,
}: Props) {
  const handleSuccess = () => {
    if (!goalTarget) return;
    const targets =
      goalTarget.id === "all" || goalTarget.id === "selected"
        ? students
        : [students.find(s => s.id === goalTarget.id)!].filter(Boolean);

    targets.forEach(s => {
      setGoalsByStudent(prev => {
        const updated = { ...prev };
        delete updated[s.id];
        return updated;
      });
      fetchGoalsForStudent(s.id);
    });

    setGoalTarget(null);
    setEditingGoal(null);
  };

  if (students.length === 0) return null;

  return (
    <div className="space-y-3 mt-4 overflow-hidden">

      {/* Goal buttons */}
      {!goalTarget && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() =>
              setGoalTarget({
                id: "selected",
                name: "Selected Students",
                email: "",
                entries: [],
              } as Student)
            }
            className="flex items-center gap-1 text-sm bg-thyme-500
              text-thyme-100 px-4 py-2 rounded hover:bg-thyme-300"
          >
            <PlusIcon className="w-3 h-3" />
            Goal For Selected Students
          </button>
          <button
            type="button"
            onClick={() =>
              setGoalTarget({
                id: "all",
                name: "All Students",
                email: "",
                entries: [],
              } as Student)
            }
            className="flex items-center gap-1 text-sm bg-thyme-500
              text-thyme-100 px-4 py-2 rounded hover:bg-thyme-300"
          >
            <PlusIcon className="w-3 h-3" />
            Challenge For All Students
          </button>
        </div>
      )}

      {/* Goal form */}
      {goalTarget && (
        <div className="bg-thyme-100 rounded-lg p-4">
          <GoalForm
            students={students}
            editingGoal={editingGoal}
            targetStudentId={goalTarget.id}
            onSuccess={handleSuccess}
            onCancel={() => {
              setGoalTarget(null);
              setEditingGoal(null);
            }}
          />
        </div>
      )}

    </div>
  );
}