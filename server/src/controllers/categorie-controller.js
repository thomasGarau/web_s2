const categorieService = require('../services/categorie-service');

exports.getCategorie = ( async (req,res) => {
    try {
        const label = req.body.label;
        const categorie = await categorieService.getCategorie(label);
        res.status(200).send(categorie);
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération des catégories');
    }
}
);

exports.getAllCategorie = ( async (req,res) => {
    try {
        const categories = await  categorieService.getAllCategorie();
        res.status(200).send(categories);
    }
    catch (err) {
        res.status(500).send('Erreur lors de la récupération des catégories');
        console.error(err);
    }
}
);

exports.addCategorie = (async (req,res) => {
    try {
        const { label } = req.body;
        await categorieService.addCategorie(label);
        res.status(200).send("ok");
    }
    catch (err) {
        res.status(500).send('Erreur lors de l\'ajout des catégories');
        console.error(err);
    }
});

exports.deleteCategorie = (async (req,res) => {
    try {
        await categorieService.deleteCategorie(req.query.id_categorie);
        res.status(200).json({mmessage : "ok"});
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression des catégories');
    }
});

exports.updateCategorie = ( async (req,res) => {
    try {

        const {id, label } = req.body;
        await categorieService.updateCategorie(id, label);
        res.status(200).json({message : "ok"});
    }
    catch (err) {
        res.status(500).send('Erreur lors de la mise à jour des catégories');
    }
});