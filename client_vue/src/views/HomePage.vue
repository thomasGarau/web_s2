<template>
  <NavBar />
   <div class="home-container">
      <div class="home-content">
        <h1>Bienvenue sur le Supermarché CRUDité</h1>
        <p>Ceci est votre page d'accueil. Connectez-vous ou inscrivez-vous pour démarrer.</p>
        <div class="button_login">
            <router-link to="/login">Login</router-link> | <router-link to="/register">Register</router-link>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>

import NavBar from '../components/NavBar.vue';

  export default {
    methods: {
      goToLogin() {
        this.$router.push('/login');
      },
      goToSignup() {
        this.$router.push('/register');
      }
    },
    components: {
      NavBar
    }

  }
  </script>
  
  <!-- Styles optionnels -->
  <style>

:root {
  --primary-color: #BAF6E8; 
  --secondary-color: #68c4af; 
  --dark-primary-color: #55a190;
} 


@keyframes slideBackground {
  from {
    background-position: 0 0;
  }
  to {
    /* -100vw garantit que l'image se déplace juste en dehors de l'écran */
    background-position: -100vw 0;
  }
}

.home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f4;
    background-image: url('fond_vert.png');
    background-size: contain;
    background-repeat: repeat;
    animation: slideBackground 80s linear infinite;
}

.home-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home-container .home-content {
    text-align: center;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.home-container .home-content:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.home-container h1 {
    font-size: 3rem;
    color: #333;
    margin-bottom: 1rem;
}

.home-container p {
    font-size: 1.5rem;
    color: #666;
    max-width: 600px;
    margin-bottom: 1rem;
}

.home-container a {
    font-size: 1.25rem;
    color: var(--secondary-color);
    text-decoration: none;
    margin: 0 10px;
}

.home-container a:hover {
    cursor: pointer;
    color: var(--dark-primary-color);
}

  </style>
  