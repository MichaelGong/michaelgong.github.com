/**
 * 首页的js
 */
var urlConfig = 'js/require.config.js';
require([urlConfig],function(){
	require(['loading','rainbow'],function(M,Rainbow){
		Rainbow.color()
	});
	
	

});

