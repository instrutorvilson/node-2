const pool = require('./conexao')
module.exports = {
   listar(req, res) {
      pool.connect((err, client)=>{
         if(err){
            return res.send(`Erro de conexão: ${err.message}`)
         }

         client.query('select * from tb_contatos',(err, result) => {
            if(err){
               return res.send(`Erro de conexão: ${err.message}`)
            }

            res.status(200).send(result.rows)
         })         
      })      
   },

   listarPorId(req, res) {
      pool.connect((err, client)=>{
         if(err){
            return res.send(`Erro de conexão: ${err.message}`)
         }

         client.query('select * from tb_contatos where id = $1',[req.params.idcontato],(err, result) => {
            if(err){
               return res.send(`Erro de conexão: ${err.message}`)
            }

            res.status(200).send(result.rows[0])
         })         
      })    
   },

  async inserir(req, res){
    /*pool.connect((err, client)=>{
      if(err){
         return res.send(`Erro: ${err.message}`)
         }
      let sql = "insert into tb_contatos(nome, email, celular) values($1,$2,$3)"
      let dados = [req.body.nome, req.body.email, req.body.celular]
      client.query(sql,dados,(err, result) => {
         if(err){
            return res.send(`Erro: ${err.message}`)
         }
         
         res.status(200).send({ message: `contato cadastrado com sucesso ${result}`})
      })
      })   */
      let {err, client} = await pool.connect();       
      let {result} = client.query('select * from tb_contatos where email = $1',[req.body.email])

      res.status(200).send(result.rows)
   },
   alterar(req, res){
     res.status(201).send(`Alterado: ${req.params.idcontato}`)
   },

   excluir(req, res){
    res.status(201).send(`Excluido: ${req.params.idcontato}`)
   }
}
