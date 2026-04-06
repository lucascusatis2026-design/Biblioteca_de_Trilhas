/// Função de inicialização






///Adicionar funções e eventos em botoes
let botoes_abrir_modal = document.querySelectorAll('.abrir_modal');
let botoes_enviar_modal = document.querySelectorAll('.botao_enviar_modal');

botoes_abrir_modal.forEach(function(bt){
    bt.addEventListener('click', abrir_modal);
})

botoes_enviar_modal.forEach(function(bt){
    bt.addEventListener('click', enviar_modal)
})

///Função abrir e enviar MODAL
function abrir_modal(e){
    e.preventDefault();
    let botao = e.currentTarget;
    let modal = botao.dataset.modal;

    let modalElemento = document.querySelector(`.${modal}`);
    modalElemento.style.display = "flex";
}

function enviar_modal(e){
    e.preventDefault();
    var nomeTrilha = document.querySelector("#modal form input[type=text]").value;

    let trilhas = JSON.parse(localStorage.getItem("trilhas"))|| [];
    trilhas.push(nomeTrilha);
    localStorage.setItem("trilhas", JSON.stringify(trilhas));

    localStorage.setItem("trilhaAtual", nomeTrilha);

    window.location.href = "../trail_page/trail.html";
}

///Salvar formulário
const formEtapa = document.getElementById("form-etapa");


formEtapa.addEventListener("submit", function(e) {
    e.preventDefault();

    const nomeTrilha = localStorage.getItem("trilhaAtual");

    const titulo = document.getElementById("inputtitulo").value.trim();
    const tipo = document.getElementById("selecttipo").value;
    const numero = parseInt(document.getElementById("inputnumero").value, 10);
    const meta = parseInt(document.getElementById("inputmeta").value, 10);
    const arquivo = document.getElementById("fileinput").files[0];

    if (!titulo || !tipo || !numero || meta === null) {
        alert("Preencha todos os campos!");
        return;
    }

    let arquivoNome = arquivo?.name || null;

    const novaEtapa = {
        nomeTrilha,
        titulo,
        tipo,
        numero,
        meta,
        arquivo: arquivoNome,
        dataCriacao: new Date().toISOString()
    }

    let etapas = JSON.parse(localStorage.getItem("etapas")) || [];
    etapas.push(novaEtapa);

    localStorage.setItem("etapas", JSON.stringify(etapas));

    formEtapa.reset();

    document.getElementById("addcurso").style.display = "none";

    ///Criar elemento dentro da classe inferior
    let etapa = document.createElement("div");
    let inferior = document.querySelector(".inferior");
    etapa.classList = "etapa";
    inferior.prepend(etapa);
})

/// Assinatura da trilha atual


