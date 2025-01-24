---
title: JavaScript 基础知识
date: 2023-09-17 20:19:21
updated:
tags:
 - JavaScript
 - 笔记
categories: 
 - 笔记
keywords: 'Javascript,JS,JS基础'
description: 关于 JavaScript 的基础知识，比如变量、数据类型等
---

## 1. 介绍
 
### 1.1 JS 组成

Javascript 包括两个部分：ECMAScript 和 Web APIs

ECMAScript：规定了 JS 基础语法核心知识，比如变量，分支语句等

Web APIs：

* **DOM** 文档对象模型，可以对页面元素进行移动，添加删除等操作
* **BOM** 浏览器对象模型，可以操作页面弹窗，存储数据到浏览器等

### 1.2 书写位置

内部 JavaScript：直接写在 `html` 文件里，用 `<script>` 标签包住，规范的位置是写在 `</body>` 上面

外部 Javascript：将代码写在 `.js` 结尾的文件里，再通过 `<script>` 标签引入到 `html` 文件，此时，`<script>` 标签对中间不能再写代码。同样，最好将 `<script>` 标签对放在 `</body>` 上面

内联 Javascript：将代码写在标签内部

```html
<body>
<button onclick="alert('加油')">点击我月薪过万</button>
</body>
```

### 1.3 注释

单行注释：`// 注释内容`

多行注释：`/* 注释内容 */`

### 1.4 输入输出

输出：  
  - `document.write('输出的内容')`：向 `body` 内输出内容，如果输出内容写的是标签，也会被解析成网页元素
  - `alert('输出的内容')`：页面弹出模态警示框
  - `console.log('输出的内容')`：控制台输出语法，开发人员调试使用

输入：  
  * `prompt()`：该方法可以弹出模态框，参数是显示给用户的提示信息，返回用户输入的结果
  ```js
  let username = prompt('请输入用户名')
  ```
  * `confirm()`：该方法弹出一个模态框，参数是设置的问题，用户点击确定返回 true ，取消或关闭模态框，返回 false
  ```js
  let result = confirm('确定删除用户？')
  ```

Javascript 语句执行顺序：
  * 按 HTML 文档流顺序执行 JS 代码
  * 模态框语句会跳过页面渲染先被执行，因此执行在 `document.write()` 之前

---

## 2. 变量
 
### 2.1 基本使用

通过 `let` 关键字声明变量，在同一作用域下不能重复声明一样的变量名，块级作用域

```js
let age = 18, name = 'tom';
let a, b, c;
// 建议一行只声明一个变量，可读性更好
```

### 2.2 命名规范

- 变量名只能用**字母**、**数字**、**下划线**和 `$` 组成，且数字不能开头
- 字母严格<font color="red">区分大小写</font>
- 建议<font color="red">使用小驼峰式命名</font>

### 2.3 与 var 的区别

在较老的 JS 版本中，使用 `var` 关键字定义变量，现在开发一般不再使用，主要区别 如下：  
- `var` 没有块级作用域，要么在当前函数内可见，要么全局可见
- `var` 允许同一作用域下重复声明，后面的声明会覆盖前面的
- `var` 声明的变量，可以在声明语句前被调用，这种叫做“提升”，即自动将声明语句提 升到函数开头，但赋值操作不会提升

### 2.4 数组基本使用

声明一个数组：

```js
let array = []
```

通过 `array.length` 可以获得数组的长度

与 java 不同，JS 的索引不存在时也可以赋值，比较灵活：

```js
let array = [1, 2]
alert(array.length) // 2
array[8] = 9
alert(array.length) // 9
alert(array[3]) // undefined
```

---

## 3. 常量

通过 `const` 关键字声明常量，块级作用域，在声明时必须赋值

```js
const PI = 3.14
```

命名规范：如果在声明时已知常量值，则使用全大写命名，不同单词用下划线隔开，如果值未知，则命名规范与变量相同

---

## 4. 数据类型

基本数据类型（值类型）：`number` 数字类型、`string` 字符串类型、`boolean` 布尔类型、`undefined` 未定义类型、`null` 空类型

引用数据类型：`object` 类型

- 值类型变量存储的是值本身
- 引用类型变量存储的是地址（引用）
- 通过 new 构造函数创造的对象都是引用数据类型，如 Object、Array、Date 等

堆栈空间分配区别：

- 栈：由操作系统自动分配和释放，存放函数的参数值，局部变量的值，<font color="red">基本数据类型存在栈中</font>
- 堆：存储复杂类型，由程序员或垃圾回收机制分配释放，<font color="red">引用数据类型存在堆中</font>

### 4.1 数字类型 Number

number 类型代表整数和浮点数

特殊值：

- `NaN` ，代表计算错误，是粘性的，任何对 `NaN` 的任何数学运算都会返回 `NaN`（例外：`NaN ** 2 == 1`）
- `Infinity/-Infinity`：数学概念中的无穷大和无穷小

### 4.2 字符串类型 String

通过单引号 `''` 、双引号 `""` 或 反引号包裹的数据都是字符串，单引号和双引号没有本质区别，推荐单引号 

转义符 `\` 有效

使用 `+` 可以做字符串拼接

**模板字符串**

使用场景：拼接字符串和变量

语法：只能使用反引号，变量用 `${}` 包住

```js
let age = 18
document.write(`我今年${age}岁了`)
```

### 4.3 布尔类型、undefined 和 null

布尔类型字面量是 `true` 和 `false`

未定义类型是比较特殊的类型，只有一个值 undefined

变量声明未赋值默认就是 undefined 

null 仅仅是一个代表 “无”、“空” 或 “值未知” 的特殊值

undefined 表示没有赋值，null 表示赋值了，但内容为空

<font color="red">''、0、undefined、null、NaN 转化为布尔类型均为  false，其余为 true</font>

### 4.4 bigint 类型

```javascript
// 普通整数后加n即为大整数
let n = 521n;
// 函数将普通整数转为大整形
let a = 12;
let n = BigInt(a)
// bigint类型不能与普通数值做运算，只能与bigint类型运算
let max = Number.MAX_SAFE_INTEGER;
console.log(BigInt(max) + BigInt(2))
```

### 4.5 检测数据类型

typeof 运算符可以返回被检测的数据类型

1. 作为运算符：`typeof xxx`
2. 函数：`typeof(xxx)`

### 4.6 类型转换

**隐式转换**

某些运算符被执行时，内部会自动将数据进行类型转换

* `+` 号两边只要有一个字符串，都会把另一个转为字符串
* 除了 `+` 之外的运算符都会尝试把数据转为数字类型
* `+` 号单目运算时可以将字符串转为数字
* ""、null 转为数字为 0，undefined 转为数字为 NaN

**显式转换**

转为数字型：

* `Number(xxx)`：转换失败结果为 NaN

```js
Number('12px') // NaN
```

* `parseInt(xxx)`：只保留整数部分，进行截断操作，不是四舍五入

```js
parseInt('12.34px') // 12
```

* `parseFloat(xxx)`：可以保留小数

```js
parseFloat('12.34px') // 12.34
```

---

## 5. 运算符

### 5.1 赋值运算符

对变量进行赋值：`=` 、`+=` 、`-=` 、`*=` 、`/=`

### 5.2 一元运算符

如果一个运算符对应的只有一个运算元，那么它是 **一元运算符**，比如正负号、自增、自减

一个运算符拥有两个运算元，那么它是 **二元运算符**

### 5.3 比较运算符

* `>`  、`<` 、`>=` 、`<=`
* `==` ：<font color="red">左右两边值是否相等</font>，会进行类型转换
* `===`：<font color="red">左右两边是否类型和值都相等</font>，不进行类型转换
* `!=`：左右两边值是否不相等，会进行类型转换
* `!==`：左右两边是否类型和值都不相等，不进行类型转换
* NaN 与任何数据比较结果都为 false
* 字符串比较字符的 ascii 码，从左往右依次比较

### 5.4 逻辑运算符

`&&`：逻辑与，两边为 true 结果才为 true，都为 false，则返回第一个值，后面不再执行，第一个为 true，则返回第二个值
`||`：逻辑或，两边有一边为 true 结果为 true，第一个为 true ，则返回第一个值，后面不再执行，第一个为 false，则返回第二个值
`!`：逻辑非

### 5.5 运算符的优先级

| 优先级 | 运算符     | 顺序              |
| ------ | ---------- | ----------------- |
| 1      | 小括号     | ()                |
| 2      | 一元运算符 | ++  --  ！        |
| 3      | 算数运算符 | 先*  /  % 后 +  - |
| 4      | 关系运算符 | <  <= > >=        |
| 5      | 相等运算符 | ==  !=  ===  !==  |
| 6      | 逻辑运算符 | 先 && 后 \|\|     |
| 7      | 赋值运算符 | =                 |
| 8      | 逗号运算符 | ,                 |

---

## 6. 语句

### 6.1 表达式和语句

表达式是可以被求值的代码，会得到一个结果，可以<font color="red">写在赋值语句的右侧</font>

语句不一定有值

### 6.2 分支语句

**if 语句**

```js
if (条件表达式) {
  代码
} else if (条件表达式) {
  代码
} else {
  代码
}
```

**三目运算符**

```js
条件表达式 ? 满足条件执行的代码 : 不满足条件执行的代码
```

**switch 语句**

```js
switch (数据) {
    case 值1: 
    	代码1
      break
  	case 值2:
    	代码2
      break
  	default:
    	代码n
      break
}
```

执行过程：找到与小括号里<font color="red">全等的 case 值</font>，并执行里面的代码，若没有全等 `===` 的则执行 default 里的代码

switch case 需要配合 break 关键字使用，没有 break 会造成 case 穿透

### 6.3 循环语句

**while 循环**

```js
while (条件) {
  要重复执行的代码
}
```

**for 循环**

```js
for (变量起始值; 终止条件; 变量变化量) {
  循环体
}
```

continue：结束本次循环，继续下次循环
break：退出循环

---

## 7. 数组

数组是可以按顺序保存数据的数据类型

### 7.1 基本使用

声明语法

```js
// 1. 通过字面量声明
let 数组名 = [数据1, 数据2, 数据3, ...];

// 2. 通过构造函数声明
let 数组名 = new Array(数据1, 数据2, 数据3, ...)
```

### 7.2 操作

* 查询：数组[下标]
* 修改：数组[下标] = 新值
* 增加：
  * `arr.push(数据)`：将一个或多个元素添加到数组末尾，并返回数组新的长度
  * `arr.unshift(数据)`：将一个或多个元素添加到数组开头，并返回数组新的长度
* 删除：
  * `arr.pop()`：删除数组最后一个元素，并返回被删除的元素
  * `arr.shift()`：删除数组第一个元素，并返回被删除的元素
  * `arr.splice(起始位置, 删除元素个数)`：删除指定元素，第二个参数可选，默认从起始位置删除到最后

---

## 8. 函数

### 8.1 基本使用

声明：

```js
function 函数名() {
  函数体
}
```

调用：`函数名()`

命名规范：

* 和变量命名基本一致
* 尽量使用小驼峰命令
* 使用动词做前缀

在非严格模式下，可以声明两个同名函数，此时后面的会覆盖前面的

### 8.2 参数

```js
function 函数名(参数列表) {
  函数体
}
```

调用：`函数名(传入参数列表)`

函数声明时括号内参数叫形参，调用时传入的叫实参

形参可以理解为函数内声明的变量，实参可以理解为给这个变量赋值

在 Javascript 中，实参个数和形参个数可以不一致：

* 如果形参过多，会自动填上 undefined
* 如果实参过多，多余的实参会被忽略

默认参数

```js
function fun(a=1) {
  alert(a)
}
fun() // 1
fun(5) // 5
```

默认值只有在缺少实参传递时才会被执行

### 8.3 返回值

当函数需要返回数据时，用 return 关键字

return 会立即结束当前函数，后面的代码不会再被执行，因此 return 后的数据不能换行写

函数可以没有 return，此时默认返回 `undefined`

### 8.4 作用域

全局作用域：作用于所有代码执行的环境（整个 script 标签内部）或独立的 js 文件

局部作用域：作用于函数内代码环境或者代码块内

特殊情况：在局部作用域中变量未声明而直接赋值，会作为全局变量（强烈不推荐）

```js
function fun() {
  num = 2;
}
console.log(num) // 2，即使外部没有声明，也能访问，相当于外部找不到后默认用 var 声明
```

访问原则：在能访问到的情况下，先局部，局部没有到上层找，直到全局

### 8.5 匿名函数

具名函数：`function fun() {}`

匿名函数：`function() {}`

匿名函数通常需要将函数表达式赋值给变量，通过变量调用

<font color="red">具名函数调用可以在任何位置，而匿名函数调用需要在函数变量赋值之后</font>

**立即执行函数**：用于防止变量污染

```js
// 方式一
(function(x, y) {console.log(x + y)})(1, 2);
// 方式二
(function(x, y) {console.log(x + y)}(1, 2));
// 不需要调用，直接执行，必须加分号
```

---

## 9. 对象

### 9.1 基本使用

对象（Object）是一种数据类型，可以理解为无需的数据集合

声明语法：

```js
// 1.字面量
let 对象名 = {}

// 2.构造函数
let 对象名 = new Object()
```

对象由属性名和属性值这样的键值对构成，属性名是字符串，但引号可以省略，属性值可以是字面量、表达式、函数

* 查询：对象名.属性名/对象名[属性名]
* 重新赋值：对象名.属性名 = 新值
* 对象添加新数据：对象名.新属性名 = 新值
* 删除对象属性：delete 对象名.属性名

```js
let person = {
  name: 'wang'，
  sayHi: function() {
    alert("hello")
  }
}
person.sayHi() // 调用方法
```

### 9.2 遍历对象

对象遍历需要使用 for-in 语法

对于数组：

```js
let arr = ['pink', 'red', 'blue']
for(let k in arr) { // k 是数组的索引，但是字符串类型
  consloe.log(typeof k) // string
  consloe.log(arr[k]) // 隐式转换为number类型
}
```

for-in 语法在数组中很少使用

对于对象：

```js
let person = {
  name: 'pink',
  age: 18,
  gender: 'male'
}
for(let key in person) {
  consloe.log(person[key]) // key是字符串，只能通过这种方式取属性值
}
```

### 9.3 内置对象

Javascript 内部提供了一些对象供开发者使用

**Math 内置对象**

主要方法有：

* `random`：生成 0-1 之间的随机小数，包含 0 不包括 1
* `ceil`：向上取整
* `floor`：向下取整
* `round`：四舍五入取整
* `max`：最大数
* `min`：最小数
* `pow`：幂运算
* `abs`：绝对值

```js
// 取N-M的随机整数
getRandom(N, M) {
  return Math.floor(Math.random() * (M - N + 1)) + N
}
```

---

## 10. 集合

ES6 提供了一种新的数据结构 **Set** 集合，类似于数组，区别在于集合的元素是唯一的，集合实现了 **iterator** 接口，可以使用 `for...of` 遍历

常用属性和方法：
- `size`：返回集合的元素个数
- `add()`：增加一个新元素，返回当前集合
- `delete()`：删除元素，返回 boolean 值
- `has()`：检测集合中是否包含某元素，返回 boolean 值

```javascript
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]
// 1. 数组去重
let result = [...new Set(arr)]
// 2. 交集
let arr1 = [5, 2, 0]
let set1 = new Set(arr1)
let result = [...new Set(arr)].filter(item => {
  return set1.has(item)
})
// 3. 并集
let result = [...new Set([...arr, ...ar1])]
```

---

## 11. 映射

ES6 提供了 `Map` 数据结构，类似于对象，也是键值对集合，但是键不限于字符串，各种类型的值包括对象都可以作为键

Map 也实现了 **iterator** 接口，所以可以使用扩展运算符和 `for...of` 进行遍历

常用属性和方法：
- `size`：返回元素的个数
- `set(k, v)`：新增一个新元素，返回当前 Map
- `get(k)`：返回键名对象的键值
- `has(k)`：检测 Map 中是否包含某个键值
- `clear()`：情况集合，返回 `undefined`

--- 

## 12. class 类

### 12.1 初体验

```javascript
class Person {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }

  setName(name) {
    this.name = name
  }

  setAge() {
    this.age = age
  }
}

let p = new Person('tom', 18)
p.getName() // tom
```

### 12.2 静态成员

```javascript
class Person{
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static type = 'Person'
}
let p = new Person('tom', 18)
p.type // undefined
Person.type // Person
```

### 12.3 构造函数实现继承

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Man(name, age) {
  Person.call(this, name, age)
}

// 设置子级构造函数的原型
Man.prototype = new Person;
Man.prototype.constructor = Man

// 声明子类方法
Man.prototype.say = function() {
  console.log('hello world')
}

let man = new Man('tom', 18)
```

### 12.4 类实现继承

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  say() {
    console.log('hello world')
  }
}

class Man {
  constructor(name, age) {
    // 调用父类构造方法
    super(name, age)
  }

  run() {
    console.log('running man')
  }

  // 重写
  say() {
    super.say() // 调用父类方法
    console.log('hi')
  }
}

let man = new Man('tom', 18)
man.say()
man.run()
```

### 12.5 get 和 set

class 支持 **get** 和 **set** 特性，在对属性读写时执行一些操作

```javascript
class Person {
  constructor(name) {
    this._name = name
  }
  get name() {
    console.log('name被读取了')
    return this._name
  }
}
```

### 12.6 私有属性

```javascript
class Person {
  name;
  // 私有属性
  #age;

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
}

let p = new Person('tom', 18)
console.log(p.#age) // 报错，只能在类内部操作
```

---

## 13. 数值拓展

- `Number.EPSILON` 是 Javascript 表示的最小精度，常用于浮点数值计算，如果两个数差值小于这个值，则认为两个数相等

```javascript
0.1 + 0.2 === 0.3 // false
// 由于精度问题，浮点数运算判断相等最好用差值判断：
function equal(a, b) {
  return Math.abs(a-b) < Number.EPSILON
}
```

- 二进制前面加 `0b`，八进制加 `0o`，十六进制加 `0x`

```javascript
let a = 0b1010;
let b = 0o777;
let c = 0xff;
```

- `Number.isFinite()`：判断一个数是否为有限数
- `Number.isNaN()`：检测一个数是否为 `NaN`
- `Number.parseInt()`/`Number.parseFloat`：将字符串转为 Number
- `Number.isInteger()`：判断是否为整数
- `Math.trunc()`：将数字的小数部分抹掉
- `Math.sign()`：判断一个数是正数、0 还是负数，是正数返回 1，0 返回 0，负数返回 -1