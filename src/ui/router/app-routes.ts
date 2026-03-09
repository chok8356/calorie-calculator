import type { RouteRecordRaw } from 'vue-router'

import { ROUTES } from '@/ui/router/routes'

export const appRoutes: RouteRecordRaw[] = [
  {
    children: [
      {
        component: () => import('@/ui/pages/app/summary/SummaryPage.vue'),
        path: ROUTES.SUMMARY,
      },
      {
        component: () => import('@/ui/pages/app/foods/FoodsPage.vue'),
        path: ROUTES.FOODS,
      },
      {
        component: () => import('@/ui/pages/app/meals/MealsPage.vue'),
        path: ROUTES.MEALS,
      },
      {
        component: () => import('@/ui/pages/app/profile/ProfilePage.vue'),
        path: ROUTES.PROFILE,
      },
    ],
    component: () => import('@/ui/pages/app/Index.vue'),
    path: ROUTES.INDEX,
    redirect: ROUTES.SUMMARY,
  },
  {
    component: () => import('@/ui/pages/Error404.vue'),
    path: '/:pathMatch(.*)*',
  },
]
