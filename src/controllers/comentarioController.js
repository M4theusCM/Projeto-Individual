const comentarioModel = require('../models/comentarioModel')

function buscarQtdComentario(req, res) {
    var fkCriador = req.body.fkCriadorServer
    var fkPoster = req.body.fkPosterServer
    if (fkCriador == undefined) {
        res.status(400).send("fkCriador está indefinida")
    } else if (fkPoster == undefined) {
        res.status(400).send("fkPoster está indefinida")
    } else {
        comentarioModel.buscarQtdComentarios(fkPoster, fkCriador)
            .then(
                function (resultadoStatusCurtida) {
                    // console.log(`Resultados: ${JSON.stringify(resultadoStatusCurtida)}`); // transforma JSON em String
                    res.json(resultadoStatusCurtida)
                }
            )
    }
}

function comentar(req, res) {
    // console.log("Estou no controller do comentario ")
    var fkPoster = req.body.fkPosterServer
    var fkCriador = req.body.fkCriadorServer
    var fkUsuario = req.body.fkUsuarioServer
    var comentario = req.body.comentarioServer
    // console.log('Ta assim:' + fkPoster+ ": :"+ fkCriador+ ": :"+ fkUsuario+ ": :"+ comentario)
    if (fkCriador == undefined) {
        res.status(400).send("fkCriador indefinido!");
    } else if (fkPoster == undefined) {
        res.status(400).send("fkPoster indefinido!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("fkUsuario indefinido!");
    } else if (comentario == undefined) {
        res.status(400).send("fkComentario indefinido!");
    } else {
        comentarioModel.comentar(fkPoster, fkCriador, fkUsuario, comentario)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar salvar o comentario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).
                        json(erro.sqlMessage);
                }
            )
    }

}

function comentariosPosterDisplay(req, res) {
    var fkCriador = req.body.fkCriadorServer
    var fkPoster = req.body.fkPosterServer
    if (fkCriador == undefined) {
        res.status(400).send("fkCriador está indefinida")
    } else if (fkPoster == undefined) {
        res.status(400).send("fkPoster está indefinida")
    } else {
        comentarioModel.comentariosPosterDisplay(fkPoster, fkCriador)
            .then(
                function (resultadoStatusCurtida) {
                    // console.log(`Resultados: ${JSON.stringify(resultadoStatusCurtida)}`); // transforma JSON em String
                    res.json(resultadoStatusCurtida)
                }
            )
    }
}

module.exports = {
    buscarQtdComentario,
    comentar,
    comentariosPosterDisplay
}