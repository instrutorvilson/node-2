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
   },
   alterar(req, res){
     res.status(201).send(`Alterado: ${req.params.idcontato}`)
   },

   excluir(req, res){
    res.status(201).send(`Excluido: ${req.params.idcontato}`)
   }
}
