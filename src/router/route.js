const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/auth/login/index.vue'),
  },
  {
    path: '/register',
    name: 'reg',
    component: () => import('@/views/auth/register'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/forgot-password.vue'),
  },
  {
    path: '/lock-screen',
    name: 'lock-screen',
    component: () => import('@/views/auth/lock-screen.vue'),
  },
  {
    path: '/success-500',
    name: 'success-500',
    component: () => import('@/views/auth/success.vue'),
  },
  {
    path: '/app',
    name: 'Layout',
    redirect: '/app/home',
    component: () => import('@/Layout/index.vue'),
    meta: { isProtected: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          hide: true,
        },
      },
      {
        path: 'counters',
        name: 'counters',
        component: () => import('@/views/app/counters'),
      },
      {
        path: 'counters/edit/:id',
        name: 'editCounters',
        component: () => import('@/views/app/counters/editCounter.vue'),
      },
      {
        path: 'faq',
        name: 'faq',
        component: () => import('@/views/utility/faq'),
        meta: {
          groupParent: 'Utility',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error.vue'),
  },
];

export default routes;
