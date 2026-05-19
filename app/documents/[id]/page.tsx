
import Link from "next/link";
import DocumentActions from "../../../components/DocumentActions";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/documents/${id}`, {
    cache: "no-store",
  });

  const document = await res.json();

  const statusColors: Record<string, { badge: string; text: string }> = {
    approved: { badge: "bg-green-100", text: "text-green-700" },
    pending: { badge: "bg-yellow-100", text: "text-yellow-700" },
    draft: { badge: "bg-gray-100", text: "text-gray-700" },
  };

  const colors = statusColors[document.status] || statusColors.draft;


  return (
    <div className="container space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-2"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">
            {document.title}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Document details</p>
        </div>

        <div>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${colors.badge} ${colors.text}`}
          >
            {document.status
              ? document.status.charAt(0).toUpperCase() +
                document.status.slice(1)
              : "Unknown"}
          </span>
          <DocumentActions id={id} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-6">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Content
          </h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {document.content}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Organization
            </h3>
            <p className="text-sm text-gray-900">
              {document.toOrg || "Not specified"}
            </p>
          </div>

          <div className="card p-4">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Created
            </h3>
            <p className="text-sm text-gray-900">
              {new Date(document.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="card p-4">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Document ID
            </h3>
            <p className="text-xs font-mono text-gray-500 break-all">{id}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
