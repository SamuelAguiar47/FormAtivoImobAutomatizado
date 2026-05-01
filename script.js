dataAtual = new Date();
listaIgrejasSetor1 = [["Angelim","16-0132"],
                      ["Areias","16-0084"],
                      ["Areias II","16-0151"],
                      ["Bela Vista I","16-0043"],
                      ["Dirceu I","16-0053"],
                      ["Elesbão Veloso","16-0083"],
                      ["Lourival Parente","16-0162"],
                      ["Mário Covas","16-0273"],
                      ["Nazária - Baixão Grande","16-0387"],
                      ["Nazaria - Bom Jardim","16-0284"],
                      ["Nazária - Parque Vitória","16-0446"],
                      ["Palitolândia","16-0272"],
                      ["Parque Itararé","16-0381"],
                      ["Parque Jurema","16-0292"],
                      ["Parque Piauí","16-0042"],
                      ["Parque Sul","16-0378"],
                      ["Parque Vitória - Angelim","16-0390"],
                      ["Porto Alegre","16-0163"],
                      ["Pov. Cerâmica Cil","16-0176"],
                      ["Pov. Chap. Sul","16-0405"],
                      ["Vila da Paz","16-0112"],
                      ["Vila Irmã Dulce","16-0185"]
                    ]

carregarDadosIniciais();


function carregarDadosIniciais() {

carregarDataAtual();
carregarCompetenciaAtual();
atualizarDataEmissao();
atualizarCampoAdmSetor();
atualizarMesCompetencia();
verificarMovimentacao();
ajustarPagina();
window.addEventListener('resize', ajustarPagina);

}

function carregarDataAtual() {
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = String(dataAtual.getMonth()+1).padStart(2, '0');
    let diaAtual = String(dataAtual.getDate()).padStart(2, '0');

    let dataAtualFormatada = `${anoAtual}-${mesAtual}-${diaAtual}`

    let inputDataEmissao = document.getElementById("inputDataEmissao");
    inputDataEmissao.value = dataAtualFormatada;
}

function carregarCompetenciaAtual() {
    let anoAtual = dataAtual.getFullYear();
    console.log(anoAtual)
    let mesAtual = String(dataAtual.getMonth()+1).padStart(2, '0');
    console.log(mesAtual)
    let diaAtual = String(dataAtual.getDate()).padStart(2, '0');
    console.log(diaAtual)

    let mesCompetencia;
    let anoCompetencia;

    if(diaAtual>10) {
        mesCompetencia = mesAtual;
        anoCompetencia = anoAtual;
    } else {
        mesCompetencia = String(mesAtual - 1).padStart(2, '0');
        if(mesAtual==1) {
            anoCompetencia = String(anoAtual - 1).padStart(2, '0');
        } else {
            anoCompetencia = anoAtual;
        }
    }

    let competenciaAtualFormatada = `${anoAtual}-${mesCompetencia}`;
    console.log(competenciaAtualFormatada)

    let inputMesCompetencia = document.getElementById("inputMesCompetencia");
    inputMesCompetencia.value = competenciaAtualFormatada;
}

function atualizarDataEmissao() {
    let valorDataEmissao = new Date(document.getElementById("inputDataEmissao").value);
    
    let anoEmissao = valorDataEmissao.getFullYear();
    let mesEmissao = String(valorDataEmissao.getMonth()+1).padStart(2, '0');
    let diaEmissao = String(valorDataEmissao.getDate()+1).padStart(2, '0');

    let dataEmissaoFormatada = `${diaEmissao}/${mesEmissao}/${anoEmissao}`

    let campoDataEmissao = document.getElementById("campo-data-emissao");
    campoDataEmissao.innerText = dataEmissaoFormatada;
}

function atualizarMesCompetencia() {
    let valorCompetencia = document.getElementById("inputMesCompetencia").value;

    let [anoCompetencia, mesCompetencia] = valorCompetencia.split('-');
    
    let dataCompetenciaFormatada = `${mesCompetencia}/${anoCompetencia}`;

    let campoMesCompetencia = document.getElementById("campo-mes-competencia");
    campoMesCompetencia.innerText = dataCompetenciaFormatada;
}

function atualizarCodIgreja(valor) {
    let campoNumCasaOracao = document.getElementById("campo-num-casa-oracao");
    
    if(valor!="[ Escolha a Casa de Oração ]") {
        campoNumCasaOracao.innerText = listaIgrejasSetor1[valor][1];
    } else {
        campoNumCasaOracao.innerText = ""
    }
}

function atualizarNomeIgreja(valor) {
    let campoNomeCasaOracao = document.getElementById("campo-nome-casa-oracao");
    
    if(valor!="[ Escolha a Casa de Oração ]") {
        campoNomeCasaOracao.innerText = listaIgrejasSetor1[valor][0];
    } else {
        campoNomeCasaOracao.innerText = ""
    }
}

function atualizarIgreja(valor) {
    atualizarCodIgreja(valor)
    atualizarNomeIgreja(valor)
}

function atualizarCampoAdmSetor() {
    valorAdmSetor = document.getElementById("selectAdministracaoSetor").innerText;
    campoAdmSetor = document.getElementById("campo-adm-setor");
    campoAdmSetor.innerText = valorAdmSetor;
}

function verificarMovimentacao() {
    let radiosMovMensal = document.querySelectorAll('input[name="radioButtonsMovimentacaoMensal"]');
    let linhaInutilizacao = document.getElementById("linhaInutilizacao");
    let campoObservacoes = document.getElementById("campo-observacoes");

    radiosMovMensal.forEach(radio => {
    radio.addEventListener('change', function(event) {
        if (this.checked) {
            if(this.value=="sim") {
                linhaInutilizacao.style.display = "none";
                campoObservacoes.innerText = "";
            } else if(this.value=="nao") {
                linhaInutilizacao.style.display = "block";
                campoObservacoes.innerText = "Não houve movimentações de bens no mês em questão.";
            }
        }
    });
});
}

function ajustarPagina() {
    let paginaA4 = document.getElementById("pagina-A4");
    let areaPrev = document.getElementById("area-previsualizacao");

    let areaPrevWidth = areaPrev.clientWidth - 20;
    let paginaA4Width = paginaA4.clientWidth;

    let proporcao = (areaPrevWidth)/paginaA4Width;

    if (proporcao < 1) {
        paginaA4.style.transform = `scale(${proporcao})`;
    } else {
        paginaA4.style.transform = `scale(1)`;
    }
    
}

function verificarCampos() {
    let inputDataEmissao = document.getElementById("inputDataEmissao");
    let dataEmissao = new Date(inputDataEmissao.value).getTime();
    let selectCasaOracao = document.getElementById("selectCasaDeOracao");
    let inputMesCompetencia = document.getElementById("inputMesCompetencia");
    let dataCompetencia = new Date(inputMesCompetencia.value).getTime();

    if (isNaN(dataEmissao)) {
        alert("Por favor selecione uma data de emissão válida.");
        return false;
    } else if (selectCasaOracao.value == "[ Escolha a Casa de Oração ]") {
        alert("Por favor selecione uma casa de oração válida.");
        return false;
    } else if (isNaN(dataCompetencia)) {
        alert("Por favor selecione um mês de competência válido.");
        return false;
    } else {
        return true;
    }

}

function imprimirPagina() {
    if (verificarCampos()) {
        let paginaA4 = document.getElementById("pagina-A4");
        let paginaWidthAtual = paginaA4.getBoundingClientRect().width;
        let paginaWidthOriginal = paginaA4.clientWidth;
        paginaA4.style.transform = `scale(1)`;
        let proporcaoCorrecao = (paginaWidthAtual)/(paginaWidthOriginal);
        
        window.print();

        paginaA4.style.transform = `scale(${proporcaoCorrecao})`;
    }
}