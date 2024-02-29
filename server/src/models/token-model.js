const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class TokenInvalide extends Model {}

TokenInvalide.init({
    id_token: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valeur: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    date_validite: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TokenInvalide',
    tableName: 'token_invalide',
    timestamps: false
});

module.exports = TokenInvalide;
