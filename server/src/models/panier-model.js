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

module.exports = Panier;

// Associations (si nécessaire, à définir en dehors de la classe du modèle, selon la façon dont vous structurez votre projet)
// ProduitPanier.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });
// ProduitPanier.belongsTo(Produit, { foreignKey: 'id_produit' });
