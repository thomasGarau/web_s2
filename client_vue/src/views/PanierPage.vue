<template>
    
    <div class="panier-container">
        <NavBar />
        <h1>Panier</h1>
        <div v-if="!isAdmin.value">
            <h2>Produits dans votre panier:</h2>
            <ul>
                <li v-for="produit in produits" :key="produit.produit.id_produit">
                    <p>{{ produit.produit.label }} - {{ produit.produit.prix }}€ - Quantité: {{ produit.quantite }}</p>
                    <button @click="decrementProduct(produit)">-</button>
                    <button @click="removeProduct(produit)">Supprimer</button>
                </li>
            </ul>

        </div>
        <div v-else>
            <h2>Produit Back Office</h2>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {  RemoveProductFromPanier, ClearPanier, getProduitPanier, RemoveProduct } from '../scripts/produitMethods';
import { isAdmin as checkAdmin } from '../scripts/loginMethods';
import NavBar from '../components/NavBar.vue';

export default {
    setup() {
        const produits = ref([]);
        const isAdmin = ref(checkAdmin());
        const userId = ref(localStorage.getItem('id'));
        const token = ref(localStorage.getItem('token'));

        const decrementProduct = (produit) => {
            if (produit.quantite > 1) {
                produit.quantite--;
                RemoveProductFromPanier(produit.produit.id_produit, userId.value, token.value)
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Failed to update the product quantity.');
                    });
            } else {
                removeProduct(produit);
            }
        };

        const removeProduct = (produit) => {
            produits.value = produits.value.filter(p => p.produit.id_produit !== produit.produit.id_produit);
            RemoveProduct(produit.produit.id_produit, userId.value, token.value)
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to remove the product.');
                });
        };

        const clearCart = () => {
            produits.value = [];
            ClearPanier(userId.value, token.value)
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to clear the cart.');
                });
        };

        onMounted(async () => {
            try {
                produits.value = await getProduitPanier(userId.value, token.value);
                console.log('Panier:', produits.value);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });



        return {
            produits,
            isAdmin,
            decrementProduct,
            removeProduct,
            clearCart
        };
    },
    components: {
        NavBar
    }
};
</script>

<style>

:root {
    --primary-color: #BAF6E8; 
    --secondary-color: #68c4af; 
    --dark-primary-color: #55a190;
  } 

.panier-container {
    padding: 1%;
    padding-top : 150px;
}

</style>
