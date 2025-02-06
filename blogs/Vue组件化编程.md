---
title: Vue组件化编程
date: '2024-02-28'
updated: '2025-02-05'
tags:
 - Vue
 - 笔记
categories:
 - 笔记
keywords: 'Vue,Vue组件'
description: 关于 Vue 组件化编程的前置基础知识，帮助了解 Vue 组件
cover: https://pic1.imgdb.cn/item/6649c5c5d9c307b7e9277964.jpg
---

组件的作用：实现应用中局部功能代码和资源的集合，提高代码复用率

## 1. 非单文件组件

### 1.1 三个步骤

使用组件的三大步骤：

1. 创建组件
2. 注册组件
3. 使用组件

**如何创建一个组件？**

使用 `Vue.extend(options)` 创建，其中 `options` 就是配置对象，和 `new Vue(options)` 传入的配置对象几乎一样，区别如下：

1. `el` 不需要写，因为所有组件都要经过一个 `vm` 管理，由 `vm` 中的 `el` 决定服务于哪个容器
2. `data` 必须写成函数，避免组件被复用时，数据存在引用关系
3. 使用 `template` 配置项写前端结构

**如何注册组件？**

1. 局部注册：靠 `new Vue()` 时传入 `components` 配置项
2. 全局注册：靠 `Vue.component('组件名', 组件)`

**如何使用组件？**

在页面中使用组件标签

### 1.2 几个注意点

关于组件名：

一个单词组成时首字母可以小写也可以大写，多个单词时可以用 kebab-case 命名，也可以用 CamelCase 命名，不过这种需要 Vue 脚手架支持

关于组件标签：

- 第一种写法：`<school></school>`
- 第二种写法：`<school/>`，需要脚手架支持

### 1.3 组件嵌套

```vue
// 定义student组件
const student = Vue.extend({
  template: `
    <div>
      <h2>学生姓名：{{ name }}</h2>
      <h2>学生姓名：{{ age }}</h2>
    </div>
  `,
  data() {
    return {
      name: 'tom',
      age: 18
    }
  }
})

// 定义school组件
const school = Vue.extend({
  template: `
    <div>
      <h2>学校名称：{{ name }}</h2>
      <h2>学校地址：{{ address }}</h2>
      <student></student>
    </div>
  `,
  data() {
    return {
      name: '尚硅谷',
      address: '北京'
    }
  },
  components: {
    student
  }
})
```

### 1.4 VueComponent

- 组件本质是一个名为 **VueComponent** 的构造函数，由 `Vue.extend(options)` 生成
- Vue 在解析组件标签时会自动创建组件对象，即执行 `new VueComponent(options)`
- 每次调用 `Vue.extend(options)` 返回的是一个全新的 `VueComponent` 

### 1.5 内置关系

一个重要的内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`

目的：让组件实例对象（vc）可以访问到 Vue 原型上的属性和方法

---

## 2. 单文件组件

单文件组件结构：

```vue
<template>
  <!-- 组件的结构 -->
</template>

<script>
  // 组件交互相关代码（数据、方法等）
</script>

<style>
  /* 组件的样式 */
</style>
```

单文件组件以 `.vue` 结尾，通过 App.vue 汇总所有组件，在 main.js 中创建 Vue 实例对象，并挂载到 index.html 页面
