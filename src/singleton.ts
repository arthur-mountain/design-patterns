/**
 *  private static 變數存放 singleton instance.
 * 
 *  constructor 如果有 instance 代表不是第一次 new 了，則回傳 instance，否則把這次 new 出來的 instance(this) 存放到第一點的 static 變數，並作其他初始化動作
 */

class Singleton {
  private static instance: Singleton;

  constructor(public data = {}) {
    // condition: Is instance exist?
    if (Singleton.instance) {
      return Singleton.instance;
    }
    // initialize setting
    this.data = data;
    Singleton.instance = this;
  }

  /* other business logic method... */
  otherMethod() {
    console.log('business method');
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}

export default Singleton;