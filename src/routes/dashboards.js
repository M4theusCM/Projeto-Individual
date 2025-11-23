var express = require("express");
var router = express.Router();


var dashboardController = require("../controllers/dashboardController");

router.get("/graficoQtdPoster/:fkCriador", function (req, res) {
    dashboardController.graficoQtdPoster(req, res);
});

router.get("/graficoTipo/:fkCriador", function (req, res) {
    dashboardController.graficoTipo(req, res)
})

router.get("/graficoInteracoesComentario/:fkCriador", function (req, res) {
    dashboardController.graficoInteracoesComentario(req, res)
})

router.get("/graficoInteracoesCurtida/:fkCriador", function (req, res) {
    dashboardController.graficoInteracoesCurtidas(req, res)
})

router.get('/kpis/:fkCriador', function (req, res) {
    dashboardController.buscarkpis(req, res)
})


module.exports = router
