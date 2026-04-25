"use client";

import { useState } from "react";
import { Student, GoalFormData, Goal } from "@/app/lib/teacher/types";

type Props = {
  students: Student[];
  editingGoal?: { goal: Goal; studentId: string } | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function GoalForm({  
  students, 
  editingGoal,
  onSuccess, 
  onCancel 
}: Props) {
  const [form, setForm] = useState<GoalFormData>({
    studentIds: editingGoal ? [editingGoal.studentId] : [],
    title: editingGoal?.goal.title ?? "",
    description: editingGoal?.goal.description ?? null,
    targetMins: editingGoal?.goal.targetMins ?? 30,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleStudent = (id: string) => {
    setForm(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(id)
        ? prev.studentIds.filter(s => s !== id)
        : [...prev.studentIds, id],
    }));
  };

  const selectAll = () => {
    setForm(prev => ({
      ...prev,
      studentIds: students.map(s => s.id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.studentIds.length === 0) {
      setError("Please select at least one student.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (editingGoal) {
        await fetch(`/api/goals/${editingGoal.goal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            targetMins: form.targetMins,
          }),
        });
      } else {
        // Create new goal(s)
        const { studentIds, ...rest } = form;
        await fetch("/api/goals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            studentIds.length === 1
              ? { studentId: studentIds[0], ...rest }
              : { studentIds, ...rest }
          ),
        });
      }
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3 p-2">
      <h1 className="mb-3 text-xl font-bold text-thyme-400">
        {editingGoal ? "Edit Goal" : "Assign New Goal"}
      </h1>

      {/* Student selector */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-thyme-400">Select Students</label>
          <button
            type="button"
            onClick={selectAll}
            className="bg-thyme-400 text-xs text-white px-4 py-2 rounded"
          >
            Select All
          </button>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto border border-thyme-300 rounded p-2">
          {students.map(student => (
            <label key={student.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.studentIds.includes(student.id)}
                onChange={() => toggleStudent(student.id)}
                className="text-thyme-400"
              />
              <span className="text-sm">{student.name}</span>
              <span className="text-xs text-thyme-300">{student.email}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Goal Title */}
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="peer w-full border border-gray-300 rounded p-3 pt-5 focus:outline-none focus:border-thyme-500"
          required
        />
        <label className="absolute left-3 top-1 text-xs text-thyme-400 pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-1 peer-focus:text-xs transition-all duration-200">
          Goal Title
        </label>
      </div>

      {/* Description */}
      <div className="relative">
        <textarea
          placeholder=" "
          value={form.description ?? ""}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="peer w-full border border-gray-300 rounded p-3 pt-5 focus:outline-none focus:border-thyme-500"
        />
        <label className="absolute left-3 top-1 text-xs text-thyme-400 pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-1 peer-focus:text-xs transition-all duration-200">
          Description (optional)
        </label>
      </div>

      {/* Target minutes per day */}
      <div className="relative">
        <input
          type="number"
          placeholder=" "
          min={1}
          value={form.targetMins}
          onChange={e => setForm({ ...form, targetMins: Number(e.target.value) })}
          className="peer w-full border border-gray-300 rounded p-3 pt-5 focus:outline-none focus:border-thyme-500"
          required
        />
        <label className="absolute left-3 top-1 text-xs text-thyme-400 pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-1 peer-focus:text-xs transition-all duration-200">
          Target minutes per day
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-thyme-500 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Assign goal"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-500 py-2 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}