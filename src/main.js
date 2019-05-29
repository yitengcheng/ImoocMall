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
import loadsh from 'lodash';
import store from './vuex/index';
import { currency } from './utils/currency';

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
    loading: '/static/loading-svg/loading-balls.svg'
});
Vue.use(infiniteScroll);
axios.interceptors.response.use(
    response => {
        console.log('success', { data: response.data, status: response.status });
        if (!response.data.success && response.data.status === 100) {
            router.replace('/');
            store.commit('user/updateUser', '');
        }
        return response.data;
    },
    error => {
        console.log('error');
        console.log(error);
        console.log(JSON.stringify(error));
        return Promise.reject(error);
    }
);
Vue.prototype.$http = axios;
Vue.prototype._ = loadsh;
Vue.filter('currency', currency);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
