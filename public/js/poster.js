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


function atualizarlegendaPreview(){
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
    console.log('a')
    for (var i = 0; i < formato.length; i++) {
        if (i == tipo) {
            formatos[i].style.display = `flex`
        } else {
            formatos[i].style.display = `none`
        }
    }
}
