
import Link from "next/link";
import EditForm from "@/components/EditForm";

export default async function EditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  async function fetchDoc(id: string) {
    return fetch(`http://localhost:3000/api/documents/${id}`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null);
  }
  const doc = await fetchDoc(id);
  if (!doc) {
    return (
      <div className="container max-w-3xl mx-auto">
        <p className="text-red-600">Document not found.</p>
        <Link href="/dashboard" className="text-sm text-gray-500">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-600 hover:text-gray-900">
            Edit Document
          </h1>
          <p className="text-sm text-gray-500">
            Update your document and save changes.
          </p>
        </div>
        <Link
          href={`/documents/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Preview
        </Link>
      </div>

      <EditForm initialDoc={doc} />
    </div>
  );
}

