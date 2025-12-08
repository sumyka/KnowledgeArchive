// 書籍の型定義
interface BookData {
	title: string;
	imageUrl: string | null;
}

export default async function searchISBN(
	isbn: string
): Promise<BookData | null> {
	console.log(`Searching for ISBN: ${isbn}`);
	const booknameBaseUrl = `https://ndlsearch.ndl.go.jp/api/opensearch?isbn=${isbn}`;
	const thumbnailBaseUrl = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;

	let title: string | null = null;
	let imageUrl: string | null = null;

	// 書籍タイトルの取得
	try {
		const response = await fetch(booknameBaseUrl);
		if (response.ok) {
			const xmlText = await response.text();
			const match = xmlText.match(/<item>[\s\S]*?<title>(.*?)<\/title>/);
			if (match && match[1]) {
				title = match[1];
				console.log(`Found title: ${title}`);
			}
		}
	} catch (err: unknown) {
		console.error('Fetch error (Title):', err);
	}

	// 書籍サムネイルの確認(タイトルの存在確認後)
	if (title) {
		try {
			const thumbResponse = await fetch(thumbnailBaseUrl);
			if (thumbResponse.ok) {
				console.log(`Thumbnail found: ${thumbnailBaseUrl}`);
				imageUrl = thumbnailBaseUrl;
			}
		} catch (err: unknown) {
			console.error('Fetch error (Thumbnail):', err);
		}

		const result = { title, imageUrl };
		console.log('Returning result:', result);
		return result;
	}

	return null;
}
