<template>
    <div class="navbar-container">
      <!-- Logo à gauche -->
      <div class="logo-container">
        <RouterLink to="/">
        <img src="../assets/LogoVue2.png" alt="Logo" />
        </RouterLink>
      </div>
  
      <!-- Conditionally render links based on login status -->
      <div v-if="isLoggedIn" class="all-buttons">
        <div class="left-buttons">

          <router-link to="/" class="button-base dashboard-button">Home</router-link>
          <!-- Link to Panier if not an admin role -->
          <router-link v-if="!role" to="/panier" class="button-base panier-button">Panier</router-link>
          <!-- Home link -->
          
          <!-- User link for admins -->
          <router-link v-if="role" to="/user" class="button-base user-button">Utilisateur</router-link>
        </div>
        
        <div class="right-buttons">
          <!-- Logout button -->
          <ButtonDeconnexion class="button-base logout-button" />
        </div>
      </div>
  
      <!-- Show login/register if logged out -->
      <div v-else class="all-buttons">
        <div class="left-buttons">
          <router-link to="/login" class="button-base login-button">Login</router-link>
          <router-link to="/register" class="button-base register-button">Register</router-link>
        </div>
        <div class="right-buttons"></div>
      </div>
    </div>
  </template>
  
  <script>
import { ref, computed } from 'vue';
import ButtonDeconnexion from './ButtonDeconnexion.vue';
import { isAdmin } from '../scripts/loginMethods';

export default {
  components: {
    ButtonDeconnexion
  },
  setup() {
    const isLoggedIn = ref(localStorage.getItem('token') !== null);
    const role = computed(() => isAdmin());
   

    return {
      isLoggedIn,
      role
    };
  }
};
</script>

  
  
  <style>

:root {
  --primary-color: #BAF6E8; 
  --secondary-color: #68c4af; 
  --dark-primary-color: #55a190;
} 

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1vw;
  padding-right: 1vw;
  position: fixed;
  width: 98vw;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: var(--primary-color);
  opacity: 0.9;
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.logo-container img {
  height: 5vw; /* Dynamically adjusts with viewport width, minimum height can be added if necessary */
  min-height: 50px; /* Ensures the logo is not too small on smaller screens */
}

.all-buttons {
  display: flex;
  flex: 3;
  justify-content: flex-end;
}

.left-buttons, .right-buttons {
  display: flex;
}

.active {
  background-color: var(--dark-primary-color); /* Darkened primary color */
  color: white;
}

.button-base {
  margin: 0 0.5vw;
  padding: 0.5rem 1vw;
  border: none;
  border-radius: 5px;
  font-size: calc(0.9vw + 0.5rem); /* Adjust font size based on viewport width plus a base size */
  outline: none;
  transition: background-color 0.3s, color 0.3s;
  background-color: var(--secondary-color);
  color: #fff;
  text-decoration: none;
}

.button-base:hover {
  background-color: var(--dark-primary-color);
  cursor: pointer;
}

.logout-button {
  background-color: var(--secondary-color);
}

.logout-button:hover {
  background-color: var(--dark-primary-color); /* Darkened secondary color */
}

  </style>
  