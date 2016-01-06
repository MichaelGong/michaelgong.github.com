# 二维码、一维码生成插件

## 一维码插件
地址：[github地址：barcode](https://github.com/jbdemonte/barcode)

	  [官网：http://barcode-coder.com/](http://barcode-coder.com/)

作者业界良心啊，同时提供了JQuery/PHP/prototype 版本的库，我们可以根据需求选择相应的库，且都有示例。

具体的使用方法可以参照示例，或者再上述`官网`中查找。

>个人平时使用这个插件的时候，发现了一个容易忽视的地方，就是`code`必须是一个字符串（文档中有写的），不能是数字，这个因为有时候码的长度比较短，所以容易忽视而写成数字，这个时候需要转换一下（直接：code+''就可以了）。如果生成二维码的地方是空白的，而又确定代码其他地方是对的话，可以查看一下是否是这个原因。

## 二维码插件
中文的：[https://github.com/aralejs/qrcode/](https://github.com/aralejs/qrcode/)
外文的：[https://github.com/davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs)
jQuery插件：[https://github.com/jeromeetienne/jquery-qrcode](https://github.com/jeromeetienne/jquery-qrcode)

就这些。over...