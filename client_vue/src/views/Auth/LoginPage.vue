<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="credentials.email" required>
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="credentials.password" required>
      </div>
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>

import { data, login } from '../../scripts/loginMethods';

export default {
  data,
  methods: {
    login
  }
}

</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
