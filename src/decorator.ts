/**
 * 對已存在的類別，動態增加行為或者功能。
 */

// BOOK 類別
class Book {
	private _title: string;
	private _author: string;
	public price: number;

	constructor(title: string, author: string, price: number) {
		this._title = title;
		this._author = author;
		this.price = price;
	}

	public getDetails(): string {
		return `${this._title} by ${this._author}`;
	}
}

// decorator 1
// 將 BOOK 類別作為參數傳遞 reference，並對它進行加工後返回
const giftWrap = (
	book: Book,
): Book & { isGiftWrapped: boolean; unwrap: () => string } => {
	const giftWrappedBook = book as Book & {
		isGiftWrapped: boolean;
		unwrap: () => string;
	};
	giftWrappedBook.isGiftWrapped = true;
	giftWrappedBook.unwrap = () => {
		return `Unwrapped ${giftWrappedBook.getDetails()}`;
	};

	return giftWrappedBook;
};

// decorator 2
const hardbindBook = (book: Book): Book & { isHardbound: boolean } => {
	const hardboundBook = book as Book & { isHardbound: boolean };
	hardboundBook.isHardbound = true;
	hardboundBook.price += 5;

	return hardboundBook;
};

// usage
const alchemist = giftWrap(new Book('The Alchemist', 'Paulo Coelho', 10));
console.log(alchemist.isGiftWrapped); // true
console.log(alchemist.unwrap()); // 'Unwrapped The Alchemist by Paulo Coelho'

const inferno = hardbindBook(new Book('Inferno', 'Dan Brown', 15));
console.log(inferno.isHardbound); // true
console.log(inferno.price); // 20
