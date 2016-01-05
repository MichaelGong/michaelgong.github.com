# 垂直居中

### 1、单行内容居中，高度不变
只有一行内容，只需要限定高度并制定行高，没有兼容性问题
```css
.middle{
	height:40px;
	line-height:40px;
	overflow:hidden;
}
```
这样内容就可以居中了，只不过超出的部分是看不到的

### 2、多行内容，高度可变
这种基本通过padding来实现，通用
```css
.middle{
	padding-top:10px;
	padding-bottom:10px;
}
```

### 3、display:table-cell
```css
.middle{
	height:80px;
	display:table-cell;
	vertical-align:middle;
}
```
此方法低版本ie可能会出现问题，display属性可以设置成`inline-block`

### 4、position:absolute+margin 垂直水平居中
```css
.parent{
	width:300px;
	height:500px;
	position:relative;
}
.middle{
	width:200px;
	height:300px;
	position:absolute;
	top:50%;
	left:50%;
	margin-top:-150px;
	margin-left:-100px;
}
```

### 5、position:absolute 垂直水平居中
```css
.parent{
	width:300px;
	height:500px;
	position:relative;
}
.middle{
	width:200px;
	height:300px;
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	margin: auto;
}
```
此方法和上面的方法差在：使用`margin: auto;`，并且top/left/right/bottom全为0

### 6、利用float
代码如下：
html
```html
<div id="parent">
    <div id="floater"></div>
    <div id="child">Content here</div>
</div>
```
css
```css
#parent {
	height: 250px;
}
#floater {
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -50px;
}
#child {
    clear: both;
    height: 100px;
}
```
这里面要求``parent`和`child`这个元素的高度是固定的，然而这面的关键是`floater`中有一个`margin-bottom`，这个值得计算是怎么来的呢？公式如下：
>(parent.height-child.height)/2-(parent.height*0.5)

这个里面的限制还是比较多的，而且还需要计算值，比较麻烦。

### 7、利用css3实现垂直居中
```
.parent{
	display:box;
	display:-webkit-box;
	display:flex;
	display:-webkit-flex;
	flex-flow:row nowrap;
	-webkit-flex-flow:row nowrap;
	align-items:center;
	-webkit-align-items:center;
	box-align:enter;
	-webkit-box-align:center;
}
```
只需要在父元素上添加即可，不过这个设置方式有很大的兼容性问题，主要应用在移动端居多。


### 其他
测试连接[verticalmiddle.html](./verticalmiddle.html)