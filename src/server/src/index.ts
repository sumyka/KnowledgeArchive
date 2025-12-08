import express, { Request, Response } from 'express';
import cors from 'cors';

import searchISBN from '../utils/searchISBN';

const app = express();
const port = 4000;
const HOST = '0.0.0.0';

// フロントからのアクセス許可
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(express.json());

// ヘルスチェック用エンドポイント
app.get('/', (req: Request, res: Response) => {
	res.send('Knowledge Archive API is running!');
});

type BookRequestBody = {
	isbn: string;
};

// 書籍追加エンドポイント
app.post(
	'/api/books',
	async (
		req: Request<Record<string, never>, Record<string, never>, BookRequestBody>,
		res: Response
	) => {
		const { isbn } = req.body;

		console.log(`Request received for ISBN: ${isbn}`);

		try {
			const bookData = await searchISBN(isbn);

			if (bookData) {
				res.status(200).json({
					success: true,
					message: '書籍が見つかりました',
					data: bookData,
				});
			} else {
				res.status(404).json({
					success: false,
					message: '書籍情報が見つかりませんでした',
				});
			}
		} catch (err: unknown) {
			console.error(err);
			res.status(500).json({
				success: false,
				message: 'サーバー内部エラーが発生しました',
			});
		}
	}
);

// サーバー起動
app.listen(port, HOST, () => {
	console.log(`Backend server running on http://${HOST}:${port}`);
});
