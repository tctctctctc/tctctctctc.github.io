---
title: CSS3新特性
date: '2024-05-07'
updated: '2025-02-05'
tags:
 - CSS
 - 笔记
categories:
 - 笔记
keywords: 'CSS3,CSS,CSS3新特性'
description:  CSS3 新增的一些特性，如变换、过渡、动画、伸缩盒模型等
cover: https://pic1.imgdb.cn/item/6649c20fd9c307b7e922d8bc.jpg
---

## 1. 新特性

- 新增了更实用的选择器：如<u>动态伪类选择器</u>，<u>目标伪类选择器</u>、<u>伪元素选择器</u>等
- 新增了更好的视觉效果：如圆角、阴影、渐变等
- 新增了丰富的背景效果：如支持多个背景图片
- 新增了全新的**布局方案**：<u>弹性盒子</u>
- 新增了 Web 字体，可以显示电脑上未安装的文字
- 增强了颜色，如：`HSL`、`HSLA`、`RGBA` 几种新的颜色模式，新增 `opacity` 属性控制透明度
- 增加了 2D 和 3D 变换，如旋转、扭曲、缩放、位移
- 增加了动画与过渡效果
- 等......

---

## 2. CSS3 私有前缀

### 2.1 什么是私有前缀

`-webkit-` 就是私有前缀，前后短横杠连接

```css
div {
  width: 400px;
  height: 400px;
  -webkit-border-radius: 20px;
}
```

推荐把私有前缀属性写在正常属性之前

### 2.2 为什么要私有前缀

W3C 提出的某个 CSS 特性，在被浏览器正式支持之前，可以根据浏览器内核，使用私有前缀来测试该 CSS 特性

常见浏览器私有前缀：
- Chrome 浏览器：`-webkit-`
- Safari 浏览器：`-webkit-`
- Firefox 浏览器：`-moz-`
- Edge 浏览器：`-webkit-`
- Opera 浏览器：`-o-`
- IE 浏览器：`-ms-`

---

## 3. 新增长度单位

1. `rem` 根元素字体大小的倍数，只与根元素字体大小有关
2. `vw` 视口宽度的百分比，`20vw` 就是视口宽度的 20%
3. `vh` 视口高度的百分比，`20vh` 就是视口高度的 20%
4. `vmax` 视口宽高中更大者的百分比
5. `vmin` 视口宽高中更小者的百分比

--- 

## 4. 新增盒子属性

### 4.1 box-sizing

使用 `box-sizing` 属性可以设置盒模型的两种类型，值如下：
- `content-box`：`width` 和 `height` 设置的是盒子内容区的大小（默认）
- `border-box`：`width` 和 `height` 设置的是盒子总大小（怪异盒模型）

### 4.2 resize 

使用 `resize` 属性可以控制是否允许用户调节元素尺寸，必须与 `overflow` 配合使用才能生效，值如下：
- `none`：不允许用户调整元素大小（默认）
- `both`：可以调节元素的宽和高
- `horizontal`：用户可以调节元素的宽度
- `vertical`：用户可以调节元素的高度

### 4.3 box-shadow

语法：`box-shadow: h-shadow v-shadow blur spread color inset`
- `h-shadow`：水平方向阴影的偏移距离，必填，可以为负值
- `v-shadow`：垂直方向阴影的偏移距离，必填，可以为负值
- `blur`：可选，模糊距离，通过需要设置
- `spread`：可选，阴影的外延值
- `color`：可选，阴影的颜色
- `inset`：可选，将外部阴影改为内部阴影

默认值：`box-shadow: none` 表示没有阴影

```css
div {
  /* 写两个值，含义：水平位置 垂直位置 */
  box-shadow: 10px 10px;

  /* 写三个值，含义：水平位置 垂直位置 阴影的颜色 */
  box-shadow: 10px 10px blue;

  /* 写三个值，含义：水平位置 垂直位置 模糊程度 */
  box-shadow: 10px 10px 10px;

  /* 写四个值，含义：水平位置 垂直位置 模糊程度 阴影的颜色 */
  box-shadow: 10px 10px 10px blue;

  /* 写五个值，含义：水平位置 垂直位置 模糊程度 外延值 阴影的颜色 */
  box-shadow: 10px 10px 10px 10px blue;

  /* 写六个值，含义：水平位置 垂直位置 模糊程度 外延值 阴影的颜色 内阴影 */
  box-shadow: 10px 10px 10px 10px blue inset;
}
```

### 4.4 opacity

`opacity` 能为整个元素添加透明效果，值是 0 到 1 之间的小数，0 完全透明，1 不透明

> `opacity` 与 `rgba` 的区别  
> `opacity` 是一个属性，设置的是整个元素的不透明度，`rgba` 用于设置颜色，其透明度指颜色的透明度

---

## 5. 新增背景相关属性

### 5.1 background-origin

`background-origin` 能设置背景图的原点，值如下：
- `padding-box`：从 `padding` 区域开始显示图像（默认）
- `border-box`：从 border 区域开始显示图像
- `content-box`：从 content 区域开始显示图像

### 5.2 background-clip
`background-clip` 能设置背景图向外裁剪的区域，值如下：
- `border-box`：从 `border` 区域开始向外裁剪背景
- `padding-box`：从 `padding` 区域开始向外裁剪背景
- `content-box`：从 `content` 区域开始向外裁剪背景
- `text`：背景图只呈现在文字上

注意：若值为 `text`，那么 `background-clip` 要加上私有前缀

### 5.3 background-size

`background-size` 能设置背景图的尺寸，值如下：

1. 用长度指定大小，不允许负值

```css
div {
  background-size: 100px 100px;
}
```

2. 用百分比指定大小，不允许负值

```css
div {
  background-size: 100% 100%;
}
```

3. `auto`：背景图真实大小，默认
4. `contain`：将背景图片等比缩放，使背景图的宽或高与容器的宽或高相等，再将完整背景图包含在容器内，可能会造成容器内部分区域没有背景图

```css
div {
  background-size: contain;
}
```

5. `cover`：将背景图等比例缩放，直到完全覆盖容器，图片会尽可能完整地显示在元素上，有可能显示不完全

```css
div {
  background-size: cover;
}
```

### 5.4 复合属性

语法：`background: color url repeat position / size origin clip`

注意：
1. `size` 的值必须写在 `position` 的后面，并用 `/` 分开
2. `size` 之后如果只有一个值，则相当于 `origin` 和 `clip` 同时都设置

### 5.5 多背景图

CSS3 允许元素设置多个背景图

```css
div {
  background: 
    url('../images/bg-lt.ong') no-repeat left top,
    url('../images/bg-rt.ong') no-repeat right top,
    url('../images/bg-lb.ong') no-repeat left bottom,
    url('../images/bg-lt.ong') no-repeat right bottom;
}
```

---

## 6. 新增边框相关属性

### 6.1 边框圆角

1. 同时将四个角变为圆角

```css
div {
  border-radius: 10px;
  /* 200px或者50%能将元素变为圆 */
}
```

2. 分开设置每个角的圆角

```css
div {
  /* 设置左上角，一个值设置半径，两个值分别是椭圆的x半径和y半径 */
  border-top-left-radius: 50px;
  /* 设置右上角，一个值设置半径，两个值分别是椭圆的x半径和y半径 */
  border-top-right-radius: 40px;
  /* 设置右下角，一个值设置半径，两个值分别是椭圆的x半径和y半径 */
  border-bottom-right-radius: 30px;
  /* 设置左下角，一个值设置半径，两个值分别是椭圆的x半径和y半径 */
  border-bottom-left-radius: 20px;

  /* 两个值时设置正反对角线的圆角，四个值时按左上，右上，右下，左下的顺序 */
  border-radius: 10px 10px 0 0;
}
```

### 6.2 边框外轮廓

`outline`：不占位，也不算盒模型属性

---

## 7. 新增文本属性

### 7.1 文本阴影

`text-shadow` 可以给文本加上阴影

语法：`text-shadow: h-shadow v-shadow blur color;`

值：
- `h-shadow`：必须写，水平阴影偏移距离，允许负值
- `v-shadow`：必须写，垂直阴影偏移距离，允许负值
- `blur`：可选，模糊的距离
- `color`：可选，阴影颜色

默认：`text-shadow: none`，无阴影

```css
div {
  text-shadow: 5px 5px 5px black;
}
```

### 7.2 文本换行

`white-space` 可以设置文本换行，值如下：
- `normal`：文本超出边界自动换行，文本中换行符被识别为一个空格（默认值）
- `pre`：按文本原样显示，与 `pre` 标签效果类似
- `pre-wrap`：在 `pre` 效果的基础上，超出元素边界自动换行
- `pre-line`： 在 `pre` 效果的基础上，超出元素边界自动换行，且只识别文本中的换行，文本始末空格会被忽略
- `nowrap`：强制不换行

### 7.3 文本溢出

`text-overflow` 属性可以设置文本内容溢出时的呈现模式，常用值如下：
- `clip`：内容溢出时，将溢出内容裁剪掉（默认值）
- `ellipsis`：内容溢出时，将溢出内容替换为省略号

### 7.4 文本修饰

CSS3 中将 `text-decoration` 变成了复合属性

语法：`text-decoration: text-decoration-line text-decoration-style text-decoration-color`

子属性：
- `text-decoration-line`：设置文本装饰线的位置
  - `none`：无装饰线
  - `underline`：下划线
  - `overline`：上划线
  - `line-through`：贯穿线
- `text-decoration-style`：装饰线的形状
  - `solid`：实线
  - `double`：双线
  - `dotted`：点状线条
  - `dashed`：虚线
  - `wavy`：波浪线
- `text-decoration-color`：装饰线颜色

---

## 8. 新增渐变

### 8.1 线性渐变

- 多个颜色之间的渐变，默认从上到小

```css
div {
  background-image: linear-gradient(red, yellow, green);
}
```

- 使用关键词设置线性渐变方向

```css
div {
  background-image: linear-gradient(to right, red, yellow, green);
  background-image: linear-gradient(to right top, red, yellow, green);
}
```

- 使用角度设置渐变方向

```css
div {
  background-image: linear-gradient(20deg, red, yellow, green);
}
```

- 调整开始渐变的位置

```css
div {
  background-image: linear-gradient(red 50px, yellow 100px, green 150px);
}
```

### 8.2 径向渐变

- 多个颜色之间的渐变，默认从圆心四散

```css
.box {
  background-image: radial-gradient(red, yellow, green);
}
```

- 使用关键词调整圆心位置

```css
.box {
  background-image: radial-gradient(at right top,red, yellow, green);
}
```

- 使用像素值调整圆心位置

```css
.box {
  background-image: radial-gradient(at 100px 50px,red, yellow, green);
}
```

- 调整形状的半径

```css
.box {
  background-image: radial-gradient(circle,red, yellow, green);
}
.box {
  background-image: radial-gradient(100px 50px,red, yellow, green);
}
```

- 调整开始渐变的位置

```css
.box {
  background-image: radial-gradient(red 50px, yellow 100px, green 150px);
}
```

### 8.3 重复渐变

重复渐变基于线性渐变或径向渐变，在它们没有渐变的区域（纯色）开始重复渐变

- 网格线案例

```css
.box1 {
  width: 600px;
  height: 800px;
  border: 1px solid black;
  margin: 0 auto;
  padding: 20px;

  background-image: repeating-linear-gradient(transparent 0px, transparent 29px, gray 30px);
  background-clip: content-box;
}
```

- 立体球

```css
.box2 {
  width: 200px;
  height: 200px;
  background-color: gray;
  border-radius: 50%;
  background-image: radial-gradient(at 80px 80px, white, #333);
}
```

---

## 9. web 字体

语法（简写方式）：

```css
@font-face {
  font-family: '情书体';
  src: url('../fonts/情书体.ttf');
}
```

语法（高兼容性）：

```css
@font-face {
  font-family: '情书体';
  font-display: swap;
  src: url('../fonts/webfont.eot'); /* IE9 */
  src: url('../fonts/webfont.eot?iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../fonts/webfont.woff2') format('woff2'),
    url('../fonts/webfont.woff') format('woff'), /* chrome/firefox */
    url('../fonts/webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari、Android */
    url('../fonts/webfont.svg#webfont') format('svg'); /* ios4.1- */
}
```

---

## 10. 2D 变换

### 10.1 2D 位移

使用 `transform` 属性可以改变元素位置，值如下：
- `translateX`：设置水平位移距离
- `translateY`：设置垂直位移距离
- `translate`：一个值代表水平方向，两个值分别代表水平和垂直方向

注意点：
1. 位移与相对定位类似，都不脱离文档流，对其它元素无影响
2. 与相对定位的区别：相对定位的百分比参考父级定位元素，`transform` 参考元素自身
3. 浏览器针对位移有优化，比定位效率更高
4. 位移对行内元素无效
5. 位移配合定位可以实现元素水平垂直居中

```css
div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

### 10.2 2D 缩放

使用 `transform` 属性可以缩放元素，值如下：
- `scaleX`：水平方向缩放比例，值为数字
- `scaleY`：垂直方向缩放比例，值为数字
- `scale`：一个值同时设置水平、垂直缩放比例，两个值则分别代表水平缩放、垂直缩放

注意点：
1. 缩放值支持负数，但一般不用
2. 通过缩放，可以实现小于 12px 的文字

### 10.3 2D 旋转

用 `transform` 属性可以让元素在 2 维平面旋转，值如下：
- `rotate`：设置旋转角度，需设定一个角度值 `deg`，正值顺时针旋转，负值逆时针

注意：`rotateZ(20deg)` 等价于 `rotate(20deg)` ，均表示绕 z 轴旋转

### 10.4 多重变换

多种不同的变化，使用一个 `transform` 来编写

```css
div {
  transform: translate(-50%, -50%) rotate(45deg);
}
```

由于旋转会改变坐标系方向，因此建议放到最后，避免影响之前的变换

### 10.5 变换原点

- 元素变换时，默认的原点是元素中心，使用 `transform-origin` 可以设置变换的原点，如果提供两个值，第一个用于横坐标，第二个用于纵坐标；如果只提供一个，若是像素值，则设置横坐标的值，纵坐标取 50%，若是关键词，则另一个坐标取 50%
- 修改变换原点对位移没影响，对旋转和缩放会有影响

--- 

## 11. 3D 变换

### 11.1 3D 空间和景深

#### 11.1.1 开启 3D 空间

元素 3D 变换的首要操作：<font color="red">父元素</font>开启 <font color="red">3D 空间</font>

使用 `transform-style` 开启 3D 空间，可选值如下：
- `flat`：让子元素位于此元素的 2 维平面内（2D）
- `preserve-3d`：让子元素位于此元素的三维空间内（3D）

#### 11.1.2 设置景深

景深是指观察者与 `z=0` 平面的距离，能让发生 3D 变换的元素，产生透视效果，看起来更立体

使用 `perspective` 在父元素设置景深，可选值如下：
- `none`：不指定透视（默认指）
- 长度值：指定景深，不允许负值

### 11.2 透视点

所谓透视点的位置，就是观察者的位置，通过 `perspective-origin` 可以设置

```css
div {
  perspective-origin: 400px 300px;
}
```

### 11.3 3D 位移

在 2D 位移基础上增加沿 z 轴位移

```css
div {
  /* 设置 Z 轴位移，需指定长度值，正值向外，负值向内，不能设百分比 */
  /* transform: translateZ(100px) */
  /* 第一个参数对应x轴，第二个参数对应y轴，第三个参数对应z轴 */
  transform: translate3d(100px, 50px, 20px)
}
```

### 11.4 3D 旋转

- `transform: rotateX()`：绕 x 轴旋转，正角度顺时针旋转，反之逆时针
- `transform: rotateY()`：绕 y 轴旋转，正角度顺时针旋转，反之逆时针
- `transform: totate3d()`：前三个参数分别表示 x、y、z 坐标轴，第四个参数表示旋转角度，必须有四个参数，如 `transform: rotate3d(1, 1, 1, 20deg)` 表示绕三个轴旋转 20 度

---

## 12. 过渡

### 12.1 transition-property

作用：定义哪个属性需要过渡，能设置数值的属性才能有过渡效果

常用值：
- `none`：不过渡任何属性
- `all`：过渡所有能过渡的属性
- 具体某个属性名，如 `width`、`height` 等

### 12.2 transition-duration

作用：设置过渡持续的时间

常用值：
- 0：无过渡时间，默认
- s/ms：秒或毫秒
- 列表：时间列表与设置的过渡属性一一对应

### 12.3 transition-delay

作用：指定发生过渡的延迟时间，单位秒或毫秒

### 12.4 transition-timing-function

作用：设置过渡的类型

常用值：
- `ease`：平滑过渡，默认值
- `linear`：线性过渡
- `ease-in`：由慢到快
- `ease-out`：由快到慢
- `ease-in-out`：慢到快再到慢
- `step-start`：等同于 steps(1, start)
- `step-end`：等同于 steps(1, end)
- `steps`：步进函数，第一个参数设置步数，第二个是 start 或 end，指定每一步发生的时间点，默认 end
- `cubic-bezie`：贝塞尔曲线类型

### 12.5 复合属性

如果设置一个时间，表示 `duration`，两个则前一个表示 `duration`，后一个表示 `delay`

```css
div {
  transtion: 1s 1s linear all;
}
```

---

## 13. 动画

### 13.1 基本使用

第一步：定义关键帧

1. 简单方式定义

```css
div {
  /* 定义一组关键帧 */
  @keyframes 动画名 {

    /* 第一帧 */
    from {}

    /* 最后一帧 */
    to {
      transform: translate(900px);
      background-color: red;
    }
  }
}
```

2. 完整方式定义

```css
div {
  @keyframes torights {

    /* 第一帧 */
    0% {}

    30% {
      background-color: aqua;
    }

    ...

    /* 最后一帧 */
    100% {
      transform: translate(900px) rotate(360deg);
      background-color: greenyellow;
      border-radius: 50%;
    }
  }
}
```

第二步：给元素应用动画，属性如下：
- `animation-name`：给元素指定具体的动画（具体关键帧）
- `animation-duration`：动画所需时间
- `animation-delay`：动画延迟

```css
.inner {
  width: 100px;
  height: 100px;
  background-color: deepskyblue;
  /* 应用动画到元素 */
  animation-name: torights;
  /* 动画持续时间 */
  animation-duration: 2s;
  /* 动画延时 */
  animation-delay: 0.5s;
}
```

### 13.2 其它属性

- `animation-timing-function`：设置动画类型，常用值同过渡一样
- `animation-iteration-count`：指定动画的播放次数，值为数字或 `infinite`，无限循环播放
- `animation-direction`：设置动画方向，值有 `normal`（正方向）、`reverse`（反方向）、`alternate`（先正常方向再反方向）、`alternate-reverse`（先反方向再正常）
- `animation-fill-mode`：设置动画之外的状态，`forwards` 设置对象状态为动画结束的状态，`backwards` 设置对象状态为开始状态
- `animation-play-state`：设置动画播放状态，`running` 表示运动，`paused` 表示暂停

### 13.3 复合属性

如果设置一个时间，表示 `duration`，两个则前一个表示 `duration`，后一个表示 `delay`，其它属性没有顺序和数量要求

```css
.inner {
  width: 100px;
  height: 100px;
  background-color: deepskyblue;
  /* 应用动画到元素 */
  animation: toright 2s 0.5s linear infinite alternate;
}
```

注意：`animation-play-state` 一般单独使用

---

## 14. 多列布局

常用属性如下：
- `column-count`：指定列数
- `column-width`：指定列宽
- `columns`：复合属性，同时指定列数和列宽，值没有数量和顺序要求
- `column-gap`：设置每列间距
- `column-rule-style`：设置列与列之间边框风格，值与 `border-style` 一致
- `column-rule-width`：设置列与列之间边框的长度
- `column-rule-color`：设置列与列之间边框的颜色
- `column-rule`：设置列与列之间边框，复合属性
- `column-span`：指定是否跨列，值为 `none`、`all`

---

## 15. 伸缩盒模型

### 15.1 伸缩容器、伸缩项目

1. 伸缩容器：开启了 `flex` 布局的元素就是伸缩容器

- 给元素设置 `display: flex` 或 `display: inline-flex` ，该元素就变为了伸缩容器
- `display: inline-flex` 很少使用，因为可以给多个伸缩容器的父容器设置 `flex`
- 一个元素可以同时是伸缩容器和伸缩项目

2. 伸缩项目：伸缩容器的所有<font color="red">子元素</font>自动成为伸缩项目

- 仅伸缩容器的子元素成为伸缩项目，孙元素等后代不是伸缩项目
- 无论原来是哪种元素（块、行内、行内块），一旦成为伸缩项目，全部会“块状化”

### 15.2 主轴与侧轴

#### 15.2.1 概念

- 主轴：伸缩项目沿着主轴排列，主轴默认水平，从左到右排列
- 侧轴：与主轴垂直，默认从上到下

#### 15.2.2 主轴方向

属性名：`flex-direction`

常用值如下：
- `row`：水平从左到右，默认
- `row-reverse`：水平从右到左
- `column`：垂直从上到下
- `column-reverse`：垂直从下到上

注意：改变主轴方向，侧轴随之改变，不能直接改侧轴方向

#### 15.2.3 主轴换行方式

属性名：`flex-wrap`

常用值如下：
- `nowrap`：默认值，不换行
- `wrap`：自动换行
- `wrap-reverse`：反向换行

#### 15.2.4 flex-flow

`flex-direction` 和 `flex-wrap` 的复合属性，值没有顺序要求，用的较少

#### 15.2.5 主轴对齐方式

属性名：`justify-content`

常用值：
- `flex-start`：主轴起点位置，默认值
- `flex-end`：主轴终点位置
- `center`：居中对齐
- `space-between`：均匀分布，两端对齐，最常用
- `space-around`：均匀分布，两端距离是中间距离的一半
- `space-evenly`：均匀分布，两端距离与中间距离一致

#### 15.2.6 侧轴对齐方式

1. 只有一行的情况

所需属性：`align-items`

常用值如下：
- `flex-start`：侧轴的起点对齐
- `flex-end`：侧轴终点对齐
- `center`：侧轴中心对齐
- `baseline`：伸缩项目的第一行文字的基线对齐
- `stretch`：如果伸缩项目没有设置高度，将占满整个容器的高度，默认值

2. 多行情况

所需属性：`align-content`

常用值如下：
- `flex-start`：侧轴起点位置，默认值
- `flex-end`：侧轴终点位置
- `center`：居中对齐
- `space-between`：均匀分布，侧轴两端对齐
- `space-around`：均匀分布，侧轴两端距离是中间距离的一半
- `space-evenly`：均匀分布，两端距离与中间距离一致
- `stretch`：占满整个侧轴，默认值

### 15.3 基准长度

`flex-basis` 设置主轴方向的基准长度，会让宽度或高度失效，很少设置，默认值 `auto` ，此时取主轴方向对应的宽度或高度作为值

### 15.4 伸缩性

#### 15.4.1 flex-grow

概念：`flex-grow` 定义伸缩项目的放大比例，默认为 0，即使主轴存在剩余空间，也不放大

为伸缩项目配置该属性后，放大比例为 `该项目数值 / 全部配置项目的数值总和 * 剩余空间`，若三个伸缩项目的 `flex-grow` 分别设为 1、2、3，则分别瓜分到 1/6、1/3、1/2 的空间

#### 15.4.2 flex-shrink

概念：`flex-shrink` 定义伸缩项目的缩小比例，默认为 1，如果主轴空间不足，项目会缩小

缩小比例计算方式：`需要缩小的方向上伸缩项目的长度 * flex-shrink / 各伸缩项目的长度 * flex-shrink的总和`

### 15.5 flex 复合属性

`flex` 是复合属性，复合了 `flex-grow`、`flex-shrink`、`flex-basis` 三个属性，顺序不能变，默认值为 0 1 auto
- 如果写 `flex: 1 1 auto`，可简写为 `flex: auto`
- 如果写 `flex: 1 1 0`，可简写为 `flex: 1`
- 如果写 `flex: 0 0 auto`，可简写为 `flex: none`
- 如果写 `flex: 0 1 auto`，可简写为 `flex: 0 auto`

### 15.6 项目排序

`order` 属性可以定义项目的排列顺序，数值越小。排列越靠前，默认值为 0

### 15.7 单独对齐

`align-self` 属性可以单独设置某个伸缩项目的侧轴对齐方式，默认值为 `auto`，表示继承父元素的 `align-items` 属性

---

## 16. 响应式布局

### 16.1 媒体查询-媒体类型

```css
/* 只有打印机或打印预览才应用的样式 */
@media print {
  h1 {
    background: transparent;
  }
}
```

常用值：
- `all`：检测所有设备
- `screen`：检测电子屏幕，包括电脑、平板、手机屏幕等
- `print`：检测打印机

### 16.2 媒体查询-媒体特性

```css
/* 检测视口宽度大于等于900像素时应用样式 */
@media (min-width:900px) {
  h1 {
    background-color: lightskyblue;
  }
}

/* 检测屏幕宽度等于1920像素时应用样式 */
@media (device-width:1920px) {
  h1 {
    background-color: chartreuse;
  }
}
```

常用值：
- `width`：检测视口宽度
- `max-width`：检测视口最大宽度，小于等于该值时生效
- `min-width`：检测视口最小宽度，大于等于该值时生效
- `height`：检测视口高度
- `max-height`：检测视口最大高度，小于等于该值时生效
- `min-height`：检测视口最小高度，大于等于该值时生效
- `device-height`：检测设备屏幕的宽度
- `max-device-height`：检测设备屏幕的最大宽度
- `min-device-height`：检测设备屏幕的最小宽度
- `orientation`：检测视口是否横屏，值 `portrait` 表示视口纵向，`landscape` 表示视口横向

### 16.3 运算符

```css
/* 或运算符 */
@media (max-width:700px),
(min-width:900px) {
  h1 {
    background-color: aqua;
  }
}
```

常用值：
- `and`：且
- `,`：或
- `not`：否定
- `only`：肯定，一般用于 IE 兼容性问题

---

## 17. BFC

BFC 全称叫**块级格式上下文**（Block Formatting Context），可以理解为元素的一种特殊状态，在默认情况下，BFC 是关闭的，当元素满足某些条件后才会开启

BFC的作用：
1. 元素开启 BFC 后，其子元素不会产生 `margin` 塌陷问题
2. 元素开启 BFC 后，自己不会被其它浮动元素覆盖
3. 元素开启 BFC 后，就算其子元素浮动，元素自身高度也不会塌陷

如何开启BFC
- 根元素
- 浮动元素
- 绝对定位、固定定位的元素
- 行内块元素
- 表格单元格：`table`、`thead`、`tbody`、`tfoot`、`th`、`td`、`tr`、`caption`
- `overflow` 值不为 `visible` 的块元素
- 伸缩项目
- 多列容器
- `column-span` 为 `all` 的元素（即使该元素没被包裹在多列容器内）
- `display` 的值设为 `flow-root`