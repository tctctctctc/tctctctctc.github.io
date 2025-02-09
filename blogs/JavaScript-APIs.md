---
title: JavaScript-APIs
date: '2023-10-25'
updated: '2025-02-05'
tags: 
  - JavaScript
  - 笔记
categories:
  - 笔记
keywords: 'Javascript,JS,DOM操作'
description: 关于 JavaScript 的常用 API，比如 DOM 操作相关 API
cover: https://pic1.imgdb.cn/item/6649c59ed9c307b7e927566e.png
---

## 1. DOM -获取元素

### 1.1 const 优先

声明变量时应优先使用 `const`，后面发现变量需要修改，再改用 `let` 声明

对于引用数据类型，只要变量的引用地址不变，就可以用 `const` 声明

const 优先是防止不能改变的变量在后续被改变

### 1.2 一些概念

**DOM**：文档对象模型，用于操作网页内容

**DOM 树**：HTML 文档以树形结构表现，称为文档树或 DOM 树，其<font color="red">直观体现了标签与标签之间的关系</font>

**DOM 对象**：浏览器根据 HTML 标签生成的 JS 对象

* 所有标签属性都能在这个对象身上找到
* 修改这个对象的属性会自动映射到标签上
* DOM 核心思想是把网页内容当作对象来处理

**document 对象**：网页所有内容均在 document 对象里，其属性和方法均用来访问和操作网页内容

**BOM**：浏览器对象模型

```js
console.dir(xxx) // 输出对象信息
```

### 1.3 获取 DOM 对象

根据 css 选择器来获取 DOM 元素

```js
// 语法：document.querySelector(css选择器) 获取匹配的第一个元素，如果没有找到，则返回 null
const li = document.querySelector('ul li:first-child')

// 语法：document.querySelectorAll(css选择器) 选择匹配的多个元素，返回对象伪数组
// 伪数组：有长度和索引，但没有 pop、shift等数组方法
```

根据 id 来获取一个元素

```js
document.getElementById('nav') // 返回对象
```

根据标签获取一个或多个元素

```js
document.getElementsByTagName('div') // 返回伪数组
```

根据类名获取一个或多个元素

```js
document.getElementsByClassName('title') // 返回伪数组
```

### 1.4 操作元素的内容

想要修改标签元素里面的内容，可以使用如下方式：

- `DOM 对象.innerText 属性`
- `DOM 对象.innerHTML 属性`

**InnerText 属性**：

- 将文本内容添加/更新到任意标签位置
- 显示纯文本，不解析标签

**InnerHTML 属性**：

- 将文本内容添加/更新到任意标签位置
- 会解析标签，多标签建议使用模板字符

### 1.5 操作元素属性

#### 1.5.1 操作元素常用属性

可以直接通过属性名进行修改，如给图片标签设置 `src` 属性：

```javascript
// 1. 获取元素
const pic = document.querySelector('img')
// 2. 操作元素
pic.src = './images/bg.png'
pic.title = '背景图'
```

#### 1.5.2 操作元素样式属性

1. 通过 **style** 属性修改样式：生成的是行内样式，权重比较高

```javascript
const box = document.querySelector('.box')
// 修改元素样式
box.style.width = '200px'
box.style.marginTop = '15px' // 多个单词采用小驼峰
box.style.backgroundColor = 'pink'
```

2. 通过 **className** 属性修改样式

如果修改的样式比较多，直接通过 **style** 修改比较繁琐，可以通过给元素设置类名来修改样式

```javascript
box.className = 'box nav'
```

注意：**className** 是使用新值替换旧值，如果需要添加一个类，需要保留之前的类名

3. 通过 **classList** 属性修改样式

使用 **className** 容易覆盖以前的类名，可以通过 **classList** 方式追加和删除类名

```javascript
// 追加一个类
DOM对象.classList.add('类名')
// 删除一个类
DOM对象.classList.remove('类名')
// 切换一个类，有就删除，没有则添加
DOM对象.classList.toggle('类名')
```

#### 1.5.3 操作表单元素属性

```javascript
const ipt = document.querySelector('input')
ipt.value = '123456'
ipt.type = 'password'
ipt.disabled = true
```

#### 1.5.4 自定义属性

在 H5 中推出的自定义属性，标签上一律以 `data-` 开头，在 DOM 对象上一律以 dataset 对象方式获取

```html
<body>
  <div class="box" data-id="10">盒子</div>
  <script>
    const box = document.querySelector('.box')
    console.log(box.dataset.id)
  </script>
</body>
```

### 1.6 定时器-间歇函数

1. 开启定时器：`setInterval(函数, 间隔时间)`

作用：每隔一段时间调用这个函数，间隔时间单位是毫秒

注意：定时器返回一个 id 数字作为标识

2. 关闭定时器

```javascript
let 变量名 = setInterval(函数, 间隔时间)
// 关闭
clearInterval(变量名)
```

---

## 2. DOM-事件基础

### 2.1 事件监听

事件监听就是监测是否有事件发生，一旦有事件触发，就调用一个函数做出响应，也称为绑定事件

**语法**（L2）：`元素对象.addEventListener('事件类型', 要执行的函数, 事件触发阶段)`

```javascript
btn.addEventListener('click', function(){
  console.log('hello')
})

btn.click() // 利用 js 触发点击事件
```

**以前的版本**（L0）：`元素对象.on事件 = function() {}`

```javascript
btn.onclick = function() {
  console.log('hello')
}
```

区别：`on` 采取赋值方式，会被覆盖，`addEventListener` 绑定多次不会覆盖，相当于追加，更推荐 `addEventListener`

### 2.2 事件类型

鼠标事件：

- `click`：鼠标点击
- `mouseenter`：鼠标经过（推荐，没有冒泡效果）
- `mouseleave`：鼠标离开（推荐，没有冒泡效果）
- `mouseover`：鼠标经过（不推荐，会有冒泡效果）
- `mouseout`：鼠标离开（不推荐，会有冒泡效果）

焦点事件：

- `focus`：获得焦点
- `blur`：失去焦点

键盘事件：

- `keydown`：键盘按下触发
- `keyup`：键盘抬起触发

文本事件：

- `input`：用户输入事件

```javascript
const ipt = document.querySelector('input', function(){
  console.log(ipt.value) // 用户输入时获得输入内容
})
```

### 2.3 事件对象

事件对象封装了事件触发时的相关信息

部分使用场景：

- 判断用户按下哪个按键
- 判断鼠标点击了哪个元素

事件绑定的回调函数的第一个参数默认就是事件对象

部分常用属性：

- `type`：获取当前的事件类型
- `clientX/clientY`：获取光标相对于浏览器可见窗口左上角的位置
- `offsetX/offsetY`：获取光标相对于当前 DOM 元素左上角的位置
- `key`：用户按下的键盘的值，现在不提倡使用 keyCode，因为不同品牌同样键的 keyCode 可能不同

```javascript
tx.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') { // 利用事件对象判断按下哪个按键
        item.style.display = 'block'
      }
}
```

补充：`str.trim()`，利用 `trim()` 可以去掉字符串左右两边的空格

### 2.4 环境对象 this

- 环境对象指的是函数内部特殊的变量 `this`，代表当前函数运行时所处的环境
- 除箭头函数外，每个函数里都有 `this` 环境对象
- 函数调用方式不同，`this` 指向也不同，粗略认为谁调用该函数，`this` 就指向谁

### 2.5 回调函数

- 如果将函数 A 作为参数传递给函数 B，则称函数 A 为回调函数
- 回调函数本质就是函数，只不过把它当参数使用
- 使用匿名函数作为回调函数比较常见

## 3. DOM-事件进阶

### 3.1 事件流

<font color="red">事件流</font>指的是事件完整执行过程中的流动路径

![](https://pic.imgdb.cn/item/65a165fd871b83018abfe89f.png)

假如有个 div 元素，触发事件时会经历两个阶段：**捕获阶段**和**冒泡阶段**

> 捕获阶段是从父到子，冒泡阶段是从子到父

**事件捕获**

从 DOM 根元素开始执行对应的事件

补充知识：

- `addEventListener()` 第三个参数传入 true 代表捕获阶段触发（很少使用），传入 false 代表冒泡阶段触发，默认为 false
- 使用 `.on事件=function(){}` 方式只能在冒泡阶段触发

**事件冒泡**

当一个元素被触发时，同名的事件将会在该元素的所有祖先元素中依次被触发，称为事件冒泡，事件冒泡默认存在

**阻止冒泡**

在回调中，事件对象调用 `stopPropagation()` 可以阻止冒泡

```javascript
btn.addEventListener('click', function(e){
  e.stopPropagation()
})
```

**解绑事件**

对 on 事件方式，直接使用 null 覆盖可以实现解绑

```javascript
// 绑定事件
btn.onclick = function() {
  alert("hello")
}
// 解绑
btn.onclick = null
```

对 `addEventListener()` 方式必须使用 `removeEventListener()` 解绑：

```javascript
function fn() {
  alert("")
}
// 绑定事件
btn.addEventListener('click', fn)
// 解绑
btn.removeEventListener('click', fn)
```

如果 `addEventListener()` 绑定了匿名函数，则无法解绑

**两种注册事件的区别**

传统 **on** 注册（L0）:

- 同一个对象，后面注册的同名事件会覆盖前一个
- 直接 null 覆盖就可以实现事件的解绑
- 都是冒泡阶段执行

事件监听注册（L2）：

- 语法：`addEventListener(事件类型, 事件处理函数, 是否使用捕获)`
- 后面注册的同名事件不会覆盖前面注册的事件
- 可以通过第三个参数确定是在冒泡还是在捕获阶段触发
- 必须使用 `removeEventListener(事件类型, 事件处理函数, 捕获或冒泡阶段获取)` 解绑事件
- 匿名函数无法解绑

### 3.2 事件委托

事件委托是利用事件流的特征来解决一些开发需求

优点：减少注册次数，可以提高程序性能

原理：利用事件冒泡，给<font color="red">父元素注册事件</font>，当触发子元素时，会冒泡到父元素身上，从而触发父元素的事件

实现：`事件对象.target.tagName` 可以获得真正触发事件的元素

```javascript
// 点击每个li，把文字变成红色
const u = document.querySelector('ul')
u.addEventListener('click', function(e){
  if(e.target.tagName === 'LI') {
  	e.target.style.color = 'red'
  }
})
```

### 3.3 其它事件

**阻止默认行为**

```javascript
const form = document.querySelector('form')
form.addEventListener('click', function(e){
  // 阻止默认行为，如阻止表单按钮默认提交
  e.preventDefault()
})
```

**页面加载事件**

`load`：加载外部资源（如图片、css、js文件等）完成时触发的事件

```javascript
// 页面所有资源加载完毕触发
window.addEventListener('load', function() {
  // 执行的操作
})
```

注意：不光可以监听整个页面资源，也可以针对某个资源绑定 **load** 事件

`DOMContentLoaded`：初始 HTML 文档完成加载解析后触发，无需等待样式表、图像等加载完成

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // 执行的操作
})
```

注意：需要给 `document` 绑定

**元素滚动事件**

`scroll`：滚动条滚动时触发的事件

```javascript
// 监听整个页面的滚动
window.addEventListener('scroll', function(){
  // 执行的操作
})
```

元素 `scrollLeft` 和 `scrollTop` 属性：元素往右，往下滚动的距离，这两个属性可读可写，赋值只能是数值型，不带单位

```javascript
// 页面滚动事件
window.addEventListener('scroll', function(){
  // document.documentElement 是html元素获取方式
  // document.body 是body元素获取方式
  const n = document.documentElement.scrollTop
})
```

`元素.scrollTo(x, y)`：把内容滚动到指定区域，参数分别是 x 轴和 y 轴偏移距离

```javascript
// 让页面滚动到 y 轴 1000 像素的位置
window.scrollTo(0, 1000)
```

**页面尺寸事件**

`resize`：在窗口尺寸发生变化时触发

```javascript
window.addEventListener('resize', function(){
  // 执行的代码
})
```

### 3.4 元素尺寸与位置

**获取宽高**

`clientWidth` 和 `clientHeight`：获取元素可见部分的宽高（不包 border，margin，滚动条等）

`offsetWidth` 和 `offsetHeight`：获取元素自身宽高，包含 padding、border

**获取位置**

`offsetLeft` 和 `offsetTop`：获取元素距离最近一级定位祖先元素的左、上距离，注意是<font color="red">只读属性</font>

## 4. DOM-节点操作

### 4.1 时间对象

实例化:

```javascript
const date = new Date() // 获得当前时间
const date1 = new Date('2023-11-17 08:30:00') // 指定时间
```

常用方法：

- `getFullYear()`：获得年份
- `getMonth()`：获得月份，取值为 0~11
- `getDate()`：获得日期
- `getDay()`：获得星期，星期天返回 0
- `getHours()`：获得小时
- `getMinutes()`：获得分钟
- `getSeconds()`：获得秒
- `toLocaleString()`：格式化的年月日时分秒
- `toLocaleDateString()`：年月日
- `toLocaleTimeString()`：时分秒

三种方式获取时间戳（1970 年 01 月 00 时 00 分 00 秒到现在的毫秒数）：

1. 使用 `getTime()` 方法

```javascript
const date = new Date()
console.log(date.getTime())
```

2. 简写 `+new Date()`

```javascript
console.log(+new Date())
```

3. 使用 `Date.now()`

```javascript
console.log(Date.now())
```

注意：第三种只能获得当前时间的时间戳，前两种能获得指定时间的时间戳

### 4.2 节点操作

#### 4.2.1 DOM 节点

DOM 树里每个内容都称为 DOM 节点

节点类型：

- 元素节点：所有标签，html 是根节点
- 属性节点：所有属性
- 文本节点：所有文本

#### 4.2.2 查找节点

**父节点查找**：

- `子元素.parentNode` 属性
- 返回最近一级父节点，找不到返回 null

**子节点查找**：

`父元素.childNodes` 属性：获得所有子节点，包括文本节点，注释节点等

`父元素.children` 属性：

- 仅获得所有元素节点
- 返回的是伪数组

**兄弟关系查找**：

`nextElementSibling` 属性：下一个兄弟元素节点

`previousElementSibling` 属性：上一个兄弟元素节点

#### 4.2.3 新增节点

**创建元素节点**：

```javascript
// 创建元素节点
document.createElement('标签名')
```

**追加节点**：

```javascript
// 插入到父元素的子元素的最后
父元素.appendChild(要插入的元素)
// 插入到父元素的某个子元素之前
父元素.insertBefore(要插入的元素, 在哪个元素之前)
```

**克隆节点**：

```javascript
// 克隆一个已有的元素节点
元素.cloneNode(布尔值)
// 布尔值为 true，代表克隆时包含后代节点一起克隆，为 false 则不包含，默认为 false
```

### 4.2.4 删除节点

在原生 DOM 操作中，只能通过父元素删除元素

```javascript
// 删除元素
父元素.removeChild(要删除的元素)
```



## 5. BOM-浏览器操作

### 5.1 Window 对象

#### 5.1.1 BOM

- BOM 是浏览器对象模型
- window 对象是<font color="red">全局对象</font>，可以说是 JS 中的顶级对象
- 基本上 BOM 中常用的属性和方法都是 window 的
- 所有通过 `var` 定义在全局作用域的变量、函数都会变成 window 对象的属性和方法
- window 对象的属性和方法在调用时可以省略 window

![](https://pic.imgdb.cn/item/65a1f6a8871b83018aecbfa1.png)

#### 5.1.2 定时器-延时函数

`setTimeout()` 函数会延时执行回调，只执行一次

```javascript
const timer = setTimeout(回调函数, 等待的毫秒数)
// 清除延时函数，在递归场景适用
clearTimeout(timer)
```

#### 5.1.3 JS 执行机制

JS 一大特点就是<font color="red">单线程</font>，前一任务结束才会执行下一任务

在 H5 之后，允许 JS 脚本创建多个线程，于是出现了<font color="red">同步</font>和<font color="red">异步</font>

> 同步（阻塞）：前一个任务结束后再执行后一个，程序的执行顺序和任务的排列顺序是一致的，同步的
>
> 异步（非阻塞）：不用严格按照任务排列顺序执行，某一任务耗时长，可以先执行后面的

**同步任务**：都在主线程执行，形参一个执行栈

**异步任务**：JS 的异步任务通过回调函数实现

异步任务有三种类型：

1. 普通事件，如 `click`、`resize` 等
2. 资源加载，如 `load`、`error` 等
3. 定时器，如 `setInterval`、`setTimeout` 等

异步任务添加到任务队列（消息队列）中

**JS 执行机制**：

1. 先执行执行栈中的同步任务
2. 将异步任务放到任务队列
3. 一旦执行栈中所有同步任务执行完毕，系统会按次序读取任务队列中的异步任务进入执行栈，开始执行

> 由于主线程不断获得任务，执行任务，再获得，再执行，所以这种机制又称为事件循环

#### 5.1.4 location 对象

**location** 对象拆分并保存了 URL 地址的各个组成部分

常用属性：

- `href` 属性：获取完整的 URL 地址，对其赋值时用于跳转
- `search` 属性：获取地址中携带的参数，即 `？` 后面那部分
- `hash` 属性：获取地址中的哈希值，符号 `#` 后面部分

方法：

- `reload()`：刷新当前页面，传入 true 表示强制刷新

```javascript
let btn = document.querySelector('button')
btn.addEventListener('click', function(){
  location.reload(true) // 强制刷新
})
```

#### 5.1.5 navigator 对象

navigator 对象记录了浏览器自身的相关信息

常用属性：

- `userAgent`：监测浏览器版本及平台

#### 5.1.6 history 对象

history 对象与浏览器地址栏的操作相对应，如前进、后退、历史记录等

方法：

- `back()`：后退
- `forward()`：前进
- `go(参数)`：前进后退功能，参数为 1 则前进 1 个页面，为 -1 则后退 1 个页面

### 5.2 本地存储

#### 5.2.1 localStorage

存数据：

```javascript
localStorage.setItem(key, value)
```

取数据：

```javascript
localStorage.getItem(key)
```

删除数据：

```javascript
localStorage.removeItem(key)
```

#### 5.2.2 sessionStorage

**sessionStorage** 用法基本与 **localStorage** 相同

区别：

- 作用域不同：`sessionStorage` 在当前会话（标签页）内有效，`localStorage` 可以在不同会话之间共享
- 生命周期不同：`sessionStorage` 的数据在会话结束时被清除，即当用户关闭浏览器标签页或窗口时清除，而 `localStorage` 的数据会永久保存，除非被用户主动清除
- 键值对形式存储
- 存储容量不同：sessionStorage 容量通常比 localStorage 小，一般前者容量限制在 5M 作用，后者在 5~10M 之间

#### 5.2.3 存储复杂数据类型

复杂数据类型（如对象）不能直接存储，需要先转化成 JSON 字符串再存

转 JSON：`JSON.stringify(obj)`

JSON 解析：`JSON.parse()`

```javascript
const obj = {
  name: 'pink',
  age: 18,
  gender: 'male'
}
// 复杂数据存储时要转为 JSON 对象
localStorage.setItem('obj', JSON.stringify(obj))
// 把 JSON 字符串转为对象
const person = JSON.parse(localStorage.getItem('obj'))
```

#### 5.2.4 数组 map 和 join

`map()` 方法可以遍历数组处理数据，并返回新的数组

```javascript
const arr = ['apple', 'orange', 'banana']
const newArr = arr.map(function(ele, index){
  return ele + 's'
})
console.log(newArr) // ['apples', 'oranges', 'bananas']
```

`join(分隔符)` 方法用于把数组中的所有元素转为一个字符串（拼接）

```javascript
const arr = ['Hello', 'World']
console.log(arr.join(''))
```

不传分隔符时默认以 `,` 分隔

## 6. 正则表达式

### 6.1 语法

正则表达式（Regular Expression）是用于匹配字符串中字符组合的模式，在 JS 中，正则表达式也是对象

**定义语法**：其中 `/ /` 是正则表达式的字面量

```javascript
const 变量名 = /表达式/
```

**判断是否有符合规则的字符串**：

```javascript
正则表达式.test(被检测的字符串)
// 匹配返回 true，不匹配返回 false
```

**检索符合规则的字符串**：

```javascript
正则表达式.exec(被检测的字符串)
// 匹配则返回数组，包括匹配的索引等信息，不匹配返回 null

// 命名捕获分组
let str = '<a href="http://www.baidu.com">百度</a>'
const reg = /<a href="(?<url>.*)">(?<tetx>.*)<\/a>/
const result = reg.excu(str)
console.log(result.groups.url)

// 正向断言和反向断言：根据目标字符的上下环境进行识别
let str1 = 'hello111world222你好'
// 正向断言，条件写在后面
const reg1 = /\d+(?=你)/
const result1 = reg1.excu(str1) // 匹配到222
// 反向断言，条件写在前面
const reg2 = /(?<=d)\d+/ 
const result2 = reg2.excce(str1) // 匹配到222
```

### 6.2 元字符

普通字符只能匹配字符串中相同的字符

元字符具有特殊含义，能更灵活地匹配字符

元字符分类：

1. 边界符：用来提示字符所处的位置

- `^`：表示匹配行首的文本（以谁开始）
- `$`：表示匹配行尾的文本（以谁结束）

```javascript
console.log(/哈/.test('哈')); // true
console.log(/哈/.test('哈哈')); // true
console.log(/哈/.test('二哈')); // true
console.log('---------------');
console.log(/^哈/.test('哈')); // true
console.log(/哈$/.test('哈哈')); // true
console.log(/^哈$/.test('二哈')); // false
```

2. 量词：设定某个模式出现的次数（对左边的模式起作用）

- `*`：重复 0 次或多次
- `+`：重复 1 次或多次
- `？`：重复 0 次或 1 次
- `{n}`：重复 n 次
- `{n, }`：重复 n 次或多次
- `{n, m}`：重复 n 到 m 次

3. 字符类

- `[ ]`：匹配字符集合，区分大小写

```javascript
[abc] // 匹配 abc 中的一个
[abc]{2} // 匹配 abc 中的两个，可以是 aa/ab/ac/ba/bb/bc/ca/cb/cc
[a-z] // 匹配 a 到 z 中的一个
[^a-z] // 除了 a-z 的字符
[a-zA-Z0-9] // 匹配 a 到 z，A 到 Z，0 到 9 中的一个
```

- `.`：匹配除换行符外的任何单个字符
- `\d`：匹配 0-9 之间任意数字，相当于 `[0-9]`
- `\D`：匹配 0-9 之外的任意字符，相当于 `[^0-9]`
- `\w`：匹配任意字母、数字、下划线，相当于 `[a-zA-Z0-9_]`
- `\W`：除所有字母、数字、下划线之外的字符，相当于 `[^a-zA-Z0-9_]`
- `\s`：匹配空格（包括换行、制表、空格等），相当于 `[\t\r\n\v\f]`
- `\S`：匹配非空格字符，相当于 `[^\t\r\n\v\f]`

### 6.3 修饰符

修饰符用于约束正则匹配的某些细节，如是否区分大小写，是否支持多行匹配等

语法：`/正则表达式/修饰符`

- 修饰符 `i`：不区分大小写
- 修饰符 `g`：匹配所有满足正则表达式的结果
- 修饰符 `s`：. 能匹配所有字符，不加则只能匹配除换行符外的字符

```javascript
console.log(/a/i.test('a')) // true
console.log(/a/i.test('A')) // true
```

### 6.4 字符串 replace

`str.replace(/正则表达式/, '替换的文本')` 方法可以将字符串中与正则匹配的部分进行替换

```javascript
const str = 'java是世界上最好的语言，快来学java吧'
const newStr = str.replace(/java/ig, 'JS')
```

### 6.5 字符串 matchAll

`matchAll()`：批量匹配提取

```javascript
let str = `
  <ul>
    <li>
      <a>肖申克的救赎</a>
      <p>时间：1994-09-10</p>
    </li>
    <li>
      <a>阿甘正则</a>
      <p>时间：1994-07-06</p>
    </li>
  </ul>  
`
// 定义正则， .*? 是禁止贪婪，避免对后面正则条件进行匹配
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
const result = str.matchAll(reg); // 返回一个可迭代对象
for (let v of result) {
  console.log(v) // 每次匹配的结果
}
```

---

## 7. ES6 模块化语法

### 7.1 初体验

模块功能主要由两个命令构成：
- `export` 命令用于规定模块的对外接口
- `import` 命令用于输入其它模块提供的功能

模块暴露 data.js ：

```javascript
export let school = "北境大学";

export function learn(params) {
  console.log("我在北境学外语");
}
```

模块引入：

```html
<!-- 方式一 -->
<script type="module">
  import * as data from './js/data.js'
  console.log(data);
</script>

<!-- 方式二 -->
<script src="./js/app.js" type="module"></script>
```

### 7.2 暴露方式汇总

1. 分别暴露

```javascript
export let school = "北境大学";

export function learn(params) {
  console.log("我在北境学外语");
}
```

2. 统一暴露

```javascript
let school = "北境大学";

function learn(params) {
  console.log("我在北境学外语");
}

// 统一暴露
export {school, learn}
```

3. 默认暴露

```javascript
// 默认暴露
export default {
  school: "北境大学",learn: function () {
    console.log("我在北境学外语");
  }
}
```

### 7.3 导入方式汇总

1. 通用导入

```javascript
import * as m1 from './js/data.js' // 分别暴露
import * as m2 from './js/data1.js' // 统一暴露
import * as m3 from './js/data2.js' // 默认暴露
```

2. 解构赋值

```javascript
import {school} from './js/data.js' // 分别暴露
import {school as scl } from './js/data1.js' // 统一暴露
import {default as dft} from './js/data2.js' // 默认暴露
```

3. 简便形式，只针对默认暴露方式可用

```javascript
import dft from './js/data2.js' // 直接取别名
```

---

## 8. 可选链操作符

`?.` 判断之前的属性存不存在，存在则调用，否则返回 `undefined`

```javascript
const p = {
  name: 'tom',
  fun: {
    play: function() {
      return 'hi'
    }
  }
}

p?.fun?.play()
```