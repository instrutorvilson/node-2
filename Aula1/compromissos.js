const res = require("express/lib/response")
const pool = require("./conexao")
module.exports = {
    inserir(req, res){
       res.status(201).send( req.body )
    }
}