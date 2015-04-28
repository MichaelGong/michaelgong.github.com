/**
 * 首页的js
 */
var urlConfig = 'js/require.config.js';
require([urlConfig],function(){
	require(['vue','jquery'],function(Vue,$){
		var indexList = new Vue(proList);
		var data = indexList.$data.prolist;
		for(var i in data) {
			if(!data[i]){
				data[i].link = '/';
			}
		}
		$('#proList').show();
	});
	require(['loading','jquery','nicescroll','bootstrap','vector','vue'],function(M,$,nicescroll,bootstrap,Vector,Vue){
		
		$('html').niceScroll({cursorcolor:"#000",cursorborder:"none"});
//		Rainbow.color()
		var victor = new Victor('victor', 'output');
		victor(["#35ac03", "#3f4303"]).set();
		$('#hue-auto').on('mousemove',function(evt){
			var procentjex = Math.round((evt.screenX / $(this).width())*255);
      		var procentjey = ((evt.screenY / $(this).height())/2)+1;
      		$('#hue-mouse').css('-webkit-filter', 'hue-rotate('+procentjex+'deg) contrast('+procentjey+')');
		});
		
	});
	
	

});
var proList = {
	el: '#proList',
	data: {
		title: 'prolist',
		prolist: [
			{
				link: './article-filter.html',
				title: '-webkit-filter相关属性',
				imgsrc: 'images/hue-small.jpg',
				content: '-webkit-filter相关属性',
				desc: 'by @Michael Gong',
				detail: '-webkit-filter可以改变背景的颜色、灰度等等'
			},
			{
				link: '/',
				title: '重力感应',
				imgsrc: 'images/gravity.jpg',
				content: '重力感应',
				desc: 'by @Michael Gong',
				detail: '重力感应的相关信息'
			},
			{
				link: '/',
				title: 'Application Cache',
				imgsrc: 'images/appcache.jpg',
				content: 'Application Cache',
				desc: 'by @Michael Gong',
				detail: 'Application Cache'
			},
			{
				link: '/',
				title: 'requestAnimationFrame',
				imgsrc: 'images/aniframe.jpg',
				content: 'requestAnimationFrame',
				desc: 'by @Michael Gong',
				detail: 'requestAnimationFrame简介'
			},
			{
				link: '/',
				title: '滑动到页面顶部或者底部',
				imgsrc: 'images/gotop.jpg',
				content: '滑动到页面顶部或者底部',
				desc: 'by @Michael Gong',
				detail: '滑动到页面顶部或者底部'
			},
			{
				link: '/',
				title: 'touch事件',
				imgsrc: 'images/touch.jpg',
				content: 'touch事件',
				desc: 'by @Michael Gong',
				detail: 'touch事件'
			},
			{
				link: '/',
				title: '手机摇一摇',
				imgsrc: 'images/yao.jpg',
				content: '手机摇一摇',
				desc: 'by @Michael Gong',
				detail: '利用重力感应实现手机摇一摇'
			},
			{
				link: '',
				title: '二维码生成插件的使用',
				imgsrc: 'images/qrcode.jpg',
				content: '二维码生成插件的使用',
				desc: 'by @Michael Gong',
				detail: '二维码生成插件的使用'
			},
			{
				link: '',
				title: 'font-face',
				imgsrc: 'images/fontface.jpg',
				content: 'font-face',
				desc: 'by @Michael Gong',
				detail: 'font-face能够使你使用更多更好看的字体在你的页面上，增加你的网站的美观性'
			},
			{
				link: 'http://www.xuanfengge.com/mobile-front-end-html5-performance-tuning-guide.html',
				title: '移动前端HTML5性能优化',
				imgsrc: 'images/xingnegn.jpg',
				content: '移动前端HTML5性能优化',
				desc: 'by @Michael Gong',
				detail: '移动前端HTML5性能优化'
			},
			{
				link: 'http://www.zhangxinxu.com/wordpress/2013/09/深入理解css3-gradient斜向线性渐变/',
				title: 'css3 gradient线性渐变',
				imgsrc: 'images/gradient.jpg',
				content: 'css3 gradient线性渐变',
				desc: 'by @Michael Gong',
				detail: 'css3 gradient线性渐变'
			},
			{
				link: 'http://www.qianduan.net/position-sticky-introduction/',
				title: 'position sticky',
				imgsrc: 'images/gradient.jpg',
				content: 'css3的基于relative与fixed之间的属性',
				desc: 'by @Michael Gong',
				detail: 'position sticky'
			},
			{
				link:'http://www.html-js.com/article/Big-search-team-columns-at-the-front-end-of-the-car',
				title: 'mobile web曾经的踩过坑',
				imgsrc: 'images/gradient.jpg',
				content: 'mobile web曾经的踩过坑',
				desc: 'by @Michael Gong',
				detail: 'mobile web曾经的踩过坑'
			}
		]
	}
}

