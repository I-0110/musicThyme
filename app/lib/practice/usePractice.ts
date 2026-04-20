"use client";

import { useState, useEffect } from "react";
import { Entry, PracticeForm, emptyForm } from "@/app/lib/practice/types";
import { fetchEntries, postEntry, updateEntry, deleteEntry } from "@/app/lib/practice/api";

export function usePractice() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [form, setForm] = useState<PracticeForm>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEdit] = useState<string | null>(null);

    useEffect(() => {
        fetchEntries().then(data => setEntries(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);
        
        try {
            if (edit) {
                // Update existing entry
                const updated = await updateEntry(edit, form);
                setEntries(entries.map(e => e.id === edit ? updated : e));
                setEdit(null);
            } else {
                // Create new entry
                const newEntry = await postEntry(form);
                setEntries([newEntry, ...entries]);
            }
            setForm({ ...emptyForm });
            setSuccess(true);
        } catch {
            setError("Failed to save practice entry");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (entry: Entry) => {
        setEdit(entry.id);
        setForm({
            date: entry.date.split("T")[0],
            startTime: entry.startTime,
            endTime: entry.endTime,
            instrument: entry.instrument,
            scales: entry.scales,
            study: entry.study,
            piece: entry.piece,
            solos: entry.solos,
            notes: entry.notes ?? "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;
        try {
            await deleteEntry(id);
            setEntries(entries.filter(e => e.id !== id));
        } catch {
            setError("Failed to delete practice entry");
        }
    };

    const handleCancelEdit = () => {
        setEdit(null);
        setForm({ ...emptyForm });
    };

    return { entries, form, loading, edit,success, error, setForm, handleSubmit, handleEdit, handleDelete, handleCancelEdit };
}