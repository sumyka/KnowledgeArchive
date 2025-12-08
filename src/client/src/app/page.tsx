'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from './_components/Sidebar';
import IsbnForm from './_components/ISBNform';

// 書籍の型定義
interface BookData {
	title: string;
	imageUrl: string | null;
}

export default function Page() {
	const [books, setBooks] = useState<BookData[]>([]);

	// 書籍が見つかったときのコールバック関数
	const handleBookFound = (newBook: BookData) => {
		// 新しい本をリストの先頭に追加
		setBooks((prev) => [newBook, ...prev]);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			{/* 左側：サイドバー */}
			<Sidebar />

			{/* 右側：メインコンテンツエリア */}
			<div className="flex-1 p-8 bg-gray-50">
				<div className="max-w-4xl mx-auto space-y-8">
					{/* 本追加フォーム */}
					<section className="bg-white p-6 rounded-lg shadow-sm">
						<h2 className="text-lg font-bold text-gray-800 mb-4">
							書籍を追加する
						</h2>
						<IsbnForm onBookFound={handleBookFound} />
					</section>

					{/* 本棚 */}
					<section>
						{/* 本棚ヘッダー */}
						<h2 className="text-xl font-bold text-gray-800 mb-4">
							最近追加された本
						</h2>

						{/* 本棚リスト表示 */}
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{books.length === 0 ? (
								<div className="col-span-full py-8 text-center bg-white rounded-lg border border-dashed border-gray-300">
									<p className="text-gray-400">まだ本が追加されていません</p>
								</div>
							) : (
								books.map((book, index) => (
									<div
										key={index}
										className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
									>
										{/* 表紙画像エリア */}
										<div className="relative w-full h-full">
											{book.imageUrl ? (
												<Image
													src={book.imageUrl}
													alt={book.title}
													fill
													className="object-contain"
													unoptimized
												/>
											) : (
												<span className="text-xs text-gray-400 font-medium">
													No Image
												</span>
											)}
										</div>
										{/* タイトル */}
										<p className="text-sm font-medium text-center text-gray-700 line-clamp-2 leading-tight">
											{book.title}
										</p>
									</div>
								))
							)}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
