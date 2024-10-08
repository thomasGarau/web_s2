const panierService = require('../services/panier-service');

exports.getPanier = ( async (req,res) => {
    try {
        const id = req.body.id_utilisateur;
        const panier = await panierService.getPanier(id);
        res.status(200).send(panier);
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération du panier');
    }
}
);

exports.getProduitsPanier = (async (req,res) => {
    try {
        const id = req.body.id_utilisateur;
        const produit = req.body.id_produit;
        const produitPanier = await panierService.getProduitPanier(id, produit);
        res.status(200).send(produitPanier);
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération des produits du panier');
    }
}
);

exports.addPanier = (async (req,res) => {
    try {
        const { id_utilisateur, id_produit } = req.body;
        await panierService.addPanier(id_utilisateur, id_produit);
        res.status(200).json({ message: 'ok' });

    }
    catch (err) {
        res.status(500).json({message : 'Erreur lors de l\'ajout du panier controller'});
    }
}
);

exports.deletePanier = (async (req,res) => {
    try {
        await panierService.deletePanier(req.query.id_utilisateur);
        res.json({ message: 'ok' });
    }
    catch (err) {
        res.status(500).json({message :'Erreur lors de la suppression du panier'});
    }
}
);

exports.deleteProduitPanier = (async (req,res) => {
    try {
        await panierService.deleteProduitPanier(req.query.id_utilisateur, req.query.id_produit);
        res.status(200).json({message : "ok"});
    }
    catch (err) {
        
        res.status(500).json({message : 'Erreur lors de la suppression du produit du panier controller'});
    }
}
);

exports.removeFromPanier = (async (req,res) => {
    try{
        const {id_utilisateur, id_produit} = req.query;
        await panierService.removeFromPanier(id_utilisateur, id_produit);
        res.status(200).json({message : 'Produit retiré du panier'});
    }catch(error){
        console.error(error);
        res.status(500).send('Erreur lors de la suppression du produit du panier');
    }
});

exports.getPanierWithPrice = (async (req,res) => {
    try {
        const id = req.body.id_utilisateur;
        const panier = await panierService.getPanierWithPrice(id);
        res.status(200).send(panier);
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération du panier');
        console.error(err);
    }
});
