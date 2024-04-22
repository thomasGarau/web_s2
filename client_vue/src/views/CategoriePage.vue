<template>
  <NavBar />
  <div v-if="role" class="produits-liste">
    <h2>Produits Back Office</h2>
    <div class="produits-container">
      <div class="category-card">
        <div v-if="loading" class="loading-overlay">
          <div class="spinner"></div>
        </div>
        <!-- Form for adding a new product -->
        <form @submit.prevent="ajouterProduit">
          <div class="category-content">
            <input type="text" v-model="nouveauProduit.label" name="label" placeholder="Nom du produit" required>
            <input type="number" v-model.number="nouveauProduit.prix" name="prix" placeholder="Prix" required>
            <input type="number" v-model.number="nouveauProduit.stock" name="stock" placeholder="Quantité" required>
            <input type="file" @change="onFileSelected($event, nouveauProduit)" accept="image/*">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
      <div v-for="produit in produits" :key="produit.details.id_produit" class="category-card">
        <!-- Form for editing an existing product -->
        <template v-if="produit.enEdition">
          <form @submit.prevent="sauvegarder(produit)">
            <div v-if="loading" class="loading-overlay">
              <div class="spinner"></div>
            </div>
            <div class="category-content">
              <input type="text" v-model="produit.details.label" name="label" placeholder="Nom du produit" required>
              <input type="number" v-model.number="produit.details.prix" name="prix" placeholder="Prix" step="0.01" required>
              <input type="number" v-model.number="produit.details.stock" name="stock" placeholder="Quantité" required>
              <input type="file" @change="onFileSelected($event, produit)" accept="image/*">
              <button type="submit">Sauvegarder</button>
              <button type="button" @click="annulerEdition(produit)">Annuler</button>
            </div>
          </form>
        </template>
        <template v-else>
          <div class="category-content">
            <img v-if="produit.details.url" :src="produit.details.url" :alt="produit.details.label">
            <div>{{ produit.details.label }}</div>
            <div>{{ formatPrice(produit.details.prix) }}</div>
            <div>{{ produit.details.stock }}</div>
            <button @click="modifierLeProduit(produit)">Modifier</button>
            <button @click="supprimerProduit(produit)">Supprimer</button>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div v-else class="produits-liste">
    <h2>Produits Front Office</h2>
    <div class="produits-container">
      <div v-for="produit in produits" :key="produit.details.id_categorie" class="category-card">
        <div class="category-content">
          <img v-if="produit.details.url" :src="produit.details.url" :alt="produit.details.label">
          <div>{{ produit.details.label }}</div>
          <div>{{ formatPrice(produit.details.prix) }}</div>
          <div>{{ produit.details.stock }}</div>
          <button @click="ajouterAuPanier(produit)">+</button>
          <div class="quantite_produit_panier" v-if="produit.count > 0">{{ produit.count }}</div>
          <button @click="enleverDuPanier(produit)" v-if="produit.count > 0">-</button>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { ref, onMounted } from 'vue';
import { getCategorieById, getProduitsByCategorie } from '../scripts/categorieMethods';
import { AddProductToPanier, RemoveProductFromPanier, getPanierByUser, addProduitNew, updateProduit, deleteProduit } from '@/scripts/produitMethods';
import { isAdmin } from '../scripts/loginMethods';
import NavBar from '../components/NavBar.vue';

export default {
  props: ['id_categorie'],
  data () {
    return {
      loading: false
    }
  },
  setup(props) {
    const categorie = ref(null);
    let produits = ref([]);
    let nouveauProduit = ref({ label: '', prix: 0, stock: 0 });
    let role = ref(false);
    const panier = ref([]);

    const syncProductCounts = () => {
      produits.value.forEach(produit => {
        const itemInPanier = panier.value.find(item => item.id_produit === produit.details.id_produit);
        if (itemInPanier) {
          produit.count = itemInPanier.quantite; // Assume 'quantite' is the field in panier items
        }
      });
    };

    onMounted(async () => {
      try {
        categorie.value = await getCategorieById(props.id_categorie);
        const rawProduits = await getProduitsByCategorie(props.id_categorie);
        panier.value = await getPanierByUser();
        role.value = isAdmin();
        produits.value = rawProduits.map(p => ({ details: p, count: 0 }));
        syncProductCounts(); // Update product counts based on the cart
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return { categorie, produits, nouveauProduit, role, panier};
  },
  components: {
    NavBar
  },
  methods : {
    ajouterProduit() {
      this.loading = true;
      const formData = new FormData();
      formData.append('label', this.nouveauProduit.label);
      formData.append('prix', this.nouveauProduit.prix);
      formData.append('stock', this.nouveauProduit.stock);
      formData.append('url', this.nouveauProduit.file);
      formData.append('id_categorie', this.id_categorie);
      addProduitNew(formData, this.token).then(() => {
        this.fetchProduits();
        this.loading = false;
        this.nouveauProduit.label = '';
        this.nouveauProduit.prix = 0;
        this.nouveauProduit.stock = 0;
        this.nouveauProduit.url = null;
      });
    },

    fetchProduits() {
      getProduitsByCategorie(this.id_categorie)
        .then(data => {
          this.produits = data.map(p => ({ details: p, count: 0 }));
          this.syncProductCounts();
        })
        .catch(console.error);
    },

    onFileSelected(event, produit) {
      const files = event.target.files;
      if (files.length > 0) {
        produit.file = files[0];
      }
    },
    ajouterAuPanier(produit) {
      produit.count++;
      AddProductToPanier(produit.details.id_produit).catch(console.error);
    },
    enleverDuPanier(produit) {
      if (produit.count > 0) {
        produit.count--;
        RemoveProductFromPanier(produit.details.id_produit, this.user, this.token).catch(console.error);
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    },
    modifierLeProduit(produit) {
      produit.enEdition = true;
    },
    annulerEdition(produit) {
      produit.enEdition = false;
    },
    sauvegarder(produit) {
      this.loading = true;
      const formData = new FormData();
      formData.append('label', produit.details.label);
      formData.append('prix', produit.details.prix);
      formData.append('stock', produit.details.stock);
      if (produit.file) {
        formData.append('url', produit.file);
      }
      formData.append('id_produit', produit.details.id_produit);
      updateProduit(formData, this.token).then(() => {
        this.fetchProduits();
        this.loading = false;
        produit.enEdition = false;
        produit.file = null;
      });
    },
    supprimerProduit(produit) {
      this.loading = true;
      deleteProduit(produit.details.id_produit, this.token).then(() => {
        this.fetchProduits();
        this.loading = false;
      });
    }
  
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

.produits-liste {
  padding: 20px;
  margin-top: 150px;
}

.produits-liste h2 {
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 40px;
  margin-bottom: 20px;
}

.produits-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.category-card {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  width: 250px;
  height: 400px;
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

.category-content img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  object-position: center;
}

.category-content input[type="text"],
.category-content input[type="number"] {
  width: 90%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
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
  background-color:var(--dark-primary-color); /* Approximated darker shade */
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
  background-color: var(--dark-primary-color); /* Approximated darker shade */
}


</style>
