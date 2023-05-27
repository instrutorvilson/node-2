const express = require('express')
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
        const produto = await Produto.create(req.body)
        res.status(201).send(produto)
    }
    catch(error){
        res.status(400).send(error.message)
    }
 })

app.listen(port, () => console.log(`Executando na porta ${port}`))