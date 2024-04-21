const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const User = require('./user-model');
 const Produit = require('./product-model');

class Panier extends Model {}

Panier.init({
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User, 
            key: 'id_utilisateur'
        }
    },
    id_produit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Produit, // nom de la table, assurez-vous qu'elle correspond au modèle Sequelize
            key: 'id_produit'
        }
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ProduitPanier',
    tableName: 'produit_panier',
    timestamps: false, 
});

Panier.belongsTo(Produit, { foreignKey: 'id_produit', as: 'produit' });
Produit.hasMany(Panier, { foreignKey: 'id_produit' });

module.exports = Panier;


