
> 重点是实战. 对于ts编译原理部分，了解一下就可。面试不会文档特别喜欢，知道大概的流程就可

## 基础知识

基础类型：number string boolean array object (是约束变量的type)

```ts
const a: number = 0;
```

1. enum 枚举.

接口给前端返回一个status字段。

```ts

// 可以理解为常量对的集合
/** 活动枚举*/
enum ActivityStatus {//如果不赋值，隐式从0 开始顺延
    /* 未开始*/
    NOT_START,
    /* 已开始*/
    STARTED
}

const status = ActivityStatus.NOT_START;
```

2. type, interface.

```ts

type UserInfo = {
    name: string;
    height: number;
}

interface UserInfo {
      name?: string;
    height?: number;  
}

const userInfo: UserInfo = {}
```

3. 联合类型 | （联合类型一次只能使用一种类型，而交叉类型 每次都是多个类型的合并类型)
4. 交叉类型 & 

```ts
type UserInfoA = {
    name?: string;
    height?: number;
}

interface UserInfoB {
    width: number;  
}
function test(param: UserInfoA | UserInfoB) {

}
```
5. typeof 

```js
typeof 'a' // string
```

```ts
function toArray(x: number): Array<number> {
    return [x];
}

type Func = typeof toArray; // (x: number) => number[]
```

6. keyof
可以用来获取一个对象中的所有key值
```ts
interface Person{
    name:string
    age: number;
}
type KPerson = keyof Person; // 'name' | 'age'
```

7. in

用来遍历枚举类型

```ts
type Keys = "a" | "b" | "c";

type Obj = {
    [key in Keys]: any;
}
```
8. extends

继承.类型.

```ts

interface ILength {
    length: number;
}
// 泛型：可以通过外接的使用状态来动态的改变你的约束条件   
function loggingIdentity<T extends ILength>(arg: T):T {
    console.log(arg.length);
    return arg;
}
```

9. Paritial

Paritial<T> 的作用是将某个类型的属性全部变为可选项。

```ts
interface PageInfo {
    title: string;
}

type OptionalPageInfo = Paritial<PageInfo>;

// 相当于
{
    title?: string
}
```

10. Required // 与Paritial 相反，全改必选

11. Readonly

```ts
interface PageInfo {
    title: string;
}

type ReadonlyPageInfo = Readonly<PageInfo>;

const pageInfo: ReadonlyPageInfo = { title: ''};

pageInfo.title = 'xxxx' // 会报错并提示你title属性 readonly 类似于Object.definedProperty 改属性为不可写
```

12. Record

Record<K extends Keyof any, T> 的作用是将K中的所有属性的值，转化为T类型
```ts
interface PageInfo {
    title: string;
}

type Page = "Home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
    about: { title: "about"},
    contact: {title: "contact"},
    home: {title: "home"\}
}
```

13. Exclude

Exclude<T, U> 将某个类型中属于另一个的类型移除掉

```ts
typeof T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
typeof T1 = Exclude<"a" | "b" | "c", "a" | "b">;// "c"
```

14. Extract

Extract<T, U>的作用是从 T 中提取 U, 大概是取 T 和 U 的交集的意思

```ts

type T0 = Extract<"a" | "b" | "c", "a" | "f"> // "a"

type T1 = Extract<string | number | (() => void), Function>;// () => void // (() => void) 没有入参没有返回值的函数
```