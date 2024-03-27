const categorie = require('../models/categorie-model');

async function getCategorie(label) {
    try {
        return await categorie.findOne({ where : { label: label }});
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

async function addCategorie(label) {
    try {
        const data = await categorie.create({ label: label});
    }
    catch (err) {
        throw new Error(err,'Erreur lors de l\'ajout des catégories');
    }
}

async function deleteCategorie(id_categorie) {
    try {
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