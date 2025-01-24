---
title: Vuex
date: 2024-03-17 15:43:27
updated:
tags:
 - Vue
 - 笔记
categories:
 - 笔记
keywords: 'Vue,Vuex'
description: 关于 Vue 状态管理的相关知识，通过本文章可以了解 Vuex 的基本使用
---

## 1. 理解 Vuex

### 1.1 Vuex 是什么

专门在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，可以对 Vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信方式，适用于<font color="red">任意组件间通信</font>

### 1.2 什么时候使用 Vuex

1. 多个组件依赖同一组件
2. 来自不同组件的行为需要变更同一状态

![](https://pic.imgdb.cn/item/65f6c9da9f345e8d03a74d83.png)

---

## 2. Vuex 工作原理

![](https://pic.imgdb.cn/item/65f6c9da9f345e8d03a74e47.png)

---

## 3. 搭建 Vuex 环境

创建文件：`src/store/index.js`

```js
// 该文件用于创建vuex中最核心的store
// 引入Vue
import Vue from 'vue'
// 引入vuex
import  Vuex from 'vuex'

// 准备actions-用于响应组件中的动作
const actions = {}

// 准备mutations-用于操作数据（state）
const mutations = {}

// 准备state-数据
const state = {}

Vue.use(Vuex)
// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
```

在 main.js 中创建 vm 时传入 `store` 配置项：

```js
...
// 引入store
import store from './store'
...
// 创建 vm
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```

---

## 4. 基本使用

1. 初始化数据，配置 `actions`、配置 `mutations`、操作文件 `store/index.js`

```js
// 引入Vue
import Vue from 'vue'
// 引入vuex
import  Vuex from 'vuex'

const actions = {
  jia(context, value) { // 响应组件中加的动作
    context.commit('JIA', value)
  }
}

const mutations = {
  JIA(state, value) { // 执行加
    state.result += value
  }
}

// 准备state-数据
const state = {
  result: 0
}

Vue.use(Vuex)
// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
```

2. 组件中读取 Vuex 数据：`$store.state.result`
3. 件中修改 Vuex 数据：`$store.dispatch(action中的方法名, 数据)` 或 `$store.commit(mutations中的方法名, 数据)`
4. 若没有网络请求和其它业务逻辑，组件中可以越过 actions，即不写 `dispatch`，直接 `commit`

---

## 5. getters 的使用

概念：当 state 中的数据需要经过加工后再使用时，可以使用 getters 加工

使用：在 `store/index.js` 中追加 `getters` 配置

```js
......
const getters = {
  bigNum(state) {
    return state.result * 10
  }
}
export default new Vuex({
  state,
  actions,
  mutations,
  getters
})
```

组件中读数据：`$store.getters.bigNum`

---

## 6. 四个 map 方法的使用

1. **mapState 方法**：用于帮助映射 `state` 中的数据为计算属性

```js
export default {
  computed: {
    // 借助 mapState 生成计算属性：sum、school、subject（对象写法）
    ...mapState({sum:'sum', school:'school', subject:'subject'})
    // 借助 mapState 生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum', 'school', 'subject'])
  }
}
```

2. **mapGetters 方法**：用于帮助映射 `getters` 中的数据为计算属性

```js
export default {
  computed: {
    // 借助 mapGetters 生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'})
    // 借助 mapGetters 生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
  }
}
```

3. **mapActions 方法**：用于帮助生成与 `actions` 对话的方法，即包含 `$store.dispatch(xxx)` 的函数

```js
export default {
    methods: {
      // 借助 mapActions 生成方法：incrementOdd, incrementWait（对象写法）
      ...mapActions({incrementOdd:'addOdd', increment:'addWait'})
      // 借助 mapActions 生成方法：incrementOdd, incrementWait（数组写法）
      ...mapActions(['addOdd', 'addWait'])
    }
  }
```

4. **mapMutations 方法**：用于帮助生成与 `mutations` 对话的方法，即包含 `$store.commit(xxx)` 的函数

```js
export default {
    methods: {
      // 借助 mapMutations 生成方法：increment, decrement（对象写法）
      ...mapMutations({increment:'add', decrement:'sub'})
      // 借助 mapMutations 生成方法：increment, decrement（数组写法）
      ...mapMutations(['add', 'sub'])
    }
  }
```

---

## 7. 模块化 + 命名空间

目的：让代码更好维护，让多种数据分类更加明确

修改 `store/index.js`

```js
// 求和相关配置
const countOptions = {
  namespaced: true, // 命名空间
  actions: {
    jiaOdd(context, value) {
      if(context.state.result % 2) context.commit('JIA', value)
    },
    jiaWait(context, value) {
      setTimeout(()=>{
        context.commit('JIA', value)
      }, 1000)
    },
  },
  mutations: {
    JIA(state, value) {
      state.result += value
    },
    JIAN(state, value) {
      state.result -= value
    },
  },
  state: {
    result: 0, // 求和结果
    school: '尚硅谷',
    subject: '前端',
  },
  getters: {
    bigNum(state) {
      return state.result * 10
    }
  }
}


// 人员管理相关配置
const personOptions = {
  namespaced: true,
  actions: {
    addPersonWang(context, value) {
      if(value.name.indexOf('王') === 0) {
        context.commit('ADD_PERSON', value)
      }else{
        alert("添加的人必须姓王！")
      }
    }
  },
  mutations: {
    ADD_PERSON(state, value) {
      state.personList.unshift(value)
    }
  },
  state: {
    personList: [
      {id: '001', name: '张三'}
    ]
  },
  getters: {
    firstPersonName(state) {
      return state.personList[0]
    }
  }
}

Vue.use(Vuex)
// 创建并暴露store
export default new Vuex.Store({
  modules: {
    countAbout: countOptions,
    personAbout: personOptions
  }
})
```

开启命名空间后，组件内读取 state 数据：

```js
// 方式一：直接读取
this.$store.state.personAbout.personList
// 方式二：借助mapState读取
...mapState('personAbout', ['personList'])
```

开启命名空间后，组件内读取 getters 数据：

```js
// 方式一：直接读取
this.$store.getters['personAbout/firstPersonName']
// 方式二：借助mapGetters读取
...mapGetters('personAbout', ['firstPersonName'])
```

开启命名空间后，组件内调用 dispatch：

```js
// 方式一：直接调用
this.$store.dispatch('personAbout/addPersonWang', person)
// 方式二：借助mapActions
...mapActions('personAbout', {addPersonWang: 'addPersonWang'}])
```

开启命名空间后，组件内调用 commit：

```js
// 方式一：直接调用
this.$store.commit('personAbout/ADD_PERSON', person)
// 方式二：借助mapActions
...mapActions('personAbout', {addPerson: 'ADD_PERSON'}])
```

