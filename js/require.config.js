//进行默认的配置操作 http://cdn.bootcss.com/require.js/2.1.15/require.min.js
var hostnameIndex = window.location.hostname.split('.')[0];
var ishost = (hostnameIndex == '192') || (hostnameIndex == '127') || (hostnameIndex == 'localhost');
var isDebug = ishost  ? true : false;
require.config({
	baseUrl: 'http://' + window.location.host + (isDebug ? '/github/michaelgong.github.com/' : ''),
	paths: {
		jquery: ['http://cdn.bootcss.com/jquery/2.1.3/jquery.min'],
		zepto: ['http://cdn.bootcss.com/zepto/1.1.4/zepto.min'],
		hammer: ['http://libs.cncdn.cn/hammer.js/2.0.4/hammer.min'],
		imgpreload: ['js/libs/imgpreload'],
		loading: ['js/libs/loading'],
		css: ['http://cdn.bootcss.com/require-css/0.1.5/css.min'], //css.min.js用于加载css文件,自动在页面上添加link标签，github:https://github.com/guybedford/require-css
		qrcode : ['js/libs/qrcode'],//二维码生成插件 http://davidshimjs.github.io/qrcodejs/
		shake : ['js/libs/shake'], //摇一摇 ，地址：https://github.com/alexgibson/shake.js
		rainbow : ['js/libs/rainbow-custom.min'],
		bootstrap : ['http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min'],//bootstrap
		vector : ['js/libs/vector'], //3d背景
		nicescroll : ['http://cdn.bootcss.com/jquery.nicescroll/3.5.1/jquery.nicescroll.min'], //scrollbar样式修改
		bootstrap : ['http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min'],
	},
	
	shim: {
		loading: {
			deps: ['css!styles/libs/loading.min'],
		},
		qrcode: {
			exports: 'QRCode'
		},
		rainbow: {
			deps: ['css!styles/libs/rainbow'],
			exports: 'Rainbow'
		},
		vector: { 
			exports: 'Vector'
		},
		nicescroll: {
			deps: ['jquery'],
			exports: 'nicescroll'
		},
		bootstrap: {
			deps: ['jquery'],
		}
	}
});