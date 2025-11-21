var express = require("express")
var router = express.Router()

var comentarioController = require("../controllers/comentarioController")

router.post('/qtdComentario', function(req, res){
    comentarioController.buscarQtdComentario(req, res)
})

router.post('/comentar', function(req, res){
    comentarioController.comentar(req, res)
})

router.post('/comentariosDisplay', function(req, res){
    comentarioController.comentariosPosterDisplay(req, res)
})
module.exports = router