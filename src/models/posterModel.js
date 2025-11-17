var database = require("../database/config")


async function salvar(poster) {
    console.log('estou no model')
    const qtdPoster = `SELECT COUNT(idPoster) AS quantidadeId FROM poster
	WHERE fkCriador = ${poster.fkCriador};`
    // WHERE fkCriador = ${poster.fkCriador};`

    const respostaSelect = await database.executar(qtdPoster)
    const novoIdPoster = respostaSelect[0].quantidadeId + 1

    const instrucao = `insert into poster (idPoster, fkCriador, poster, legenda, formato, tipo, dtPostagem, hrPostagem) values
        (${novoIdPoster}, ${poster.fkCriador}, '${poster.poster}', '${poster.legenda}', '${poster.formato}', '${poster.tipo}', curdate(), current_time());    
    `;

    console.log(instrucao)

    return database.executar(instrucao);
}

function posterUsuario(idCriador) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idCriador)
    var instrucaoSql = `
            SELECT idPoster, poster, COUNT(fkPoster) AS curtidas
	        FROM poster p LEFT JOIN curtida c ON p.idPoster = c.fkPoster
	        WHERE p.fkCriador = ${idCriador} 
            GROUP BY idPoster
            order by dtPostagem;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

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




module.exports = {
    salvar,
    posterUsuario,
    graficoQtdPoster
};