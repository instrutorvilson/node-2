const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/dbvendas')

const Produto = sequelize.define('tb_produtos',
   {
     descricao:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[5, 8 ]
      }
     },
     preco:{
      type: DataTypes.DOUBLE
     },
     estoque:{
      type: DataTypes.INTEGER
     },
     status:{
       type: DataTypes.BOOLEAN,
       defaultValue: true
     }
   })

   module.exports = { Produto }