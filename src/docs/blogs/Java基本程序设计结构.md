---
title: Java基本程序设计结构
date: 2023-07-19
updated:
tags: 
 - 笔记
 - Java
categories:
  - 笔记
keywords: 'javaSE,java基础'
description: JavaSE 方面的基础知识，包括数据类型、变量等
cover: 
---

## 1. 导论  

### 1.1 解释型与编译型  

**解释型语言**：使用专门的解释器对源程序逐行解释成特定平台的机器码并立即执行；代码在执行时才被解释器一行行动态翻译和执行，而不是在执行之前就完成翻译；通常效率更低，但跨平台性好。  

**编译型语言**：将源代码通过编译器一次性编译成机器语言，通常会针对不同系统打包成该系统可使用的可执行文件（如 exe）；通常效率更高，但可移植性差。  

严格来说，Java 既是编译型语言也是解释型语言，先将源代码编译成字节码文件，再解释执行。  

### 1.2 JDK 与 JRE

JDK（Java 开发工具包）包含了 Java 的开发工具和 JRE，所以安装了 JDK，就不用单独安装 JRE，其中的工具有编译工具 javac.exe、打包工具 jar.exe 等。  

JRE（Java 运行环境）包括 Java 虚拟机和 Java 程序所需核心类库等，如果想要运行一个开发好的 Java 程序，只需安装 JRE 即可。  

> JDK = JRE + 开发工具集  
> JRE = JVM + JavaSE 标准类库  

---

## 2. 一个简单的 Java 程序  

```java
public class FirstSample{
  public static void main(String[] args) {
    System.out.println("Hello World!");	 
  }
}
```

- Java 区分大小写
- `main` 方法必须声明为 `public`
- Java 中所有函数都为某个类中的方法
- 在一个源文件中可以声明多个类，但最多只能有一个类声明为 `public`，而且要求该类的类名和源文件名相同

---

## 3. 注释与命名规范

### 3.1 注释

单行注释：

```Java
// 这是一条注释
```

多行注释，不能嵌套使用：

```Java
/* 这是一条
   多行	
   注释 */
```

文档注释：

```Java
/** 
 * 这是一条
 * 文档
 * 注释 
 * */
```

文档注释一般用在方法和类上，注释内容可以被 JDK 提供的工具 javadoc 所解析，生成一套以网页文件形式体现的该程序的说明文档

### 3.2 命名规范

- **包名**：多单词组成时所有字母小写 `xxyyzz`  
- **类名、接口名**：多单词组成时所有单词首字母大写 `XxYyZz`  
- **变量名、方法名**：多单词组成时第一个单词首字母小写，后面每个单首字母大写 `xxYyZz`  
- **常量名**：所有字母大写，多单词时每个单词用下划线连接 `XX_YY_ZZ`

---

## 4. 数据类型

### 4.1 基本数据类型

- **数值型**：整型 `byte/short/int/long`、浮点型 `float/double`  
- **字符型**：`char`，表示 Unicode 编码字符（在 Java 中为 utf-16 的一个代码单元，16位） 
- **布尔型**：`boolean`，表示真或假

注意：
- Java 没有任何无符号形式的整形
- `long` 在初始化时要在数值后加 `L`
- `float` 在初始化时要在数值后加 `f`，如 `3.14f`，否则默认为 `double`
- `byte` 用在大型数组可以显著节省空间，在二进制文件读写中应用较多
- 布尔型只能取 `true` 和 `false`，不能取 `null`，不能用 0 和非 0 的数替代 
- 三个特殊的浮点数：正无穷大 `Double.POSITIVE_INFINITY`、负无穷大 `Double.NEGATIVE_INFINITY` 和非法值 `Double.NaN`（Float 类型也有对应的常量）

 ![整型](https://pic.imgdb.cn/item/64bbd4e11ddac507cc5b67a5.png)

![浮点型](https://pic.imgdb.cn/item/64bbd4ea1ddac507cc5b8d0a.png)

### 4.2 引用数据类型

引用数据类型主要有**类**、**接口**和**数组**

- 值 `null` 可以赋给所有的引用类型
- 引用数据类型的变量值不是 null 就是地址值
- 字符型不能表示很精确的数字（即不能表示 ascii 对应的数字）

---

## 5. 变量

### 5.1 变量

- 变量定义的一般形式：`<类型名称><变量名称>`
- 变量的作用域：一对 `{}` 之间有效
- 普通变量在使用前必须初始化
- 利用关键字 <font color="red">**final**</font> 定义常量

### 5.2 标识符

对各种变量、方法等要素命名时使用的字符序列称为标识符，其命名规如下：
- 由**字母**、**数字**、**下划线**或 **$** 组成
- 数字不能开头
- 不能包含空格
- 大小写敏感

### 5.3 关键字

定义：被赋予特殊含义，有专门用途的单词
- 关键字不能用作标识符
- 所有字母小写

![关键字](https://pic.imgdb.cn/item/64bbd24b1ddac507cc502eb8.png)
![关键字](https://pic.imgdb.cn/item/64bbd2541ddac507cc505843.png)

### 5.4 保留字

目前还未使用，以后 Java 版本可能会作为关键字使用，如 `byValue`、`cast`、`future` 等，不建议将保留字用作标识符

---

## 6. 运算符

### 6.1 自动类型提升

数值之间合法转换图如下:  

![](https://pic.imgdb.cn/item/64bbdfe91ddac507cc90e8f4.png)
 
实心箭头表示无信息丢失的转换，虚箭头表示可能有精度损失的转换

```Java
int n = 123456789;
float f = n;  // f 实际上是1.23456792E8
// 123456789 是大整数，位数比 float 能表达的位数多，因此转换有精度损失
```
 
当使用两个数值进行二元操作时，会先将两个操作数转换成同一种类型再计算：
- 如果两个操作数有一个是 `double`，另一个操作数就会转换成 `double`
- 否则，如果其中一个操作数是 `float`，另一个操作数将会转换成 `float`
- 否则，如果其中一个操作数是 `long`，另一个操作数将会转换成 `long`
- 否则，两个操作数都将转换成 `int`
- 当把所有基本类型的值和字符串进行连接，基本类型的值将自动转换成字符串类型，注意字符串在前和在后的区别

### 6.2 强制类型转换

- 字符串不能直接转换为基本数据类型，需要通过基本类型的包装类进行转换，如：

```Java
String a = "88";
int i = Integer.parseInt(a);
```

- `boolean` 类型不可以转为其它基本数据类型  
- 转换可能会有信息丢失

### 6.3 赋值运算符

可以在赋值中使用二元运算符，如 `x += 1`，如果右边操作数类型与左边不同，就会发生强制类型转换

```Java
int a;
a += 3.5;  // 等价于 a = (int)(a + 3.5)
```

### 6.4 关系和布尔运算符

- 使用 `&&` 表示逻辑“与”运算符，`||` 表示逻辑“或”运算符，按照短路方法求值，即第一个操作数能够确定表达式的值，就不会计算第二个操作数
- `boolean` 类型不能比较大小，只能判断是否相等
- 浮点数由于精度问题，不推荐使用 `==` 判断是否相等，推荐使用绝对值判断

```Java
0.3 == 0.1 + 0.1 + 0.1; // false
Math.abs(a - b) < 1e-6;  // 使用绝对值判断 a 和 b 的大小
```

### 6.5 二进制
 
<font color="red">正数的原码、反码、补码都相同

负数的补码等于反码加一，在计算机中负数以补码的形式存储</font>

### 6.6 三目运算符
 
格式：`条件表达式 ? 表达式 1 : 表达式 2`  
条件表达式为 `true`，运算后结果为表达式 1，否则为表达式 2

### 6.7 位运算符
 
`&` 和 `|` 也可以用于逻辑运算，返回布尔值，但与 `&&` 和 `||` 不同的是左右两边都会计算  

![位运算符](https://pic.imgdb.cn/item/64bdf6d51ddac507cc6d8d08.png)

### 6.8 符号优先级

![符号优先级](https://pic.imgdb.cn/item/64bdf6dd1ddac507cc6da3e8.png)
 
只有单目运算符、三目运算符和赋值运算符是从右向左运算

### 6.9 枚举类型
 
为了将变量的取值限定在有限范围，可以自定义枚举类型。枚举类型包括有限个命名的值，如：

```Java
enum Size = {SAMLL, MEDIUM, LARGE};  // 声明枚举类型变量
Size s = Size.MEDIUM; // Size 类型变量只能存储枚举类型声明中给定的某个枚举值，或者null 值
```

### 6.10 交互两个变量的值
 
定义临时变量：

```Java
int temp = num1;
num1 = num2;
num2 = temp;
```

不用定义临时变量，但可能溢出：

```Java
num1 =  num1 + num2;
num2 = num1 - num2;
num1 = num1 - num2;
```
 
使用位运算符：

```Java
num1 = num1 ^ num2;
num2 = num1 ^ num2;
num1 = num1 ^ num2;
```

---

## 7. 字符串

字符串就是 Unicode 字符序列

### 7.1 子串

String 类的 `substring `方法可以从较大的字符串中提取一个子串

```java
String greedy = "Hello";
greedy.substring(0, 3); //"Hel"
```

`charAt()`：返回字符串的下标索引的 char 值

```java
String greedy = "Hello";
greedy.charAt(0); //'H'
```

### 7.2 拼接

使用 `+` 号将两个字符串拼接成一个，当一个字符串与非字符串的值拼接时，非字符串转换成字符串

如果需要把多个字符串拼接到一起，使用一个界定符分隔，可以使用静态 `join` 方法：

```java
String all = String.join("/", "S", "M", "L"); //all is "S/M/L"
```

java 字符串不可通过索引更改，所以又称为不可变字符串

### 7.3 检测字符串是否相等

可以使用 `equals` 方法检测两个字符串是否相等，不区分大小写，可以使用 `equalsIgnoreCase` 方法，一定不能使用 `==`，对于引用数据类型，`==` 判断地址是否相同

### 7.4 空串与 null 串

空串 `" "` 是长度为 0 的字符串，Sting 变量还可以存放特殊值 `null`，二者不同

判断是否是空串：

```java
if(str.lenght() == 0)
或
if(str.equals(""))
```

判断是否是 null 串：

```java
if(str == null)
```

### 7.5 码点与代码单元

Java 字符串由 char 型序列组成，而 char 数据类型是一个采用 utf-16 编码表示 Unicode 码点的代码单元，大多数字符使用一个代码单元可以表示，但是辅助字符需要两个代码单元表示

`length` 方法返回的是采用 UTF-16 编码表示的字符串所需的代码单元数量

### 7.6 构建字符串

当需要经常进行字符串拼接操作时，每次连接字符串，都会构建一个新的 String 对象，既耗时又耗空间，使用 `StringBuilder` 类就可以避免这个问题

```java
// 首先，构建一个空的字符串构建器
StringBulider biulder = new StringBulider();
// 需要添加部分字符串则使用append方法
bulider.append(ch); //添加单字符
// 当需要构建字符串时使用toString方法，可以得到String对象
String completedString = builder.toString();
```

---

## 8. 输入输出

### 8.1 读取输入

要想通过控制台输入，首先需要构造一个 `Scanner` 对象，并与“标准输入流” `System.in` 关联

```java
import java.util.Scanner;
Scanner in = new Scanner(System.in);
```

使用 `nextLine` 方法输入一行，可包括空格：

```java
String name = in.nextLine();
```

要想读取一个单词（以空白符作为分割），使用 `next` 方法：

```java
String firstName = in.next();
```

要想读取一个整数，使用 `nextInt` 方法：

```java
int age = in.nextInt();
```

### 8.2 格式化输出

`printf` 方法可以格式化输出

用于 `printf` 的转换符：

![](https://pic.imgdb.cn/item/658044ddc458853aef56c0e8.png)

用于 `printf` 的标志：

![](https://pic.imgdb.cn/item/658044ddc458853aef56c10e.png)

可以使用静态的 `String.format` 方法创建一个格式化的字符串，而不打印输出：

```java
String message = String.format("Hello, %s. Next year your age is %d", name, age);
```

### 8.3 文件输入与输出

要想对文件进行读取，就需要一个用 `File` 对象构造的 `Scanner` 对象：

```java
Scanner in = new Scanner(Paths.get("myFile.txt"), "UTF-8");
```

之后便可以用 `Scanner` 方法对文件进行读取

要想写入文件，就需要构造一个 `PrintWriter` 对象：

```java
PrintWriter out = new PrintWriter("myFile.txt", "UTF-8");
```

如果文件不存在则创建文件，可以使用 `print`、`printf`、`println` 命令输出到文件

在 IDE 中查看 Java 虚拟机启动路径（使用相对路径有用）：

```java
String dir = System.getProperty("user.dir");
```

----

## 9. 控制流程

### 9.1 块作用域

块是由一对大括号括起来的若干 java 语句，确定了变量的作用域

块可以嵌套，但<u>不可以在嵌套的两个块中声明同名的变量</u>

### 9.2 确定循环

确定循环就是指 for 循环，for 语句三个部分应该对同一计数器变量进行初始化、检测和更新

for 语句内部定义的变量不能在循环体外使用，如果希望在循环体外使用循环计数器的最终值，就要确保计数变量在循环体外部声明

```java
int i;
for(i = 1; i <= 10; i++){
	...
}
```

可以在不同的 for 循环体内定义同名变量

### 9.3 switch

java 中不推荐使用 `switch` 语句

语句将从选项值相匹配的 `case` 处执行，到 `break` 结束，如果 `case` 分支语句末尾没有 `break`，将会接着执行下一个 `case`，这是非常危险的操作

如果没有相匹配的 `case` 而有 `default` 子句，就执行这个子句

`case` 标签可以是：
- 类型为 `char`、`byte`、`short`、`int` 的常量表达式
- 枚举常量
- 字符串字面量

### 9.4 标号

在循环前可以放一个标号来标示循环，带标号的 `break` 和 `continue` 对那个标号起作用

```java
public static void main(String[] args) {
	OUT:
    for(int i = 1; i <= 9; i++) {
        for(int j = 1; j <= i; j++) {
            System.out.print(i + "" + j + "=" + ij + '\t');
            break OUT;
        }
    	System.out.print('\n');
    }
}
```

标号推荐全部字母大写

---

## 10. 大数值

`java.math` 包提供了两个处理大数值的类：`BigInteger` 和 `BigDecimal`，这两个类可以处理任意长度数字序列的数值

`Biginteger` 类实现了任意精度的整数运算，`BigDecimal` 实现了任意精度的浮点数运算，不过不能使用算数运算符处理大数值（如 + 和 *），而需要使用大数值类中的方法 `add` 和 `multiply`

使用静态 `valueOf` 方法可以将普通的数值转换成大数值：

```java
BigInteger a = BigInteger.valueOf(100);
```

---

## 11. 数组

声明数组变量时需要指出数组类型，如声明整形数组 `int[] a;`，此时只声明了变量 a，并没有将 a 初始化成真正数组，应该使用 `new` 运算符创建数组 `int[] a = new int[100];`

数组长度不要求是常量，`new int[n]` 会创建长度为 n 的数组

获取数组元素个数可以使用 `array.length`

创建数组：`int[] a;` 或 `int a[];`，推荐前者，因为它将类型与变量名分开了

创建一个数值数组，所有元素都初始化为 **0**

`boolean` 数组的元素会初始化为 `false`

对象数组的元素则初始化为特殊值 `null`

### 11.1 for...each 循环

`for...each` 循环是一种增强的循环结构，可以用来依次处理数组（其他类型的元素集合亦可）中的每个元素而不必为指定下标分心

语法：`for (variable : collection) statement`

支持 `for...each` 循环的必须是一个数组或实现了 Iterable 接口的类对象

```java
for (int element : a) {
  System.out.println(element);
}
```

### 11.2 数组初始化以及匿名数组

创建数组对象并同时赋予初始值的简化书写形式：

```java
int[] smallPrimes = {2, 3, 5, 7, 9};
```

初始化匿名数组：

```java
new int[] {2, 3, 5, 7, 9};
```

使用匿名数组可以在不创建新变量的情况下重新初始化数组：

```java
smallPrimes = new int[] {12, 15, 17};
```

java 中允许数组长度为 0，与数组为 `null` 不同

### 11.3 数组拷贝

**浅拷贝**：`int[] lickNumber = smallPrimes`，两个变量将引用同一数组

**深拷贝**：使用 `Array` 类的 `copyOf` 方法

```java
int[] copyedLuckNumber = Array.copyOf(luckNumber, luckNumber.length)
```

第二个参数是新数组的长度，这个方法通常用来增加数组的大小，如果数组元素是数值型，多余的元素将被赋值为 0；如果是布尔型，多于元素将被赋值为 `false`；如果长度小于原始数组长度，则只拷贝最前面的数组元素

### 11.4 命令行参数

函数接收数组作为参数即命令行参数，比如 java 的 `main` 函数

### 11.5 数组排序

`Array.sort` 方法，采用优化后的快排

### 11.6 多维数组

使用 for each 输出每一个值：

```java
int[][] magicSquare = 
{
    {12, 11, 10},
    {9, 8, 7},
    {66, 5, 6}
}

for(int[] row : magicSquare)
    for(int value : row)
        pass
```

### 11.7 不规则数组

java 实际上没有多维数组，只有一维数组，只是一维数组中存放的是数组，因此可方便地构造不规则数组：

```java
int[][] odds = new int[MAX + 1][];

for (int n = 0; n <= MAX; n++) {
	odds[n] = new int[n + 1];
}
```

### 11.8 内存的简化结构

![内存的简化结构](https://pic.imgdb.cn/item/658044ddc458853aef56c160.png)