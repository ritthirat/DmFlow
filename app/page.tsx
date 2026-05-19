import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">DocFlow</h1>
          <p className="text-gray-600">Modern document management made simple</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <p className="text-gray-600 mb-6">Streamline your workflow with intelligent document organization, tracking, and collaboration.</p>
          <div className="space-y-3">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-900 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-sm text-gray-700">Real-time document tracking</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-900 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-sm text-gray-700">Clean, minimal interface</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-900 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-sm text-gray-700">Organized document library</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link href="/dashboard" className="block w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Go to Dashboard
          </Link>
          <Link href="/documents/createdoc" className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Create New Document
          </Link>
        </div>
      </div>
    </div>
  );
}
