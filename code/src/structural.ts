export {};  // 使本文件成为独立模块（避免与其他示例文件全局冲突）
// structural.ts —— 第二课示例：结构类型
// 运行: npx tsc && node dist/structural.js

interface Pet {
  name: string;
  speak(): string;
}

// ── 1. class 不需要 implements Pet ──
// C# 里必须写 class Dog : Pet；TS 里形状匹配就行
class Dog {
  constructor(public name: string) {}
  speak(): string {
    return "Woof!";
  }
}

const pet1: Pet = new Dog("Rex");
console.log(pet1.name, pet1.speak());

// ── 2. 更典型：对象字面量直接匹配 ──
// JS 生态里大量用"匿名对象"传递数据，TS 的结构类型正好服务这种风格
const cat = {
  name: "Tom",
  speak: () => "Meow!",
};
const pet2: Pet = cat;
console.log(pet2.name, pet2.speak());

// ── 3. 陷阱：多余属性检查（对象字面量） ──
// 字面量直接赋值：多出的 age 会报错
//  const pet3: Pet = { name: "Rex", speak: () => "Woof!", age: 3 };  // error TS2353

// 但先赋给变量就不报错 —— 变量已定型，结构匹配只看"所需成员是否齐全"
const rex = { name: "Rex", speak: () => "Woof!", age: 3 };
const pet4: Pet = rex; // OK，age 被忽略
console.log(pet4.name, pet4.speak(), "(age 被忽略)");

// ── 4. 可选属性 ──
interface Config {
  retries: number; // 必需
  debug?: boolean; // 可选
}

const c1: Config = { retries: 3 }; // OK
const c2: Config = { retries: 1, debug: true }; // OK
// const c3: Config = {};  // error TS2741: Property 'retries' is missing

console.log(c1.retries, c2.debug);
