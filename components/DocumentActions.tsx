"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DocumentActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    router.push(`/documents/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete document");
      }
      router.push("/dashboard");
    } catch (err) {
      alert("Delete failed: " + (err instanceof Error ? err.message : String(err)));
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex space-x-1">
      <button
        onClick={handleEdit}
        disabled={loading}
        className="ml-4 px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="ml-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors text-sm font-medium"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
