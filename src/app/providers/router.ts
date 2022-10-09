import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/pages';

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  routes,
});
