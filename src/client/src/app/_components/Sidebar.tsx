export default function Sidebar() {
  // モックのデータ
  const totalBooks = 128;
  const mockInfo = 'この統計情報はモックデータです';

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        統計情報
      </h2>
      {/* モックの統計情報であることを示す */}
      <p>{mockInfo}</p>
      
      {/* 蔵書情報 */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center gap-3 mb-2">
          {/* 本のアイコン */}
          <div className="p-2 bg-blue-100 rounded-md text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-blue-900">総蔵書数</span>
        </div>
        
        <div className="text-3xl font-bold text-gray-900">
          {totalBooks}
          <span className="text-sm font-normal text-gray-500 ml-1">冊</span>
        </div>
      </div>
    </aside>
  );
}
