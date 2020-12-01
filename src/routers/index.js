/**
 * @description: 路由
 * @author: CraazyYan
 */

import Vue from 'vue';
import Router from 'vue-router';

const Hello = () => import(/* webpackChunkName: "apply" */ '@/views/hello');
const Demo = () => import(/* webpackChunkName: "demo" */ '@/views/demo');
const Blog = () => import(/* webpackChunkName: "demo" */ '@/views/blog');
const Error = () => import(/* webpackChunkName: "error" */ '@/views/error');
const EditBlog = () => import('@/views/editBlog');
const showBlog = () => import('@/views/showBlog');
const weatherInfo = () => import('@/views/hello/weather');
Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello,
    meta: {
      title: '首页',
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo,
    meta: {
      title: '个人简介', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog,
    meta: {
      title: '博客列表'
    }
  },
  {
    path: '/error',
    name: 'error',
    component: Error,
    meta: {
      title: '404页'
    }
  },
  {
    path: '*',
    redirect: 'error',
  },
  {
    path:'/editBlog',
    name: 'editBlog',
    component: EditBlog,
    meta: {
      title: '博客'
    }
  },{
    path:'/showBlog',
    name: 'showBlog',
    component: showBlog,
    meta: {
      title: '详情'
    }
  },{
    path:'/weatherInfo',
    name: 'weatherInfo',
    component: weatherInfo,
    meta: {
      title: '天气预报'
    }
  }
];

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes
})

export default router;
