---
title: Matery主题优化
date: '2022-04-14'
updated:
tags: Matery
categories: 技术
keywords: 'Matery,美化'
description: 关于 Matery 主题的一些优化设置，追求简洁高效，实际效果也很不错
cover: https://pic.imgdb.cn/item/62568b71239250f7c525d629.jpg
---

## 1. 前提

大概两年前用 hexo + gitee 部署了一个静态博客，写了几篇机器学习的笔记后就搁置了，最近才想起来自己还有个博客。

时隔这么久点进去感觉加载很慢，便换到了 github 上，速度明显快了，如果不想花钱的话还是推荐直接部署到 github上。

此前使用的主题是 yilia，相当简洁，但是好几年没更新了，准备换成 Matery，相比起来这款更好看。

在此之前，需要先安装 Node.js、Git 和 Hexo，并做好相关配置。

___

## 2. 主题更换

建议先按照 [Matery](https://github.com/blinkfox/hexo-theme-matery/blob/develop/README_CN.md) 作者给出的建议完成基本配置，为了兼顾性能，需要做出取舍。

建议配置以下功能：

* 分类页

* 标签页

* 关于我

* 404

* 菜单导航配置

* 代码高亮

* 搜索

* 中文链接转拼音

* 文章字数统计

* 修改社交链接

* 更换打赏二维码

* 自定制修改：为了简洁，将我的项目、技能、相册置为 flase，其它按需修改

___

## 3. 主题优化

### 3.1 更换导航栏颜色

导航、页尾的默认颜色为绿色，感觉不好看，可以在主题文件 `/source/css/matery.css` 文件中搜索 `bg-color` 来修改颜色：

```css
.bg-color {
    background-image: linear-gradient(to right, #FFB6C1 0%, #778899 100%);
}
```

### 3.2 使用图床

为了提高页面加载速度，将后续博客中的图片全部放到图床，我选择的是[聚合图床](https://www.superbed.cn/)，普通用户能免费放1000张图片，对于我来说够用了。

当图片上传后会生成一个链接，直接在 Markdown 文件中引用即可，主题配置文件中的头像、网站Logo、打赏二维码也同样放到图床。

最好在图片上传图床前先压缩图片，提升加载速度。

### 3.3 设置banner图片

主题默认会每天更换一张首页上的背景图，一共有6张，为了节省资源，可以全部删除，并设置成使用图床上的固定的背景图，在主题目录 `/layout/_partial/bg-cover-content.ejs`  查找 `<% if (theme.banner.enable) { %>` ，修改其中内容为：

```ejs
<script>
    $('.bg-cover').css('background-image', 'url(<%- theme.jsDelivr.url %><%- url_for('你的图片地址) %>)');
</script>
```

主题会在 banner 图上面遮一层变化的颜色，可以在主题文件 `/source/css/matery.css` 文件中搜索 `.bg-cover:after` 来注释取消：

```css
/* .bg-cover:after {
    -webkit-animation: rainbow 60s infinite;
    animation: rainbow 60s infinite;
}*/
```

### 3.4 设置文章封面图

如果文章没有在 Front-matter 指定 img，主题会从 `/source/medias/featureimages` 文件夹中选一张作为封面图，一共有24张图片，为了节省资源，全部删除。

此时需要指定图床中的图片作为默认封面图，将 `_config.yml` 文件中的 `featureImages` 改成封面图地址，否则，当文章没有指定 img 会出错：

```yaml
# The post featured images that needs to be displayed when there is no image.
# 无文章特色图片时需要显示的文章特色图片.
featureImages: 
  - https://pic.imgdb.cn/item/6257c1b1239250f7c5b24607.jpg
```

### 3.5 图片懒加载

设置主题图片进行懒加载，这样做效果就是 `html`、`css`、`js` 加载之后，图片再加载。既保证了网页的打开速度，也不会因图片的庞大体积而拖累了整个页面的加载。

先安装插件：

```bash
npm install hexo-lazyload-image --save
```

然后到博客根目录下 `_config.yml` 中加入以下字段：

```yaml
# 懒加载
lazyload:
  enable: true # 是否开启图片懒加载
  onlypost: false # 是否只对文章的图片做懒加载
  loadingImg: /images/loading.gif
```

### 3.6 压缩代码

为了减少生成文件的大小，可以压缩代码。

安装插件：

```bash
npm install hexo-neat --save
```

在根目录配置文件 `_config.yml` 末尾加入以下配置：

```yaml
#hexo-neat 优化提速插件（去掉HTML、css、js的blank字符）
neat_enable: true
neat_html:
  enable: true
  exclude:
    - '**/*.md'
neat_css:
  enable: true
  exclude:
    - '**/*.min.css'
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '**/*.min.js'
    - '**/**/instantpage.js'
    - '**/matery.js'
```

### 3.7 动态标签栏

在 `theme/matery/layout/layout.ejs` 下添加如下代码：

```javascript
<script type= "text/javascript" >
    var OriginTitile=document.title,st;
    document.addEventListener("visibilitychange",function()
     {
        document.hidden?(document.title="ヽ(●-`Д´-)ノ你要玩捉迷藏嘛",clearTimeout(st)):(document.title="(Ő∀Ő3)ノ被发现啦！",st=setTimeout(function(){
            document.title=OriginTitile},3e3))
    })
</script>
```

### 3.8 外链跳转链接

自动为所有 `html` 文件中外链的 `a` 标签生成对应的属性，告诉搜索引擎这是外部链接,不要将该链接计入权重。 自动在根目录下生成外链跳转页面 `go.html`。

安装插件：

```bash
$ npm install hexo-external-link --save
```

在  hexo 根目录的 `_config.yml` 文件中添加如下配置：

```yaml
hexo_external_link:
  enable: true
  enable_base64_encode: true
  url_param_name: 'u'
  html_file_name: 'go.html'
  target_blank: true
  link_rel: 'external nofollow noopener noreferrer'
  domain: 'your_domain' # 如果开启了防盗链
  safety_chain: true
```

### 3.9 修改移动端网站标题字体大小

因为标题字数比较多，在手机端标题会自动换行，影响美观，可以通过在主题目录 `/sosurce/css/my.css` 新增样式改变移动端标题字体大小：

```css
/* 修改博客标题的字体大小 */
@media only screen and (max-width: 601px) {
    header .brand-logo .logo-span {
        font-size: 1.2rem;
    }
}
```

___

## 4. 最终效果

![我的博客](https://pic.imgdb.cn/item/63b307f0be43e0d30eb09206.png)