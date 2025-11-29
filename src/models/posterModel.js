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
            SELECT idPoster, poster, COUNT(
                CASE
                    WHEN statusCurtida = 1 THEN 1
                END) AS curtidas
	        FROM poster p LEFT JOIN curtida c ON p.idPoster = c.fkPoster AND p.fkCriador = c.fkCriador
	        WHERE p.fkCriador = ${idCriador} 
            GROUP BY idPoster
            order by idPoster;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFeed(){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
       SELECT p.idPoster AS idPoster,
	        p.poster AS imgPoster,
            p.legenda AS legendaPoster,
            p.formato AS formatoPoster,
            p.tipo AS tipoPoster,
            CONCAT(p.dtPostagem, ' ', p.hrPostagem) AS dataPostagem,
            p.fkCriador AS criadorPostagem,
            u.nickName AS nickNameCriador,
            u.imgPerfil AS imgCriador,
            COUNT(cur.fkPoster) AS qtdCurtida,
            COUNT(comen.fkPoster) AS qtdComentarios
            FROM poster p
            JOIN usuario u ON u.idUsuario = p.fkCriador
            LEFT JOIN curtida cur ON p.idPoster = cur.fkPoster AND p.fkCriador = cur.fkCriador
            LEFT JOIN comentario comen ON p.idPoster = comen.fkPoster AND p.fkCriador = comen.fkCriador
            GROUP BY p.idPoster, p.poster, p.legenda, p.formato, p.tipo, dataPostagem, p.fkCriador, u.nickName, u.imgPerfil
            ORDER BY CONCAT(p.dtPostagem, p.hrPostagem) DESC LIMIT 8;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFeedTipo(tipoPoster){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", tipoPoster)
    var instrucaoSql = `
       SELECT p.idPoster AS idPoster,
	        p.poster AS imgPoster,
            p.legenda AS legendaPoster,
            p.formato AS formatoPoster,
            p.tipo AS tipoPoster,
            CONCAT(p.dtPostagem, ' ', p.hrPostagem) AS dataPostagem,
            p.fkCriador AS criadorPostagem,
            u.nickName AS nickNameCriador,
            u.imgPerfil AS imgCriador,
            COUNT(cur.fkPoster) AS qtdCurtida,
            COUNT(comen.fkPoster) AS qtdComentarios
            FROM poster p
            JOIN usuario u ON u.idUsuario = p.fkCriador
            LEFT JOIN curtida cur ON p.idPoster = cur.fkPoster AND p.fkCriador = cur.fkCriador
            LEFT JOIN comentario comen ON p.idPoster = comen.fkPoster AND p.fkCriador = comen.fkCriador
            WHERE p.tipo = '${tipoPoster}'
            GROUP BY p.idPoster, p.poster, p.legenda, p.formato, p.tipo, dataPostagem, p.fkCriador, u.nickName, u.imgPerfil
            ORDER BY CONCAT(p.dtPostagem, p.hrPostagem) DESC LIMIT 8;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    salvar,
    posterUsuario,
    buscarFeed,
    buscarFeedTipo,
};