const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Utilisateur extends Model {}

Utilisateur.init({
    id_utilisateur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mdp: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'utilisateur',
    timestamps: false
});

module.exports = Utilisateur;
