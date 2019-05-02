import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from './../views/GoodsList';
import Cart from './../views/Cart';
import Title from './../views/Title';
import Image from './../views/Image';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'GoodsList',
            components: {
                default: GoodsList,
                title: Title,
                image: Image
            }
        },
        {
            path: '/Cart/:cartId',
            name: 'Cart',
            component: Cart
        }
    ]
});
