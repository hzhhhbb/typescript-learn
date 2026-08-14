// classes.ts —— 第七课示例：类与继承的 TS 细节
// 运行: npx tsc && node dist/classes.js
export {};

// ── 1. 参数属性：constructor(public name: string) ──
// 等价于：name: string; 声明 + this.name = name; 赋值
class Animal {
  constructor(public name: string) {}
  speak(): string {
    return "...";
  }
}

// ── 2. 继承：extends + super() 必须先调用 ──
class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // 必须先调 super 才能用 this
  }
  speak(): string {
    return "Woof!";
  }
}

const d = new Dog("Rex", "Labrador");
console.log(d.name, d.breed, d.speak()); // Rex Labrador Woof!

// ── 3. private vs #private ──
class BankAccount {
  #balance = 0; // 编译期私有：编译后是普通属性
  #secret = "hidden"; // 运行时真私有：外界访问抛错

  deposit(amount: number): void {
    this.#balance += amount;
  }
  getBalance(): number {
    return this.#balance;
  }
  getSecret(): string {
    return this.#secret;
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100
console.log(acc.getSecret()); // hidden
console.log((acc as any).balance);  // ✗ TS2341: Property 'balance' is private
// console.log(acc.#secret);  // ✗ TS18013: Property '#secret' is not accessible

// ── 4. implements：结构匹配 + 编译期校验 ──
interface Flyable {
  fly(): void;
}
class Bird implements Flyable {
  // 不实现 fly 会报错，但不需要显式"注册"兼容性（第二课）
  fly(): void {
    console.log("flap flap");
  }
}
new Bird().fly();

// ── 5. abstract：与 C# 相同 ──
abstract class Shape {
  abstract area(): number; // 子类必须实现
  describe(): string {
    return `area = ${this.area().toFixed(2)}`;
  }
}
class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
console.log(new Circle(2).describe()); // area = 12.57
// new Shape();  // ✗ TS2511: Cannot create an instance of an abstract class

// ── 6. getter / setter：与 C# 相同 ──
class Temperature {
  private _celsius = 0;
  get celsius(): number {
    return this._celsius;
  }
  set celsius(v: number) {
    this._celsius = v;
  }
  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }
}
const t = new Temperature();
t.celsius = 25;
console.log(t.celsius, t.fahrenheit); // 25 77

// ── 7. 装饰器预览（TS 5+ 标准装饰器，无需 experimentalDecorators） ──
function logged(value: any, context: any) {
  console.log(`[decorator] ${String(context.name)}`);
}
class Greeter {
  @logged
  greet(): string {
    return "hi";
  }
}
console.log(new Greeter().greet()); // [decorator] greet / hi
