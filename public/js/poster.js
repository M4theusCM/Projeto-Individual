function adicionarPostagem() {
    add_poster.style.display = 'flex'
    var img_perfil = sessionStorage.IMG_USUARIO;
    nickName_user_add_poster.innerHTML = sessionStorage.NICKNAME_USUARIO;
    img_perfil_add_poster.src = `
        ../src/perfils/${img_perfil}
    `

}

function fecharModal() {
    add_poster.style.display = 'none    '
}


function atualizarlegendaPreview() {
    var legenda = txt_legenda.value
    desc_add_poter.innerHTML = `${legenda}`
}

function atualizarPreview(valor) {
    if (valor == 1) {
        var file = ipt_img
        console.log(file.value)
        // if(file.value.includes('.mp4') == false){
        //     preview_video.style.display = `none`
        //     preview_poster.style.display = `block`
        // }else{
        //     preview_poster.style.display = `none`
        //     preview_video.style.display = `block`
        // }
        preview_poster.src = URL.createObjectURL(file.files[0]);
    }
}

function formato() {
    var tipo = formato.value
    var formatos = [
        `preview_formato_poster`,
        `preview_formato_quadrado`,
        `preview_formato_horizontal`
    ]
    for (var i = 0; i < formato.length; i++) {
        if (i == tipo) {
            formatos[i].style.display = `flex`
        } else {
            formatos[i].style.display = `none`
        }
    }
}

function postar() {
    var idCriador = sessionStorage.ID_USUARIO
    var foto = ipt_img
    var legenda = txt_legenda.value
    var formato = select_formato.value
    var categoria = select_categoria.value
    var msg = `
        Dados do poster: \n
        ID Criador: ${idCriador} \n
        foto Valor: ${foto.files[0]} \n
        legenda: ${legenda} \n
        formato: ${formato} \n
        categoria: ${categoria} \n
        foto Nome: ${foto.value} \n
    `
    const formData = new FormData();
    formData.append('fkCriador', idCriador)
    formData.append('poster', foto.files[0])
    formData.append('legenda', legenda)
    formData.append('formato', formato)
    formData.append('tipo', categoria)

    fetch("/poster/cadastro", {
        method: "POST",
        body: formData
    })
        .then(res => {
            fecharModal()
            buscarPosterUser()
            // atualizações do banco
        
        })
        .catch(err => {
            console.log(err);
        })
}

function buscarPosterUser() {
    var fkCriador = sessionStorage.ID_USUARIO
    fetch(`/poster/posterUser/${fkCriador}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                posterUsuario(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function posterUsuario(resposta) {
    var todosPosters = resposta
    var qtdPoster = todosPosters.length
    console.log(qtdPoster)
    var msg = ``
    for (var i = 0; i < qtdPoster; i++) {
        var posterAtual = todosPosters[i]
        var imagem = posterAtual.poster
        var qtdCurtidas = posterAtual.curtidas
        msg += `
        <div class="card-postagem">
            <img src="../src/posters/${imagem}" alt="">
            <div class="infos-postagem">
                Curtidas: ${qtdCurtidas}
            </div>
        </div>
    `
    }
    area_postagens_user.innerHTML = msg
}