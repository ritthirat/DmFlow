"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Table({ documents }: { documents: any[] }) {
  const router = useRouter();
  const [localDocs, setLocalDocs] = useState<any[]>(documents || []);

  useEffect(() => {
    setLocalDocs(documents || []);
  }, [documents]);

  const handleRowClick = (id: string) => router.push(`/documents/${id}`);

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this document? This action cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:3000/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLocalDocs((prev) => prev.filter((d) => d.id !== id));
      } else {
        alert("Failed to delete document");
      }
    } catch (err) {
      alert("Error deleting document");
    }
  };

  if (!localDocs || localDocs.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-gray-500">No documents yet</p>
        <p className="text-sm text-gray-400 mt-1">Create your first document to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Organization</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localDocs.map((doc: any) => (
              <tr
                key={doc.id}
                onClick={() => handleRowClick(doc.id)}
                className={`border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors`}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{doc.content?.slice(0, 80)}</div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">{doc.toOrg || "-"}</td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      doc.status === "approved"
                        ? "bg-green-50 text-green-700"
                        : doc.status === "pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {typeof doc.status === "string" ? doc.status.charAt(0).toUpperCase() + doc.status.slice(1) : String(doc.status)}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-"}</td>

                <td className="px-6 py-4 text-right text-sm">
                  <div className="inline-flex items-center gap-3">
                    <Link
                      href={`/documents/${doc.id}/edit`}
                      onClick={(e: any) => e.stopPropagation()}
                      className="text-sm text-gray-700 hover:text-gray-900"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(doc.id);
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
