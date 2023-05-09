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
        path: 'blank-page',
        name: '',
        component: () => import('@/views/blank-page.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          hide: true,
        },
      },
      {
        path: 'customers',
        name: 'customers',
        component: () => import('@/views/home/customers.vue'),
        meta: {
          hide: true,
        },
      },
      {
        path: 'invoices',
        name: 'invoices',
        component: () => import('@/views/app/invoices'),
        meta: {
          hide: true,
        },
      },
      {
        path: 'editCounter/:id',
        name: 'edit-counter',
        component: () => import('@/views/app/editCounter'),
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
