import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/Auth/LoginPage.vue';
import RegisterPage from '../views/Auth/RegisterPage.vue';
import MenuPage from '../views/MenuPage.vue';
import CategoriePage from '../views/CategoriePage.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', 
    component: HomePage,
    meta: { guestOnly: true }
    },
    { path: '/login', 
    component: LoginPage,
    meta: { guestOnly: true }
    },
    { path: '/register', 
    component: RegisterPage,
    meta: { guestOnly: true }
    },
    {
      path: '/menu',
      component: MenuPage,
      meta: { requiresAuth: true }  // Ajouter un meta champ pour indiquer que cette route nécessite une authentification
    },
    {
      path: '/categorie/:id_categorie',
      component: CategoriePage,
      props: true,
      meta: { requiresAuth: true }  // Ajouter un meta champ pour indiquer que cette route nécessite une authentification
    },

  ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const guestOnly = to.matched.some(record => record.meta.guestOnly);
    const isAuthenticated = localStorage.getItem('token'); 
  
    if (requiresAuth && !isAuthenticated) {
      next('/'); 
    } else if (guestOnly && isAuthenticated) {
      next('/menu'); 
    } else {
      next(); 
    }
  });

export default router;

