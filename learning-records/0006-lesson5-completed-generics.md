# 泛型课程完成：运行时擦除与 extends 约束

用户完成第五课（泛型）。已建立核心心智模型：TS 泛型只在编译期存在、运行时完全擦除（对比 C# List&lt;int&gt; 与 List&lt;string&gt; 是运行时不同类型）；extends 约束是结构性的（有成员即可，string 和数组都能满足 { length: number }）；泛型与收窄的组合（Stack&lt;T&gt;.pop(): T | undefined）。处理了示例文件间的模块作用域冲突（添加 export {} 使每个文件成为独立模块）。

**Evidence**: "ok, next one"推进；示例（identity、Box、Stack、longest）均由 agent 编译运行验证。

**Implications**: 用户对"类型是纯编译期概念"的认知已扩展覆盖泛型。可进入函数与对象类型课（0006）——函数类型注解 (a: T) => R 与 C# 委托/Func 的映射、重载签名声明方式、可选/剩余参数，都是全栈代码高频内容。模块化处理（export {}）已就位，后续示例文件可持续添加。
