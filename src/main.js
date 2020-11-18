/**
 * @description: 项目入口文件
 * @author: CraazyYan
 */

import Vue from 'vue';
import App from './App.vue';
import router from './routers/';
import './routers/intercept';
import store from './stores';
import * as filters from './filters/';
import './services';
import 'lib-flexible';

import './styles/main.less';

import FastClick from 'fastclick';
import Highlight from './code/index'; // from 路径是highlight.js的路径，纯属自定义
import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import {Get, Post, Delete} from './config/api.js'
    Vue.prototype.$Get = Get;
Vue.prototype.$Post = Post;
Vue.prototype.$Delete = Delete;
    // use
    Vue.use(mavonEditor)
Vue.use(Highlight);

FastClick.attach(document.body);

Vue.config.errorHandler = (err, vm, info) => {
  console.error(err);
};
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = process.env.NODE_ENV === 'production';

window.EventBus = new Vue();

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

window.myVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
