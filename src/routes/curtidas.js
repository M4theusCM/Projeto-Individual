var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController")

router.get('/qtdCurtida/:fkPoster', function(req, res){
    curtidaController.qtdCurtida(req, res)
})

router.post('/buscarStatus', function(req, res){
    curtidaController.buscarStatus(req, res)
})


module.exports = router