const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Categorie = require('./categorie-model');
// important si tu demande à chatgptouille de te créer les model précise que tu tuilise sequelize comme orm 
class Produit extends Model {}

Produit.init({
    id_produit: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categorie,
            key: 'id_categorie'
        }
    },
    date_creation: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    date_modification: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Produit',
    tableName: 'produit',
    timestamps: false
});

Produit.beforeUpdate((produit) => {
    produit.date_modification = new Date();
});

module.exports = Produit;
