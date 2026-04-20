// Fetch and Post functions for practice entries
import { Entry, PracticeForm } from "./types";

export async function fetchEntries(): Promise<Entry[]> {
    const res = await fetch("/api/practice");
    return res.json();
}

export async function postEntry(formData: PracticeForm): Promise<Entry> {
    const res = await fetch("/api/practice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to save practice entry");
    
    return res.json();
}

export async function updateEntry(id: string, formData: PracticeForm): Promise<Entry> {
    const res = await fetch(`/api/practice/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to update practice entry");
    return res.json();
}

export async function deleteEntry(id: string): Promise<void> {
    const res = await fetch(`/api/practice/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete practice entry");
}