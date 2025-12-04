import Sidebar from './_components/Sidebar';
import IsbnForm from './_components/ISBNform';

export default function Page() {
	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			{/* 1. 左側：サイドバー */}
			<Sidebar />

			{/* 2. 右側：メインコンテンツエリア */}
			<div className="flex-1 p-8 bg-gray-50">
				<div className="max-w-4xl mx-auto space-y-8">
					{/* 本追加のエリア */}
					<section className="bg-white p-6 rounded-lg shadow-sm">
						<h2 className="text-lg font-bold text-gray-800 mb-4">
							書籍を追加する
						</h2>
						<IsbnForm />
					</section>

					<section>
						{/* 本棚 */}
						<p className="text-gray-500">プレースホルダー</p>
					</section>
				</div>
			</div>
		</div>
	);
}
