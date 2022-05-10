/**
 * @description 工廠模式是一種提供【通用的介面】來【委派物件實例化】
 * 這個模式經常被使用在 【同時管理與操作，多個有相似特性卻仍不同的物件集合】。
*/

class Factory {
  constructor() {
    this.createPlane = function (type) {
      let ball;

      if (type === Airplane.type) {
        ball = new Airplane();
      } else if (type === JIT.type) {
        ball = new JIT();
      }

      ball.fly = function () {
        return `The ${this.name} is flying.`;
      };

      return ball;
    };
  }
}

class Airplane {
  static type = 'airplane';

  constructor() {
    this.name = Airplane.type;
    this.speedDown = function () {
      return `The ${this.name} is speedDown.`;
    };
  }
}

class JIT {
  static type = 'JIT';

  constructor() {
    this.name = JIT.type;
    this.speedUp = () => {
      return `The ${this.name} is speedUp.`;
    };
    this.fight = () => {
      return `The ${this.name} is fighting.`;
    }
  }
}

const factory = new Factory();
const myAirplane = factory.createPlane(Airplane.type);
const myJIT = factory.createPlane(JIT.type);

// In the Factory create shared method or property to instance.
console.log(myAirplane.fly());
console.log(`${myJIT.fly()} \n`);

// Each instance also have their own properties and method.
console.log(`${myAirplane.speedDown()}\n`); // The airplane is speedDown.
console.log(myJIT.speedUp()); // The JIT is speedUp.
console.log(myJIT.fight()); // The JIT is also fighting.