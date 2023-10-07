/**
 * 行為型設計
 *  在模板物件，所定義的演算法架構下(該模板物件的函式)，但延遲定義關於子類別的一些步驟。子類別在沒有改變模板物件的演算法的情況下，重新定義某些演算法的步驟。
 * 
 * 模板物件定義一系列演算法(函式)，並實作一些【設想好的演算法，但不直接實作】，
 * 藉由子物件 繼承 模板物件，自行去實作那些設想好的演算法。
 * 
 * EX. 
 *   Employee 實作了【部分 work 方法】(this.responsibilities 這個方法沒直接實作)。
 *   讓 子類別去【實作responsibilities這個方法來使 work 方法完整】。
 *   甚至可以接著創建兩個子類別 Developer 和 Tester 來擴展這個模板方法，並且實現它們各自的 responsibilities 來填補這個不完整的 work。
*/

class Employee {
  constructor(name, salary) {
    this._name = name;
    this._salary = salary;
  }
  work() {
    // 實作【部分work】方法，讓內部的 this.responsibilities 這個實作交給子類別
    return `${this._name} handles ${this.responsibilities()}`;
  }

  getPaid() {
    return `${this._name} got paid ${this._salary}`;
  }
}

/**
 * 繼承 模板物件(Employee) 並且實作 responsibilities， 
 * 讓 模板物件 的方法完整( Employee 的 work) 
 */
class Developer extends Employee {
  constructor(name, salary) {
    super(name, salary);
  }

  // Subclass implement this method for Employee work method to be completly. 
  responsibilities() {
    return 'application development';
  }
}

class Tester extends Employee {
  constructor(name, salary) {
    super(name, salary);
  }

  // Subclass implement this method for Employee work method to be completly. 
  responsibilities() {
    return 'application testing';
  }
}

// usage
const dev = new Developer('nicole', 10000000000);
console.log(dev.getPaid()); // 'nicole got paid 10000000000'
console.log(dev.work()); // 'nicole handles application development'

const tester = new Tester('arthur', 90000);
console.log(tester.getPaid()); // 'arthur got paid 90000'
console.log(tester.work()); // 'arthur handles testing'