"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTeacher } from "@/app/lib/teacher/useTeacher";
import { Student, Goal } from "../lib/teacher/types";
import Nav from "@/app/ui/nav";
import StudentList from "../ui/teacher/student-list";
import TeacherSummary from "@/app/ui/teacher/teacher-summary";
import AddStudentForm from "@/app/ui/teacher/student-form";
import GoalActions from "../ui/teacher/goal-actions";

export default function TeacherPage() {
  const { data: session, status } = useSession();
  const [goalTarget, setGoalTarget] = useState<Student | null>(null);
  const [editingGoal, setEditingGoal] = useState<{
    goal: Goal;
    studentId: string;
  } | null>(null);
  const router = useRouter();
  const {
    students, loading, error, goalsByStudent,
    setGoalsByStudent, addStudent, removeStudent,
    fetchGoalsForStudent, deleteGoal,
  } = useTeacher();

  if (status === "loading") return null;
  if (
    session?.user?.role !== "TEACHER" &&
    session?.user?.role !== "ADMIN"
  ) {
    router.push("/practice");
    return null;
  }

  const totalGoals = Object.values(goalsByStudent)
    .reduce((sum, goals) => sum + goals.length, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 p-6">

        <TeacherSummary students={students} totalGoals={totalGoals} />

        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT */}
          <div className="md:w-1/3 space-y-4">
            <div className="isolate">
              <AddStudentForm onAdd={addStudent} />
            </div>
            <div className="isolate">
              <GoalActions
                students={students}
                goalTarget={goalTarget}
                setGoalTarget={setGoalTarget}
                editingGoal={editingGoal}
                setEditingGoal={setEditingGoal}
                setGoalsByStudent={setGoalsByStudent}
                fetchGoalsForStudent={fetchGoalsForStudent}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:w-2/3 space-y-4 p-6 bg-thyme-100 rounded-lg relative">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-thyme-500">My students</h2>
            </div>
            <StudentList
              students={students}
              loading={loading}
              error={error}
              goalsByStudent={goalsByStudent}
              fetchGoalsForStudent={fetchGoalsForStudent}
              removeStudent={removeStudent}
              deleteGoal={deleteGoal}
              onAssignGoal={s => {
                setGoalTarget(s);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onEditGoal={(goal, studentId, student) => {
                setGoalTarget(student);
                setEditingGoal({ goal, studentId });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}