var database = require("../database/config")

function graficoQtdPoster(fkCriador) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkCriador)
    console.log(fkCriador)
    var instrucaoSql = `
        SELECT COUNT(idPoster) AS qtdPostagens,
	    dtPostagem AS datasPostagens FROM poster
	    WHERE dtPostagem >= date_sub(now(), interval 7 day) AND dtPostagem <= current_timestamp() AND fkCriador = ${fkCriador}
        GROUP BY dtPostagem LIMIT 7
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoTipo(fkCriador) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkCriador)
    console.log(fkCriador)
    var instrucaoSql = `
        SELECT fkCriador, 
            (SELECT COUNT(tipo) FROM poster WHERE tipo = 'filme' AND fkCriador = ${fkCriador}) AS qtdFilmes,
            (SELECT COUNT(tipo) FROM poster WHERE tipo = 'jogo' AND fkCriador = ${fkCriador}) AS qtdJogo,
            (SELECT COUNT(tipo) FROM poster WHERE tipo = 'evento' AND fkCriador = ${fkCriador}) AS qtdEvento,
            (SELECT COUNT(tipo) FROM poster WHERE tipo = 'carro' AND fkCriador = ${fkCriador}) AS qtdCarro
            FROM poster
            WHERE fkCriador = ${fkCriador}
            GROUP BY fkCriador;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoInteracoesComentario(fkCriador) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkCriador)
    console.log(fkCriador)
    var instrucaoSql = `
        SELECT idPoster, 
            COUNT(c.idComentario) AS qtdComentarios
            FROM poster p
            LEFT JOIN curtida l ON p.idPoster = l.fkPoster AND p.fkCriador = l.fkCriador
            LEFT JOIN comentario c ON p.idPoster = c.fkPoster AND p.fkCriador = c.fkCriador
            WHERE p.fkCriador = ${fkCriador}
            GROUP BY idPoster 
            ORDER BY idPoster DESC limit 6;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoInteracoesCurtidas(fkCriador) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkCriador)
    console.log(fkCriador)
    var instrucaoSql = `
        SELECT idPoster, 
            COUNT(fkPoster) AS qtdCurtidas
            FROM poster p
            LEFT JOIN curtida l ON p.idPoster = l.fkPoster AND p.fkCriador = l.fkCriador
            GROUP BY idPoster 
            ORDER BY p.idPoster DESC LIMIT 6;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarkpis(fkCriador) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkCriador)
    console.log(fkCriador)
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(idPoster) FROM poster WHERE fkCriador = ${fkCriador}) AS totalPoster,
            (SELECT COUNT(fkCriador) FROM curtida WHERE fkCriador = ${fkCriador}) AS totalCurtidas,
            (SELECT COUNT(fkCriador) FROM comentario WHERE fkCriador = ${fkCriador}) AS totalComentarios,
            (SELECT COUNT(fkUsuario) FROM curtida WHERE fkUsuario = ${fkCriador}) AS curtidasEnviadas
            FROM poster WHERE fkCriador = ${fkCriador}
            GROUP BY fkCriador;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    graficoQtdPoster,
    graficoTipo,
    graficoInteracoesComentario,
    graficoInteracoesCurtidas,
    buscarkpis,
};