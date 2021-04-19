import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Lazyload } from 'vant';

// css
import 'normalize.css';
import '@/assets/css/index.scss';
// assets

createApp(App)
  .use(Lazyload, {
    preLoad: 1.5,
    loading: require('@/assets/img/Ripple-1s-200px.gif'),
  })
  .use(store)
  .use(router)
  .mount('#app');
