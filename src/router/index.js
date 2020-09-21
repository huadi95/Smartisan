import Vue from "vue";
import Router from "vue-router";

import "../assets/css/reset.css";
import "../assets/css/header.css";

const Shop = () =>
    import ('../views/Shop.vue');
const Item = () =>
    import ('../views/Item.vue');
const Cart = () =>
    import ('../views/Cart.vue');
const CheckOut = () =>
    import ('../views/CheckOut.vue');
const Payment = () =>
    import ('../views/Payment.vue');
const Account = () =>
    import ('../views/Account.vue');
const Order = () =>
    import ('../views/childComps/Order.vue');
const Address = () =>
    import ('../views/childComps/Address.vue');

Vue.use(Router);

const routes = [{
        path: '',
        redirect: '/shop'
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop
    },
    {
        path: '/item',
        name: 'item',
        component: Item
    }, {
        path: '/cart',
        name: 'cart',
        component: Cart
    }, {
        path: '/checkout',
        name: 'checkout',
        component: CheckOut
    }, {
        path: '/payment',
        name: 'payment',
        component: Payment
    }, {
        path: '/account',
        component: Account,
        children: [{
            path: '',
            name: 'account',
            component: Order,
        }, {
            path: '/address',
            name: 'address',
            component: Address
        }]
    }
];
const router = new Router({
    routes
});
export default router;