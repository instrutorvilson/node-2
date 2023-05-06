module.exports = {
    registrar(req, res){
        const { nome, email} = req.body
        let contato = {
            nome,
            email: email,
            senha: req.body.senha
        }
        res.status(201).send(contato)
    },

    login(req, res){
        const { email} = req.body
        res.status(200).send(`${email} logado`)
    }
}