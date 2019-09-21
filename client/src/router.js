import Vue from 'vue';
import Router from 'vue-router';
/* eslint-disable */
import Index from '@/views/Index.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'Index',
      redirect: '/home',
      component: Index,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
        },
        {
          path: '/fundlist',
          name: 'FundList',
          component: () => import(/* webpackChunkName: "fundlist" */ '@/views/FundList.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '*',
      name: '/404',
      component: () => import(/* webpackChunkName: "notfound" */ '@/views/404.vue')
    },
  ],
});

const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.getItem('broToken')
  if (whiteList.includes(to.path)) {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
