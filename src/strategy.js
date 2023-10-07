/**
 * 將物件UI與邏輯分開，與命令模式不同的是，
 * 策略模式的物件可以從外面傳入，命令模式只能用command裡面已經定義的
 * 
 * 行為型設計模式，允許【封裝給特殊任務(travelTime)的替代演算法(travel)】:
 *    transport 實作各自的 Transport 介面
 *    並間接透過 travel 方法觸發傳進來的 transport travelTime()
 * 
 * 若要新增新的 transport ，直接實作新的 transport 並要符合 Transport 介面
 * 
 * 利用一個物件(指揮官物件)【封裝所有通勤工作的可能的策略】(利用 travel 方法，在執行期間依照傳入不同的參數 transport 來達成策略轉換)
 *    
*/

/**
 * interface Transport {
 *   spendTime:number;
 *   travelTime: () => void;
 * }
*/

// 指揮官物件
class Commute {
  // 封裝通勤工作時，可能的策略(透過傳入不同的 transport)
  travel(transport) {
    return transport.travelTime();
  }
  // ...其他封裝
}

class Vehicle {
  travelTime() {
    return this.spendTime;
  }
}

// strategy 1
class Bus extends Vehicle {
  constructor() {
    super();
    this.spendTime = 30;
  }
}

// strategy 2
class Taxi extends Vehicle {
  constructor() {
    super();
    this.spendTime = 15;
  }
}

// strategy 3
class PersonalCar extends Vehicle {
  constructor() {
    super();
    this.spendTime = 5;
  }
}

// usage
const commute = new Commute();

console.log(commute.travel(new Taxi())); // 15
console.log(commute.travel(new Bus())); // 30