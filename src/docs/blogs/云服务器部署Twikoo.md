---
title: 云服务器部署Twikoo
date: 2024-06-01 16:10:44
updated:
tags:
 - twikoo
categories: 
 - 技术
keywords: 'twikoo,twikoo部署,云服务器部署twikoo,博客评论'
description: 云服务器部署 twikoo 评论系统过程记录
cover:
---

## 1. 背景

本站评论系统采用的是 **twikoo**，开源免费，并且部署方式多样，具体可以查看 [《twikoo 中文文档》](https://twikoo.js.org/backend.html)

之前选择通过 Zeabur 的方式部署，操作比较简单，但是非常不稳定，经常挂，后面又试了 Netlify，介绍说会更稳定，但是居然收费，果断放弃

最近入了新的云服务器，正好可以试一下私有部署方式

## 2. 私有部署

按照官方文档的操作步骤，服务器部署 twikoo 主要包括下面几步：

1. 服务器上安装下载 **Node.js**，也就是需要 Node 环境
2. 通过 npm 安装 twikoo 服务：`npm i -g tkserver`
3. 根据需要配置环境变量，可选，配置项如下：

- `MONGODB_URI`：MongoDB 数据库连接字符串，不传则使用 lokijs
- `MONGO_URL`：MongoDB 数据库连接字符串，不传则使用 lokijs
- `TWIKOO_DATA`：lokijs 数据库存储路径
- `TWIKOO_PORT`：端口号，默认 `8080`
- `TWIKOO_THROTTLE`：IP 请求限流，当同一 IP 短时间内请求次数超过该阈值将返回错误
- `TWIKOO_LOCALHOST_ONLY`：为 `true` 时只监听本地请求，使得 nginx 反代后不暴露原始端口
- `TWIKOO_LOG_LEVEL`：日志级别，支持 `verbose` / `info` / `warn` / `error`
- `TWIKOO_IP_HEADERS`：特殊情况使用，通常用不到，详见官方文档

4. 启动 twikoo 服务
5. 配置前端代理实现 https 访问
6. 博客配置

下面记录详情过程及其中的一些坑

### 2.1 node 环境

新入的云服务器，操作系统选的 centos7 ，没有 node 环境，需要重新安装

选择编译安装的方式，准备安装 `v18.20.3` 长期支持版本，这里遇到了第一个坑，具体操作如下：

1. 首先到 `/usr/local` 路径下创建 `nodejs` 文件夹，然后把下载的二进制文件放到这里，解压缩：

```bash
tar -xvf node-v18.20.3-linux-x64.tar.xz
```

2. 创建软连接

```bash
# 建立node软链接
ln -s /usr/local/nodejs/node-v18.20.3-linux-x64/bin/node /usr/local/bin
# 建立npm软链接
ln -s /usr/local/nodejs/node-v18.20.3-linux-x64/bin/npm /usr/local/bin
```

然后 `npm -v` 查看是否成功，这时候就报错了

![](https://pic.imgdb.cn/item/665c86c1d9c307b7e9a4caf1.png)

查了下，从 node `v18` 版本开始需要 `glibc-2.28` 支持，可能装更低版本的 node 就不会有这个问题

根据提示安装所需的 `glibc-2.28`：

```bash
cd /usr/local
mkdir glibc && cd glibc

wget http://ftp.gnu.org/gnu/glibc/glibc-2.28.tar.gz
tar xf glibc-2.28.tar.gz

cd glibc-2.28/ && mkdir build && cd build

../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```

此时报关于 `bison` 和 `make` 的错误：

```bash
configure: error: 
*** These critical programs are missing or too old: make bison compiler
*** Check the INSTALL file for required versions.
```

查看 `bison` 版本：

```bash
bison -V
```

发现服务器还没安装 `bison`，安装：

```bash
yum install -y bison
```

更新 `gcc` 与 `make`：

```bash
# 升级GCC
yum install -y centos-release-scl
yum install -y devtoolset-8-gcc*

mv /usr/bin/gcc /usr/bin/gcc-4.8.5
ln -s /opt/rh/devtoolset-8/root/bin/gcc /usr/bin/gcc
mv /usr/bin/g++ /usr/bin/g++-4.8.5
ln -s /opt/rh/devtoolset-8/root/bin/g++ /usr/bin/g++

# 升级make
cd /usr/local && mkdir make && cd make
wget http://ftp.gnu.org/gnu/make/make-4.3.tar.gz
tar -xzvf make-4.3.tar.gz && cd make-4.3/
./configure --prefix=/usr/local/make
make && make install 

cd /usr/bin/ && mv make make.bak
ln -sv /usr/local/make/bin/make /usr/bin/make
```

此时再执行上面配置 `glibc` 的步骤：

```bash
cd /usr/local/glibc/glibc-2.28/build

../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```

配置没报错，继续安装 `glibc`：

```bash
make && make install
```

这个过程比较长，大概要 20 分钟，安装好之后验证 node 环境是否装好：

```bash
npm -v
```

仍有报错，未找到 `CXXABI_1.3.9`：

```bash
node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by node)
```

此时需要更新 `libstdc++.so.6.0.26`：

```bash
cd /usr/local/ && mkdir libstd && cd libstd
wget https://cdn.frostbelt.cn/software/libstdc%2B%2B.so.6.0.26

cp libstdc++.so.6.0.26 /usr/lib64/
cd /usr/lib64/
ln -sfn ./libstdc++.so.6.0.26 libstdc++.so.6
```

再次验证 `node` 环境，没有问题

### 2.2 安装 twikoo

按照官方文档介绍安装：

```bash
npm i -g tkserver
```

第三步跳过，直接使用默认配置

### 2.3 运行 twikoo

按照官方文档介绍，直接运行 `twikoo` 命令启动服务会报错，可能是因为没配全局环境

此时查看 `node` 仓库地址：

```bash
npm config ls
```

进入仓库找到 `tkserver` 包并进入其 bin 目录，其中 `server.js` 文件就是程序的入口文件，通过 `node` 运行：

```bash
node server.js
```

程序启动后，默认会监听 `8080` 端口，访问 `http://服务端IP:8080` 查看，页面会显示一段 json 信息：

```json
{
    "code": 100,
    "message": "Twikoo 云函数运行正常，请参考 https://twikoo.js.org/frontend.html 完成前端的配置",
    "version": "1.6.36"
}
```

但此时不是后台运行，一旦连接窗口关闭，运行就会停止，官方文档也给了解决办法，即通过 `nohup` 命令后台运行：

```bash
nohup tkserver >> tkserver.log 2>&1 &
```

但由于 `tkserver` 不是全局命令，直接运行上面命令会报错，此问题可以通过 `shell` 脚本很方便地解决:

查看 `server.js` 完整路径：

```bash
realpath server.js
```

新建 `run.sh` 文件，内容就一行：

```shell
node /usr/local/nodejs/node-v18.20.3-linux-x64/lib/node_modules/tkserver/server.js
```

执行 `nohup` 命令：

```bash
chmod +x run.sh
nohup ./run.sh >> tkserver.log 2>&1 &
```

此时就可后台运行 `twikoo` 服务

### 2.4 配置 https

`twikoo` 默认是 http 访问，官方文档建议配置 `https`，由于之前配置过 https，只需加个路径即可：

```
location /twikoo {
  proxy_pass http://localhost:8080;
}
```

当通过 https 访问该路径时，代理到 twikoo 服务

### 2.5 博客配置

配置 https 之后，`envId` 就是 `https://域名/twikoo`，将其正确配置到博客配置文件中，`twikoo` 的私有化部署就完成了^-^