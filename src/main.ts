import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// css
import 'normalize.css';
import '@/assets/css/index.scss';

createApp(App).use(store).use(router).mount('#app');
