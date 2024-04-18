<template>
    <div>
      <h1>Page d'accueil</h1>
      <button @click="goToLogin">Connexion</button>
      <button @click="goToSignup">Inscription</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToLogin() {
        this.$router.push('/login');
      },
      goToSignup() {
        this.$router.push('/register');
      }
    }
  }
  </script>
  
  <!-- Styles optionnels -->
  <style>
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  