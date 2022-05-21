/**
 * 對已存在的類別，動態【增加行為或者功能】。
*/

// BOOK 類別
class Book {
  constructor(title, author, price) {
    this._title = title;
    this._author = author;
    this.price = price;
  }

  getDetails() {
    return `${this._title} by ${this._author}`;
  }
}

// decorator 1
// 將【BOOK類別】作為參數【傳遞 reference】，並對它進行【加工後返回】
function giftWrap(book) {
  book.isGiftWrapped = true;
  book.unwrap = function () {
    return `Unwrapped ${book.getDetails()}`;
  };

  return book;
}

// decorator 2 同上
function hardbindBook(book) {
  book.isHardbound = true;
  book.price += 5;

  return book;
}

// usage
const alchemist = giftWrap(new Book('The Alchemist', 'Paulo Coelho', 10));
console.log(alchemist.isGiftWrapped); // true
console.log(alchemist.unwrap()); // 'Unwrapped The Alchemist by Paulo Coelho'

const inferno = hardbindBook(new Book('Inferno', 'Dan Brown', 15));
console.log(inferno.isHardbound); // true
console.log(inferno.price); // 20