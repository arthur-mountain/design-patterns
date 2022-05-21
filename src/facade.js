/**
 * 提供統一、且較簡單、公開對外的介面(封裝後提供給外部使用)。
 * 
 * Compare:
 *  Factory 會在創建的時候決定要哪個物件
 *  Facade  會在要使用某一個功能的時候，從【物件裡面調用另一個物件】的方法，對外面使用的人並不知道裡面怎麼做的。
 */

const booksResource = [
  { id: 1, title: "Ulysses" },
  { id: 2, title: "Ham on Rye" },
  { id: 3, title: "Quicksilver" }
];

// Facade，封裝多個 subSystem ，只提供 get 方法給外部使用
class CultureFacade {
  static TYPE_MUSIC = "music";
  static TYPE_MOVIE = "movie";
  static TYPE_TV = "tv";
  static TYPE_BOOK = "book";

  constructor(type = CultureFacade.TYPE_BOOK) {
    this.type = type
  }

  #findMusic(id) {
    const db = new FetchMusic();

    return db.fetch(id);
  }

  #findMovie(id) {
    return new GetMovie(id);
  }

  #findTVShow(id) {
    return getTvShow(id);
  }

  #findBook(id) {
    return booksResource.find(item => item.id === id);
  }

  #tryToReturn(result) {
    return new Promise((resolve, reject) => !!result
      ? resolve(result)
      : reject(this._error));
  }

  // 提供外部的公開 api
  get(id) {
    switch (this.type) {
      case CultureFacade.TYPE_MUSIC: {
        return this.#tryToReturn(this.#findMusic(id));
      }

      case CultureFacade.TYPE_MOVIE: {
        return this.#tryToReturn(this.#findMovie(id));
      }

      case CultureFacade.TYPE_TV: {
        return this.#tryToReturn(this.#findTVShow(id));
      }

      case CultureFacade.TYPE_BOOK: {
        return this.#tryToReturn(this.#findBook(id));
      }

      default: {
        return Promise.reject({ status: 404, error: `No item with this id found` });
      }
    }
  }
}

// subSystem1
class FetchMusic {
  get resources() {
    return [
      { id: 1, title: "The Fragile" },
      { id: 2, title: "Alladin Sane" },
      { id: 3, title: "OK Computer" }
    ];
  }

  fetch(id) {
    return this.resources.find(item => item.id === id);
  }
}

// subSystem2
class GetMovie {
  constructor(id) {
    return this.resources.find(item => item.id === id);
  }

  get resources() {
    return [
      { id: 1, title: "Apocalypse Now" },
      { id: 2, title: "Die Hard" },
      { id: 3, title: "Big Lebowski" }
    ];
  }
}

// subSystem3
function getTvShow(id) {
  const resources = [
    { id: 1, title: "Twin Peaks" },
    { id: 2, title: "Luther" },
    { id: 3, title: "The Simpsons" }
  ];

  return resources.find(item => item.id === id);
};

// usage
const music = new CultureFacade(CultureFacade.TYPE_MUSIC);
music.get(3)
  .then(data => console.log(data))
  .catch(e => console.error(e));
