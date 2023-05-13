const pool = require('./conexao')
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

         let sql = "insert into tb_contatos(nome, email, celular) values($1,$2,$3)"
         let dados = [req.body.nome, req.body.email, req.body.celular]
         result = await client.query(sql, dados)
         client.release()
         res.status(201).send({ message: "Contato inserido com sucesso" })
      }
      catch (err) {
         res.status(400).send({ Erro: err.message })
      }     
   },
   async alterar(req, res) {
      try{
        let client = await pool.connect()
        let result = await client.query(`select * from tb_contatos where id = ${req.params.idcontato}`)
        if(result.rowCount > 0){
           if(result.rows[0].email !== req.body.email){
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
           res.status(200).send({message:"Contato alterado com sucesso", contato: req.body})
        }
        else{
           return res.status(400).send({message: "O contato não existe"})
        }
      }
      catch(err){
         res.status(400).send({ Erro: err.message })
      }      
   },

   excluir(req, res) {
      res.status(201).send(`Excluido: ${req.params.idcontato}`)
   }
}
