const curtidaModel = require("../models/curtidaModel")

function buscarQtdCurtidas(req, res) {
     var fkCriador = req.body.fkCriadorServer
    var fkPoster = req.body.fkPosterServer
    if (fkCriador == undefined) {
        res.status(400).send("fkCriador está indefinida")
    } else if (fkPoster == undefined) {
        res.status(400).send("fkPoster está indefinida")
    } else {
        curtidaModel.buscarQtdCurtidas(fkPoster, fkCriador)
            .then(
                function (resultadoStatusCurtida) {
                    // console.log(`Resultados: ${JSON.stringify(resultadoStatusCurtida)}`); // transforma JSON em String
                    res.json(resultadoStatusCurtida)
                }
            )
    }
}

function buscarStatus(req, res) {
    var fkUsuario = req.body.fkUsuarioServer
    var fkPoster = req.body.fkPosterServer
    if (fkUsuario == undefined) {
        res.status(400).send("fkUsuario está indefinida")
    } else if (fkPoster == undefined) {
        res.status(400).send("fkPoster está indefinida")
    } else {
        curtidaModel.buscarStatus(fkPoster, fkUsuario)
            .then(
                function (resultadoStatusCurtida) {
                    // console.log(`Resultados: ${JSON.stringify(resultadoStatusCurtida)}`); // transforma JSON em String
                    res.json(resultadoStatusCurtida)
                }
            )
    }
}

function alterarStatus(req, res) {
    var fkUsuario = req.body.fkUsuarioServer
    var fkCriador = req.body.fkCriadorServer
    var fkPoster = req.body.fkPosterServer
    if (fkUsuario == undefined) {
        res.status(400).send("fkUsuario está indefinida")
    } else if (fkPoster == undefined) {
        res.status(400).send("fkPoster está indefinida")
    } else if (fkCriador == undefined){
        res.status(400).send("fkCriador está indefinida")
    } else {
        curtidaModel.alterarStatus(fkPoster, fkCriador, fkUsuario)
            .then(
                function (resultadoStatusCurtida) {
                    // console.log(`Resultados: ${JSON.stringify(resultadoStatusCurtida)}`); // transforma JSON em String
                    res.json(resultadoStatusCurtida)
                }
            )
    }
}


module.exports = {
    buscarQtdCurtidas,
    buscarStatus,
    alterarStatus
}