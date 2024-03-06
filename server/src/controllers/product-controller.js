/* A faire en déleguant tout les calculs récupération de données etc au service dédié ou autre service si fonction commune */
const productService = require('../services/product-service')

exports.getProduct = ( async (req,res) => {
    try {
        const label = req.body.label;
        const product = await productService.getProduct(label);
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
        console.log(err);
    }
});


exports.addProduct = (async (req,res) => {
    try {
        const { label, prix, id_categorie, stock } = req.body;
        await productService.addProduct(label, prix, id_categorie, stock);
        res.status(200).send("ok");
    }
    catch (err) {
        res.status(500).send('Erreur lors de l\'ajout des produits');
        console.log(err);
    }
});

exports.deleteProduct = (async (req,res) => {
    try {
        await productService.deleteProduct(req.body.id_produit);
        res.status(200).send("ok");
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la suppression des produits');
    }
});

exports.updateProduct = ( async (req,res) => {
    try {

        const {id, nom, quantite, prix, id_categorie } = req.body;
        await productService.updateProduct(id, nom, quantite, prix, id_categorie);
        res.status(200).send("ok");
    }
    catch (err) {
        res.status(500).send('Erreur lors de la mise à jour des produits');
    }
});

/* peut etre également définir des fonction de modification du stock d'un produit ou le faire via des service trigger à toi de voir en fonction du tp */