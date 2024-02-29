/* A faire en déleguant tout les calculs récupération de données etc au service dédié ou autre service si fonction commune */
const Product = require('../models/product-model');

async function getProduct(label) {
    try {
        const data = null;
        return data;
    }
    catch (err) {
        throw new Error('Erreur lors de la récupération des produits');
    }
}

async function getAllProduct(id_categorie) {
    try {
        const data = null;
        return data;
    }
    catch (err) {
        throw new Error('Erreur lors de la récupération des produits');
    }
}

async function addProduct(label, prix, id_categorie) {
    try {
        const data = null;
        return data;
    }
    catch (err) {
        throw new Error('Erreur lors de l\'ajout des produits');
    }
}

async function deleteProduct(id_produit) {
    try {
        const data = null;
        return data;
    }
    catch (err) {
        throw new Error('Erreur lors de la suppression des produits');
    }
}

/* définir la fonction d'update */

module.exports = {
    getProduct,
    getAllProduct,
    addProduct,
    deleteProduct
};