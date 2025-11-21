var database = require("../database/config")

function buscarQtdComentarios(fkPoster, fkCriador) {
    // console.log("ACESSEI O Comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQtdComentario(): ", fkCriador, fkPoster)

    var instrucaoSql = `
        SELECT count(fkPoster) AS qtdComentariosPoster from comentario WHERE fkPoster = ${fkPoster} AND fkCriador = ${fkCriador};
    `
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



async function comentar(fkPoster, fkCriador, fkUsuario, comentario) {
    // console.log("ACESSEI O COMENTARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function comentar():", fkPoster, fkCriador, fkUsuario, comentario);
    var qtdComentariosPoster = `
        SELECT COUNT(idComentario) AS quantidadeComentariosPoster FROM comentario WHERE fkPoster = ${fkPoster};
    `

    var respostaSelect = await database.executar(qtdComentariosPoster)
    /* [ { quantidadeComentariosPoster: 0 } ] */
    var novoIdComentarioPoster = respostaSelect[0].quantidadeComentariosPoster + 1
    var instrucaoSql = `
             INSERT INTO comentario VALUES (${novoIdComentarioPoster}, ${fkPoster}, ${fkCriador}, ${fkUsuario},'${comentario}');
          `
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function comentariosPosterDisplay(fkPoster, fkCriador) {
    console.log("ACESSEI O Comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function comentariosPosterDisplay(): ", fkCriador, fkPoster)

    var instrucaoSql = `
        SELECT idComentario, comentario AS comentario,
	        imgPerfil AS Imgusuario,
            nickName AS nomeUsuario
	        FROM comentario 
                JOIN usuario ON idUsuario = fkUsuario
            WHERE fkPoster = ${fkPoster} AND fkCriador = ${fkCriador}
                ORDER BY idComentario DESC  LIMIT 3;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarQtdComentarios,
    comentar,
    comentariosPosterDisplay
}