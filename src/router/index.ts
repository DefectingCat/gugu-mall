import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: () =>
      import(/* webpackChunkName: "detail" */ '../views/detail/Detail.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    component: () =>
      import(
        /* webpackChunkName: "category" */ '../views/category/Category.vue'
      ),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () =>
      import(/* webpackChunkName: "category" */ '../views/cart/Cart.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/profile/Profile.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
