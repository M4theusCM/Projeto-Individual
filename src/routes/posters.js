var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD


var posterController = require("../controllers/posterController");

router.get("/posterUser/:fkCriador", function(req, res){
    posterController.posterUsuario(req, res);
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastro', upload.single('poster'), (req, res) => {
    console.log('Passou no routers')
    posterController.salvar(req, res);
});




module.exports = router