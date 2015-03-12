/**
 * 首页的js
 */
var urlConfig = 'js/require.config.js';
require([urlConfig],function(){
	require(['loading','jquery','nicescroll','bootstrap','vector'],function(M,$,nicescroll,bootstrap,Vector){
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

