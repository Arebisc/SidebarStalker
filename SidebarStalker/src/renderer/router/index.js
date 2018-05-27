import Vue from 'vue';
import Router from 'vue-router';

import MainPage from '@/views/MainPage/MainPage';
import Settings from '@/views/Settings/Settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: MainPage
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: Settings
    }
  ]
})