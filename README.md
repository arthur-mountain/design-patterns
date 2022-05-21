# design-patterns
Front-End design patterns ( JS design patterns )

---
####  Retry Pattern
    Immediately retry or Delay retry.
    Ex. something  like api call.

####  Singleton Pattern
    1. class 只會有一個 instance
    2. class 只會在第一次呼叫時進行初始化
    Ex. 那個唯一的 database instance 會在不同程式間來進行使用。

####  Factory Pattern
    工廠模式是一種提供【通用的介面】來【委派物件實例化】。
    常被使用在【同時管理與操作，多個有相似特性卻仍不同的物件集合】

####  Command Pattern
    將物件UI與邏輯分開，封裝一個物件的【行為或操作】，間接透過封裝後提供的 API 去操作物件，而不是直接使用。
    EX. 透一個物件(command物件)來觸發另一個物件(其他物件)的方法，並在自己內部來紀錄這些方法的操作過程。

####  Strategy Pattern
    將物件UI與邏輯分開，與命令模式不同的是，策略模式的物件可以從外面傳入(間接封裝)，命令模式只能用 command 裡面已經定義的(直接封裝)。
    EX. 透過 strategy 物件封裝，觸發另一個由外面傳入的物件的方法。

####  Template Pattern
    父類別只實作部分方法，剩餘的交由子類別去實作來補全父類別只做一半的方法。
    EX. 父類別實作 部分方法或演算法，透過子類別繼承，並補全父類別只做一半的方法。

####  State Pattern
    透過父類別管理要使用的物件間接觸發，當前物件使用自己內部的狀態所實作的方法。
    EX. 父類別管理所有正要使用的物件，間接觸發自己所管理的，使用自己狀態的物件內的方法。

####  Observer Pattern
    物件一對多，
    父類別(publish) 透過訂閱(subcribe)，管理多個的物件(observer)，
    當前自己狀態改變時，通知(間接觸發)所有訂閱物件(observer)更新或執行相對應的動作或行為
    EX. 父類別(publish)管理(訂閱)多個物件(observer)，當父類別(publish)狀態改變，則所以相依的物件(observer)接會被通知。

####  Adapter Pattern
    物件間的相容，
    透過中介介面(adapter interface)的轉換，我們在不修改主程式的情況下，能夠以相同的邏輯來直接使用兩種不同的物件
    EX. 主程式的設計一開始以 firstApi(A物件) 為主，之後因為 secondApi (B物件) 和 A物件 不一樣，因此透過【中介介面來轉換B物件】，使得【主程式可以在不被修改】的情況下，【間接使用中介介面】(相同於間接地使用B物件)