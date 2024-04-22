<template>
    <div>
      <NavBar />
      <h1>Page d'Inscription</h1>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="credentials.email" required>
        </div>
        <div>
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="credentials.name" required>
        </div>
        <div>
          <label for="firstname">Prénom:</label>
          <input type="text" id="firstname" v-model="credentials.firstname" required>
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="credentials.password" required>
        </div>
        
        <div>
          <label for="password">Confirmer le mot de passe:</label>
          <input type="password" id="passwordConfirm" v-model="passwordConfirm" required>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit">Inscription</button>
      </form>
    </div>
  </template>
 

<script>
 import { data, register, submitRegistration } from '../../scripts/registerMethods';
  import NavBar from '../../components/NavBar.vue';
  
  
 
 export default {
  data,
  methods: {
    register,
    submitRegistration
  },
  components: {
    NavBar
  }
}
 </script>