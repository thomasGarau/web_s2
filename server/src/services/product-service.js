const Product = require('../models/product-model');
const Panier = require('../models/panier-model');
const sequelize = require('../../config/database');

async function getProduct(id_produit) {
    try {
        return await Product.findOne({ where : { id_produit: id_produit }});
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la récupération des produits');
    }
}

async function getAllProduct(id_categorie) {
    try {
        const data = await Product.findAll({ where : { id_categorie: id_categorie }});
        return data;
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la récupération des produits');
    }
}

async function addProduct(label, prix, id_categorie, stock) {
    try {
        const data = await Product.create({ label: label, prix: prix, id_categorie: id_categorie, stock: stock});
    }
    catch (err) {
        throw new Error(err,'Erreur lors de l\'ajout des produits');
    }
}

async function deleteProduct(id_produit) {
    const t = await sequelize.transaction();

    try {
        await Panier.destroy({
            where: { id_produit: id_produit },
            transaction: t
        });

        await Product.destroy({
            where: { id_produit: id_produit },
            transaction: t
        });

        await t.commit();
    } catch (err) {
        await t.rollback();
        console.error('Failed to delete product and associated cart items', err);
        throw new Error('Erreur lors de la suppression des produits');
    }
}

async function updateProduct(id_produit, label, prix, stock) {
    try {
        const existingProduct = await Product.findByPk(id_produit);

        if (!existingProduct) {
            throw new Error('Produit non trouvé');
        }

        await existingProduct.update({
            label: label,
            prix: prix,
            stock: stock
        });
        
        await existingProduct.save();
        
    } catch (err) {
        console.error(err);
        throw new Error('Erreur lors de la mise à jour du produit');
    }
}


module.exports = {
    getProduct,
    getAllProduct,
    addProduct,
    deleteProduct,
    updateProduct
};