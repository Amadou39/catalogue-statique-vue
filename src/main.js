// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js'; // Le guillemet simple est maintenant correct

createApp(App)
    .use(router) // Ceci active le routeur
    .mount('#app');