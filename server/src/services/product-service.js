const Product = require('../models/product-model');

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
    try {
        const data = await Product.destroy({ where : { id_produit: id_produit }});
    }
    catch (err) {
        throw new Error(err,'Erreur lors de la suppression des produits');
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