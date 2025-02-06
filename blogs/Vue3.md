---
title: Vue3
date: '2024-03-31'
updated: '2025-02-05'
tags:
 - Vue
 - 笔记
categories:
 - 笔记
keywords: 'Vue3,组合式API,ref,reactive'
description: 关于 Vue3 的相关知识，包括组合式 Api、响应式原理、生命周期钩子、新组件等
cover: https://pic1.imgdb.cn/item/6649c59fd9c307b7e9275686.jpg
---

## 1. Vue3 带来了什么

1. 性能的提升

- 打包大小减少 41%
- 初次渲染快 55%，更新渲染快 133%
- 内存减少 54%

2. 源码的升级

- 使用 Proxy 代替 defineProperty 实现响应式
- 重写虚拟 DOM 的实现和 Tree-Shaking

3. 拥抱 TypeScript

- Vue3 可以更好的支持 TypeScript

4. 新特性 

- Composition API（组合 API）

- - setup 配置
	- ref 与 reactive
	- watch 与  watchEffect
	- provide 与 inject
	- ......

- 新的内置组件

- - Fragment
	- Teleport
	- Suspense

- 其它改变

- - 新的生命周期钩子
	- data 选项应始终声明为一个函数
	- 移除 keyCode 支持作为 v-on 的修饰符

---

## 2. 创建 Vue3 工程

### 2.1 使用 vue-cli 创建

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或升级@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2.2 使用 vite 创建

vite 是 vue 作者开发的新一代前端构建工具

优势：

- 开发环境中无需打包，可快速冷启动
- 轻量快速的热加载
- 真正的按需编译，不用等待整个应用编译完成

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install 
## 运行
npm run dev
```

---

## 3. 常用 Composition API

### 3.1 初识 setup

- **setup** 是 vue3 中一个新的配置项，值为一个函数
- **setup** 是所有组合式 API “表演的舞台”
- 组件中用到的数据、方法等均要配置在 **setup** 中
- setup 函数的两种返回值：
	- 若返回一个对象，则对象的属性和方法在模板中可直接使用（重点关注）
	- 若返回一个渲染函数，则可以自定义渲染内容（了解）

```vue
<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <button @click="sayHello">说话</button>
</template>

<script>
import {h} from 'vue'
export default {
  name: 'App',
  setup() {
    // 数据
    let name = 'tom'
    let age = 18
    // 方法
    function sayHello() {
      alert(`我叫${name}，我${age}岁了，你好啊！`)
    }
    // 返回对象
    return {
      name,
      age,
      sayHello
    }
    // 返回渲染函数
    // return () => h('h1', 'Hello World!')
  }
}
</script>
```

注意点：

1. 尽量不要与 Vue2.x 配置混用，Vue2.x 配置中（data、methods、computed...）可以访问到 **setup** 中的属性和方法，但在 **setup** 中不能访问到 Vue2.x 配置，如果混用，有重名的情况，优先匹配 **setup** 中的数据
2. **setup** 不能是一个 async 函数，因为返回值不再是 return 的对象，而是 promise，模板看不到 return 对象中的属性（后期可以返回 promise 实例，但需要 Suspense 组件和异步组件的配合）

### 3.2 ref 函数

作用：定义一个响应式数据

语法：`const xxx = ref(initValue)`

- 通过 **ref** 函数创建一个包含响应式数据的引用对象（reference 对象，简称 ref 对象）
- 在 JS 中操作数据：`xxx.value`
- 模板中读取数据不需要 `.value`，直接 `{{ xxx }}`

备注：

- 接收的数据可以是基本类型，也可以是对象类型
- 基本类型的数据：响应式依然是靠 `Object.defineProperty()` 的 `get` 与 `set` 完成的
- 对象类型的数据：内部借助了 Vue3 中一个新函数 `reactive`

### 3.3 reactive 函数

作用：定义一个对象类型的响应式数据（基本类型不要用它，用 ref 函数）

语法：`const 代理对象 = reactive(源对象)`，接收一个对象或数组，返回一个代理对象（Proxy 的实例·对象，简称 Proxy 对象）

说明：

- **reactive** 定义的响应式数据是深层次的
- 内部基于 ES6 的 **Proxy** 实现，通过代理对象操作源对象内部数据进行操作

### 3.4 Vue3 中响应式原理

#### 3.4.1 Vue2 的响应式

实现原理：

- 对象类型：通过 `Object.defineProperty()` 对属性进行读取、修改进行拦截（数据劫持）
- 数组类型：通过重写更新数组的一系列方法来实现拦截（对数组更新方法进行了包裹）

```js
Object.defineProperty(data, 'count', {
  get() {},
  set() {}
})
```

存在问题：

- 新增属性、删除属性界面不会更新
- 直接通过下标修改数组，界面不会自动更新

#### 3.4.2 Vue3 的响应式

实现原理：

- 通过 **Proxy**（代理）拦截对象中任意属性的变化，包括属性值的读写、属性的添加、属性的删除等
- 通过 **Reflect**（反射）对被代理对象的属性进行操作

```js
const person = {
  name: 'tom',
  age: 18
}
// 对源对象person生成代理对象p
const p = new Proxy(person, {
  // 拦截读取属性值
  get(target, propName) {
    return Reflect.get(target, prop)
  },
  // 拦截设置属性值或添加新的属性
  set(target, prop, value) {
    return Reflect.set(target, prop, value)
  },
  // 拦截删除属性
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop)
  }
})
p.name = 'jerry'
console.log(person.name) // jerry 
```

### 3.5 reactive 对比 ref

1. 从定义数据的角度对比

- **ref** 用来定义<font color="red">基本数据类型</font>
- **reactive** 用来定义<font color="red">对象（数组）类型数据</font>
- **ref** 也可以定义对象（数组）类型数据，其内部会自动通过 **reactive** 转为<font color="orange">代理对象</font>

2. 从原理角度对比

- **ref** 通过 `Object.defineProperty()` 的 `get` 与 `set` 实现响应式（数据劫持）
- **reactive** 通过使用 **Proxy** 来实现响应式（数据劫持），并通过 **Reflect** 操作源数据对象内部的数据

3. 从使用角度对比

- **ref** 定义的数据，操作数据需要 `.value`，读取数据时模板中直接读取，不需要 `.value`
- **reactive** 定义的数据，操作数据与读取数据均不需要 `.value`

### 3.6 setup 的两个注意点

1. setup 执行的时机

- 在 **beforeCreate** 之前执行一次，**this** 是 **undefined**

2. setup 的参数

- **props**：值为对象，包含组件外部传递过来，且组件内部声明接收的属性
- **context**：上下文对象

- - `context.attrs`：值为对象，包含组件外部传递过来，但没在 **props** 配置中声明的属性，相当于 Vue2 中的 `this.$attrs`
	- `context.slots`：收到的插槽内容，相当于 `this.$slots`
	- `context.emit`：分发自定义事件的函数，相当于 `this.$emit`

### 3.7 计算属性与监视

#### 3.7.1 computed 函数

与 Vue2 中 computed 配置功能一致，只不过要写在 setup 函数中，采用组合式 API 的方式

```js
import {computed} from 'vue'

// 计算属性简写，不考虑修改情况
let fullName = computed(() => {
  return person.firstName + '-' + person.lastName
})

// 计算属性完整写法
let fullName = computed({
  get() {
    return person.firstName + '-' + person.lastName
  },
  set(value) {
    const nameArr = value.split('-')
    person.firstName = nameArr[0]
    person.lastName = nameArr[1]
  }
})
```

#### 3.7.2 watch 函数

与 Vue2 中 watch 配置功能一致，只不过要写在 setup 函数中，采用组合式 API 的方式

注意：

- 监视 ref 定义的响应式数据时，如果是对象类型，要么 `xxx.value`，要么开启深度监视
- 监视 reactive 定义的响应式数据时，oldValue 无法正确获取，默认开启深度监视
- 监视 reactive 定义的响应式数据中某个对象属性时，需要开启深度监视，默认不开启

```js
let sum = ref(0)
let msg = ref('你好啊')
let person = reactive({
  name: 'tom',
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})

// 情况一：监视ref定义的一个响应式数据
watch(sum, (val, oldVal) => {
  console.log('sum', val, oldVal)
}, {immediate:true})

// 情况二：监视ref定义的多个响应式数据
watch([sum, msg], (val, oldVal) => {
  console.log('sum或msg变化了', val, oldVal)
}, {immediate:true})

// 情况三：监视reactive定义的一个响应式数据
// 注意：1. 此处无法正确获得 oldValue 2. 默认开启深度监视，可关闭
watch(person, (val, oldVal) => {
  console.log('person变化了', val, oldVal)
}, {deep:false})

// 情况四：监视reactive定义的一个响应式数据的某个属性
watch(() => person.age, (val, oldVal) => {
  console.log('age变化了', val, oldVal)
})

// 情况五：监视reactive定义的一个响应式数据的某些属性
watch([() => person.age, () => person.name], (val, oldVal) => {
  console.log('age或name变化了', val, oldVal)
})

// 特殊情况：监视reactive定义的一个响应式数据的某个属性，该属性为对象类型，改变该对象的属性，需要开启深度监视
watch(() => person.job, (val, oldVal) => {
  console.log('job变化了', val, oldVal)
}, {deep:true})
```

#### 3.7.3 watchEffect 函数

**watch**：既要指明监视的属性，也要指明监视的回调

**watchEffect**：不用指明监视哪个属性，监视的回调中用到哪个属性，就监视哪个属性

**watchEffect** 有点像 **computed**，但 **computed** 注重计算出来的值，所以必须要写返回值，**watchEffect** 注重的是过程，所以不用写返回值

```js
// watchEffect 指定的回调中用到的数据只要发生变化，则直接重新执行回调
watchEffect(() => {
	const x1 = sum.value
  const x2 = person.age
  console.log('回调执行了')
})
```

### 3.8 Vue3 生命周期

Vue3 中可以继续使用 Vue2 中的生命周期钩子，但有两个被更名：

- `beforeDestroy` 改名为 `beforeUnmounted`
- `destroyed` 改名为 `unmounted`

Vue3 也提供了组合式 API 形式的生命周期钩子，与 Vue2 中钩子对应关系如下：

- `beforeCreate` => `setup`
- `create` => `setup`
- `beforeMounted` => `onBeforeMount`
- `mounted` => `onMounted`
- `beforeUpdate` => `onBeforeUpdate`
- `updated` => `onUpdated`
- `beforeUnmount` => `onBeforeUnmount`
- `mounted` => `onMounted`

注意：要么都用配置项的方式写生命周期钩子，要么都用组合式 API 的方式

### 3.9 自定义 hook 函数

- **hook** 本质上是一个函数，把 **setup** 中使用的组合式 API 进行了封装
- 类似于 Vue2 中的 **mixin**
- 自定义 **hook** 的优势：复用代码，让 **setup** 中的逻辑更简单易懂
- 使用：在 src 下新建目录 `src/hooks`，然后定义一个个的 **hook** 函数，文件名以 **use** 开头

```js
import {onBeforeUnmount, onMounted, reactive} from "vue";

export default function() {
  let point = reactive({
    x: 0,
    y: 0
  })
  // 方法
  function savePoint(event) {
    point.x = event.pageX
    point.y = event.pageY
    console.log(point)
  }
  onMounted(() => {
    window.addEventListener('click', savePoint)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })
  return point
}
```

### 3.10 toRef

作用：创建一个 **ref** 对象，其 `value` 值指向另一个对象中的某一个属性（不是复制）

语法：`const name = toRef(对象, '属性名')`

应用：要将响应式对象中某个属性单独提供给外部使用

拓展：`toRefs` 与 `toRef` 功能一致，但可以批量创建多个 **ref** 数据，语法 `toRefs(对象)`，返回该对象属性经 **ref** 转换后构成的对象

```js
setup() {
  // 数据
  let person = reactive({
    name: 'tom',
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })
  return {
    person,
    ...toRefs(person)
  }
}
```

---

## 4. 其它 Composition API

### 4.1 shallowReactive 与 shallowRef

- **shallowReactive**：只处理对象最外层属性的响应式
- **shallowRef**：只处理基本数据类型的响应式，不进行对象的响应式处理

什么时候用？

- 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ，可以用 **shallowReactive**
- 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换，可以用 shallowRef

### 4.2 readonly 与 shallowReadonly

- **randonly**：让一个响应式数据变为只读的（深只读）
- **shallowReadonly**：让一个响应式数据变为只读的（浅只读）
- 应用场景：不希望数据被修改时

### 4.3 toRaw 与 markRaw

**toRaw**：

- 作用：将一个由 **reactive** 生成的响应式对象转为普通对象
- 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的操作，不会引起页面更新

**markRaw**：

- 作用：标记一个对象，使其永远不会再称为响应式对象
- 应用场景：

1. 1. 有些值不应被设置为响应式的，如复杂的第三方类库
	2. 当渲染具有不可变数据源的大列表时，跳过响应式数据转换可以提高性能

### 4.4 customRef

作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制

实现防抖：

```vue
<template>
  <input type="text" v-model="keyWord">
  <h3>{{keyWord}}</h3>
</template>

<script>
  import {customRef} from "vue";
  export default {
    name: 'App',
    setup() {
      function myRef(value, delay) {
        let timer
        return customRef((track, trigger) => {
          return {
            get() {
              console.log(`有人从myRef这个容器中读取数据了，我把${value}给他了`)
              track() // 通知vue追踪value的变化
              return value
            },
            set(newValue) {
              console.log(`有人把myRef这个容器中数据改为了：${newValue}`)
              clearTimeout(timer)
              timer = setTimeout(() => {
                value = newValue
                trigger() // 通知vue重新解析模板
              }, delay)
            }
          }
        })
      }
      // const keyWord = ref('hello')  // 使用vue提供的ref
      const keyWord = myRef('hello', 500)  // 自定义ref
      return {keyWord}
    }
  }
</script>
```

### 4.5 provide 与 inject

作用：实现祖先后代组件间的通信（父子通信建议直接用 props）

父组件有一个 **provide** 选项来提供数据，后代组件有一个 **inject** 选项来开始使用这些数据

父组件：

```vue
<script setup>
  import {provide, reactive} from "vue";
  let car = reactive({
    name: '奔驰',
    price: '40w'
  })
  provide('car', car)
</script>
```

后代组件：

```vue
<script setup>
  import {inject} from "vue";

  let car = inject('car')
  car.name = 'hello' // 响应式，会影响祖先组件中的值
</script>
```

### 4.6 响应式数据的判断

- **isRef**：检查一个值是否是响应式对象
- **isReactive**：检查一个对象是否是由 **reactive** 创建的响应式代理
- **isReadonly**：检查一个对象是否是由 **readonly** 创建的只读代理
- **isProxy**：检查一个对象是否是由 **reactive** 或 **readonly** 方法创建的代理

---

## 5. 组合式 API 的优势

1. 配置式 API 存在的问题

使用传统配置式 API，新增或修改一个需求，需要分别在 data，methods，computed 中进行修改

2. 组合式 API 的优势

可以更加优雅地组织代码，函数，让相关功能的代码放在一起

---

## 6. 新的组件

### 6.1 Fragment

- 在 Vue2 中组件必须有根标签
- 在 Vue3 中组件可以没有根标签，内部会将多个标签包含在一个 Fragment 虚拟元素中
- 好处：减少标签层级，减少内存占用

### 6.2 Teleport

**Teleport** 能够将组件 html 结构移动到指定位置

```vue
<!-- 插入到body -->
<teleport to="body">
  <!-- 控制模态框的显隐 -->
  <div v-if="isShow" class="mask">
    <div class="dialog">
      <h3>我是一个弹窗</h3>
      <h4>一些内容</h4>
      <h4>一些内容</h4>
      <h4>一些内容</h4>
      <button @click="isShow=false">关闭弹窗</button>
    </div>
  </div>
</teleport>
```

### 6.3 Suspense

作用：等待异步组件时渲染一些额外的内容，有更好的用户体验

使用步骤：

1. 异步引入组件

```js
import {defineAsyncComponent} from "vue";
const Child = defineAsyncComponent(() => import('./components/Child.vue')) // 异步引入
```

2. 使用 Suspense 包裹组件，并配置好 default 和 fallback 插槽

```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <Child/>
      </template>
      <template v--slot:fallback>
        <h3>加载中</h3>
      </template>
    </Suspense>
  </div>
</template>
```

---

## 7. Vue3 其它改变

### 7.1 全局 API 转移

Vue2 有许多全局 API 和配置，如注册全局组件，全局指令等

```js
// 注册全局组件
Vue.component('MyButton', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{count}}</button>'
})

// 注册全局指令
Vue.directive('focus', {
  inserted: el => el.focus()
})
```

Vue3 中对这些 API 做出了调整，将 `Vue.xxx` 调整到应用实例（app）上

| Vue2 全局 API            | Vue3 实例 app               |
| ------------------------ | --------------------------- |
| Vue.config.xxx           | app.config.xxx              |
| Vue.config.productionTip | 移除                        |
| Vue.component            | app.component               |
| Vue.directive            | app.directive               |
| Vue.mixin                | app.mixin                   |
| Vue.use                  | app.use                     |
| Vue.prototype            | app.config.globalProperties |

### 7.2 其它改变

1. data 选项应始终被声明为一个函数

2. 过度类名的更改：

- vue2 的写法：

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

- vue3 的写法：

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

3. 移除 keyCode 作为 v-on 的修饰符，同时不再支持 `config.keyCodes`
4. 移除 `v-on.native` 修饰符

- 父组件中绑定事件:

```vue
<my-component
  v-on:close = "handleComponentEvent"
  v-on:click = "handleNativeClickEvent'
/>
```

- 子组件中声明自定义事件

```vue
<script>
  export default {
    emits: ['close'] // 未声明的事件默认当作原生事件
  }
</script>
```

5. 移除<font color="red">过滤器</font>

- 
