var database = require("../database/config")

function buscarQtdCurtidas(fkPoster, fkCriador){
    // console.log("ACESSEI O CURTIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQtdCurtidas(): ", fkCriador, fkPoster)

    var instrucaoSql = `
        SELECT count(fkPoster) AS qtdCurtidasPoster from curtida WHERE fkPoster = ${fkPoster} AND fkCriador = ${fkCriador} AND statusCurtida = 1;
    `
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarStatus(fkPoster, fkUsuario) {
    // console.log("ACESSEI O CURTIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarStatus(): ", fkUsuario, fkPoster)

    var instrucaoSql = `
        SELECT COUNT(fkUsuario) AS statusCurtida FROM curtida 
        WHERE fkPoster = ${fkPoster} AND fkUsuario = ${fkUsuario} AND statusCurtida = 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




async function alterarStatus(fkPoster, fkCriador, fkUsuario) {
    // console.log("ACESSEI O CURTIDA Status MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterarStatus(): ", fkPoster, fkCriador, fkUsuario)

    var existeCurtida = `
        SELECT COUNT(fkUsuario) AS quantidade,
	        statusCurtida AS statusCurtida FROM curtida
	        WHERE fkPoster = ${fkPoster} AND fkCriador = ${fkCriador} AND fkUsuario = ${fkUsuario}; 
    `

    var testeQtd = await database.executar(existeCurtida)
    // console.log("\n\n\n\t Aq: "+JSON.stringify(testeQtd[0].quantidade))
    var qtd = testeQtd[0].quantidade
    var status = testeQtd[0].statusCurtida
    var msg = ''
    console.log(status)
    if (qtd == 0) {
        console.log('sla')
        msg = `
            INSERT INTO curtida VALUES (${fkPoster}, ${fkCriador}, ${fkUsuario}, 1)
        `
    } else {
        if (status == 0) {
            msg = ` UPDATE curtida SET statusCurtida = 1
	            WHERE fkPoster = ${fkPoster} AND fkCriador = ${fkCriador} AND fkUsuario = ${fkUsuario};
            `
        } else  {
            msg = ` UPDATE curtida SET statusCurtida = 0
	            WHERE fkPoster = ${fkPoster} AND fkCriador = ${fkCriador} AND fkUsuario = ${fkUsuario};
            `
        }
    }
    var instrucaoSql = msg
    // console.log(instrucaoSql)
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarQtdCurtidas,
    buscarStatus,
    alterarStatus
}

