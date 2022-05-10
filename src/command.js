/**
 * 這是一個行為型模式，主要作為封裝行為或操作一個物件。
 * 藉由分離物件，拆分
 *  1. 請求一個操作或調用功能
 *  2. 執行或處理實際上的實作，來允許系統與類別鬆耦合
 * 
 * 一個 Calculate class 裡有多個方法。
 * 利用 Command class 封裝指令，依照參數觸發 Calculate method 
 * Command class 同時也保留(紀錄)了所有觸發 Calculate method 的過程，因此可以實作重做(redo)和回復(undo)這類的操作功能。
 * 
 * 即間接透過 Command class 來觸發 Calculate class，並在自己內部來紀錄狀態。
 */
class Calculate {
  constructor(num) {
    this.num = num;
  }

  square() {
    return this.num ** 2;
  }
  cube() {
    return this.num ** 3;
  }
  squareRoot() {
    return Math.sqrt(this.num);
  }
}

class Command {
  constructor(subject) {
    this.subject = subject;
    this.history = [];
  }

  // 傳入 comman 間接透過這個 Class 觸發 subject 的方法
  execute(command) {
    this.history.push(command);
    return this.subject[command]();
  }
};

const myCommand = new Command(new Calculate(5));
myCommand.execute('square');
myCommand.execute('cube');
console.log(myCommand.history); // ['square', 'cube']