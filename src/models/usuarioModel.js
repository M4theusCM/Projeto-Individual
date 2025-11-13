var database = require("../database/config")

function autenticar(identificador, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", identificador, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, tell, nickName, dtNasc, statusUser, descricao, imgPerfil FROM usuario
            WHERE (email = "${identificador}" OR tell = "${identificador}" OR nickName = "${identificador}") AND senha = "${senha}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, tell, nick, dtNasc, senha, imgPerfil, descricao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, tell, nick, dtNasc, senha, imgPerfil, descricao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    if(email != 'NULL'){
        var instrucaoSql = `
            INSERT INTO usuario (nome, email, tell, nickName, dtNasc, senha, imgPerfil, descricao) VALUES ('${nome}', '${email}', ${tell},'${nick}', '${dtNasc}', '${senha}', '${imgPerfil}', '${descricao}');
        `;
    }else{
        var instrucaoSql = `
            INSERT INTO usuario (nome, email, tell, nickName, dtNasc, senha, imgPerfil, descricao) VALUES ('${nome}', ${email}, '${tell}','${nick}', '${dtNasc}', '${senha}',  '${imgPerfil}', '${descricao}');
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// valida se já possui esses dados
function validarIndentificador(email, tell, nickName){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, tell, nickName)
    var instrucaoSql = `
        SELECT email, tell, nickName FROM usuario WHERE email = '${email}' OR tell = '${tell}' OR nickName = '${nickName}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrar,
    validarIndentificador
};