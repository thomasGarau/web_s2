const userService = require('../services/user-service');

exports.verifyToken = ((req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token, "bbb")
        if(!token || token == 'undefined' || token == 'null'){
            throw new Error('Token invalide');
        }else{
            const decoded = userService.verifyToken(token);
            res.status(200).send({valide:true, information:decoded});
        }
    } catch (err) {
        console.error(err);
        res.status(401).send('Token invalide');
    }
})

exports.Authenticate = (async (req,res) => {
    try {
        const {email, password} = req.body;
        const {token, id_utilisateur, role} = await userService.authenticateUser(email, password);
        res.status(200).send({email: email, token: token, days: 7, id_utilisateur: id_utilisateur, role : role});
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de l authentification');
    }
})

 exports.register = (async (req,res) => {
    try {
        const { email, password, name, firstname } = req.body;
        if(!await userService.userExist(email)){
            const {token, id_utilisateur} = await userService.registerUser(email, password, name, firstname);
            res.status(200).send({email: email, token: token, days: 7, id_utilisateur: id_utilisateur});
        }else{
            res.status(401).send("Nom d utilisateur déjà utilisé");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Échec de l\'inscription');
    }
})

exports.invalidateToken = (async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await userService.invalidateToken(token);
        res.status(200).send({username: decoded.userName});
    } catch (err) {
        console.error(err);
        res.status(401).send('Token invalide');
    }
});


