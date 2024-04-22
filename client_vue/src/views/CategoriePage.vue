<template>
  <div v-if="!role">
    <NavBar />
      <h2 v-if="categorie">{{ categorie.label }}</h2>
      <h3>Produits</h3>
      <ul>
          <li v-for="produit in produits" :key="produit.details.id_produit">
              <p> {{ produit.details.label }} {{ produit.details.prix }}€ </p>
              <button @click="ajouterProduit(produit)">Ajouter</button>
              <span v-if="produit.count > 0" >{{ produit.count }}</span>
              <button v-if="produit.count > 0" @click="enleverProduit(produit)">Enlever</button>
          </li>
      </ul>
  </div>
  <div v-else>
      <p>Vous n'avez pas les droits pour accéder à cette page</p>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { getCategorieById, getProduitsByCategorie } from '../scripts/categorieMethods';
import { AddProductToPanier, RemoveProductFromPanier, getPanierByUser } from '@/scripts/produitMethods';
import { isAdmin } from '../scripts/loginMethods';
import NavBar from '../components/NavBar.vue';

export default {
  props: ['id_categorie'],
  setup(props) {
    const categorie = ref(null);
    let produits = ref([]);
    let role = ref(false);
    let user = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const panier = ref([]);

    const ajouterProduit = (produit) => {
      produit.count++;
      AddProductToPanier(produit.details.id_produit, user, token).catch(console.error);
    };

    const enleverProduit = (produit) => {
      if (produit.count > 0) {
        produit.count--;
        RemoveProductFromPanier(produit.details.id_produit, user, token).catch(console.error);
      }
    };

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
        panier.value = await getPanierByUser(user, token);
          role.value = isAdmin();
        produits.value = rawProduits.map(p => ({ details: p, count: 0 }));
        syncProductCounts(); // Update product counts based on the cart
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return { categorie, produits, role, panier, ajouterProduit, enleverProduit };
  },
  components: {
    NavBar
  }
};
</script>
