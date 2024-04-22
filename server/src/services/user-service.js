const Utilisateur = require('../models/user-model');
const TokenModel = require('../models/token-model');
const Panier = require('../models/panier-model');
const sequelize = require('../../config/database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticateUser = async (username, password) => {
    const user = await Utilisateur.findOne({ where: { email: username } });
    if (user && await bcrypt.compare(password, user.mdp)) {
        const token = genToken(user.id_utilisateur, user.role);
        return { token: token, id_utilisateur: user.id_utilisateur, role : user.role};
    } else {
        throw new Error('Identifiants incorrects');
    }
};

const getUser = async (id_user) => {
    try {
        return await Utilisateur.findOne({ where: { id_utilisateur: id_user } });
    } catch (err) {
        console.error(err);
        throw new Error('Échec de la récupération de l\'utilisateur');
    }
}

const getAllUsers = async () => {
    try {
        return await Utilisateur.findAll();
    } catch (err) {
        console.error(err);
        throw new Error('Échec de la récupération des utilisateurs');
    }
}

const registerUser = async (username, password, name, firstname) => {
    try {
        const newUser = await Utilisateur.create({
            email: username,
            mdp: password,
            nom: name,
            prenom: firstname,
        });
        const token = genToken(newUser.id_utilisateur, 'user');

        return { token: token, id_utilisateur: newUser.id_utilisateur };
    } catch (err) {
        console.error(err);
        throw new Error('Erreur durant l\'inscription');
    }
};

const updateUser = async (id_user, nom, prenom, email, role) => {
    try {
        const user = await Utilisateur.findByPk(id_user);
        if(!user){
            throw new Error('Utilisateur non trouvé');
        }

        await user.update({
            nom: nom,
            prenom: prenom,
            email: email,
            role: role
        });
        await user.save();
    }
    catch (err) {
        console.error(err);
        throw new Error('Échec de la récupération de l\'utilisateur');
    }
}

const deleteUser = async (id_user) => {
    try{
        const t = await sequelize.transaction();
        try {
            await Panier.destroy({
                where: { id_utilisateur: id_user },
                transaction: t
            });

            await Utilisateur.destroy({
                where: { id_utilisateur: id_user },
                transaction: t
            });

            await t.commit();
        } catch (err) {
            await t.rollback();
            console.error('Failed to delete product and associated cart items', err);
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }
    
    }catch(error) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
    }
}

function genToken(user_id, role) {
    const token = jwt.sign({
            user_id: user_id,
            role: role
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
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    userExist,
    verifyToken,
    isTokenBlacklisted,
    invalidateToken
};
