'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default  function EditForm({ initialDoc }: { initialDoc: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialDoc.title || "");
  const [toOrg, setToOrg] = useState(initialDoc.toOrg || "");
  const [content, setContent] = useState(initialDoc.content || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill title and content");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/documents/${initialDoc.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, toOrg }),
        },
      );

      if (res.ok) {
        router.push(`/documents/${initialDoc.id}`);
      } else {
        const body = await res.json();
        alert(body?.error || "Failed to update");
      }
    } catch (err) {
      alert("Error updating document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Document Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization
        </label>
        <input
          value={toOrg}
          onChange={(e) => setToOrg(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm h-48 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
