---
title: JavaScript-进阶
date: '2024-01-14'
updated: '2025-02-05'
tags: 
  - JavaScript
  - 笔记
categories:
  - 笔记
keywords: 'Javascript,JS,解构,对象原型'
description: 关于 JavaScript 的进阶知识，比如解构赋值、对象原型、异常处理等
cover: https://pic1.imgdb.cn/item/6649c59ed9c307b7e927563b.jpg
---

## 1. 作用域

### 1.1 局部作用域

局部作用域分为<font color="red">函数作用域</font>和<font color="red">块级作用域</font>

1. 函数作用域

- 在函数内部声明的变量只能在函数内部使用，外部无法直接访问
- 函数参数也是函数内部的局部变量

2. 块级作用域

在 JS 中使用 `{}` 包裹的代码称为代码块，代码块内部声明的变量外部（可能）无法被访问

- `let` 和 `const` 声明的变量会产生块作用域，`var` 不会产生块作用域
- 推荐使用 `let` 或 `const`

### 1.2 全局作用域

`<script>` 标签和 .js 文件的最外层就是全局作用域

全局作用域中声明的变量，在任何其他作用域都可以访问

注意：

- 为 window 对象动态添加的属性默认是全局的，不推荐
- 最外层函数中未使用任何关键字声明的变量为全局变量，不推荐
- 要尽量少声明全局变量，防止变量污染

### 1.3 作用域链

- 作用域链本质上是底层的<font color="red">变量查找</font>机制
- 函数执行时，会<font color="red">优先在函数作用域</font>中查找变量，如果当前作用域查找不到，则会<font color="red">依次逐级查找父级作用域</font>，直到全局作用域
- 子作用域能访问父级作用域，父级作用域不能访问子级作用域

### 1.4 JS 垃圾回收机制

#### 1.4.1 内存的生命周期

1. 内存分配：声明变量、函数、对象时，系统自动分配内存
2. 内存使用：使用变量、函数时
3. 内存回收：使用完毕，由垃圾回收器自动回收不再使用的内存

说明：

- 全局变量一般不会回收（在关闭页面时回收）
- 局部变量一般不用了就会自动回收

**内存泄漏**：程序分配的内存由于某些原因未释放或无法释放，称为内存泄漏

#### 1.4.2 垃圾回收算法

浏览器常见的两种垃圾回收算法：

1. **引用计数法**：IE 采用的引用计数法就是看一个对象是否有指向它的引用，没有则清除
	1. 跟踪记录被引用的次数
	2. 如果被引用一次，记录次数为 1，多次引用就累加
	3. 如果减少一次引用就减 1
	4. 引用次数为 0，释放空间

```javascript
// 如果两个对象内部相互引用，引用计数算法可能不会回收，导致内存泄漏
function fn() {
  let o1 = {}
  let o2 = {}
  o1.a = o2
  o2.a = o1
  return '引用计数无法回收'
}
fn()
```

2. **标记清除算法**：现在浏览器通常采用基于标记清除算法的改进算法
	1. 标记清除算法将不再使用的对象定义为<font color="red">无法到达</font>的对象
	2. 从<font color="red">根部</font>出发（JS 中的全局对象）扫描内存中的对象，能到达的就是还需使用的
	3. 从根部出发无法到达的对象标记为不可达，稍后回收

### 1.5 闭包

概念：一个函数对周围状态的引用捆绑在一起，内层函数访问外层函数的作用域

简单理解：**闭包** = **内层函数** + **外层函数的变量**

闭包作用：**封闭数据**，提供操作，让外部可以访问函数内部的变量

```javascript
function outer() {
  let data = 1
  function getDate() {
    console.log(data)
  }
  return getDate
}
const getDate = outer()
getDate() // 外部函数使用函数内部定义的变量
```

可能存在的问题：**内存泄漏**

### 1.6 变量提升

针对于 `var` 声明的变量，JS 允许在变量声明之前被访问，因为 JS 会把所有 `var` 声明的变量提升到**当前作用域**的最前面

只提升声明，不提升赋值

`let/const` 不存在变量提升

---

## 2. 函数进阶

### 2.1 函数提升

函数提升与变量提升比较类似，是指普通函数在声明之前可以被调用

对于函数表达式来说，必须先声明赋值才能调用，不存在提升

```javascript
foo() // 先调用
function foo() {
  console.log('foo')
}

boo() // 报错
var boo = function() {
  console.log('boo')
}
```

### 2.2 函数参数

#### 2.2.1 动态参数

`arguments` 是函数内部内置的伪数组变量，包含了调用函数时传入的所有实参

```javascript
function sum() {
  let s = 0
  for(let i = 0; i < arguments.length; i++) {
  	s += arguments[i]
	}
  console.log(s)
}
```

#### 2.2.2 剩余参数

剩余参数允许将数量不定的参数表示为一个数组

```javascript
function getSum(a, b, ...other) {
  console.log(other)
}
getSum(1, 2, 3) // other [3]
```

剩余参数必须放在普通参数之后，用于获取多余的实参

借助 `...` 获取的参数数组是真数组，不是伪数组

#### 2.2.3 展开运算符

`...` 在形参中是剩余参数，在形参之外是展开运算符

展开运算符 `...` 可以展开数组

说明：不会修改原数组

常用场景：数组求最大最小值、合并数组

### 2.3 箭头函数

#### 2.3.1 语法

基本语法：

```javascript
const fn = () => {
  console.log('hi')
}
fn()
```

只有一个参数可以省略小括号：

```javascript
const fn = x => {
  return x + x
}
fn(1) // 2
```

如果函数体只有一行，可以不用写大括号，且无需写 `return` 直接返回结果：

```javascript
const fn = (x, y) => x + y
fn(1, 2) // 3
```

**箭头函数的函数体加括号可以返回对象字面量表达式**：

```javascript
const fn = uname => ({uanme: uname})
fn('pink') // {uname: 'pink'}
```

#### 2.3.2 箭头函数参数

箭头函数没有 `arguments` 参数，但是有剩余参数 `...args`

#### 2.3.3 箭头函数 this

箭头函数不会创建自己的 `this`，它只会从自己作用域链的上一层沿用 `this`

```javascript
const obj = {
  uname: 'pink',
  sayHi: function() {
    let i = 10
    const count = () => {
      console.log(this) // this == obj
    }
    count()
  }
}
obj.sayHi()
```

DOM 事件回调函数不推荐使用箭头函数，如果使用，`this` 为全局 window

---

## 3. 解构赋值

### 3.1 数组解构

数组解构是指将数组的单元值快速赋值给一系列变量的简洁语法

基本语法：

- `=` 左侧的 `[]` 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
- 变量的顺序对应数组单元值的位置依次赋值

```javascript
const arr = [1, 2, 3] // 普通数组
let [a, b, c] = arr // 批量赋值
// 常见场景，交互两个变量的值
[a, b] = [b, a]
```

```javascript
const arr = [1, 2, 3] // 普通数组
let [a, b, c] = arr // 批量赋值
// 常见场景，交互两个变量的值
[a, b] = [b, a]
```

- 变量的数量多于单元值数量时，多的变量赋值为 `undefined`
- 变量的数量少于单元值数量时，可以利用展开运算符接收全部
- 防止有 `undefined` 传递的情况，可以设置默认值，类似于函数默认参数

```javascript
const [a='华为', b='苹果'] = ['遥遥领先']
console.log(a) // 遥遥领先
console.log(b) // 苹果
```

- 按需导入，忽略某些返回值

```javascript
const [a, , b, c] = ['华为', '苹果', '三星', '一加']
console.log(a) // 华为
console.log(b) // 三星
console.log(c) // 一加
```

- 多维数组解构

```javascript
const [a, ,b, [c, d]] = [1, 2, [3, 4]]
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3
console.log(d) // 4
```

### 3.2 对象解构

对象解构是指将对象属性和方法快速批量赋值给一系列变量的简洁语法

基本语法：

- `=` 左侧的 `{}` 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量
- 属性值将赋值给与属性名相同的变量
- 对象中找不到与变量名一致的属性时变量值为 `undefined`
- 解构声明的变量名不能和外面的变量名相同，如果冲突，可以改解构声明的变量改名

```javascript
const uname = 'luffy'
const {uname: username, age} = {uname: 'tom', age: 18}
console.log(username) // tom
```

- 将对象做参数传递时，可以使用解构的方式作为形参

```javascript
const res = {
  code: 200,
  msg: 'success',
  data: [
    {
      id: 1,
      title: 'hello'
    },
    {
      id: 2,
      title: 'world'
    }
  ]
}
function render({data: myData}) {
  console.log(myData) // res.data
}
render(res)
```

### 3.3 遍历数组 forEach 方法

`forEach()` 方法用于调用数组的每一个元素，并将元素传递给回调函数

```javascript
被遍历的数组.forEach(function(当前数组元素, 当前元素索引) {
  // 函数体
})
```

注意：

- 只遍历，不返回数组，返回 `undefined`，注意与 `map()` 的区别
- 参数中当前数组元素必须要写，索引号可选

---

## 4. 深入对象

### 4.1 创建对象的三种方式

1. 利用字面量创建

```javascript
const o = {
  name: '佩奇'
}
```

2. 利用 `new Object` 创建

```javascript
const obj = new Object()
obj.name = 'tom'
// 等价于
const obj = new Object({name: 'tom'})
```

3. 利用构造函数创建对象

### 4.2 构造函数

**构造函数**：是一种特殊的函数，主要用来初始化对象

**约定**：

1. 命名以大写字母开头
2. 只能由 `new` 操作符来执行

```javascript
function Pig(name, age) {
  this.name = name
  this.age = age
}
const pig = new Pig('tom', 18)
```

说明：

1. 使用 `new` 关键字调用函数称为实例化
2. 构造函数内部的 return 无效，无需写 return，返回值即为新创建的对象

**new 实例化执行过程**

1. 创建新对象
2. 构造函数 **this** 指向新对象
3. 执行构造函数代码，修改 **this**，添加新的属性
4. 返回新的对象

### 4.3 实例成员和静态成员

**实例成员**：通过构造函数创建的对象称为实例对象，实例对象中的属性和方法称为实例成员

**静态成员**：构造函数的属性和方法称为静态成员

说明：

1. 静态成员只能由构造函数来访问
2. 静态方法中的 **this** 指向构造函数

---

## 5. 内置构造函数

### 5.1 Object

#### 5.1.1 基本包装类型

JavaScript 中字符串、数值、布尔等基本类型也有专门的构造函数，称之为包装类型

Js 底层自动对基本数据类型进行包装，因此基本数据类型也可以使用方法

#### 5.1.2 Object 静态方法

Object 是内置的构造函数，用于构建普通对象

常用静态方法：

- `Object.keys(obj)`：获取对象中所有的键

```javascript
const obj = {name: 'bobo', age: 6}
// 获得对象所有的键，并返回一个数组
const keys = Object.keys(obj)
console.log(arr)
```

- `Object.values(obj)`：获取对象中所有的值

- `Object.entries(obj)`：返回二维数组，每个数组元素又是由键和值构成的数组

```javascript
let obj = {
  name: 'tom',
  tel: '123456'
}
Object.entries(obj) // [['name', 'tom'], ['tel', '123456']]
let m = new Map(Object.entries(obj))
```

- `Object.assign(target, ...sources)`：常用于拷贝对象，将源对象中可枚举的自有属性复制到目标对象中（属性存在则覆盖，不存在则追加），返回修改后的对象

- `Object.is(a, b)`：判断两个值是否完全相等

- `Object.setPrototypeOf(a, b)`：将 a 对象的原型对象设为 b

### 5.2 Array

#### 5.2.1 数组常见实例方法

- `forEach()`：遍历数组，不返回数组，经常用于查找遍历数组元素
- `filter()`：过滤数组，返回新数组，返回筛选满足条件的数组元素
- `map()`：迭代数组，返回新数组，返回处理之后的数组元素
- `reduce()`：累计器，返回累计处理的结果，经常用于求和
- `flat()`：将多维数组降维，可以传参指定降低的维度，不传默认降低一个维度

```javascript
// arr.reduce(function(上一次的值， 当前值){}, 初始值)：初始值可选
const arr = [1, 5, 8]
// 1. 没有初始值
const total = arr.reduce(function(prev, cur) {
  return prev + cur
})
console.log(total) // 14

// 2. 有初始值
const total = arr.reduce(function(prev, cur) {
  return prev + cur
}, 10)
console.log(total) // 24
```

**reduce** 执行过程：

1. 如果没有起始值，则将数组第一个元素作为上一次的值，否则将起始值作为上一次的值
2. 每一次循环，把返回值作为上一次的值

#### 5.2.2 数组其它实例方法

- `join()`：数组元素拼接成字符串，返回拼接后的字符串
- `find(callback)`：查找元素，返回符合测试条件的第一个数组元素值，如果没有符合的则返回 **undefined**
- `every(callback)`：检测数组所有元素是否都符合指定条件，都符合则返回 **true**，否则返回 **false**
- `some(callback)`：检测数组中是否有元素满足指定条件，有的返回 **true**，否则返回 **false**
- `concat()`：合并两个数组，返回新生成的数组
- `sort()`：对原数组单元值排序
- `splice()`：删除或替换原数组单元
- `reverse()`：反转数组
- `findIndex()`：查找元素的索引值

### 5.3 String

常见实例方法：

- `length()`： 获取字符串长度
- `split()`：将字符串拆分成数组
- `substring(开始位置索引[,结束索位置引])`：用于字符串截取
- `startsWith(检测字符串[, 开始位置索引])`：检测是否已某字符串开头
- `includes(搜索的字符串[, 检测位置索引号])`：判断一个字符串是否包含在另一个字符串中，返回 true 或 false
- `toUpperCase()`：将字母转换为大写
- `toLowerCase()`：将字母转换为小写
- `indexOf()`：检测是否包含某字符
- `endWidth()`：是否以某字符结尾
- `replace()`：替换字符串，支持正则匹配
- `match()`：查找字符串，支持正则匹配

### 5.4 Number

常用方法：

- toFixed()：设置保留小数位的长度
- toString()：转为字符串

```javascript
// 数值类型
const price = 12.345
// 保留两位小数、四舍五入
console.log(price.toFixed(2)) // 12.35
```

### 5.5 Symbol

#### 5.5.1 介绍

Symbol 是 ES6 引入的一种原始数据类型，类似于字符串，特点如下：
- Symbol 的值是唯一的，用来解决命名冲突问题
- Symbol 的值不能与其它数据进行计算
- Symbol 定义的对象属性不能使用 `for...in` 循环遍历，但可以使用 `Reflect.ownKeys` 来获取对象的属性名

```javascript
// 创建symbol
let s = Symbol()
console.log(s, typeof s);

// 通过构造函数创建
let s1 = Symbol('a')
let s2 = Symbol('a')
console.log(s1 === s2); // false

// 通过Symbol对象创建
let s3 = Symbol.for('b')
let s4 = Symbol.for('b')
console.log(s3 === s4);
```

#### 5.5.2 对象 Symbol 属性

Symbol 常用作对象属性修饰符，当往对象添加属性时，为了避免对原属性造成影响，可以使用 Symbol

1. 定义时添加 symbol 属性

```javascript
let person = {
  name: 'tom',
  [Symbol('say')]: function() {
    console.log('hello world!')
  }
}
```

2. 追加属性

```javascript
let obj = {
  name: 'Jerry'
}
let say = Symbol('say')
obj[say] = function() {
  return 'hello'
}
obj[say]() // hello
```

#### 5.5.3 Symbol 内置值

ES6 提供了11个内置的 Symbol 值，指向语言内部使用的方法：
- `Symbol.hasInstance`：当其它对象使用 `instanceof` 运算符判断是否为该对象的实例时，该方法调用
- `Symbol.unscopables`：该对象指定使用 `with` 关键字时，哪些属性会被 `with` 环境排除
- `Symbol.match`：当执行 `str.match(myObject)` 时，如果该属性存在，会调用该属性并返回它的返回值
- `Symbol.replace`：当执行 `str.replace(myObject)` 时，如果该属性存在，会调用该属性并返回它的返回值
- `Symbol.search`：当执行 `str.search(myObject)` 时，如果该属性存在，会调用该属性并返回它的返回值
- `Symbol.split`：当执行 `str.split(myObject)` 时，如果该属性存在，会调用该属性并返回它的返回值
- ......

```javascript
class Person {
  static [Symbol.hasInstance](params) {
    console.log('检测类型调用了')
    console.log(params)
    return true
  }
}

let o = {}
console.log(o instanceof Person); // 打印“检测类型调用了”、o 对象、true
```

---

## 6. 原型

### 6.1 构造函数的问题

> JS 实现封装性借助于构造函数实现

构造函数中如果存在无参方法，则实例化时会给每个对象开辟该方法的空间，存在浪费内存的问题

### 6.2 原型

- 构造函数通过原型分配的函数由所有实例对象所<font color="red">共享</font>
- JS 规定<font color="red">每一个构造函数都有一个 prototype 属性</font>，指向另一个对象，也称为原型对象
- 原型对象可以挂载函数，构造函数实例化时不会多次创建原型上的函数，节约内存
- <font color="red">公共属性写在构造函数内，公共不变的方法挂载到原型对象身上</font>
- 构造函数和原型对象中的 **this** 指向实例化对象

```javascript
function Star(name, age) {
  this.name = name
  this.age = age
}
Star.prototype.sing = function(){
  console.log('唱歌')
}
const singer = new Star('张学友', 50)
singer.sing()
```

### 6.3 constructor 属性

每个原型对象都有 **constructor** 属性，该属性指向原型对象所属的构造函数

使用场景：如果有多个共享的方法，可以给原型对象采取对象形式赋值，但这样就会覆盖原型对象原来的内容，修改后的原型就不再指向当前构造函数，此时，可以在修改后的原型中添加一个 **constructor** 指向当前构造函数

```javascript
function Star(name) {
  this.name = name
}
Star.prototype = { // 对象形式赋值
  sing: function() { console.log('唱歌') },
  dance: function() { console.log('跳舞') }
}
console.log(Star.prototype.constructor) // 指向 Object

Start.prototype = {
  constructor: Star, // 手动利用 constructor 指向 所属构造函数
  sing: function() { console.log('唱歌') },
  dance: function() { console.log('跳舞') }
}
console.log(Star.prototype.constructor) // 指向 Star
```

**constructor** 作用总结：

1. 指示对象是由哪个构造函数创建的
2. 用于判断对象的类型
3. 通过 **constructor** 属性可以引用构造函数，从而创建新的实例对象

### 6.4 对象原型

对象都有一个属性 `__proto__` 指向构造函数的 prototype 原型对象，之所以实例对象能使用原型对象 prototype 上的属性和方法，就是因为 `__proto__` 对象原型

注意：

- `__proto_` 是 JS 的非标准属性
- `[[prototype]]`和 `__proto__` 意义相同，用来表明当前实例对象指向哪个原型对象 prototype
- `__proto__`是只读的，不可赋值

### 6.5 原型继承

```javascript
const Person = { // 公共特征抽取
  eyes: 2,
  head: 1
}
function Man() {}
function Woman() {}
// 继承 Person
Man.prototype = Person
Man.prototype.constructor = Man // 指明 constructor 属性
Woman.prototype = Person
Woman.prototype.constructor = Woman
// 不推荐上述方式，因为某个子类往原型对象上添加的属性会对所有子类产生影响

// 推荐父类也用构造器生成
function Person() {
  this.eyes = 2
  this.head = 1
}
// 继承 Person
Man.prototype = new Person()
Man.prototype.constructor = Man // 指明 constructor 属性
Woman.prototype = new Person()
Woman.prototype.constructor = Woman
```

通过继承创建一个新的对象，并且没有指定 **constructor** 属性，通常不会导致错误，因为在继承过程中，默认派生对象会继承父对象的 **constructor** 属性

通常只有在手动设置一个新的 **prototype** 对象时需要考虑指明 **constructor** 属性来确保引用正确的构造函数

### 6.6 原型链

基于原型对象的继承使得不同构造函数的原型对象关联在一起，这种关联关系是一种链状结构，称为原型链

原型链的查找规则：

1. 当访问一个对象的属性时，首先查找该<font color="red">对象自身</font>有没有这个属性
2. 如果没有就查找它的原型对象（即 `__proto__` 指向的 prototype 原型对象)
3. 如果还没有就查找原型对象的原型
4. 依次类推，直到 Object 的原型对象的 `__proto__` 属性（null）
5. `__proto__` 对象原型的意义就是为对象成员查找提供一个方向
6. 可以使用 `instanceof` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

## 7. 深浅拷贝

浅拷贝和深拷贝只针对引用类型

### 7.1 浅拷贝

浅拷贝：拷贝的是地址，只适合单层结构（对象里没有对象属性）

常见方法：

1. 拷贝对象：`Object.assign()` 或展开运算符 `{...obj}` 拷贝对象
2. 拷贝数组：`Array.prototype.concat()` 或者 `[...arr]`

### 7.2 深拷贝

深拷贝：拷贝的是对象，不是地址

常见方法：

1. 通过递归实现深拷贝

```js
const obj = {
  uname: 'pink',
  age: 18
}
const o = {}
// 拷贝函数
function deepCopy(newObj, oldObj) {
  for(let k in oldObj) {
    // 判断数组类型
    if(oldObj[k] instanceof Array) {
      newObj[k] = []
      deepCopy(newObj[k], oldObj[k])
    }else if (oldObj[k] instanceof Object) { // 对象
      newObj[k] = {}
      deepCopy(newObj[k], oldObj[k])
    }
    newObj[k] = oldObj[k]
  }
}
deepCopy(o, obj)
```

2. 利用 lodash 库的 `cloneDeep()` 方法实现深拷贝

```js
const obj = {
  uname: 'pink',
  age: 18
}
const o = _.cloneDeep(obj)
```

3. 通过 **JSON.stringify()** 实现

```js
const obj = {
  uname: 'pink',
  age: 18
}
const o = JSON.parse(JSON.stringify(obj))
```

## 8. 异常处理

### 8.1 throw 抛异常

- throw 抛出异常信息，程序也会终止执行
- throw 后面跟的是错误提示信息
- Error 对象配合 throw 使用，能设置更详细错误信息

```js
function counter(x, y) {
  if (!x || !y) {
    throw new Error('参数不能为空')
  }
  return x + y
}
```

### 8.2 try/catch 捕获异常

- `try...catch` 用于捕获错误信息，将预估可能发生错误的代码写在 **try** 代码段中，如果 **try** 代码段中出现错误后，会执行 **catch** 代码段，并捕获到错误信息
- **finally** 不管是否有错误都会执行

```js
function foo() {
  try {
    ...
  } catch (err) {
    console.log(err.message)
    return 
  } finally {
    ...
  }
}
```

### 8.3 debugger

在代码中添加 debugger，相当于打断点

## 9. 处理 this

### 9.1 this 指向

#### 9.1.1 普通函数

普通函数的调用方式决定了 **this** 的值，即谁调用 **this** 就指向谁

普通函数没有明确调用者时 **this** 值为 window，严格模式下没有调用者时 **this** 的值为 **undefined**

#### 9.1.2 箭头函数

- 箭头函数会默认绑定外层 this 的值，事实上。箭头函数中不存在 this
- 箭头函数中 this 引用的就是最近作用域中的 this
- 向外层作用域中一层层查找 this，直到有 this 定义
- 构造函数、原型函数、DOM 事件回调函数不适用箭头函数

```js
// DOM 节点
const btn = document.querySelector('.btn')
// 箭头函数 此时 this 指向了 window
btn.addEventListener('click', () => {
  console.log(this)
})
// 普通函数 此时 this 指向了 DOM 对象
btn.addEventListener('click', function() {
  console.log(this)
})
```

### 9.2 改变 this

JS 中有三个方法可以改变 this 指向：`call()`、`apply()`、`bind()`

#### 9.2.1 call

`call()`：使用 `call()` 方法调用函数，同时指定被调用函数中 this 的值

语法：`fun.call(thisArg, arg1, arg2, ...)`

- `thisArg`：在 fun 函数运行时指定的 this 值
- `arg1, arg2`：传递的其它参数
- 返回值就是函数的返回值

#### 9.2.2 apply

`apply()`：使用 `apply()` 方法调用函数，同时指定被调用函数中 this 的值 

语法：`fun.call(thisArg, [argsArray])`

- `thisArg`：在 fun 函数运行时指定的 this 值
- `argsArray`：传递的其它参数，必须包含在数组里面
- 返回值就是函数的返回值
- apply 主要是与数组有关，比如使用 `Math.max()` 计算数组最大值

```js
const obj = {
  name: 'tom'
}
function foo(x, y) {
  console.log(this)
  return x + y
}
foo.apply(obj, [1, 2]) // 返回 3
```

### 9.2.3 bind

`bind()`：不会调用函数，但可以改变函数的内部 this 指向

语法：`fun.bind(thisArg, arg1, arg2, ...)`

- `thisArg`：在 fun 函数运行时指定的 this 值
- `arg1, arg2`：传递的其它参数
- 返回由指定的 this 值和初始化参数改造的原函数拷贝（新函数）

```js
// 按钮点击后禁用，两秒后解禁
const btn = document.querySelector('button')
// 箭头函数方式
btn.addEventListener('click', function() {
  this.disabled = true // 禁用按钮
  setTimeout(() => {
    this.disabled = false // 解禁
  }, 2000)
})
// bind方式
btn.addEventListener('click', function() {
  this.disabled = true // 禁用按钮
  setTimeout(function() {
    this.disabled = false // 解禁
  }.bind(this), 2000)
})
```

## 10. 性能优化

### 10.1 防抖（debounce）

防抖：单位时间内，频繁触发事件，只执行最后一次

使用场景：搜索输入、手机号、邮箱输入验证等

实现方式：

- lodash 提供的防抖方法

```js
const box = document.querySelector('.box')
let i = 1
function mouseMove() {
  box.innerHTML = i
}
// 鼠标滑动停止后500毫秒才执行 mouseMove，实现防抖
box.addEventListener('mousemove', _.debounce(mouseMove, 500)) 
```

- 自定义防抖函数

核心思路：利用定时器（setTimeout）来实现，先声明一个定时器变量，判断是否有定时器，如果有则先清除以前的定时器，没有定时器则开启定时器，并存到某个变量中，在定时器内调用要执行的方法

```js
const box = document.querySelector('.box')
let i = 1
function mouseMove() {
  box.innerHTML = i
}
function debounce(fn, t) {
  let timer // 声明定时器变量
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn()
    }, t)
  }
}
// 鼠标滑动停止后500毫秒才执行 mouseMove，实现防抖
box.addEventListener('mousemove', debounce(mouseMove, 500)) 
```

### 10.2 节流（throttle）

节流：单位时间内频繁触发事件，只执行一次

使用场景：高频事件如鼠标移动 mousemove、页面尺寸缩放 resize、滚动条滚动 scroll 等等

实现方式：

- lodash 提供的节流函数

```js
const box = document.querySelector('.box')
let i = 1
function mouseMove() {
  box.innerHTML = i
}
// 实现节流
box.addEventListener('mousemove', _.throttle(mouseMove, 500)) 
```

- 自定义节流函数

```js
const box = document.querySelector('.box')
let i = 1
function mouseMove() {
  box.innerHTML = i
}
function throttle(fn, t) {
  let timer // 声明定时器变量
  return function() {
    if (!timer) {
      timer = setTimeout(function() {
        fn()
        timer = null // 定时器内无法通过 clearTimeout 清除定时器
      }, t)
    }
  }
}
// 鼠标滑动停止后500毫秒才执行 mouseMove，实现防抖
box.addEventListener('mousemove', throttle(mouseMove, 500)) 
```

--

## 11. 迭代器与生成器

### 11.1 迭代器

迭代器是一种接口，为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署 **Iterator** 接口，就可以完成遍历

1. ES6 提供了一种新的遍历方式：`for ... of`，iterator 主要供 `for...of` 来遍历

`for...in` 与 `for...of` 的区别：  
> `for...in` 用于遍历可枚举的属性，`for...of` 用于遍历可迭代的属性，前者通常用于遍历对象的 key，后者通常用于遍历数组的值

2. 原生具备 **iterator** 接口的数据结构：
- Array
- Arguments
- Set
- Map
- String
- TypedArray
- NodeList

3. 工作原理

- 创建一个指针，指向当前数据结构的起始位置
- 第一次调用对象的 `next` 方法，指针自动指向数据结构的第一成员
- 不断调用 `next` 方法，指针后移，直至指向最后一个成员
- 每次调用 `next` 方法返回一个包含 `value` 和 `done` 属性对象

```javascript
// 让对象可遍历，实现iterator接口，返回一个包含 next 属性的对象
// next 方法需要返回包含 value 和 done 属性的对象
const banji = {
  name: '终极一班',
  stus: [
    '小明',
    '小红',
    '小花'
  ],
  [Symbol.iterator]() {
    let index = -1
    let done = false
    let that = this
    return {
      next: function () {
        index++
        if (index >= that.stus.length) {
          done = true
        }
        return {
          value: that.stus[index],
          done
        }
      }
    }
  }
}
// 遍历
for (let v of banji) {
  console.log(v);
}
```

### 11.2 生成器

#### 11.2.1 生成器声明与调用

生成器是 ES6 提供的一种**异步编程**解决方案，语法行为与传统函数不同

生成器是一个特殊的函数，本质上是一个特殊的迭代器

```javascript
function* gen() {
  // yield 认为是函数代码的分隔符
  console.log('a')
  yield '1'
  console.log('b')
  yield '2'
  console.log('c')
  yield '3'
}

let iterator = gen()
iterator.next(); // a
iterator.next(); // b
iterator.next(); // c

for (let v of iterator) {
  console.log(v) // 会打印 a, 1, b, 2，c, 3
}
```

注意：`yield` 关键字只能放在生成器函数中，后面可以跟字面量或表达式，在每一次调用 `next` 方法时返回

#### 11.2.2 生成器函数参数

可以给生成器函数传参，也可以在生成器每次调用 `next` 方法时传参

```javascript
function* gen(args) {
  console.log(args)
  let one = yield '1'
  console.log(one)
  let two = yield '2'
  console.log(two)
  let three = yield '3'
  console.log(three)
}
let iterator = gen();
iterator.next();
iterator.next('AAA') // one值为AAA，第二次调用next入参作为第一个yield返回值
iterator.next('BBB') // two值为BBB，第三次调用next入参作为第二个yield返回值
```