<template>
  <div>
    <NavBar />
    <div class="login-container">
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
  </div>
</template>

<script>
import { data, login } from '../../scripts/loginMethods';
import NavBar from '../../components/NavBar.vue';

export default {
  data,
  methods: {
    login
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
:root {
  --primary-color: #eb8291;
  --secondary-color: #e65c5c;
  --dark-primary-color: #ca6d73; /* Approximation de darken($primary-color, 10%) */
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  background-image: url('fond_vert.png');
  background-size: contain;
  background-repeat: repeat;
  animation: slideBackground 10000000000000000s linear infinite;
  overflow-y: hidden;
}

@keyframes slideBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100000000000000000% 0;
  }
}

.login-container form {
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 600px;
  margin: 20px;
}

.login-container form:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.login-container form div {
  margin-bottom: 2rem;
}

.login-container form label {
  display: block;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.login-container form input {
  width: 95%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-container form input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.login-container form .error {
  color: #d9534f;
  font-size: 0.95rem;
  visibility: hidden;
}

.login-container form .error.visible {
  visibility: visible;
}

.login-container form button {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-container form button:hover {
  background-color: var(--dark-primary-color);
}

.login-container form button:disabled {
  background-color: var(--secondary-color);
  cursor: not-allowed;
}
</style>
