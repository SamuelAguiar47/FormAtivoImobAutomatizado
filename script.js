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

}

function carregarDataAtual() {
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = String(dataAtual.getMonth()+1).padStart(2, '0');
    let diaAtual = String(dataAtual.getDate()).padStart(2, '0');

    let dataAtualFormatada = `${anoAtual}-${mesAtual}-${diaAtual}`

    inputDataEmissao = document.getElementById("inputDataEmissao");
    inputDataEmissao.value = dataAtualFormatada;
}

function carregarCompetenciaAtual() {
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = String(dataAtual.getMonth()+1).padStart(2, '0');
    let diaAtual = String(dataAtual.getDate()).padStart(2, '0');

    let mesCompetencia;
    let anoCompetencia;

    if(diaAtual>10) {
        mesCompetencia = mesAtual;
        anoCompetencia = anoAtual;
    } else {
        mesCompetencia = mesAtual - 1;
        if(mesAtual==1) {
            anoCompetencia = anoAtual - 1;
        } else {
            anoCompetencia = anoAtual;
        }
    }

    let competenciaAtualFormatada = `${anoAtual}-${mesCompetencia}`;

    inputMesCompetencia = document.getElementById("inputMesCompetencia");
    inputMesCompetencia.value = competenciaAtualFormatada;
}

function atualizarDataEmissao() {
    let valorDataEmissao = new Date(document.getElementById("inputDataEmissao").value);
    
    let anoEmissao = valorDataEmissao.getFullYear();
    let mesEmissao = String(valorDataEmissao.getMonth()+1).padStart(2, '0');
    let diaEmissao = String(valorDataEmissao.getDate()+1).padStart(2, '0');

    let dataEmissaoFormatada = `${diaEmissao}/${mesEmissao}/${anoEmissao}`

    campoDataEmissao = document.getElementById("campo-data-emissao");
    campoDataEmissao.innerText = dataEmissaoFormatada;
}

function atualizarMesCompetencia() {
    let valorCompetencia = document.getElementById("inputMesCompetencia").value;

    let [anoCompetencia, mesCompetencia] = valorCompetencia.split('-');
    
    let dataCompetenciaFormatada = `${mesCompetencia}/${anoCompetencia}`;

    campoMesCompetencia = document.getElementById("campo-mes-competencia");
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