// ======================================
// POTENTIA RH - JAVASCRIPT
// ======================================

// Mensagem ao carregar o sistema
console.log("PotentIA RH iniciado com sucesso!");


// ======================================
// LOGIN
// ======================================

const formularioLogin = document.querySelector("#login form");

formularioLogin.addEventListener("submit", function(event){

    event.preventDefault();

    const email = formularioLogin.querySelector('input[type="email"]').value;

    const senha = formularioLogin.querySelector('input[type="password"]').value;

    if(email === "" || senha === ""){

        alert("Preencha todos os campos do login.");

    }else{

        alert("Login realizado com sucesso!");

    }

});


// ======================================
// CADASTRO DE CANDIDATO
// ======================================

const formularioCadastro = document.querySelector("#cadastro form");

formularioCadastro.addEventListener("submit", function(event){

    event.preventDefault();

   // PEGAR DADOS

const nome = formularioCadastro.querySelectorAll("input")[0].value;

const email = formularioCadastro.querySelectorAll("input")[1].value;

const cidade = formularioCadastro.querySelectorAll("input")[2].value;

const habilidades = formularioCadastro.querySelectorAll("input")[3].value;

const area = formularioCadastro.querySelector("select").value;


// VALIDAR

if(nome === ""){

    alert("Digite seu nome.");

}else{

    // ATUALIZAR PERFIL

    document.getElementById("perfilNome").textContent = nome;

    document.getElementById("perfilArea").textContent = area;

    document.getElementById("perfilHabilidades").textContent = habilidades;

    document.getElementById("perfilStatus").textContent = "Perfil atualizado";


    // ATUALIZAR DASHBOARD

    document.getElementById("dashboardCompatibilidade").textContent = "91%";

    document.getElementById("dashboardPerfil").textContent = gerarPerfil();

    document.getElementById("dashboardHabilidades").textContent = habilidades;

    document.getElementById("dashboardStatus").textContent = "Perfil atualizado";


    // MENSAGEM

    alert("Cadastro realizado com sucesso!");

}

});


// ======================================
// FORMULÁRIO COMPORTAMENTAL
// ======================================

const formularioComportamental = document.querySelector("#formulario form");

formularioComportamental.addEventListener("submit", function(event){

    event.preventDefault();

    // Pergunta 1
    const respostaPressao = formularioComportamental.querySelector("textarea").value;

    // Pergunta 2
    const trabalhoEquipe = formularioComportamental.querySelector("select").value;

    // Pergunta 3
    const pontoForte = formularioComportamental.querySelector('input[type="text"]').value;

    // Pontuação inicial
    let compatibilidade = 50;

    // Regras simples de compatibilidade

    if(trabalhoEquipe === "Equipe"){

        compatibilidade += 20;

    }

    if(trabalhoEquipe === "Ambos"){

        compatibilidade += 15;

    }

    if(respostaPressao.length > 20){

        compatibilidade += 10;

    }

    if(pontoForte.length > 3){

        compatibilidade += 10;

    }

    // Limite máximo
    if(compatibilidade > 100){

        compatibilidade = 100;

    }

    // Atualiza dashboard
    atualizarCompatibilidade(compatibilidade);

    // Mostra resultado
    alert("Compatibilidade calculada: " + compatibilidade + "%");

});


// ======================================
// FUNÇÃO PARA ATUALIZAR DASHBOARD
// ======================================

function atualizarCompatibilidade(valor){

    document.getElementById("dashboardCompatibilidade").textContent = valor + "%";

}


// ======================================
// EFEITO VISUAL NOS CARDS
// ======================================

const cards = document.querySelectorAll(".card");

cards.forEach(function(card){

    card.addEventListener("mouseenter", function(){

        card.style.transform = "scale(1.03)";

    });

    card.addEventListener("mouseleave", function(){

        card.style.transform = "scale(1)";

    });

});


// ======================================
// SIMULAÇÃO DE PERFIL INTELIGENTE
// ======================================

function gerarPerfil(){

    const perfis = [

        "Liderança Estratégica",
        "Criativo e Inovador",
        "Analítico e Organizado",
        "Comunicativo e Colaborativo",
        "Executor de Alta Performance"

    ];

    const numeroAleatorio = Math.floor(Math.random() * perfis.length);

    return perfis[numeroAleatorio];

}


// ======================================
// ALTERAR PERFIL AUTOMATICAMENTE
// ======================================




// ======================================
// BOAS-VINDAS AO USUÁRIO
// ======================================

window.addEventListener("load", function(){

    console.log("Sistema carregado.");

    setTimeout(function(){

        alert("Bem-vindo ao Potentia RH!");

    }, 1000);

});


// ======================================
// DARK MODE SIMPLES
// ======================================

const botaoDarkMode = document.createElement("button");

botaoDarkMode.textContent = "Modo Escuro";

botaoDarkMode.style.position = "fixed";
botaoDarkMode.style.bottom = "20px";
botaoDarkMode.style.right = "20px";
botaoDarkMode.style.padding = "12px";
botaoDarkMode.style.zIndex = "999";

document.body.appendChild(botaoDarkMode);

let darkModeAtivo = false;

botaoDarkMode.addEventListener("click", function(){

    if(darkModeAtivo === false){

        document.body.style.background = "#111827";
        document.body.style.color = "white";

        darkModeAtivo = true;

    }else{

        document.body.style.background = "#f3f4f6";
        document.body.style.color = "#1f2937";

        darkModeAtivo = false;

    }

});


// ======================================
// FINALIZAÇÃO
// ======================================

console.log("Todos os scripts foram carregados.");

// ======================================
// INTEGRAÇÃO COM IA
// ======================================

const botaoIA = document.getElementById("botaoIA");

botaoIA.addEventListener("click", async function(){

    const resposta = formularioComportamental
        .querySelector("textarea")
        .value;

    if(resposta === ""){

        alert("Digite uma resposta.");

        return;

    }

    document.getElementById("resultadoIA").innerHTML =
        "Analisando perfil com IA...";

    try{

        const requisicao = await fetch(
            "http://localhost:3000/analisar-ia",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    texto: resposta

                })

            }
        );

        const dados = await requisicao.json();
console.log(dados);
        document.getElementById("resultadoIA").innerHTML = `

            <h3>Resultado da IA</h3>

            <p>${dados.resultado}</p>

        `;

    }catch(erro){

        console.log(erro);

        alert("Erro ao conectar com IA.");

    }

});