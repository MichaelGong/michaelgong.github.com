---
title: JavaScript中的string的方法总结
date: 2017-09-13 15:25:35
tags: [前端, string, 字符串]
keywords: 字符串,string
summary: 关于js中string方法的一些整理
---
<!-- toc -->

字符串在js中的使用范围比较广泛，可以用于初始话变量，或者拼接语段或者连接成html代码等等，你可以通过直接声明的方式`var str = 'string'`或者`var str = new String('string')`的方式来声明js字符串。

## String.length
返回字符串的长度，空字符串的length为0。JavaScript 使用 UTF-16 编码，该编码使用一个 16 比特的编码单元来表示大部分常见的字符，使用两个代码单元表示不常用的字符。因此 length 返回值可能与字符串中实际的字符数量不相同。

## String.prototype.indexOf
语法：
> `str.indexOf(searchValue[, fromIndex])`

该方法返回调用  String 对象中第一次出现的指定值的索引，开始在 fromIndex进行搜索。
接收两个参数：
searchValue:要被查找的字符串
fromIndex: 开始查找的位置，默认0。如果fromIndex < 0 相当于fromIndex=0，或查找整个字符串。如果fromIndex > str.length，则返回-1，除非`被查找的字符串`是一个空字符串，此时返回str.length

如果在字符串中没有找到指定字符的话，返回-1，否则返回字符的索引。

## String.prototype.lastIndexOf
语法：
> `str.lastIndexOf(searchValue[, fromIndex])`

该方法返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。从该字符串的`后面向前`查找，从 fromIndex 处开始。
同样接收两个参数：
searchValue:要被查找的字符串
fromIndex: 从字符串的这个索引位置开始自后向前查找。可以是任意整数，默认是str.length，如果是负值的话，则被当做0。如果fromIndex>str.length，那么fromIndex被看做是str.length

## String.prototype.split
语法:
> `str.split([separator[, limit]])`

该方法使用指定的分隔符将一个string对象分割成数组，并可以限制分割的数组长度。
接收两个参数：
separator：分隔符，可以是字符串或正则表达式
limit: 可选，可以限制分割后数组的长度
## String.prototype.slice
语法:
> `str.slice(beginSlice[, endSlice])`

该方法提取字符串中的一部分，并返回新的字符串。
两个参数：
beginSlice: 开始截取字符串的索引（从0开始），如果是负数，会被当成str.length+beginSlice看待（例如beginSlice是-3，那个会被看成是str.length-3）
endSlice: 可选，停止截取字符串的索引（从0开始），如果不传，默认会截取到字符串的末尾，如果传的是负数，会被当成str.length+endSlice来看待。

<div class="tip">注意：slice() 提取的新字符串包括beginSlice但不包括 endSlice。</div>

## String.prototype.substr
语法:
> `str.substr(start[, length])`

该方法返回从一个字符串的指定位置开始到指定字符数的字符。
参数：
start: 开始截取字符的索引，如果为负数，会当做str.length + start来处理，如果大于等于字符串的长度返回空字符串
length: 可选，截取的字符的长度。如果传0或者负数，则返回空字符串。

## String.prototype.substring
语法:
> `str.substring(indexStart[, indexEnd])`

该方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
参数：
indexStart: 一个 0 到字符串长度之间的整数。
indexEnd: 可选。一个 0 到字符串长度之间的整数。

substring 提取从 indexStart 到 indexEnd（不包括）之间的字符。特别地：
> * 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
> * 如果省略 indexEnd，substring 提取字符一直到字符串末尾。
> * 如果任一参数小于 0 或为 NaN，则被当作 0。
> * 如果任一参数大于 stringName.length，则被当作 stringName.length。

如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。例如，str.substring(1, 0) == str.substring(0, 1)。

## String.prototype.toLowerCase
将字符串转化成小写的
```javascript
'中文简体 zh-CN || zh-Hans'.toLowerCase(); // 中文简体 zh-cn || zh-hans
```

## String.prototype.toUpperCase
将字符串转化成大写的
```javascript
'mvc'.toUpperCase(); // MVC
```

## String.prototype.replace
方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。

语法：
> * str.replace(regexp|substr, newSubStr|function)

参数：
regexp：一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
substr：一个要被 newSubStr 替换的字符串。其被视为一整个字符串，而不是一个正则表达式。仅仅是第一个匹配会被替换。
newSubStr：用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。
function：一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。

该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。
在进行全局的搜索替换时，正则表达式需包含 g 标志。

具体参数请查阅[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

## String.fromCharCode
接收的参数是一组序列数字，表示Unicode值。
该方法返回一个字符串，而不是一个 String 对象。

由于 fromCharCode 是 String 的静态方法，所以应该像这样使用：`String.fromCharCode()`，而不是作为你创建的 String 对象的方法。
```javascript
String.fromCharCode(65,66,67)
```
以上代码返回的是字符串'ABC'，也就是A、B、C的Unicode编码分别是65，66，67

## String.fromCodePoint
接收一串Unicode编码。
该方法是静态方法，返回使用指定的代码点序列创建的字符串。
```javascript
String.fromCodePoint(65);       // 'A'
String.fromCodePoint(65, 66);   // 'AB'
String.fromCodePoint(0x4e2d, 0x56fd); // '中国'
```
虽然String.fromCharCode 能够表示大部分的字符，但是有一部分编码属于高级编码字符，是由两个低位编码字符形成的，这个时候String.fromCodePoint来处理。

## String.prototype.charAt
语法：
> * str.charAt(index)

参数：
index：一个介于0和字符串长度减1之间的整数。如果没有提供索引，charAt将使用0。如果index超过str.length的话，则返回一个空字符串。

例如：
```javascript
'hello'.charAt(1); // 结果为 e
```

## String.prototype.charCodeAt
语法：
> * str.charCodeAt(index)

该方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元，如果索引超出范围，则返回 NaN。
参数：
index：一个大于等于0，小于字符串长度的整数，如果不是一个数字，则默认为0

例如：
```javascript
'ABC'.charCodeAt(0); // 返回 65
```
详情请点[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

## String.prototype.codePointAt
语法：
> * str.codePointAt(pos)

该方法返回 一个 Unicode 编码点值的非负整数。
参数:
pos
这个字符串中需要转码的元素的位置。

返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 undefined 。

## String.prototype.concat
语法:
> * str.concat(string2, string3[, ..., stringN])

将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。并不会影响原字符串。

<div class="tip">强烈建议使用 赋值操作符（+, +=）代替 concat 方法，[性能测试](https://jsperf.com/concat-vs-plus-vs-join)</div>

## String.prototype.startsWidth  ES6
语法：
> * str.startsWith(searchString[, position])

该方法用来判断当前字符串是否是以另外一个给定的子字符串开头的，返回true或false

参数：
searchString: 要搜索的子字符串
position: 搜索的开始位置，默认是0

例如：
```javascript
'hello world'.startsWith('h'); // true
'hello world'.startsWith('w', 6); // true
'hello world'.startsWith('w', 7); // false
```

## String.prototype.endsWidth   ES6
语法：
> * str.endsWith(searchString[, position])

该方法用来判断当前字符串是否以另外一个给定的字符串结尾的，返回true或false

参数：
searchString: 要搜索的子字符串
position：搜索的结束的位置，默认为str.length, 不包括索引为position的那一位

例如：
```javascript
'hello world'.endsWith('d'); // true
'hello world'.endsWith('w', 6); // false
'hello world'.endsWith('w', 7); // true
```

## String.prototype.includes
语法：
> * str.includes(searchString[, position])

该方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回true或false。区分大小写
参数：
searchString：要在此字符串中搜索的字符串。。
position：可选。从当前字符串的哪个索引位置开始搜寻子字符串；默认值为0。

例如：
```javascript
'hello world'.includes('Hello'); // false
```

## String.prototype.trim
方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。
如果浏览器不支持trim方法的话，可以用下面的方法
```javascript
String.prototype.trim = function() { 
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
```

## String.prototype.trimLeft 非标准
从一个字符串的左端移除空白字符
如果浏览器不支持trimLeft方法的话，可以用下面的方法
```javascript
String.prototype.trimLeft = function(){
    return this.replace(/^\s+/, '');
};
```

## String.prototype.trimRight 非标准
从一个字符串的左端移除空白字符
如果浏览器不支持trimRight方法的话，可以用下面的方法
```javascript
String.prototype.trimRight = function(){
    return this.replace(/\s+$/, '');
};
```

## String.prototype.search
语法：
> * str.search(regexp)

该方法执行正则表达式和 String对象之间的一个搜索匹配。
参数：
regexp：一个正则表达式（regular expression）对象。如果传入一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象。

返回值：
如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引。否则，返回 -1。

## String.prototype.match
使用正则表达式匹配

具体说明请参照[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)



