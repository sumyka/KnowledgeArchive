/**
 * ISBN-13のチェックデジットを検証する
 */
const calculateCheckDigit13 = (isbn12: string): string => {
	let sum = 0;
	for (let i = 0; i < 12; i++) {
		const digit = Number(isbn12[i]);
		sum += i % 2 === 0 ? digit * 1 : digit * 3;
	}
	const remainder = sum % 10;
	const checkDigit = remainder === 0 ? 0 : 10 - remainder;
	return String(checkDigit);
};

/**
 * ISBN-10 のチェックデジットを検証する
 */
const validateIsbn10 = (isbn10: string): boolean => {
	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += Number(isbn10[i]) * (10 - i);
	}
	const last = isbn10[9] === 'X' ? 10 : Number(isbn10[9]);
	sum += last;
	return sum % 11 === 0;
};

/**
 * 入力されたISBN文字列を検証し、正規化されたISBN-13文字列を返す
 * 無効な場合は null を返す
 */
export const normalizeIsbn = (input: string): string | null => {
	const cleanInput = input.replace(/[- ]/g, '').toUpperCase();

	if (cleanInput.length === 13) {
		if (!/^\d{13}$/.test(cleanInput)) return null;

		const core = cleanInput.slice(0, 12);
		const checkDigit = calculateCheckDigit13(core);
		return checkDigit === cleanInput[12] ? cleanInput : null;
	}

	// ISBN-10 -> ISBN-13 変換
	if (cleanInput.length === 10) {
		if (!/^\d{9}[\dX]$/.test(cleanInput)) return null;

		// ISBN-10 のチェックデジット検証を追加
		if (!validateIsbn10(cleanInput)) return null;

		// 先頭に '978' を足して ISBN-13 を構築
		const core = '978' + cleanInput.slice(0, 9);
		const checkDigit = calculateCheckDigit13(core);
		return core + checkDigit;
	}

	return null;
};
