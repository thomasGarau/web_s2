const Utilisateur = require('../models/user-model');
const TokenModel = require('../models/token-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticateUser = async (username, password) => {
    const user = await Utilisateur.findOne({ where: { email: username } });
    if (user && await bcrypt.compare(password, user.mdp)) {
        const token = genToken(user.id_utilisateur);
        return { token: token, id_utilisateur: user.id_utilisateur };
    } else {
        throw new Error('Identifiants incorrects');
    }
};

const registerUser = async (username, password, name, firstname) => {
    try {
        const newUser = await Utilisateur.create({
            email: username,
            mdp: password,
            nom: name,
            prenom: firstname,
        });
        const token = genToken(newUser.id_utilisateur);

        return { token: token, id_utilisateur: newUser.id_utilisateur };
    } catch (err) {
        console.error(err);
        throw new Error('Erreur durant l\'inscription');
    }
};

function genToken(user_id) {
    const token = jwt.sign({
            user_id: user_id,
        },
        process.env.JWT_SECRET, {
            expiresIn: '7d'
        }
    );
    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error(err);
        throw new Error('Token invalide');
    }
}

async function userExist(email) {
    Utilisateur.findOne({ where: { email: email } })
    .then(user => console.log(user))
    .then(user => {return user;})
    .catch(error => console.error(error));
}

async function isTokenBlacklisted(token) {
    const tokenRecord = await TokenModel.findOne({ where: { valeur: token } });
    return !!tokenRecord;
}

async function invalidateToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await TokenModel.create({
            valeur: token,
            date_validite: new Date()
        });
        return decoded;
    } catch (err) {
        console.error(err);
        throw new Error('Token invalide');
    }
}

module.exports = {
    authenticateUser,
    registerUser,
    userExist,
    verifyToken,
    isTokenBlacklisted,
    invalidateToken
};
