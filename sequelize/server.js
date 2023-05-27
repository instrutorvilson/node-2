const express = require('express')
const { Categoria } = require('./model/categoria')
const { Produto } = require('./model/modelProduto')
const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(router)

router.get('/produto',async(req, res)=>{
   const produtos = await Produto.findAll()

   res.status(200).send(produtos)
})

router.post('/produto', async(req, res)=>{
    try{
        const idcategoria = req.body.id_categoria
        const categoria = await Categoria.findAll({where:{ id: idcategoria}})
        if(!categoria.length)
           return res.status(400).send('Categoria informada não existe')
        
        const produto = await Produto.create(req.body)
        res.status(201).send(produto)
    }
    catch(error){
        res.status(400).send(error.message)
    }
 })

app.listen(port, () => console.log(`Executando na porta ${port}`))