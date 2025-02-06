---
title: Python项目--五子棋游戏
date: '2020-08-26'
updated: '2023-09-10'
tags: 
  - Python
  - 项目
categories: 
  - 技术
cover: https://pic1.imgdb.cn/item/638cad7cb1fccdcd3633bd20.png
keywords: 'python,五子棋,pygame'
description: 用 Pygame 模块做的五子棋游戏，涉及socket相关知识
---

## 1. 项目简介

 学习 python 套接字部分时，突发奇想，觉得可以用套接字传递棋子的坐标，做一个局域网的五子棋小游戏。
 
 这时刚学过 pygame 模块不久，正好借这个项目练练手，做个属于自己 pygame 小游戏项目。
 
 初期功能只有局域网对战和音量控制，后面添加了人机对战功能，整体比较简单，适合新手练手。

 ___ 

## 2. 实现思路

 ### 2.1 局域网对战
 
  对于局域网功能来说，首先建立连接(tcp)，然后每次下棋时将棋子的坐标发送给对方，当接收到坐标后实例化成棋子对象。
  
  接收时用了 select 函数，因为 pygame 需要循环渲染图片，所以要用非阻塞方式接收消息，select 函数直接调用操作系统的 IO 接口，它监控 sockets、open files 和 pipes(所有带 fileno 函数 的 文件句柄)何时变成 readable 和 writeable，或者通信错误。
  
  select 函数使得同时监控多个连接变的简单，并且这比写一个长循环来等待和监控多客户端连接要高效，因为 select 直接通过操作系统提供的 C 的网络接口进行操作，而不是通过 Python 的解释器。
  
  套接字传递棋子坐标代码如下：
  
  ```python
  #接收cli的消息
  if is_people:
      rs, ws, es = select.select(inputs, [], [], 0)
      for r in rs:
          if r is tcpclisock:
              try:
                  data = r.recv(BUFSIZ)
                  islink = True
                  print(data.decode('utf8'))
                  if data.decode('utf8') == 'again':
                      is_recieve1 = True
                  if data.decode('utf8') == 'yes':
                      is_playagain = True
                      is_play = True
                  if data.decode('utf8') == 'no':
                      is_recieve2 = True
                      islink = False
                  if not is_play and not result:
                      me = storn.Storn_Black(eval(data))
                      black_chesses.append(me)
                      chesses.append(me)
                      is_play = True
              except error:
                  islink = False
  ```
  
   
 ### 2.2 人机对战
 
  人机对战的思路也很简单，用了应该是最常见的也是最简单的方法，就是循环遍历棋盘的每一个点，判断该点的价值，选取价值最大的点落子，这个需要对五子棋的棋型有一定了解。
  
  这里介绍两种常见的棋型（约定1为己方棋子，2为对方棋子，0为空):
  > 1. 活四(011110)：这时候四颗棋子相连，同时两端为空，已经阻止不了一方的胜利了，此时价值应该设置最高
  > 2. 死四(011112|10111|11011)：四颗棋子，只有一个地方能形成连五，如果是自己的棋可以赢，是对方的也可以阻止对方赢棋，此时价值次高。
  
  主要代码如下：
  
  ```python
  # 判断每个点的价值
  def point_value(pos, identify1, identify2):
      value = 0
      for i in range(1, 9):
          # *1111_ 活四
          if get_point(pos, i, 1) == identify1 and \
                  get_point(pos, i, 2) == identify1 and \
                  get_point(pos, i, 3) == identify1 and \
                  get_point(pos, i, 4) == identify1 and \
                  get_point(pos, i, 5) == 0:
              value += 40000
          # *11112 死四1
          if get_point(pos, i, 1) == identify1 and \
                  get_point(pos, i, 2) == identify1 and \
                  get_point(pos, i, 3) == identify1 and \
                  get_point(pos, i, 4) == identify1 and \
                  get_point(pos, i, 5) == identify2:
              value += 30000
      ...
      return value
  ```
  
  电脑选择落子位置时，要判断是进攻还是防守，需要两次遍历棋盘，获取进攻时的最大价值和防守的最大价值，主要代码如下：
  
  ```python
  # 电脑选取落子的位置
  def ai(white_chesses, black_chesses, chesses):
    value = max1 = max2 = 0
    pos1 = pos2 = ()
    # 进攻时
    for i in range(0,15):
        row = 28 + i * 40
        for j in range(0,15):
            col = 28 + j * 40
            pos = (row,col)
            if is_empty(pos, chesses):
                continue
            value = point_value(pos, white_chesses, black_chesses, 1, 2)
            if value > max1:
                max1 = value
                pos1 = (row,col)
  
    # 防守时
    for i in range(0,15):
        for j in range(0,15):
            row = 28 + i * 40
            col = 28 + j * 40
            if is_empty((row,col), chesses):
                continue
            value = point_value((row,col), white_chesses, black_chesses, 2, 1)
            if value > max2:
                max2 = value
                pos2 = (row,col)
    if max1 > max2:
        return pos1
    else:
        return pos2
  ```
 
 ___ 

## 3. 游戏截图

 <center>
 <img src="https://pic.imgdb.cn/item/6258327a239250f7c5738e33.pngvv" width="500"/>  
 </center>
 
 ___ 

## 4. 源码地址

 github: https://github.com/tctctctctc/python-gobang  
 gitee: https://gitee.com/tctctctctc/python-gobang