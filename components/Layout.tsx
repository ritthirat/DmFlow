import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - hidden on small screens */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-6 fixed h-screen overflow-y-auto">
        <Link href="/" className="block mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">DocFlow</h2>
            <p className="text-xs text-gray-500">Document Management</p>
          </div>
        </Link>
        <select className="w-full mb-6 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
          <option>All Organizations</option>
          <option>Organization A</option>
          </select>      
        <nav className="space-y-1">
          <a
            href="/dashboard"
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/documents/createdoc"
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Create Document
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Document Workflow
            </h1>
            <p className="text-sm text-gray-500">Manage your documents</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
              🔔
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
              U
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
