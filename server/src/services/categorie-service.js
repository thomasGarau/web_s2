const categorie = require('../models/categorie-model');
const produitService = require('./product-service');

async function getCategorie(id_categorie) {
    try {
        return await categorie.findOne({ where : { id_categorie: id_categorie }});
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la récupération des catégories');
    }
}

async function getAllCategorie() {
    try {
        const data = await categorie.findAll();
        return data;
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la récupération des catégories');
    }
}

async function addCategorie(label, url) {
    try {
        const data = await categorie.create({ label: label, url : url});
    }
    catch (err) {
        throw new Error(err,'Erreur lors de l\'ajout des catégories');
    }
}

async function deleteCategorie(id_categorie) {
    try {
        produits = await produitService.getAllProduct(id_categorie);
        for (let i = 0; i < produits.length; i++) {
            await produitService.deleteProduct(produits[i].id_produit);
        }
        const data = await categorie.destroy({ where : { id_categorie: id_categorie }});
    }
    catch (err) {
        throw new Error(err,'Erreur lors de la suppression des catégories');
    }
}


async function updateCategorie(id, label) {
    try {
        const existingCategorie = await categorie.findByPk(id);

        if (!existingCategorie) {
            throw new Error('Catégorie non trouvée');
        }
        existingCategorie.label = label;
        await existingCategorie.save();
    } catch (err) {
        console.error(err);
        throw new Error('Erreur lors de la mise à jour de la catégorie');
    }
}

module.exports = { getCategorie, getAllCategorie, addCategorie, deleteCategorie, updateCategorie };