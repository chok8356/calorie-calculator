export { default as Routing } from './ui.vue';

import { IconBurgerSoda, IconClipboardList, IconCogs } from '@/shared/ui/icons';

export const routes = [
  {
    path: '/',
    component: () => import('./meal-plan'),
    meta: {
      title: 'Meal Plan',
      icon: IconClipboardList,
    },
  },
  {
    path: '/products',
    component: () => import('./products'),
    meta: {
      title: 'Products list',
      icon: IconBurgerSoda,
    },
  },
  {
    path: '/settings',
    component: () => import('./settings'),
    meta: {
      title: 'Products list',
      icon: IconCogs,
    },
  },
];
