
import Table from "@/components/Table";
import Link from "next/link";

export default async function DashboardPage() {
  const res = await fetch("http://localhost:3000/api/documents", {
    cache: "no-store",
  });

  const documents = await res.json();
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Documents</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all your documents in one place</p>
        </div>

        <Link
          href="/documents/createdoc"
          className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          New Document
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-md">
          <p className="text-sm text-gray-600">Total Documents</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{documents.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-md">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-semibold text-yellow-600 mt-2">{documents.filter((d: any) => d.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-md">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-semibold text-green-600 mt-2">{documents.filter((d: any) => d.status === 'approved').length}</p>
        </div>
      </div>

      <Table documents={documents} />
    </div>
  );
}
