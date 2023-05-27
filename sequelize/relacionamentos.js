const { Categoria } = require("./model/categoria");
const { Produto } = require("./model/modelProduto");
const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/dbvendas')

async function criarRelacionamento() {
    class Categoria extends Model { }

    Categoria.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ativa: {
            type: DataTypes.BOOLEAN,
        },
    },
        { sequelize }
    );

    class Produto extends Model { }

    Produto.init({
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preco: {
            type: DataTypes.DECIMAL,
        }
    },
        { sequelize }
    );
    
    Produto.belongsTo(Categoria,{
        foreignKey: 'id_categoria'
    })

    await sequelize.sync({force:true})
    const cereal = await Categoria.create({ nome: 'Cereal'})
    const trigo = await Produto.create({ descricao: "Milho", preco: 89.90, id_categoria: 1})
}

async function criarRecord(){
   const cereal = await Categoria.create({ nome: 'Cereal'})
   const carne = await Categoria.create({ nome: 'Carne'})

   const trigo = await Produto.create({ descricao: "Milho", preco: 89.90, id_categoria: cereal.id})

}
criarRelacionamento()
//criarRecord()

