var jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || ''
    if(token === '')
       return res.status(401).send({ message: "Precisa estar logado para consulta contatos"})
    else{
        const tokenDecoded = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecoded.perfil !== "ADMIN")
            return res.status(403).send({ message: "Precisa ser Administrador para inserir contatos"})
    }
    next()  
}