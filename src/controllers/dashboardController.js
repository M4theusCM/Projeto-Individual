const dashboardModel = require('../models/dashboardModel');

function graficoQtdPoster(req, res) {
  var fkCriador = req.params.fkCriador;
  dashboardModel.graficoQtdPoster(fkCriador).then(function (resultado) {
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
  dashboardModel.graficoTipo(fkCriador).then(function (resultado) {
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

function graficoInteracoesComentario(req, res) {
  var fkCriador = req.params.fkCriador;
  dashboardModel.graficoInteracoesComentario(fkCriador).then(function (resultado) {
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

function graficoInteracoesCurtidas(req, res) {
  var fkCriador = req.params.fkCriador;
  dashboardModel.graficoInteracoesCurtidas(fkCriador).then(function (resultado) {
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



function buscarkpis(req, res) {
  var fkCriador = req.params.fkCriador;
  dashboardModel.buscarkpis(fkCriador).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as kpis.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


module.exports = {
  graficoQtdPoster,
  graficoTipo,
  graficoInteracoesComentario,
  graficoInteracoesCurtidas,
  buscarkpis,
}