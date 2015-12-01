import Vue from 'vue'
import VueRouter from 'vue-router'
import {configRouter} from './router-config'
import RouterView from './router.vue'
import RouterResource from 'vue-resource'
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(RouterResource);

const router = new VueRouter({
    //history:true, //这个属性为true表示开启html5的history方法监听路由，此方式需要服务器配合才能完成
    saveScrollPosition:true
});

configRouter(router);

const Router = Vue.extend(RouterView);
router.start(Router,'#main');

window.router = router;
