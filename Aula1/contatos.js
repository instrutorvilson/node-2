const pool = require('./conexao')
const userLogado = require('./libs/userlogado')
module.exports = {
   listar(req, res) {    

      pool.connect((err, client) => {
         if (err) {
            return res.send(`Erro de conexão: ${err.message}`)
         }

         client.query('select * from tb_contatos', (err, result) => {
            if (err) {
               return res.send(`Erro de conexão: ${err.message}`)
            }

            res.status(200).send(result.rows)
         })
      })
   },

   listarPorId(req, res) {
      pool.connect((err, client) => {
         if (err) {
            return res.send(`Erro de conexão: ${err.message}`)
         }

         client.query('select * from tb_contatos where id = $1', [req.params.idcontato], (err, result) => {
            if (err) {
               return res.send(`Erro de conexão: ${err.message}`)
            }

            res.status(200).send(result.rows[0])
         })
      })
   },

   async listarPorUser(req, res){
      try{
         const client = await pool.connect()
         const result = await client.query('select * from tb_contatos where iduser = $1',[req.params.iduser])
         
         return res.status(200).send(result.rows)
      }
      catch(error){
         res.status(404).send({ erro: error.message}) 
      }
   },

   async inserir(req, res) {
      /* pool.connect((err, client)=>{
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
         })   
         */
      try {      
         let client = await pool.connect();
         let result = await client.query('select * from tb_contatos where email = $1', [req.body.email])
         if (result.rowCount > 0)
            return res.status(400).send({ message: "Já existe um contato com esse email" })

         let sql = "insert into tb_contatos(nome, email, celular,idcontato) values($1,$2,$3,$4)"
         //recupera o usuario logado
         const user = userLogado.user(req)
         let dados = [req.body.nome, req.body.email, req.body.celular, user.id]

         result = await client.query(sql, dados)
         client.release()
         res.status(201).send({ message: "Contato inserido com sucesso" })
      }
      catch (err) {
         res.status(400).send({ Erro: err.message })
      }
   },
   async alterar(req, res) {
      let client = ''
      try {  
         client = await pool.connect()       
         let result = await client.query(`select * from tb_contatos where id = ${req.params.idcontato}`)
         if (result.rowCount > 0) {
            if (result.rows[0].email !== req.body.email) {
               result = await client.query(
                  'select * from tb_contatos where email = $1',
                  [req.body.email]
               )
               if (result.rowCount > 0)
                  return res.status(400).send({ message: "Já existe um contato com esse email" })
            }
            let sql = "update tb_Contatos set nome = $1, email= $2, celular=$3 where id = $4"
            let dados = [req.body.nome, req.body.email, req.body.celular, req.params.idcontato]
            await client.query(sql, dados)
            res.status(200).send({ message: "Contato alterado com sucesso", contato: req.body })
         }
         else {
            return res.status(400).send({ message: "O contato não existe" })
         }
      }
      catch (err) {
         res.status(400).send({ Erro: err.message })
      }
      finally{
         if(client != '')
           client.release()
      }
   },

   async excluir(req, res) {
      let client = ''
      try {
         client = await pool.connect()
         client.query('delete from tb_contatos where id = $1',[req.params.idcontato])
         res.status(204).send()
      }
      catch (err) {
         res.status(400).send({ Erro: err.message })
      }
      finally{
         if(client != '')
           client.release()
      }
   }
}
