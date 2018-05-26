import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Notifications from 'vue-notification';

import i18n from './lang/lang';



if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app');
