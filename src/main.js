// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/base.css';
import './assets/css/checkout.css';
import './assets/css/login.css';
import './assets/css/product.css';
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
    loading: '/static/loading-svg/loading-balls.svg'
});
Vue.use(infiniteScroll);
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
