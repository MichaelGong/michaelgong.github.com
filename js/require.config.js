//进行默认的配置操作 http://cdn.bootcss.com/require.js/2.1.15/require.min.js
require.config({
	baseUrl: 'http://' + window.location.host + '/github/michaelgong.github.com/',
	paths: {
		jquery: ['http://cdn.bootcss.com/jquery/2.1.3/jquery.min'],
		zepto: ['http://cdn.bootcss.com/zepto/1.1.4/zepto.min'],
		hammer: ['http://libs.cncdn.cn/hammer.js/2.0.4/hammer.min'],
		imgpreload: ['js/libs/imgpreload'],
		loading: ['js/libs/loading'],
		css: ['http://cdn.bootcss.com/require-css/0.1.5/css.min'], //css.min.js用于加载css文件,自动在页面上添加link标签，github:https://github.com/guybedford/require-css
		qrcode : ['js/libs/qrcode'],//二维码生成插件 http://davidshimjs.github.io/qrcodejs/
		shake : ['js/libs/shake'], //摇一摇 ，地址：https://github.com/alexgibson/shake.js
	},
	
	shim: {
		loading: {
			deps: ['css!styles/libs/loading.min'],
		},
		qrcode: {
			exports: 'QRCode'
		}
	}
});