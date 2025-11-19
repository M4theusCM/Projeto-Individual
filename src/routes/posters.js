var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD


var posterController = require("../controllers/posterController");

router.get("/posterUser/:fkCriador", function (req, res) {
    posterController.posterUsuario(req, res);
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastro', upload.single('poster'), (req, res) => {
    posterController.salvar(req, res);
});


router.get("/graficoQtdPoster/:fkCriador", function (req, res) {
    posterController.graficoQtdPoster(req, res);
});

router.get("/graficoTipo/:fkCriador", function (req, res) {
    posterController.graficoTipo(req, res)
})

router.get("/graficoInteracoes/:fkCriador", function (req, res) {
    posterController.graficoInteracoes(req, res)
})

router.get('/kpis/:fkCriador', function (req, res) {
    posterController.buscarkpis(req, res)
})

router.get('/buscarFeed', function (req, res) {
    posterController.buscarFeed(req, res)
})

router.get('/buscarFeed/:tipo', function (req, res) {
    posterController.buscarFeedTipo(req, res)
})


module.exports = router