const posterModel = require('../models/posterModel');

function salvar(req, res) {
  console.log('Estou no controller')
  const poster = req.file.filename;

  const { fkCriador, legenda, formato, tipo } = req.body

  const novoPoster = { fkCriador, poster, legenda, formato, tipo }

  posterModel.salvar(novoPoster)
    .then(resultado => {
      res.status(201).send("novoPoster criado com sucesso");
    }).catch(err => {
      res.status(500).send(err);
    });
}

function posterUsuario(req, res) {
  var fkCriador = req.params.fkCriador;
  posterModel.posterUsuario(fkCriador).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function graficoQtdPoster(req, res) {
  var fkCriador = req.params.fkCriador;
  posterModel.graficoQtdPoster(fkCriador).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar a quantidade de postagens.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function graficoTipo(req, res) {
  var fkCriador = req.params.fkCriador;
  posterModel.graficoTipo(fkCriador).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar a quantidade de postagens.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function graficoInteracoes(req, res) {
  var fkCriador = req.params.fkCriador;
  posterModel.graficoInteracoes(fkCriador).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar a quantidade de postagens.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}



module.exports = {
  salvar,
  posterUsuario,
  graficoQtdPoster,
  graficoTipo,
  graficoInteracoes
}