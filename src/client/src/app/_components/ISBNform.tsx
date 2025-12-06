'use client';

import React, { useState, useRef, ClipboardEvent, ChangeEvent } from 'react';
import { normalizeIsbn } from '../../utils/checkISBN';

export default function IsbnForm() {
	// 初期値
	const initialParts = {
		part1: '978',
		part2: '4',
		part3: '',
		part4: '',
		part5: '',
	};

	// 3桁-1桁-6桁-2桁-1桁 の各パート
	const [parts, setParts] = useState(initialParts);
	const [error, setError] = useState<string | null>(null);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	// 入力ハンドラ
	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		key: keyof typeof parts,
		index: number,
		maxLength: number
	) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, maxLength);

		setParts((prev) => ({ ...prev, [key]: value }));
		setError(null);

		// 最大桁まで入力したら次のフィールドへフォーカス
		if (value.length >= maxLength && index < 4) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// バックスペースで前へ戻る
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace' && e.currentTarget.value === '' && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	// ペースト処理
	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		setError(null);

		const raw = e.clipboardData.getData('text');
		const normalized = normalizeIsbn(raw);

		if (!normalized) {
			setError('ISBNが正しくありません');
			return;
		}

		// 978-4-xxxxxx-xx-x に分割
		const part1 = normalized.slice(0, 3);
		const part2 = normalized.slice(3, 4);
		const part3 = normalized.slice(4, 10);
		const part4 = normalized.slice(10, 12);
		const part5 = normalized.slice(12, 13);

		setParts({ part1, part2, part3, part4, part5 });

		// 最後のフィールドへフォーカス
		inputRefs.current[4]?.focus();
	};

	// 追加（送信）処理
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const rawInput = `${parts.part1}${parts.part2}${parts.part3}${parts.part4}${parts.part5}`;
		const validIsbn = normalizeIsbn(rawInput);

		if (!validIsbn) {
			setError('ISBNが正しくありません');
			return;
		}

		try {
			// サーバーへ送信 (POST)
			// ※ここでバックエンド(ポート4000)へデータを投げます
			const response = await fetch('http://localhost:4000/api/books', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ isbn: validIsbn }),
			});

			if (!response.ok) {
				throw new Error('サーバーエラーが発生しました');
			}

			const data = await response.json();
			console.log('API送信成功:', data);
			alert(`本を追加しました: ${data.message || validIsbn}`);

			// 成功したらフォームをリセット
			setParts(initialParts);
			inputRefs.current[0]?.focus();
		} catch (err) {
			console.error(err);
			setError('サーバーとの通信に失敗しました');
		}
	};

	// リセットボタン
	const handleReset = () => {
		setParts(initialParts);
		setError(null);
		inputRefs.current[0]?.focus();
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium text-gray-700">ISBNコード</label>

				<div className="flex items-center gap-2">
					{/* 1. 3桁 GS1 接頭語*/}
					<input
						ref={(el) => {
							if (el) inputRefs.current[0] = el;
						}}
						type="text"
						className="w-14 p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 text-gray-600"
						value={parts.part1}
						onChange={(e) => handleChange(e, 'part1', 0, 3)}
						onPaste={handlePaste}
						readOnly
					/>
					<span className="text-gray-400">-</span>

					{/* 2. 1桁 国・言語グループ*/}
					<input
						ref={(el) => {
							if (el) inputRefs.current[1] = el;
						}}
						type="text"
						className="w-10 p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 text-gray-600"
						value={parts.part2}
						onChange={(e) => handleChange(e, 'part2', 1, 1)}
						onPaste={handlePaste}
						onKeyDown={(e) => handleKeyDown(e, 1)}
					/>
					<span className="text-gray-400">-</span>

					{/* 3. 6桁 出版者記号*/}
					<input
						ref={(el) => {
							if (el) inputRefs.current[2] = el;
						}}
						type="text"
						className="w-24 p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						value={parts.part3}
						onChange={(e) => handleChange(e, 'part3', 2, 6)}
						onPaste={handlePaste}
						onKeyDown={(e) => handleKeyDown(e, 2)}
						placeholder="XXXXXX"
					/>
					<span className="text-gray-400">-</span>

					{/* 4. 2桁 書籍アイテム番号(書籍固有値)*/}
					<input
						ref={(el) => {
							if (el) inputRefs.current[3] = el;
						}}
						type="text"
						className="w-12 p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						value={parts.part4}
						onChange={(e) => handleChange(e, 'part4', 3, 2)}
						onPaste={handlePaste}
						onKeyDown={(e) => handleKeyDown(e, 3)}
						placeholder="XX"
					/>
					<span className="text-gray-400">-</span>

					{/* 5. チェックデジット */}
					<input
						ref={(el) => {
							if (el) inputRefs.current[4] = el;
						}}
						type="text"
						className="w-10 p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						value={parts.part5}
						onChange={(e) => handleChange(e, 'part5', 4, 1)}
						onPaste={handlePaste}
						onKeyDown={(e) => handleKeyDown(e, 4)}
						placeholder="X"
					/>

					{/* 追加ボタン */}
					<button
						type="submit"
						className="ml-auto md:ml-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
					>
						追加
					</button>

					{/* リセットボタン */}
					<button
						type="button"
						onClick={handleReset}
						className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors shadow-sm whitespace-nowrap"
					>
						リセット
					</button>
				</div>

				{error && (
					<p className="text-sm text-red-500 mt-1 flex items-center gap-1">
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
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
						{error}
					</p>
				)}

				<p className="text-xs text-gray-400 mt-1">
					※ 10桁または13桁のISBNに対応。ペーストで自動入力されます。
				</p>
			</div>
		</form>
	);
}
