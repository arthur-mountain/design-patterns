/**
 * 透過呼叫function時改變狀態，每個狀態會使用自己狀態的物件，讓同樣一個方法產生不同的結果)
 * 行為型模式
 *  每一個物件依照它內部的狀態去改變它自己的行為。
 *  而 狀態模式物件 用自己的內部狀態來管理所有物件，並判斷或改變當前要使用哪一個物件，而被使用的物件會實作相同方法，但會使用自己內部的狀態
  
  EX. TrafficLight 物件(狀態模式物件)，藉由 change 來判斷或改變要使用哪一個物件，而
  sign 方法讓 每個物件【使用自己的內部狀態】去觸發物件【自己本身的 sign 方法】
*/

// 自己內部狀態管理所有要使用的物件( GreenLight、RedLight、YellowLight )
class TrafficLight {
  constructor() {
    this.states = [new GreenLight(), new RedLight(), new YellowLight()];
    this.current = this.states[0];
  }

  // 主要控制要使用的物件
  change() {
    const totalStates = this.states.length;
    let currentIndex = this.states.findIndex(light => light === this.current);

    if (currentIndex + 1 < totalStates) {
      this.current = this.states[currentIndex + 1];
    } else {
      this.current = this.states[0];
    }
  }

  /**
   * 間接觸發當前物件(this.current)的sign方法，
   * 而當前物件的 sign 方法，則會使用它自己內部的方法
   */
  sign() {
    return this.current.sign();
  }
}

class Light {
  constructor(light) {
    this.light = light;
  }
}

/**
 * implement sign 方法，並使用自己的狀態
*/
class RedLight extends Light {
  constructor() {
    super('red');
  }
  sign() {
    return 'STOP';
  }
}
class YellowLight extends Light {
  constructor() {
    super('yellow');
  }
  sign() {
    return 'STEADY';
  }
}
class GreenLight extends Light {
  constructor() {
    super('green');
  }
  sign() {
    return 'GO';
  }
}

// usage
const trafficLight = new TrafficLight();
console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'
trafficLight.change();

console.log(trafficLight.sign()); // 'STEADY'
trafficLight.change();

console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'