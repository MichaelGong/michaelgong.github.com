# 自定义字体font-face

### 语法:
```css
@font-face {
	font-family: 'YourWebFontName';
	src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
	src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('YourWebFontName.woff') format('woff'), /* Modern Browsers */
         url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('YourWebFontName.svg#YourWebFontName') format('svg'); /* Legacy iOS */
    font-weight: normal;
  	font-style: normal;
}
/*使用*/
h1{
	font-family:'YourWebFontName'
}
```

### 中文字体压缩器
这种工具可能很多，这里只介绍一个我用过的[字蛛](http://font-spider.org/index.html).

这个工具的特点是分析你页面中引入的字体，提取你使用到的文字生成相应的字体文件，所以字体文件比较小。

弊端：只能作用于之前就确认过的文字，并不能处理动态文字。

### 其他

本文参考自：[http://www.w3cplus.com/content/css3-font-face](http://www.w3cplus.com/content/css3-font-face)