import { createRouter, createWebHistory } from 'vue-router';
import { useStoreAuth } from '@/store/storeAuth';
import routes from './route';

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  base: import.meta.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

async function authGuard(to) {
  // Ensures the user is initialized
  const storeAuth = useStoreAuth();
  const user = storeAuth.user;

  if (to.meta.isProtected && !user) {
    // Redirect to a login page
    return '/';
  }
}

router.beforeEach(authGuard);

router.beforeEach((to, from, next) => {
  const titleText = to.name;
  const words = titleText.split(' ');
  const wordslength = words.length;
  for (let i = 0; i < wordslength; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  document.title = 'Estimator  - ' + words;

  next();
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

export default router;
