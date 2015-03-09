var urlConfig = 'js/require.config.js';
require([urlConfig],function(){
	require(['loading'],function(M){
		M.loading(1,1);
	})
});
