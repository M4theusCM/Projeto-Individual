var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");


function autenticar(req, res) {
    var identificador = req.body.indentificadorServer;
    var senha = req.body.senhaServer;

    if (identificador == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(identificador, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].id,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            tell: resultadoAutenticar[0].tell,
                            nickName: resultadoAutenticar[0].nickName,
                            descricao: resultadoAutenticar[0].descricao,
                            imgPerfil: resultadoAutenticar[0].imgPerfil,
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var tell = req.body.tellServer;
    var nick = req.body.nickServer;
    var dtNasc = req.body.dtNascServer;
    var senha = req.body.senhaServer;
    var imgPerfil = req.body.imgServer;
    var descricao = req.body.descServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined && tell == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else if (nick == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, tell, nick, dtNasc, senha, imgPerfil, descricao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).

                        json(erro.sqlMessage);
                }
            );
    }
}

function validarIdentificador(req, res) {
    var email = req.body.emailServer;
    var nick = req.body.nickServer;
    var tell = req.body.tellServer;

    if (email == undefined && tell == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else if (nick == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else {
        usuarioModel.validarIndentificador(email, tell, nick)
            .then(
                function (resultadoValidar) {
                    console.log(`\nResultados encontrados: ${resultadoValidar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoValidar)}`); // transforma JSON em String

                    if (resultadoValidar.length >= 1) {
                        console.log(resultadoValidar);

                        res.json({
                            email: resultadoValidar[0].email,
                            tell: resultadoValidar[0].tell,
                            nickName: resultadoValidar[0].nickName,
                        });
                    } else if (resultadoValidar.length == 0) {
                        res.json({
                            email: 'vazio',
                            tell: 'vazio',
                            nickName: 'vazio',
                        });
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }

                }
            )
    }
}

module.exports = {
    autenticar,
    cadastrar,
    validarIdentificador
}