/**
 * Created by GH on 2015/11/17.
 */
module.exports = {
     configRouter:function(router){

        router.map({
            '/':{				//首页
                name:'home',
                component:require('./router.vue')
            },
            '/index':{
                name:'index',
                component:require('./components/index.vue')
            },
            '/article/:name':{
                name:'article',
                component:require('./components/article.vue')
            },
        });
    }

}
