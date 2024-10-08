const productService = require('../services/product-service')

exports.getProduct = ( async (req,res) => {
    try {
        const id_produit = req.body.id_produit;
        const product = await productService.getProduct(id_produit);
        res.status(200).send(product);
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération des produits');
    }
});

exports.getAllProduct = ( async (req,res) => {
    try {
        const id_categorie = req.body.id_categorie;
        const products = await  productService.getAllProduct(id_categorie);
        res.status(200).send(products);
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération des produits');
        console.error(err);
    }
});


exports.addProduct = (async (req,res) => {
    try {
        const { label, prix, id_categorie, stock } = req.body;
        await productService.addProduct(label, prix, id_categorie, stock);
        res.status(200).json({message : "ok"});
    }
    catch (err) {
        res.status(500).send('Erreur lors de l\'ajout des produits');
        console.error(err);
    }
});

exports.deleteProduct = (async (req,res) => {
    try {
        await productService.deleteProduct(req.query.id_produit);
        res.status(200).json({message : "ok"});
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression des produits');
    }
});

exports.updateProduct = async (req, res) => {
    try {
        const { id_produit, label, prix, stock} = req.body;
        
        await productService.updateProduct(id_produit, label, prix, stock );
        res.status(200).json({message : "Produit mis à jour avec succès."});
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la mise à jour du produit');
    }
};

/* peut etre également définir des fonction de modification du stock d'un produit ou le faire via des service trigger à toi de voir en fonction du tp */