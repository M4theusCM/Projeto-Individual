// sessão
function validarSessao() {
    // var email = sessionStorage.EMAIL_USUARIO;
    // var nome = sessionStorage.NOME_USUARIO;
    // var cpf = sessionStorage.CPF_USUARIO;

    // var b_usuario = document.getElementById("b_usuario");
    // var cpf_usuario = document.getElementById("cpf_usuario")

    var email = sessionStorage.EMAIL_USUARIO
    var tell = sessionStorage.TELL_USUARIO
    var nome = sessionStorage.NOME_USUARIO
    var nickName = sessionStorage.NICKNAME_USUARIO
    var desc = sessionStorage.DESC_USUARIO
    var img = sessionStorage.IMG_USUARIO
    var id = sessionStorage.ID_USUARIO


    if ((email != null || tell != null)
        && nome != null && nickName != null
        && desc != null && img != null
        && id != null) {
        perfil_img_menu.src = `../src/perfils/${img}`
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    // var divAguardar = document.getElementById("div_aguardar");
    // divAguardar.style.display = "none";

    // var divErrosLogin = document.getElementById("div_erros_login");
    // if (texto) {
    //     divErrosLogin.style.display = "flex";
    //     divErrosLogin.innerHTML = texto;
    // }
}


function exibirPerfil() {
    nickName_perfil.innerHTML = sessionStorage.NICKNAME_USUARIO;
    nome_perfil.innerHTML = sessionStorage.NOME_USUARIO;
    desc_perfil.innerHTML = sessionStorage.DESC_USUARIO;
    img_perfil = sessionStorage.IMG_USUARIO;

    img_usuario_perfil.innerHTML = `
        <img src="../src/perfils/${img_perfil}" alt="Img" class="img-usuario-perfil">
    `
}
