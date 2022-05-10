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