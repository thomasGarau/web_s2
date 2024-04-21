<template>
  <div v-if="!role">
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
import { AddProductToPanier } from '@/scripts/produitMethods';
import { isAdmin } from '../scripts/loginMethods';

export default {
props: ['id_categorie'],
setup(props) {
  const categorie = ref(null);
  let produits = ref([]);
  let role = ref(false);
  let user = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const ajouterProduit = (produit) => {
    produit.count++;
    console.log("produit id : ", produit.details.id_produit);
    console.log("id : ", user);
    AddProductToPanier(produit.details.id_produit, user, token)

  };

  const enleverProduit = (produit) => {
    if (produit.count > 0) {
      produit.count--;
    }
  };

  onMounted(async () => {
    categorie.value = await getCategorieById(props.id_categorie);
    const rawProduits = await getProduitsByCategorie(props.id_categorie);
    produits.value = rawProduits.map(p => ({ details: p, count: 0 }));
    role.value = isAdmin();
  });

  return { categorie, produits, role, ajouterProduit, enleverProduit };
}
};
</script>
