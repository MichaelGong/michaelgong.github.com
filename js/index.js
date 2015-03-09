/**
 * 首页的js
 */
var urlConfig = 'js/require.config.js';
require([urlConfig],function(){
	require(['loading'],function(M){
		init(M);
	});
	
	function init(M){
		M.loading(1,1);
	}

});

