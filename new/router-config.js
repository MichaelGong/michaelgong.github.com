/**
 * Created by GH on 2015/11/17.
 */
module.exports = {
     configRouter:function(router){

        router.map({
            '/index':{
                name:'index',
                component:require('./components/index.vue')
            },
            '/article/:name':{
                name:'article',
                component:require('./components/article.vue')
            },
            // '/article/:filter':{
            //     name:'filter',
            //     component:require('./components/article.vue')
            // },
            // '/article/:devicemotion':{
            //     name:'devicemotion',
            //     component:require('./components/article.vue')
            // },
            // '/article/:weinre':{
            //     name:'weinre',
            //     component:require('./components/article.vue')
            // }
        });
    }

}
