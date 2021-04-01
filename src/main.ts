import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Lazyload } from 'vant';

// css
import 'normalize.css';
import '@/assets/css/index.scss';

createApp(App)
  .use(Lazyload, {
    lazyComponent: true,
    preload: 1.49,
  })
  .use(store)
  .use(router)
  .mount('#app');
