"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toorg, setToOrg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, toOrg: toorg }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to create document");
      }
    } catch (e) {
      alert("Error creating document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Create Document</h1>
            <p className="text-sm text-gray-500">Add a new document to your workflow</p>
          </div>
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">Back</Link>
        </div>

        <div className="card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter organization name"
              value={toorg}
              onChange={(e) => setToOrg(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm h-48 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              placeholder="Enter document content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">{content.length} characters</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !title.trim() || !content.trim()}
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Document'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
