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
        path: 'calender',
        name: 'calender',
        component: () => import('@/views/app/calendar'),
      },
      {
        path: 'invoice',
        name: 'invoice',
        component: () => import('@/views/utility/invoice'),
        meta: {
          groupParent: 'Utility',
        },
      },
      {
        path: 'invoice-preview',
        name: 'invoice-preview',
        component: () => import('@/views/utility/invoice/invoice-preview'),
        meta: {
          hide: true,
        },
      },
      {
        path: 'invoice-edit',
        name: 'invoice-edit',
        component: () => import('@/views/utility/invoice/invoice-edit'),
        meta: {
          groupParent: 'Utility',
        },
      },
      {
        path: 'invoice-add',
        name: 'invoice-add',
        component: () => import('@/views/utility/invoice/invoice-add'),
        meta: {
          groupParent: 'Utility',
        },
      },
      {
        path: 'Pricing',
        name: 'pricing',
        component: () => import('@/views/utility/pricing'),
        meta: {
          groupParent: 'Utility',
        },
      },
      {
        path: 'faq',
        name: 'faq',
        component: () => import('@/views/utility/faq'),
        meta: {
          groupParent: 'Utility',
        },
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('@/views/utility/blog'),
        meta: {
          groupParent: 'Utility',
        },
      },
      {
        path: 'blog-details',
        name: 'blog-details',
        component: () => import('@/views/utility/blog/blog-details'),
        meta: {
          groupParent: 'Utility',
        },
      },
      {
        path: 'testimonial',
        name: 'testimonial',
        component: () => import('@/views/utility/testimonial'),
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
    path: '/coming-soon',
    name: 'coming-soon',
    component: () => import('@/views/utility/comming-soon'),
  },
  {
    path: '/under-construction',
    name: 'under-construction',
    component: () => import('@/views/utility/under-construction'),
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error.vue'),
  },
];

export default routes;
