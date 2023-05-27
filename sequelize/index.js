const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/dbvendas')

async function conectar(){
  try{
    await sequelize.authenticate()
    console.log('conectado')
  }
  catch(error){
    console.log(`Erro: ${error.message}`)
  }
}

conectar()

/**
 * npm init -y
 * npm install sequelize pg
 */