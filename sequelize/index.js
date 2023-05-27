const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/dbvendas')

async function criarProduto(){
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
   //solicitar para que seja criado a tabela
   await Produto.sync({force: true}) //recria a tabela
   //await Produto.sync()
   //console.log('Tabela tb_produtos criada com sucesso')

   const produto = await Produto.create({ descricao: 'banana', preco: 10.50, estoque: 15})
   console.log(produto)   
}

async function conectar(){
  try{
    await sequelize.authenticate()    
    console.log('conectado')
  }
  catch(error){
    console.log(`Erro: ${error.message}`)
  }
}

//conectar()
criarProduto()

/**
 * npm init -y
 * npm install sequelize pg
 */