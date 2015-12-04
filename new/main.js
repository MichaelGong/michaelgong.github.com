// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import {configRouter} from './router-config'
// import RouterView from './router.vue'
// import RouterResource from 'vue-resource'
var Vue = require('vue');
var VueRouter = require('vue-router');
var configRouter = require('./router-config.js');
// var RouterView = require('./router.vue');
var RouterView = Vue.extend({});
var RouterResource = require('vue-resource');
Vue.config.debug = true;
window.configRouter = configRouter;
Vue.use(VueRouter);
Vue.use(RouterResource);

var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

configRouter.configRouter(router);


var Router = Vue.extend(RouterView);
router.start(Router,'#main');

window.router = router;
