import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* lib */
import vuetify from './plugins/vuetify';
import * as VeeValidate from 'vee-validate';

/* style */
import '@/assets/commonStyle.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VeeValidate,
  render: (h) => h(App),
}).$mount('#app');
