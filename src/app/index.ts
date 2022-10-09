import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { router } from './providers';
import App from './ui.vue';

export const app = createApp(App).use(router).use(createPinia());
