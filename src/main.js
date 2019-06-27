import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

//引入axios
import {post, fetch, patch, put, imgUpload} from './http'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$imgUpload = imgUpload;
//iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
//v-lazy
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);
//swiper
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper, /* { default global options } */);
//通用
import  './common.scss'
import MyCommon from './common';
Vue.prototype.$MyCommon = MyCommon;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
