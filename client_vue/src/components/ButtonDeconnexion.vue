<script>

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <button @click="logout">Déconnexion</button>
</template>