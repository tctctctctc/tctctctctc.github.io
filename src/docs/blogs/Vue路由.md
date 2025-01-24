---
title: Vue路由
date: 2024-03-18 21:19:05
updated:
tags:
 - Vue
 - 笔记
categories:
 - 笔记
keywords: 'Vue,Router,多级路由,路由守卫'
description: 关于 Vue 路由的相关知识，包括路由的基本使用、多级路由、路由参数、路由守卫等
---

## 1. 理解路由

### 1.1 什么是 Vue-router

Vue-router 是 Vue 的一个插件库，用来实现 SPA 应用

### 1.2 什么是 SPA 应用

SPA 应用就是单页面应用，点击页面中的导航页面不会刷新页面，只会做页面的局部更新，数据需要通过 Ajax 请求获取

### 1.3 什么是路由

一个路由就是一组映射关系（key-value），key 为路径，value 可能是 function 或 component

路由分类：

1. 后端路由

- 理解：value 是 function ，用于处理客户端提交的请求
- 工作过程：服务器接收到一个请求时，根据请求的路径找到匹配的函数来处理，返回响应数据

2. 前端路由

- 理解：value 是 component，用于展示页面
- 工作过程：当浏览器路径改变时，对应的组件就会显示

---

## 2. 基本使用

1. 安装 vue-router：`npm i vue-router`
2. 应用插件：`Vue.use(VueRouter)`
3. 编写 router 配置项（在 router/index.js 中）

```js
// 该文件专门用来创建整个应用的路由器
import VueRouter from "vue-router";
import HomeVue from '../components/Home.vue'
import AboutVue from '../components/About.vue'

// 创建一个路由器
const router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: AboutVue
    },
    {
      path: '/home',
      component: HomeVue
    }
  ]
})

// 暴露
export default router
```

4. 实现切换

```vue
<router-link to="/about" class="list-group-item" active-class="active">About</router-link>
```

5. 指定展示位置

```vue
<router-view></router-view>
```

几个注意点：

1. 路由组件通常存放在 views（pages） 文件夹中，一般组件通常存放在 components 文件夹中
2. 通过切换，“隐藏”的路由组件默认是销毁的，需要的时候再去挂载
3. 每个组件都有自己的 **$route** 属性，存放着自己的路由信息
4. 整个应用只有一个 router，可以通过组件的 **$router** 属性获取到

------

## 3. 多级（嵌套）路由

1. 配置路由规则，使用 `children` 配置项

```js
routes: [
  {
    path: '/about',
    component: AboutVue
  },
  {
    path: '/home',
    component: HomeVue,
    children: [
      {
        path: 'message',
        component: MessageVue
      },
      {
        path: 'news',
        component: NewsVue
      }
    ]
  }
]
```

2. 跳转（要写完整路径）

```vue
<router-link to="/home/message" class="list-group-item">Message</router-link>
```

---

## 4. 路由的 query 参数

1. 传递参数

```vue
<!-- 传递query参数，字符串写法 -->
<router-link :to="/home/message/detail?id=${message.id}&title=${message.title}`"> 
  {{ message.title }} 
</router-link> 
<!-- 传递query参数，对象写法 -->
<router-link
  :to="{
  	path: '/home/message/detail',
  	query: {
  		id: message.id,
  		title: message.title,
  	},
  }"> 
	{{ message.title }} 
</router-link>
```

2. 接收参数

```js
$route.query.id
$route.query.title
```

---

## 5. 命名参数

作用：可以简化路由的跳转

1. 给路由命名

```js
routes: [
  {
    path: '/about',
    component: AboutVue
  },
  {
    path: '/home',
    component: HomeVue,
    children: [
      {
        path: 'message',
        component: MessageVue,
        children: [
          {
            path: 'detail',
            name: 'detailVue', // 命名
            component: DetailVue
          }
        ]
      },
      {
        path: 'news',
        component: NewsVue
      }
    ]
  }
]
```

2. 简化跳转

```vue
<!-- 简化前需要完整路径 -->
<router-link to="/home/message/detail">跳转</router-link>

<router-link 
	:to="{
  	name: 'detailVue'
  }"> 
  跳转
</router-link>
```

---

## 6. 路由的 params 参数

1. 配置路由，声明接收 params 参数

```js
routes: [
  {
    path: '/home',
    component: HomeVue,
    children: [
      {
        path: 'message',
        component: MessageVue,
        children: [
          {
            path: 'detail/:id/:title', // 使用占位符声明接收params参数
            name: 'detailVue',
            component: DetailVue
          }
        ]
      },
      {
        path: 'news',
        component: NewsVue
      }
    ]
  }
]
```

2. 传递参数

```vue
<!-- 传递params参数，字符串写法 -->
<router-link  :to="`/home/message/detail/${message.id}/${message.title}`"> 
  {{ message.title }} 
</router-link>
<!-- 传递params参数，对象写法 -->
<router-link
	:to="{
  	//path: '/home/message/detail', // 不能使用path方式
  	name: 'detailVue'
    params: {
    	id: message.id,
    	title: message.title,
  	},
  }">
{{ message.title }} 
</router-link>
```

> 注意：路由携带 params 参数，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置项

3. 接收参数：`$route.params.id`

---

## 7. 路由的 props 配置

作用：让路由组件更方便地收到参数

```js
routes: [
  {
    path: '/home',
    component: HomeVue,
    children: [
      {
        path: 'message',
        component: MessageVue,
        children: [
          {
            path: 'detail,
            name: 'detailVue',
            component: DetailVue,
            // 第一种写法，props值为对象，该对象所有key-value组合最终都会通过props传给 detail组件
            //props: {a: 99}
            // 第二种：props值为布尔值，为true，则把路由组件收到的所有params参数通过props传给Detail组件
            //props: true
            // 第三种，函数，返回对象中每一组key-value都会通过props传递给Detail组件
            props($route) {
          		return {
          			id: $route.query.id,
          			title: $route.query.title
          		}
          	}
          }
        ]
      },
      {
        path: 'news',
        component: NewsVue
      }
    ]
  }
]
```

---

## 8. `<router-link>` 的 replace 属性

作用：控制路由跳转时操作浏览器的历史记录模式

浏览器历史记录有两种写入方式，分别为 `push` 和 `replace` ，`push` 是追加记录，`replace` 是替换当前记录，路由跳转时默认为 `push`

开启 `replace` 模式：

```vue
<router-link replace to=...> News </router-link>
```

---

## 9. 编程式路由导航

作用：不借助 `<router-link>` 实现路由跳转，让路由跳转更加灵活

借助 `$router.push()` 和 `$router.replace()`

```js
this.$router.push({ // push指定跳转
  path: "/home/message/detail",
  query: {
    id: m.id,
    title: m.title,
  },
});

this.$router.replace({ // replace 方式指定跳转
  path: "/home/message/detail",
  query: {
    id: m.id,
    title: m.title,
  },
});

this.$router.back() // 后退
this.$router.forward() // 前进
this.$router.go(1) // 前进一次，负数表示后退
```

---

## 10. 缓存路由组件

作用：让不展示的路由组件保持挂载，不被销毁

```vue
<!-- 缓存一个组件 -->
<keep-alive include="NewsVue"> 
  <router-view></router-view>
</keep-alive>
<!-- 缓存多个组件 -->
<keep-alive :include=["NewsVue", "MessageVue"]> 
	<router-view></router-view>
</keep-alive>
```

说明：include 指定的是组件名

---

## 11. 两个新的生命周期钩子

作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态

具体名字：

1. `activated`：路由组件被激活时触发
2. `deactivated`：路径组件失活时触发

---

## 12. 路由守卫

作用：对路由进行权限控制

分类：全局守卫、独享守卫、组件内守卫

**全局守卫**

```js
// 全局前置路由守卫--初始化时被调用、每次路由切换前被调用
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) { // 判断当前路由是否需要鉴权
    if (localStorage.getItem("school") === "byd") { // 权限控制的具体规则
      next(); // 放行
    } else {
      alert("学校名字不对");
    }
  } else {
    next(); // 放行
  }
});

// 全局后置守卫：初始化时被调用、每次路由切换后被调用
router.afterEach((to, from) => {
  if(to.meta.title) {
    document.title = to.meta.title // 修改网页标题
  }else{
    document.title = 'vue_test'
  }
})
```

**独享守卫**：给路由单独设置，没有独享的后置守卫

```js
{
  path: "message",
  component: MessageVue,
  children: [
  	{
      path: "detail",
      component: DetailVue,
    },
	],
  meta: { isAuth: true },
  beforeEnter(to, from, next) { // 组件独享的路由守卫
  	if (to.meta.isAuth) { // 判断当前路由是否需要鉴权
    	if (localStorage.getItem("school") === "byd") { // 权限控制的具体规则
      	next(); // 放行
        } else {
      		alert("学校名字不对");
      }
    } else {
    		next(); // 放行
    }
	},
}
```

**组件内守卫**：在某组件内编写

```js
// 进入守卫：通过路由规则进入该组件时被调用
beforeRouteEnter(to, from, next) {
  
}
// 离开守卫：通过路由规则离开该组件时被调用
beforeRouteLeave(to, from, next) {
  
}
```

---

## 13. 路由器的两种工作模式

1. 对于一个 URL 来说，什么是 hash 值？ `#` 及其后面的内容就是 hash 值
2. hash 值不会包含在 HTTP 请求，即 hash 值不会带给服务器
3. hash 模式：

- 地址中永远带着 `#` 号，不美观
- 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记非法
- 兼容性较好

4. history 模式：

- 地址干净美观
- 兼容性比 hash 模式差点
- 应用部署上线需要后端人员支持，解决刷新页面 404 问题
