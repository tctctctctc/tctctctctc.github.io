---
title: Vue核心
date: 2023-09-16 12:33:45
updated:
tags: 
 - Vue
 - 笔记
categories:
 - 笔记
keywords: 'Vue,Vue指令'
description: 关于 Vue2 的基础知识，涉及部分 Vue3 新特性
---

## 1. 简介
**Vue** 是一套用于构建用户界面的渐进式 Javascript 框架。

特点：  
1. 采用组件化模式，提高代码复用率
2. 声明式编码，开发人员无需直接操作 DOM，提高开发效率
3. 使用虚拟 DOM + 优秀的 Diff 算法，尽量复用 DOM 节点

---

## 2. 初识 Vue

想让 Vue 工作，必须传入一个 Vue 实例，并传入一个配置对象

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>初识 Vue</title>
    <script src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 准备一个容器 -->
    <div id="root">
      <h1>hello, {{name}}</h1>
    </div>

    <script>
      // 关闭生产提示
      Vue.config.productionTip = false;
      // 创建 Vue 实例
      new Vue({
        // el 用于指定当前实例为哪个容器服务，值通常为 css 选择器字符
        el: 'root',
        // data 中存储的数据供 el 去使用
        data: {
          name: 'luffy'
        }
      })
    </script>
  </body>
</html>
```

* Vue 实例和容器一一对应，容器里的代码被称为 Vue 模板
* `{{ xxx }}`中的 `xxx` 要写 JS 表达式，且 `xxx` 可以自动读取到 `data` 中的所有属性，一旦 `data` 中数据发生改变，模板中用到该数据的地方也会自动更新

---

## 3. 模板语法

模板语法有两大类：

1. **插值语法**：用于解析标签体内容

	写法：`{{ xxx }}`，`xxx` 是 JS 表达式，可以自动读取到 `data` 中的数据

2. **指令语法**：用于解析标签（标签属性、绑定事件、标签体内容等）

	如：`v-bind:href=xxx`，可简写为 `:href=xxx`，`xxx` 同样要写 JS 表达式，同样能自动读取到 `data` 中全部数据

---

## 4. 数据绑定

### 4.1 绑定方式

Vue 中有两种数据绑定方式：

1. 单向绑定 `v-bind`：数据只能从 `data` 流向页面
2. 向绑定 `v-model`：数据能从 `data` 流向页面，也能从页面流向 `data`

备注：

- 双向绑定一般用在表单类元素上（如`<input>`、`<select>`）
- `v-model:value` 可以简写为 `v-model`，因为 `v-model` 默认收集 `value` 属性值

### 4.2 el 与 data 的两种写法

容器绑定的两种写法：

```html
<script>
  // 写法一
  new Vue({
    el: '#root',
    data: {
      name: 'tom'
    }
  })
  // 写法二：挂载的方式
  const v = new Vue({
    data: {
      name: 'tom'
    }
  })
  v.$mount('#root')
</script>
```

`data` 的两种写法：

```html
<script>
  // 写法一：对象式
  new Vue({
    el: '#root',
    data: {
      name: 'tom'
    }
  })
  // 写法二：函数式，组件中必须使用函数式
  new Vue({
    el: '#root',
    data() {
      return {
        name: 'tom'
      }
    }
  })
</script>
```

### 4.3 MVVM 模型

M：模型，对应 `data` 中的数据
V：视图，也就是模板
VM：视图模型，对应 Vue 的实例对象

注意：

- `data` 中所有属性最终出现在 `vm` 身上
- `vm` 的所有属性及 Vue 原型上所有属性，在 Vue 模板里都能直接使用

### 4.4 Object.defineProperty 方法

通过该方法可以给对象增加属性，通常传入三个参数，第一个是要修改的对象，第二个是要增加的参数名，第三个是配置对象

```javascript
let person = {
  name: 'tom'
}
Object.defineProperty(person, 'age', {
  value: 18, // 指定增加参数的参数值
  enumerable: true, // 控制该属性是否可以枚举，默认为 false
  writable: true, // 控制该属性是否可以被修改
  configurable: true, // 控制属性是否可以被删除，默认为 false

  // 当age属性被访问时调用该方法，返回值赋值给age
  get() {
    return 19
  },

  // 当age属性被修改时调用，会收到修改后的age值（value）
  set(value) {
    this.value = value
  }
})
```

### 4.5 Vue 中的数据代理

概念：通过 `vm` 对象来代理 `data` 对象中属性的操作
好处：更加方便的操作 `data` 中的数据
原理：通过 `Object.defineProperty` 方法把 `data` 中所有属性添加到 `vm` 对象上，为每一个添加的属性都设置 `getter/setter`，在内部去操作 `data` 中的数据

---

## 5. 事件处理

### 5.1 事件的基本使用

1. 使用 `v-on:xxx` 或 `@xxx` 绑定事件，其中 `xxx` 是事件名
2. 事件的回调需要配置在 `methods` 对象中，最终会出现在 `vm` 上
3. `methods` 中配置的函数不要用箭头函数，否则 `this` 就不是 `vm`
4. `methods` 中配置的函数都被 Vue 管理，`this` 指向 `vm` 或组件实例对象
5. `@click = fun` 和 `@click = fun($event)` 效果一样，但后者可以传参且不会丢掉 `event`

### 5.2 事件修饰符

Vue 中的事件修饰符：

1. `prevent`：阻止默认事件
2. `stop`：阻止事件冒泡
3. `once`：事件只触发一次（常用）
4. `capture`：使用事件的捕获模式
5. `self`：只有 `event.target` 是当前操作的元素才触发
6. `passive`：事件的默认行为立即执行，无需等待事件回调执行完毕

```html
<template>
  <div id="root">
    <div class="box" @click="showInfo">
      <!-- 防止事件冒泡 -->
      <button @click.stop="showInfo">点我一次</button>
    </div>
  </div>
</template>
```

事件修饰符可以连续写，以达成不同修饰的作用：

```html
<template>
  <div id="root">
    <div class="box" @click="showInfo">
      <!-- 防止事件冒泡 -->
      <button @click.stop.prevent="showInfo">点我一次</button>
    </div>
  </div>
</template>
```

### 5.3 键盘事件

Vue 中给一些键设定了别名：

- `enter`：回车
- `delete`：删除
- `esc`：退出
- `space`：空格
- `tab`：换行（特殊，必须配合 `keydown` 使用）
- `up`：上
- `down`：下
- `left`：左
- `right`：右

可以在绑定键盘事件时指定具体的按键：

```html
<!-- 指定回车键弹起后回调showInfo -->
<input type="text" placeholder="按下回车键提示输入" @keyup.enter="showInfo">
```

那些 Vue 没有提供别名的按键，可以使用按键原始的 key 值去绑定，但多个单词必须转为小写，用短杠连接

系统修饰键（用法特殊）：`ctrl`、`alt`、`shift`、`meta(win)`

- 配合 `keyup` 事件使用：按下修饰键的同时再按下其它键，随后释放其它键事件才被触发，需要使用连续的事件修饰符来指定其它键
- 配合 `keydown` 事件使用：正常的触发事件

也可以通过 `keyCode` 指定具体按键，但这种做法不被推荐：

```html
<!-- 不推荐 -->
<input type="text" placeholder="按下回车键提示输入" @keyup.13="showInfo">
```

---

## 6. 计算属性与监视属性

### 6.1 计算属性

定义：要用的属性不存在，要通过已有的属性计算得来

原理：底层借助 `Object.defineProperty()` 方法的 `getter` 和 `setter`
计算属性通过设置 `get()` 方法来读取值，不同于 `data` 中的属性，其不会出现在 `_data` 中

```javascript
new Vue ({
  el: '#root',
  data() {
    return {
      firstName: '张',
      secendName: '三'
    }
  },
  computed: {
    fullName: {
      // 读取fullName时get会被调用，返回值就是fullName的值
      get() {
        return this.firstName + '-' + this.secendName
      }
    }
  }
}) 
```

get() 什么时候被调用：

1. 初次读取时（之后从缓存中读取）
2. 所依赖的数据发生改变时

优势：内部有缓存机制，效率更高，调试方便

备注：

1. 计算属性最终会出现在 `vm` 上，直接读取使用即可
2. 如果计算属性要修改，则必须写 set() 函数去响应，且函数内要引起依赖数据发生改变

如果计算属性没设置 set() 方法，则可以简写：

```javascript
computed: {
  fullName() {
    return this.firstName + '-' + this.secendName
  }
}
```

### 6.2 监视属性

监视属性 `watch`：

1. 当被监视的属性变化时，回调函数 `handle()` 自动调用，执行相关操作
2. 监视属性必须存在才能监视
3. 监视的两种写法
	1. `new Vue` 时传入 `watch` 配置
	2. 通过 `vm.$watch()` 进行监视

```javascript
new Vue({ // 写法一
  el: '#root',
  data: {
    isHot: true
  },
  watch: {
    isHot: {
      immediate: true, // 是否在初始化就调用一次handler
      handler(newValue, oldValue) {
        console.log(`new isHot:${newValue}, old isHot:${oldValue}`);
      }
    }
    /* 当仅设置handler时可以使用简写形式
    isHot(newValue, OldValue) {
      console.log(`new isHot:${newValue},  old isHot:${oldValue}`);
    }
    */
  }
})
const vm = new Vue({ // 写法二
  el: '#root',
  data: {
    isHot: true
  }
})
vm.$watch('isHot', {
  immediate: true, // 是否在初始化就调用一次handler
  handler(newValue, oldValue) {
   console.log(`new isHot:${newValue}, old isHot:${oldValue}`);
  }
})
// 仅设置handler时可以使用简写形式
vm.$watch('isHot', function(newValue, oldValue){
  console.log(`new isHot:${newValue}, old isHot:${oldValue}`)
})
```

### 6.3 深度监视

Vue 中 `watch` 默认不监视对象内部值的改变（只监视一层），配置 `deep:true` 可以监视对象内部值的改变

```javascript
new Vue({ // 写法一
  el: '#root',
  data: {
    isHot: true
    },
  watch: {
    isHot: {
      immediate: true, // 是否在初始化就调用一次handler
      deep: true, // 开启深度监视
      handler(newValue, oldValue) {
        console.log(`new isHot:${newValue}, old isHot:${oldValue}`);
      }
    }
  }
})
```

### 6.4 computed 与 watch 对比

区别：`computed` 能完成的功能，`watch` 都能完成，但 `watch` 能完成的功能，`computed` 不一定能完成，例如：`watch` 可以进行异步操作，因为其不需要返回值

两个原则：

1. 被 Vue 管理的函数，最好写成普通函数，这样 `this` 的指向才是 `vm` 或组件实例对象
2. 不被 Vue 管理的函数（定时器的回调函数，ajax 的回调函数等）最好写成箭头函数，这样 `this` 的指向才是 `vm` 或组件实例对象

---

## 7. class 与 style 绑定

### 7.1 class 样式

- `:class="xxx"`，`xxx` 可以是字符串、对象、数组
- 字符串写法适用于类名不确定，要动态获取
- 数组写法适用于要绑定多个样式，个数不确定，类名也不确定
- 对象写法适用于要绑定多个样式，个数确定，类名确定，但不确定用不用

### 7.2 style 样式

- `:style="{fontSize: xxx}"`，其中 xxx  是动态指定的值
- `:style="[a, b]"`，其中 `a, b` 是样式对象

---

## 8. 条件渲染

### 8.1 v-if

`v-if`：适用于切换频率比较低的场景
特点：不展示的 DOM 元素直接被删除
注意：`v-if` 可以和 `v-else-if` 、`v-else` 一起使用，要求结构不能被打断

```html
<div v-if="表达式"></div>
<div v-else-if="表达式"></div>
<div v-else="表达式"></div>
```

### 8.2 v-show

`v-show`：适用于切换频率较高的场景
特点：不展示的 DOM 元素未被删除，仅通过样式让其不展示

### 8.3 template

`<template>`：通过 `<template>` 可以不改变内部元素结构，但其只能与 `v-if` 配合，不能与 `v-show` 配合

```html
<template v-if="表达式">
  <p>a</p>
</template>
```

---

## 9. 列表渲染

### 9.1 遍历

`v-for` 指令：

1. 用于展示列表数据
2. 语法：`v-for="(item, index) in xxx" :key="yyy"`
3. 可以遍历数组、对象、字符串（很少用）、指定次数（很少用）

### 9.2 key 的作用与原理

- 虚拟 DOM 中 key 的作用：

	key 是虚拟 DOM 对象的标识，当状态中的数据发送变化时，Vue 会根据【新数据】生成【新的虚拟 DOM】，随后 Vue 进行【新虚拟 DOM】与【旧虚拟 DOM】的比较

- 对比规则：
	1. 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key，若虚拟 DOM 中内容没变，直接使用之前的真实 DOM，若虚拟 DOM 中内容变了，则生成新的真实 DOM，随后替换掉页面中原来的真实 DOM
	2. 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key，则创建新的真实 DOM，随后渲染到页面

- 用 index 作为 key 可能会引发的问题：
	1. 如果对数据进行逆序添加、逆序删除等破坏顺序的操作，会产生没有必要的真实 DOM 更新，影响效率
	2. 如果页面内还有输入类的 DOM，可能会产生错误的 DOM 更新
	3. 开发中最好使用每条数据的唯一标识作为 key，如 id

### 9.3 Vue 检测数据原理

1. Vue 会检测 `data` 中所有层次的数据
2. 监测对象数据：通过 `setter` 实现监视，且要在 `new Vue` 时传入（data）要监测的数据，对象中后追加的属性，Vue 默认不做响应式处理，如果需要给后添加的属性做响应式，需要用到下面两个 api：
	- `Vue.set(target, propertyName/index, value)`
	- `vm.$set(target, propertyName/index, value)`
3. 监测数组数据：通过包裹数组更新元素的方式实现，本质上就是做了以下两件事：
	- 调用原生对应的方法对数组进行更新
	- 重新解析模板，更新页面
4. 在 Vue 中修改数组中的某个元素一定要用如下方法：
	- `push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`
	- `Vue.set()` 或 `vm.$set()`
5. 注意：`Vue.set()` 和 `vm.$set()` 不能给 `vm` 和 `vm` 的根数据对象（`_data`）添加属性

---

## 10. 收集表单数据

### 10.1 表单数据

若 `<input type="text"/>`，则 v-model 收集的是 value 值，即用户输入
若 `<input type="radio">`，则 v-model 收集的是 value 值，且一定要配置 value 值
若 `<input type="checkout"/>`：

1. 没有配置 input 的 value 属性，那么收集的是 **checked**（勾选或未勾选）
2. 配置了 input 的 value 属性：
	- v-model 的初始值是**非数组**，那么收集的就是 **checked**（勾选或未勾选，布尔值）
	- v-model 的初始值是**数组**，收集的就是 value 值组成的数组

v-model 的三个修饰符：

- `lazy`：失去焦点再收集数据
- `number`：将输入的字符串转为有效数字，常与 `<input type="number"/>` 一起使用
- `trim`：将输入的首尾空格过滤

### 10.2 过滤器

定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑处理）

语法：

1. 注册过滤器

```javascript
// 全局过滤器，需要在new Vue()之前注册
Vue.filter(name, callback)

// 局部过滤器，只有这个实例绑定的容器能使用
new Vue({
  filters: {

  }
})
```

2. 使用过滤器：`{{ xxx | 过滤器名 }}` 或 `v-bind:属性 = xxx | 过滤器名`

备注：

1. 过滤器可以串联，也可以接收额外参数
2. 过滤器**不改变原本数据**，只产生新数据进行原地替换

```html
<template>
  <div id="root">
  	<h2>现在是：{{ time | timeFormat(7) | timeFormat2 }}</h2>
	</div>
</template>

<script>
	Vue.filter('timeFormat2', function(value) {
    return value.slice(0, 5)
  })
  new Vue({
    el: 'root',
    data() {
      return {
        time: '2024年1月3日'
      }
    },
    filters: { // 局部过滤器
      timeFormat(value, length) {
        return value.slice(0, length)
      }
    }
  })
</script>
```

---

## 11. Vue 其它指令

### 11.1 v-text 和 v-html

- `v-text="xxx"`：将 xxx 替换元素内容进行展示
- `v-html="xxx"`：向指定节点渲染包含 html 结构的内容

与插值语法的区别：

1. `v-html` 会替换掉节点所有内容
2. 可以渲染 html 结构

注意：在网站上动态渲染任何 html 是危险的，容易受到 xss 攻击

### 11.2 v-cloak

`v-cloak` 指令（没有值）：用于解决插值表达式的“闪动”问题

1. 本质是一个特殊属性，Vue 实例创建完毕并解析容器后，会删掉 `v-cloak` 属性
2. 使用 CSS 配合 `v-cloak` 可以解决网速慢时页面展示模板语法 `{{ xxx }}` 的问题

### 11.3 v-once 和 v-pre

`v-once` 指令（没有值）：所有节点初次渲染后就视为静态内容，以后数据变化不会引起节点的更新，可以用于优化性能

`v-pre` 指令（没有值）：跳过其所在节点的编译过程，可利用其跳过没有使用指令语法、插值语法的节点，以加快编译

### 11.4 自定义指令

函数式语法：

```html
<template>
  <h2>放大10倍的n值是：<span v-big="n"></span></h2>
</template>
<script>
  Vue.config.productionTip = false
  new Vue({
    el: '#root',
    data() {
      return {
        n: 1
      }
    },
    directives: {
      // big何时被调用？1.指令与元素成功绑定 2.指令所在模板被成功解析
      big(element, binding) {
        element.innerText = binding.value * 3
      }
    }
  })
</script>
```

对象式语法：

```html
<template>
  <h2>放大10倍的n值是：<span v-big="n"></span></h2>
</template>
<script>
  Vue.config.productionTip = false
  new Vue({
    el: '#root',
    data() {
      return {
        n: 1
      }
    },
    directives: {
      big: {
        // 指令与元素成功绑定时调用
        bind(element, binding) {
          element.innerText = binding.value * 3
        },
        // 指令所在元素被插入页面时被调用
        inserted(element, binding) {
          element.innerText = binding.value * 3
        },
        // 指令所在模板被成功解析时调用
        update(element, binding) {
          element.innerText = binding.value * 3
        }
      }
    }
  })
</script>
```

上述两种方式均是局部指令，全局指令设置方式类似于全局过滤器：

```javascript
Vue.directive(指令名, 配置对象)
// 或
Vue.directive(指令名, 回调函数)
```

备注：指令定义时不加 `v-`，使用时要加，如果指令名是多个单词，要使用 kebab-case 命名方式

---

## 12. Vue 实例生命周期

Vue 在关键时刻调用的一些特殊名称的函数，又称为钩子函数

生命周期函数名称不可更改，函数中 `this` 指向是 `vm` 实例和组件实例对象

常用的生命周期钩子：

1. `mounted`：发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等（初始化操作）
2. `beforeDestroy`：清除定时器、解绑自定义事件、取消订阅消息等（收尾工作）

销毁 Vue 实例后自定义事件会失效，但原生 DOM 事件依然有效

一般不会在 `beforeDestroy` 阶段操作数据，因为不会再触发更新流程

![](https://pic.imgdb.cn/item/65957d5b871b83018afee94c.png)