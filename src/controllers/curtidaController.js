const curtidaModel = require("../models/curtidaModel")

function qtdCurtida(req, res) {
    var fkPoster = req.params.fkPoster;
    curtidaModel.qtdCurtidas(fkPoster).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).send('Erro aq')
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade de postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarStatus(req, res) {
    var fkUsuario = req.body.fkUsuarioServer
    var fkPoster = req.body.fkPosterServer
    if (fkUsuario == undefined) {
        res.status(400).send("fkUsuario está indefinida")
    } else if (fkPoster == undefined) {
        res.status(400).send("fkPoster está indefinida")
    } else {
        curtidaModel.buscarStatus(fkUsuario, fkPoster)
            .then(
                function (resultadoStatusCurtida) {
                    console.log(`Resultados: ${JSON.stringify(resultadoStatusCurtida)}`); // transforma JSON em String
                }
            )
    }
}

module.exports = {
    qtdCurtida,
    buscarStatus,
}