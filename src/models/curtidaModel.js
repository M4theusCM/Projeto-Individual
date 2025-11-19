var database = require("../database/config")


function qtdCurtidas(fkPoster){
    console.log("ACESSEI O CURTIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkPoster)
    var instrucaoSql = `
    SELECT COUNT(fkPoster) AS curtidaDoPoster FROM curtida 
        WHERE fkPoster = ${fkPoster} AND statusCurtida = 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarStatus(fkUsuario, fkPoster) {
    console.log("ACESSEI O CURTIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkUsuario, fkPoster)

    var instrucaoSql = `
    SELECT fkPoster, fkCriador, fkUsuario, statusCurtida
	    FROM curtida
        WHERE fkUsuario = 2 AND fkPoster = 18;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    qtdCurtidas,
    buscarStatus
}

