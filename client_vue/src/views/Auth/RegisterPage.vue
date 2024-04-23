<template>
    <div>
      <NavBar />
      <div class="register-container">
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

 <style scoped>


.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  min-height: 100vh;
  background-color: #f4f4f4;
  background-image: url('fond_vert.png');
  background-size: contain;
  background-repeat: repeat;
  overflow-y: hidden;
  animation: slideBackground 80s linear infinite;
}

@keyframes slideBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100vw 0; /* Ensure the image slides horizontally */
  }
}

.register-container form {
  padding: 3rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 37.5rem; /* Equivalent to 600px assuming the base font size is 16px */
  margin: 1.25rem;
}

.register-container form:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}

.register-container form div {
  margin-bottom: 2rem;
}

.register-container form label {
  display: block;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.register-container form input {
  width: 95%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.register-container form input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.register-container .error-message {
  color: #d9534f;
  font-size: 0.95rem;
}

.register-container form button {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.register-container form button:hover {
  background-color: var(--dark-primary-color);
}

.register-container form button:disabled {
  background-color: var(--secondary-color);
  cursor: not-allowed;
}
</style>
