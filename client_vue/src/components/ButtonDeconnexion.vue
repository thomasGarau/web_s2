<script>

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <button @click="logout">Déconnexion</button>
</template>