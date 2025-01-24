---
title: Vue脚手架
date: 2024-03-06 21:12:14
updated:
tags:
 - Vue
 - 笔记
categories:
 - 笔记
keywords: 'Vue,Vue脚手架,ref,props,mixin'
description: 利用 Vue 脚手架进行开发的相关知识，如组件通信、插件、自定义事件等
---

## 1. 初识脚手架

### 1.1 脚手架文件结构分析

```js
|-- node_modules
|-- public
     |-- favicon.ico：页签图标
     |-- index.html：主页面
|-- src
     |-- assets: 存放静态资源
          |-- logo.png
     |-- component：存放组件
          |-- HelloWorld.vue
     |-- App.vue：汇总所有组件
     |-- main.js：入口文件
|-- .gitignore：git 版本管制忽略的配置
|-- babel.config.js：babel 的配置文件
|-- package.json：应用包配置文件
|-- README.md：应用描述文件
|-- package-lock.json：包版本控制文件
```

### 1.2 不同 Vue 版本的区别

Vue.js 与 Vue.runtime.xxx.js 的区别：

1. Vue.js 是完整版的 Vue，包含：核心功能 + 模板解析器
2. Vue.runtime.xxx.js 是运行版 Vue，只包含核心功能，没有模板解析器

由于 Vue.runtime.xxx.js 没有模板解析器，因此在 `new Vue()` 中不能使用 template 配置项，需要使用 render 函数接收的 createElement 函数去指定具体内容

```js
// Vue 工程的 main.js
import App from './App.vue'
new Vue({
  render(createElement) {
    return createElement(App)
  },
  // 简写
  render: h => h(App)
})
```

### 1.3 Vue.config.js 配置文件

终端使用 `vue inspect > output.js` 可以将 Vue 脚手架默认配置输出到 output.js

工程里通过 vue.config.js 可以对脚手架进行个性化定制

---

## 2. ref 属性和 props 配置项

### 2.1 ref 属性

1. 用来给元素或子组件注册引用信息（**id 的替代者**）
2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上获取的是组件实例对象（vc）
3. 使用方式：

```vue
<template>
  <h2 ref="xxx"></h2>
</template>
<script>
  new Vue({
    methods: {
      showDom() {
        alert(this.&refs.xxx)
      }
    }
  })
</script>
```

### 2.2 配置项 props

功能：让组件接收外部传过来的数据

传递数据：

```vue
<!-- 向demo组件传递name和age -->
<Demo name="xxx" :age="18"></Demo>
```

接收数据：

1. 简单接收

```js
export default {
  props: ['name', 'age']
}
```

2. 限制类型

```js
export default {
  props: {
    name: String,
    age: Number
  }
}
```

3. 限制类型、必要性、指定默认值

```js
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 18
    }
  }
}
```

备注：**props** 是只读的，Vue 底层会进行监控，如果进行更改，会发出警报，如果需要修改，可以复制 **props** 中的数据到 **data** 中，在 **data** 中进行修改

---

## 3. mixin 混入

功能：可以把多个组件共用的配置项提取成一个混入对象

使用方式：

1. 在另外的 js 文件中定义混入（暴露的方式）

```js
export const mixin = {
  methods: {
    showMsg() {
      alert('hello')
    }
  }
}
```

2. 使用混入

```js
import {mixin} from '../mixin'

// 全局混入
Vue.mixin(mixin)

// 局部混入，在单个组件内
new Vue({
  mixins: ['mixin']
})
```

---

## 4. 插件

功能：用于增强 Vue

本质：包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的是插件使用者传递的数据

定义插件：

```js
const obj = {
  install(Vue) {
    // 1. 添加全局过滤器
    Vue.filter('mySlice', function(value){
      return value.slice(0, 4)
    })
    // 2. 添加全局指令
  	Vue.directive('...')
    // 3. 配置全局混入
    Vue.mixin('...')
    // 4. 添加实例方法
    Vue.prototype.$myMethod = function() {...}
  }
}
```

使用插件：在 main.js 文件中通过 `Vue.use(插件名)` 使用

---

## 5. scoped 样式

作用：让样式在组件局部生效，防止冲突

写法：`<style scoped>`

---

## 6. webStorage

存储内容一般支持 5M 左右

浏览器通过 `Window.sessionStorage` 和 `Window.localStorage` 来实现本地存储机制

相关 API：

1. `xxxStorage.setItem('key', 'value')`：该方法接收一个键和值作为参数，将键值对添加存储，如果键存在，则更新其对应值
2. `xxxStorage.getItem('key')`：该方法接受一个键名作为参数，返回键名对应的值
3. `xxxStorage.removeItem('key')`：该方法接收一个键名作为参数，并把该键名从存储中删除
4. `xxxStorage.clear()`：该方法会清空存储中所有数据

备注：

1. **SessionStorage** 存储的内容会随着浏览器窗口的关闭而消失
2. **LocalStorage** 存储的内容需要手动清除才会消失
3. `xxxStorage.getItem(xxx)` 如果 xxx 对应的 value 获取不到，getItem 的返回值为 null
4. `JSON.parse(null)` 结果仍为 null

---

## 7. 组件自定义事件

一种组件间通信方式，适用于<font color="red">子组件传数据给父组件</font>

使用场景：A 是父组件，B 是子组件，B 想要给 A 传数据，那么就要在 A 中给 B 绑定自定义事件（<font color="red">事件的回调在 A 中</font>）

绑定自定义事件：

1. 第一种方式，在父组件中

```vue
<template>
  <Demo @myClick="handle"/>
  <!-- 或   -->
  <Demo v-on:myClick="handle"/>
</template>
```

2. 第二种方式，在父组件中：

```vue
<template>
  <Demo ref="demo"/>
</template>
<script>
  new Vue({
    mounted() {
      this.$refs.demo.$on('myClick', this.handle)
    }
  })
</script>
```

若想让自定义事件只能触发一次，可以使用 `once` 修饰符或 `$once()` 方法

触发自定义事件：在子组件中 `this.$emit('myClick', 数据)`

解绑自定义事件：在子组件中 `this.$off('myClick')`，如果不传参数，则将该组件所有自定义事件解绑

组件上可以绑定原生 DOM 事件，但需要使用 `native` 修饰符

注意：通过 `this.$refs.xxx.$on(事件名, 回调)` 方式绑定自定义事件，回调要么配置在 methods 中，要么用箭头函数，否则 this 指向会出问题

---

## 8. 全局事件总线

一种组件间通信的方式，适用于<font color="red">任意组件间通信</font>

安装全局事件总线：

```js
new Vue({
  ...
  beforeCreate() {
  	Vue.prototype.$bus = this // 安装全局事件总线，$bus就是当前的vm
	}
	...
})
```

使用事件总线：

1. 接收数据：A 组件想要接收数据，则在 A 组件中给 `$bus` 绑定自定义事件，事件的回调留在 A 组件自身

```js
methods: {
  demo(data) {......}
},
mounted() {
	this.$bus.$on('xxx', this.demo)
}
```

2. 提供数据：`this.$bus.$emit('xxx', 数据)`

注意：最好在 **beforeDestroy** 钩子中主动解绑当前组件用到的自定义事件

![](https://pic.imgdb.cn/item/65f1c4059f345e8d03f66d6e.png)

---

## 9. 消息订阅与发布

一种组件间通信的技术，适用于<font color="red">任意组件间通信</font>

使用步骤：

1. 安装 pubsub：`npm i pubsub-js`
2. 引入：`import pubsub from 'pubsub-js'`
3. 接收数据：A 组件想要接收数据，则在 A 组件中订阅消息，订阅的回调留在 A 组件自身

```js
methods: {
  demo(data) {......}
},
mounted() {
	this.pid = pubsub.subscribe('xxx', this.demo) // 订阅消息
}
```

4. 提供数据：`pubsub.publish('xxx', 数据)`
5. 最好在 beforeDestroy 钩子中用 `pubsub.unsubscribe(this.pid)` 来<font color="red">取消订阅</font>

------

## 10. nextTick()

语法：`this.$nextTick(回调)`

作用：在下一次 DOM 更新结束后执行其指定的回调

使用场景：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 `nextTick` 指定的回调函数中执行

---

## 11. Vue 封装的过渡与动画

作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名

写法：

1. 准备好样式

元素进入的样式：

- v-enter：进入的起点
- v-enter-active：进入的过程中
- v-enter-to：进入的终点

元素离开的样式：

- v-leave：离开的起点
- v-leave-active：离开的过程中
- v-leave-to：离开的终点

2. 使用 `<transition>` 包裹要过度的元素，并配置 `name` 属性

```vue
<transition name="v">
  <h1 v-show="isShow">
    你好啊
  </h1>
</transition>
```

3. 如果有多个元素需要过度，则需要使用 `<transition-group>` ，且每个元素需要指定 key 值

---

## 12. Vue 脚手架配置代理

方式一：在 vue.config.js 中添加如下配置

```js
devServer: {
  proxy:"http://localhost:5000"
}
```

优点：配置简单，请求资源时直接发给前端

缺点：不能配置多个代理，不能灵活的配置请求是否走代理

工作方式：优先匹配前端资源，资源不存在才将请求转发给服务器

方式二：编写 vue.config.js 配置具体代理规则

```js
module.exports = {
  devServer:{
    proxy: {
      '/api1':{ // 匹配所有以api1开头的请求路径
        target: 'http://localhost:5000', // 代理目标的基础路径
        changeOrigin: true, // 为true时，服务器收到的请求头中host为localhost:5000，否则为前端服务器端口，默认为true
        pathRewrite: {'^/api1': ''} // 将路径中的/api1替换成''
      },
      '/api2': { // 匹配所有以api2开头的请求路径
        target: 'http://localhost:5001', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
```

优点：可以配置多个代理，且可以灵活控制是否走代理

缺点：配置略微繁琐，请求资源时必须加前缀

---

## 13. 插槽

作用：让父组件可以向子组件指定位置插入 html 结构，也是一种组件间通信的方式，适用于<font color="red">父组件 ===> 子组件</font>

分类：默认插槽、具名插槽、作用域插槽

**默认插槽**

```vue
<!-- 父组件中： -->
<category-vue>
  <div>HTML结构</div>
</category-vue>
<!-- 子组件中： -->
<template>
  <div>
    <!-- 定义插槽 -->
    <slot>默认显示内容</slot>
  </div>
</template>
```

**具名插槽**

```vue
<!-- 父组件中： -->
<category-vue>
  <template slot="center">
		<div>HTML结构1</div>
  </template>
  <template v-slot:footer>
		<div>HTML结构2</div>
  </template>
</category-vue>
<!-- 子组件中： -->
<template>
	<div>
 		<!-- 定义插槽 -->
  	<slot name="center">默认显示内容</slot>
    <slot name="footer">默认显示内容</slot>
  </div>
</template>
```

**作用域插槽**

<font color="red">数据在组件自身，但根据数据生成的结构需要组件使用者来定</font>（games 数据在 CategoryVue 组件中，但使用数据遍历出来的结构需要 App 组件决定）

```vue
<!-- 父组件中： -->
<category-vue>
  <template slot-scope="scopeData">
		<!-- 生成ul列表 -->
		<ul>
      <li v-for="g in scopeData.games" :key="g">{{g}}</li>
    </ul>
  </template>
</category-vue>
<category-vue>
  <template slot-scope="scopeData">
		<!-- 生成ol列表 -->
		<ol>
      <li v-for="g in scopeData.games" :key="g">{{g}}</li>
    </ol>
  </template>
</category-vue>
<!-- 子组件中： -->
<template>
	<div>
 		<!-- 定义插槽 -->
  	<slot :games="games">默认显示内容</slot>
  </div>
</template>
<script>
export default {
  name: 'CategoryVue',
  data() {
    return {
      games: ['魂斗罗', '超级玛丽']
    }
  }
}
</script>
```

