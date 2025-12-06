import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 4000;
const HOST = '0.0.0.0';

// フロントからのアクセス許可
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));

app.use(express.json());

// ヘルスチェック用エンドポイント
app.get('/', (req: Request, res: Response) => {
	res.send('Knowledge Archive API is running!');
});

// 書籍追加エンドポイント
app.post('/api/books', (req: Request, res: Response) => {
	const { isbn } = req.body;
	
	console.log(`[Server] 受け取ったISBN: ${isbn}`);

	// TODO: ISBNを使って書籍情報を取得する。<- OpenBD予定
	res.status(200).json({ 
		success: true, 
		message: `ISBN ${isbn} を受け付けました`,
		isbn 
	});
});

// サーバー起動
app.listen(port, HOST, () => {
	console.log(`Backend server running on http://${HOST}:${port}`);
});
