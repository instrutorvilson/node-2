const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/dbvendas')

class Categoria extends Model {}

Categoria.init({
    nome:{
        type: DataTypes.STRING,
        len:[2,20]
    },
    ativa: {
        type: DataTypes.BOOLEAN,
    },}
,{
    sequelize,
    tableName: "Categoria"
})

module.exports= { Categoria }