const pool = require("./conexao")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async registrar(req, res) {
        let client = ''
        try {
            client = await pool.connect()
            /**Cria o hash da senha em texto plano */
            let hash = await bcrypt.hash(req.body.senha, 10)

            let sql = 'insert into tb_usuarios(nome, email, senha, perfil) values($1,$2,$3,$4)'
            let dados = [req.body.nome, req.body.email, hash, req.body.perfil]

            await client.query(sql, dados)
            res.status(201).send({ message: "Usuário cadastrado com sucesso" })
        }
        catch (err) {
            res.status(400).send({ erro: err.message })
        }
        finally {
            if (client != '')
                client.release()
        }
    },

    async login(req, res) {
        let client = ''
        try {
            client = await pool.connect()
            let sql = 'select * from tb_usuarios where email = $1'            
            result = await client.query(sql,[req.body.email])
            if(result.rowCount > 0){
              let senhaOk = await bcrypt.compare(req.body.senha, result.rows[0].senha)
              if(senhaOk){
                //gerar o token
                let token = jwt.sign(
                    {
                      id: result.rows[0].id,
                      nome: result.rows[0].nome, 
                      email: result.rows[0].email,
                      perfil: result.rows[0].perfil
                    }
                  ,process.env.JWT_SECRET)
                return res.status(200).send({ token: token})
              }
              return res.status(401).send({ Message: "Usuario/senha não coincidem."})
            }

            res.status(400).send({ message: "Usuário não cadastrado." })
        }
        catch (err) {
            res.status(400).send({ erro: err.message })
        }
        finally {
            if (client != '')
                client.release()
        }
    }
}