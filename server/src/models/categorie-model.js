const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Categorie extends Model {}

Categorie.init({
    id_categorie: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    url :{
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Categorie',
    tableName: 'categorie',
    timestamps: false
});

module.exports = Categorie;
