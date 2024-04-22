

<template>
  <NavBar />
  <div v-if="role()" class="dashboard">
    <h1>Dashboard Back Office</h1>
    <h2>Liste des Catégories</h2>
    <div class="categories-container">
      <div class="category-card">
        <h3>Ajouter une nouvelle catégorie</h3>
        <form @submit.prevent="ajouterNouvelleCategorie(nouvelleCategorie)">
          <div class="category-content">
            <div v-if="loading" class="loading-overlay">
              <div class="spinner"></div>
            </div>
            <input type="text" v-model="nouvelleCategorie.label" name="label" placeholder="Nom de la catégorie" required>
            <input type="file" @change="onFileSelected($event, nouvelleCategorie)" accept="image/*" required>
            <button type="submit">Créer Catégorie</button>
          </div>
        </form>
      </div>
      <div v-for="categorie in categories" :key="categorie.id_categorie" class="category-card">
        <div v-if="categorie.enEdition">
          <form @submit.prevent="sauvegarderCategorie(categorie)">
            <div v-if="loading" class="loading-overlay">
              <div class="spinner"></div>
            </div>
            <div class="category-content">
              <input type="text" v-model="categorie.label" name="label">
              <input type="file" @change="onFileSelected($event, categorie)" accept="image/*">
              <button type="submit">Sauvegarder</button>
              <button type="button" @click="annulerEdition(categorie)">Annuler</button>
            </div>
          </form>
        </div>
        <div v-else class="category-content">
          <img v-if="categorie.url" :src="categorie.url" :alt="categorie.label">
          <router-link :to="'/categorie/' + categorie.id_categorie">{{ categorie.label }}</router-link>
          <button @click="modifierCategorie(categorie)">Modifier</button>
          <button @click="supprimerCategorie(categorie)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="dashboard">
    <h1>Dashboard Front Office</h1>
    <h2>Liste des Catégories</h2>
    <div class="categories-container">
      <div v-for="categorie in categories" :key="categorie.id_categorie" class="category-card">
        <div class="category-content">
          <img v-if="categorie.url" :src="categorie.url" :alt="categorie.label">
          <router-link :to="'/categorie/' + categorie.id_categorie">{{ categorie.label }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories, addCategorie, deleteCategorie, updateCategorie } from '../scripts/categorieMethods';
import { isAdmin } from '../scripts/loginMethods'; // Rename to avoid confusion
import NavBar from '../components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      categories: [],
      nouvelleCategorie: { label: '' },
      loading: false

    };
  },
  methods: {
    role() {  // Renamed method
      return isAdmin();
    },
    
    ajouterNouvelleCategorie(categorie) {
      this.loading = true;
      const formData = new FormData();
      formData.append('label', categorie.label);
      formData.append('url', categorie.file);
      addCategorie(formData)
        .then(() => {
          this.fetchCategories();
          this.loading = false;
          this.nouvelleCategorie.label = '';
          this.nouvelleCategorie.file = null;
        })
        .catch(error => {
          console.error('Error:', error);
          this.loading = false;
        });
    },
    sauvegarderCategorie(categorie) {
      this.loading = true;
      const formData = new FormData();
      formData.append('label', categorie.label);
      if (categorie.file) {
        formData.append('url', categorie.file);
      }
      formData.append('id_categorie', categorie.id_categorie);
      updateCategorie(formData)
        .then(() => {
          this.fetchCategories();
          this.loading = false;
          categorie.enEdition = false;
          categorie.file = null; 
          

        })
        .catch(error => {
          console.error('Error:', error);
          this.loading = false;
        });
    },
    fetchCategories() {
      getCategories()
        .then(data => {
          this.categories = data;
        })
        .catch(error => {
          console.error('Failed to reload categories:', error);
        });
    },
    onFileSelected(event, categorie) {
      const files = event.target.files;
      if (files.length > 0) {
        categorie.file = files[0];
      }
    },
    modifierCategorie(categorie) {
      categorie.enEdition = true;
      console.log(categorie);
    },
    annulerEdition(categorie) {
      categorie.enEdition = false;
      console.log(categorie);
    },
    supprimerCategorie(categorie) {
      deleteCategorie(categorie.id_categorie)
        .then(() => {
          this.fetchCategories();
        })
        .catch(error => {
          console.error('Error:', error);
        });
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

<style>

:root {
    --primary-color: #BAF6E8; 
    --secondary-color: #68c4af; 
    --dark-primary-color: #55a190;
  } 

  .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.dashboard {
  padding: 20px;
  margin-top: 120px;
}

.dashboard h1,
.dashboard h2 {
  color: #333;
  font-family: Arial, sans-serif;
}

.dashboard h1 {
  font-size: 40px;
  margin-bottom: 10px;
}

.dashboard h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.categories-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.categories-container img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  object-position: center;
}

.category-card {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  width: 400px;
  height: 350px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.category-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.category-content a {
  color: var(--secondary-color);
  text-decoration: none;
}

.category-content a:hover {
  text-decoration: underline;
}

.category-content button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: var(--secondary-color);
  color: white;
  cursor: pointer;
}

.category-content button:hover {
  background-color: var(--dark-primary-color); /* Approximated darken effect */
}

.category-content input[type="text"] {
  padding: 6px;
  width: 90%;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.category-content input[type="file"] {
  color: #222245;
  padding: 8px 0;
  background-color: #fff;
}

.category-content input[type="file"]::file-selector-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: var(--secondary-color);
  color: white;
  cursor: pointer;
}

.category-content input[type="file"]::file-selector-button:hover {
  background-color: var(--dark-primary-color); /* Approximated darken effect */
}


</style>

