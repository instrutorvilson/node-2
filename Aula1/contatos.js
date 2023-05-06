module.exports = {
   listar(req, res) {
      res.status(200).send("lista de contatos")
   },

   listarPorId(req, res) {
    res.status(200).send(`idcontato: ${req.params.idcontato}`)
   },

   inserir(req, res){
    let contato = {
        nome: req.body.nome,
        email: req.body.email,
        celular: req.body.celular
    }
    res.status(201).send(contato)
   }
}
/*
app.get('/contato', (req, res) => {
    res.status(200).send("lista de contatos")
  })
  

  app.get('/contato/:idcontato', (req, res) => {
      res.status(200).send(`idcontato: ${req.params.idcontato}`)
    })
  
  app.post('/contato', (req, res) => {
      let contato = {
          nome: req.body.nome,
          email: req.body.email,
          celular: req.body.celular
      }
      res.status(201).send(contato)
    })
  
    app.put('/contato/:idcontato', (req, res) => {
     //pesquisar se existe o contato informado
      let contato = {
          id: req.params.idcontato,
          nome: req.body.nome,
          email: req.body.email,
          celular: req.body.celular
      }
      res.status(201).send(contato)
    })
    
    app.delete('/contato/:idcontato', (req, res) => {
      //pesquisar se existe o contato informado
      // res.status(204).send(`Contato ${req.params.idcontato} excluido com sucesso`)
       res.status(204).send()
     })
  */