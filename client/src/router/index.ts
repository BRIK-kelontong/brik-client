// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth' // Import auth store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginPage.vue'),
      meta: { requiresAuth: false } // Tidak memerlukan otentikasi
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/RegisterPage.vue'), // Make sure this file exists in ../views/
        meta: { requiresAuth: false } // Tidak memerlukan otentikasi
    },
    {
      path: '/',
      name: 'ProductList',
      component: () => import('../views/ProductListPage.vue'),
      meta: { requiresAuth: false } // Publik, tidak memerlukan otentikasi
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetailPage.vue'),
      props: true, // Untuk melewatkan ID sebagai prop
      meta: { requiresAuth: false } // Publik, tidak memerlukan otentikasi
    },
    {
      path: '/products/add',
      name: 'AddProduct',
      component: () => import('../views/AddProductPage.vue'),
      meta: { requiresAuth: true } // Memerlukan otentikasi
    },
    // Redirect unknown routes to product list or login
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
  ]
})

// Navigation Guard untuk memeriksa otentikasi
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' }); // Redirect ke halaman login jika tidak terautentikasi
  } else if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
    next({ name: 'ProductList' }); // Jika sudah login, jangan biarkan kembali ke login/register
  } else {
    next();
  }
});

export default router