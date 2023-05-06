const express = require('express')
const router = express.Router()

const contato = require('./contatos')
const usuario = require('./usuarios')

/**Conjunto de rotas para contato */
router.get('/contato', contato.listar)   
router.get('/contato/:idcontato',contato.listarPorId)
router.post('/contato', contato.inserir)
router.put('/contato/:idcontato',contato.alterar)
router.delete('/contato/:idcontato',contato.excluir)

/**Conjunto de rota para usuario */
router.post('/usuario', usuario.registrar)
router.post('/usuario/login',usuario.login)

module.exports = router