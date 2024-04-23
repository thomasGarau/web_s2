<template>
    <NavBar />
    <div class="panier-container">
        <div v-if="!isAdmin">
            <div class="panier-list">
                <h2>Produits dans votre panier:</h2>
                <div class="panier-container">
                    <div v-for="produit in produits" :key="produit?.produit?.id_produit" class="categorie-card">
                        <!-- Utilisation de router-link avec scoped slot -->
                        <router-link :to="'/categorie/' + produit.produit.id_categorie" custom v-slot="{ navigate }">
                            <div class="categorie-content" @click="navigate">
                            <img v-if="produit.produit.url" :src="produit.produit.url" :alt="produit?.produit?.label">
                            <div>{{ produit?.produit?.label }}</div>
                            <div>{{ formatPrice(produit.produit.prix) }}</div>
                            <div>
                                <button @click.stop="incrementProduct(produit)">+</button>
                                Quantité: {{ produit?.quantite }}
                                <button @click.stop="decrementProduct(produit)">-</button>
                            </div>
                            <button @click.stop="removeProduct(produit)">Enlever du panier</button>
                            </div>
                        </router-link>
                        </div>
                </div>
                <div class="total">
                    <div>Nombre de produits: {{ produits.length }}</div>
                    <div>Total: {{ formatPrice(total) }}</div>
                    <button @click="clearCart()">Vider le panier</button>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>Produit Back Office</h2>
        </div>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import {  RemoveProductFromPanier, ClearPanier, getProduitPanier, RemoveProduct, AddProductToPanier } from '../scripts/produitMethods';
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

        const incrementProduct = (produit) => {
            produit.quantite++;
            AddProductToPanier(produit.produit.id_produit)
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to update the product quantity.');
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
                console.log("produit : ", produits)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });




        return {
            produits,
            isAdmin,
            decrementProduct,
            removeProduct,
            incrementProduct,
            clearCart
        };
    },
    components: {
        NavBar
    },
    data() {
        return {
            total: 0
        }
    },
    watch: {
        produits: {
            handler: function (newProduits) {
                this.total = newProduits.reduce((acc, produit) => acc + produit.produit.prix * produit.quantite, 0);
            },
            deep: true
        }
    },
    methods : {
        formatPrice(price) {
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

    },
    }
};
</script>

<style>

:root {
    --primary-color: #BAF6E8; 
    --secondary-color: #68c4af; 
    --dark-primary-color: #55a190;
}

.panier-list {
    font-family: Arial, sans-serif; 
    margin-top: 7.5rem;
    padding: 1.25rem;
    background-color: #f9f9f9;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
}

.panier-list h2 {
    color: #333;
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
}

.panier-list .panier-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.panier-list .categorie-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0.3125rem;
    padding: 0.9375rem;
    display: flex;
    align-items: center;
    box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
}

.panier-list .categorie-card:hover {
    box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.3);
}

.panier-list .categorie-card .categorie-content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.625rem;
}

.panier-list .categorie-card .categorie-content img {
    width: 5vw;
    height: 3.75vw;
    object-fit: cover;
    min-width: 50px;
    min-height: 37.5px;
}

.panier-list .categorie-card .categorie-content div {
    flex: 1;
}

.panier-list .categorie-card .categorie-content div:last-child {
    flex: 0;
}

.panier-list .categorie-card .categorie-content button {
    padding: 0.3125rem 0.625rem;
    border: none;
    background-color: var(--secondary-color);
    color: white;
    border-radius: 0.25rem;
    cursor: pointer;
}

.panier-list .categorie-card .categorie-content button:hover {
    background-color: var(--dark-primary-color);
}

.panier-list .total {
    margin-top: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem 1.25rem;
    background-color: #fff;
}

.panier-list .total button {
    padding: 0.625rem 1.25rem;
    background-color: var(--secondary-color);
    color: white;
    border-radius: 0.3125rem;
    border: none;
    cursor: pointer;
}

.panier-list .total button:hover {
    background-color: var(--dark-primary-color);
}

/* Media query for screens less than 600px wide */
@media (max-width: 600px) {
    .panier-list {
        margin-top: 3rem; /* Reduce margin */
        padding: 1rem; /* Reduce padding */
    }

    .panier-list h2 {
        font-size: 2rem; /* Reduce font size */
    }

    .panier-list .categorie-card .categorie-content {
        flex-direction: column; /* Stack the items vertically */
        align-items: flex-start; /* Align items to the start */
    }

    .panier-list .categorie-card .categorie-content img {
        width: 100%; /* Make image full width */
        height: auto; /* Adjust height automatically */
        max-width: 80px; /* Limit the width to maintain image size */
    }

    .panier-list .categorie-card .categorie-content div {
        width: 100%; /* Ensure full width for text content */
    }

    .panier-list .categorie-card .categorie-content button {
        width: 25%; /* Full width buttons */
        margin-top: 0.5rem; /* Add some margin at the top */
    }
}


</style>
