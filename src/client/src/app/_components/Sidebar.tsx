export default function Sidebar() {
	// モックのデータ
	const totalBooks = 128;
	const mockInfo = 'この統計情報はモックデータです';
	return (
		// md:h-screen md:sticky md:top-0 を追加
		<aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col md:h-screen md:sticky md:top-0">
			
			{/* --- 上部：統計情報エリア --- */}
			<div>
				<h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
					統計情報
				</h2>
				<p className="text-xs text-gray-400 mb-4">{mockInfo}</p>

				{/* 蔵書情報 */}
				<div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
					<div className="flex items-center gap-3 mb-2">
						{/* 本のアイコン */}
						<div className="p-2 bg-blue-100 rounded-md text-blue-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
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
						<span className="text-sm font-medium text-blue-900">総蔵書数</span>
					</div>

					<div className="text-3xl font-bold text-gray-900">
						{totalBooks}
						<span className="text-sm font-normal text-gray-500 ml-1">冊</span>
					</div>
				</div>
			</div>

			{/* --- 下部：SNSリンク & Copyright --- */}
			<div className="mt-auto pt-8 border-t border-gray-100 mb-4">
        <p className="text-sm text-gray-400 mb-4">If you need Contact me.</p>
				<div className="flex items-center gap-4 mb-4">
					{/* GitHub Link */}
					<a
						href="https://github.com/sumyka/KnowledgeArchive"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-gray-800 transition-colors"
						aria-label="GitHub"
					>
            			{/* GitHub Logo */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
						</svg>
					</a>

					{/* Twitter (X) Link */}
					<a
						href="https://twitter.com/su3yka4a_"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-gray-800 transition-colors"
						aria-label="Twitter"
					>
						{/* X Logo */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="fill-current"
						>
							<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
						</svg>
					</a>
				</div>

        		{/* Copyright */}
				<p className="text-xs text-gray-400">
					&copy; 2025 Knowledge Archive
				</p>
			</div>
		</aside>
	);
}
