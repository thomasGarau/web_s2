const Panier = require('../models/panier-model');
const Produit = require('../models/product-model')

async function getPanier(id) {
    try {
        return await Panier.findAll({ where : { id_utilisateur: id }});
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la récupération du panier');
    }
}

async function getPanierWithPrice(id){
    try {
        return await Panier.findAll({
            where: { id_utilisateur: id },
            include: [{
                model: Produit,
                as: 'produit',
                attributes: ['id_produit', 'label', 'url', 'prix'] // Ajoutez 'id_produit', 'label' et 'url' aux attributs à récupérer
            }],
            attributes: ['quantite'] // Spécifiez les attributs de la table Panier à récupérer, par exemple 'quantite'
        });
    } catch (err) {
        console.error('Erreur lors de la récupération du panier:', err.message);
        throw new Error('Erreur lors de la récupération du panier');
    }
}


async function deletePanier(id_utilisateur) {
    try {
        await Panier.destroy({ where : { id_utilisateur: id_utilisateur }});
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la suppression du panier');
    }
}

async function getProduitPanier(id_utilisateur, id_produit) {
    try {
        return await Panier.findOne({ where : { id_utilisateur: id_utilisateur, id_produit: id_produit }});
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la récupération du produit du panier');
    }
}



async function addPanier(id_utilisateur, id_produit) {
    try {
        const panier = await getPanier(id_utilisateur);
        if(panier !== null){
            const produit = await getProduitPanier(id_utilisateur, id_produit);
            if(produit !== null){
                produit.quantite += 1;
                await produit.save();
            }
            else{
                await Panier.create({id_utilisateur: id_utilisateur, id_produit: id_produit, quantite: 1});
            }
        }
        else{
            await Panier.create({id_utilisateur: id_utilisateur, id_produit: id_produit, quantite: 1});
        }
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de l\'ajout du panier');
    }
    
}

async function deleteProduitPanier(id_utilisateur, id_produit) {
    try {
        const panier = await getPanier(id_utilisateur);
        if(panier){
            const produit = await getProduitPanier(id_utilisateur, id_produit);
            if(produit){
                if(produit.quantite > 1){
                    produit.quantite -= 1;
                    await produit.save();
                }
                else{
                    await produit.destroy();
                }
            }
        }
        else {
            throw new Error('Panier non-trouvé');
        
        }
    }
    catch (err) {
        throw new Error(err, 'Erreur lors de la suppression du produit du panier');
    }
}

async function removeFromPanier(id_utilisateur, id_produit) {
    try{
        await Panier.destroy({ where : { id_utilisateur: id_utilisateur, id_produit: id_produit }});
    }catch(error){
        throw new Error(error, 'Erreur lors de la suppression du produit du panier');
    }
}

module.exports = { getPanier, getProduitPanier, deletePanier, addPanier, deleteProduitPanier, removeFromPanier, getPanierWithPrice };