/**
 * 它定義【物件之間一對多】的相依關係，
 * 當一個物件(publish)改變它的狀態，其他【所有相依的物件會被通知】且也自動更新狀態。
 * 
 * Ex. 
 *    一個Publish物件內透過 subscibe 和 unsubscribe 訂閱，
 *    因此會對應多個observer物件的array，
 *    (也可以改用 key-value 的方式訂閱，例如 key是名稱，value 是callback)
 *    只要 Publish 觸發 fire ，所有 observer 都會被通知被觸發。 
*/

class Publish {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => observer !== obs);
  }

  fire(change) {
    this.observers.forEach(observer => {
      observer.update(change);
    });
  }
}

class Observer {
  constructor(state = 0) {
    this.state = state;
  }

  update(change) {
    let state = this.state;

    switch (change) {
      case 'INC':
        this.state = ++state;
        break;
      case 'DEC':
        this.state = --state;
        break;
      default:
        break;
    }
  }
}

// usage
// 建立 Publish 物件
const sub = new Publish();
const obs1 = new Observer(1);
const obs2 = new Observer(19);

// Publish 訂閱 Observer
sub.subscribe(obs1);
sub.subscribe(obs2);

// Publish 觸發狀態改變，則相依的 Observer 皆會被通知並執行相對應的動作
sub.fire('INC');
console.log(obs1.state); // 2
console.log(obs2.state); // 20