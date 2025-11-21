var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController")

router.post('/qtdCurtida', function(req, res){
    curtidaController.buscarQtdCurtidas(req, res)
})

router.post('/buscarStatus', function(req, res){
    curtidaController.buscarStatus(req, res)
})

router.post('/alterarStatus', function(req, res){
    curtidaController.alterarStatus(req, res)
})

module.exports = router