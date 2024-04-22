<template>
    <div class="navbar-container" :key="key">
      <!-- Logo à gauche -->
      <div class="logo-container">
        <img src="../assets/LogoVue2.png" alt="Logo" />
      </div>
  
      <!-- Conditionally render links based on login status -->
      <div v-if="isLoggedIn" class="all-buttons">
        <div class="left-buttons">
          <!-- Link to Panier if not an admin role -->
          <router-link v-if="!role" to="/panier" class="button-base panier-button">Panier</router-link>
          <!-- Home link -->
          <router-link to="/" class="button-base dashboard-button">Home</router-link>
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
    padding-top: 0.5%;
    padding-bottom: 1.5%;
    padding-left: 1%;
    padding-right: 1%;
    position: fixed;
    width: 98%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: var(--primary-color);
    opacity: 0.9;
  }
  
  .buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 0.5%;
    padding-bottom: 1.5%;
    padding-left: 1%;
    padding-right: 1%;
    width: 98%;
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
    height: 80px;
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
    margin: 0 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: background-color 0.3s, color 0.3s;
    background-color: var(--secondary-color);
    color: #fff;
  }
  
  .button-base:hover {
    background-color: var(--dark-primary-color); /* Darkened primary color */
    cursor: pointer;
  }
  
  .logout-button {
    background-color: var(--secondary-color);
  }
  
  .logout-button:hover {
    background-color: var(--dark-primary-color); /* Darkened secondary color */
  }
  
  </style>
  