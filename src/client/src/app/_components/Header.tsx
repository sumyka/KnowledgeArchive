export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        {/* 左側：ロゴとタイトル */}
        <div className="flex items-center gap-2">
          {/* 本のアイコン（SVG） */}
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Knowledge Archive
          </h1>
        </div>

        {/* 右側：拡張用（設定ボタンなど） */}
        <div>
          {/* プレースホルダー */}
        </div>
      </div>
    </header>
  );
}
