// MenuPage.vue

<template>
  <div>
    <h1>Menu</h1>
    <ButtonDeconnexion />

    <div v-if="!role()">
      <h2>Categories</h2>
      <ul>
        <li v-for="categorie in categories" :key="categorie.id_categorie">
          <router-link :to="'/categorie/' + categorie.id_categorie">{{ categorie.label }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Vous n'avez pas les droits pour accéder à cette page</p>
    </div>
  </div>
</template>

<script>
import ButtonDeconnexion from '../components/ButtonDeconnexion.vue';
import { getCategories } from '../scripts/categorieMethods';
import { isAdmin } from '../scripts/loginMethods'; // Rename to avoid confusion

export default {
  components: {
    ButtonDeconnexion
  },
  data() {
    return {
      categories: []
    };
  },
  methods: {
    role() {  // Renamed method
      return isAdmin();
    }
  },
  created() {
    getCategories()
      .then(data => {
        this.categories = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
};
</script>

