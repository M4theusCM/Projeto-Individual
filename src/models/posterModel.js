var database = require("../database/config")


async function salvar(poster) {
    console.log('estou no model')
    const qtdPoster = `SELECT COUNT(idPoster) AS quantidadeId FROM poster
	WHERE fkCriador = ${poster.fkCriador};`
    // WHERE fkCriador = ${poster.fkCriador};`

    const respostaSelect = await database.executar(qtdPoster)
    const novoIdPoster = respostaSelect[0].quantidadeId + 1

    const instrucao = `insert into poster (idPoster, fkCriador, poster, legenda, formato, tipo, dtHora) values
        (${novoIdPoster}, ${poster.fkCriador}, '${poster.poster}', '${poster.legenda}', '${poster.formato}', '${poster.tipo}', current_timestamp())    
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
            order by dtHora;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    salvar,
    posterUsuario
};