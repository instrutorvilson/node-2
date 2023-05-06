const express = require('express')
const router = express.Router()
const contato = require('./contatos')

/**Conjunto de rotas para contato */
router.get('/contato', contato.listar)
   
router.get('/contato/:idcontato',contato.listarPorId)

router.post('/contato', contato.inserir)

/**Conjunto de rota para usuario */

module.exports = router