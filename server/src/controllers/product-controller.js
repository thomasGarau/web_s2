/* A faire en déleguant tout les calculs récupération de données etc au service dédié ou autre service si fonction commune */
const userService = require('../services/product-service')

exports.getProduct = ((req,res) => {
    try {
        const data = null;
        res.status(200).send({produit: data});
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération des produits');
    }
});

exports.getAllProduct = ((req,res) => {
    try {
        const data = null;
        res.status(200).send({produit: data});
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération des produits');
    }
});


exports.addProduct = ((req,res) => {
    try {
        const data = null;
        res.status(200).send("ok");
    }
    catch (err) {
        res.status(500).send('Erreur lors de l\'ajout des produits');
    }
});

exports.deleteProduct = ((req,res) => {
    try {
        const data = null;
        res.status(200).send("ok");
    }
    catch (err) {
        res.status(500).send('Erreur lors de la suppression des produits');
    }
});

exports.updateProduct = ((req,res) => {
    try {
        const data = null;
        res.status(200).send("ok");
    }
    catch (err) {
        res.status(500).send('Erreur lors de la mise à jour des produits');
    }
});

/* peut etre également définir des fonction de modification du stock d'un produit ou le faire via des service trigger à toi de voir en fonction du tp */