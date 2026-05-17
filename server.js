// ==========================================
// POTENTIA RH - BACKEND COM NODE.JS + EXPRESS
// ==========================================

// IMPORTANDO PACOTES
const { GoogleGenerativeAI } =
require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

const genAI = new GoogleGenerativeAI(
    "AIzaSyAYW6SXyyBNlIjpnKuiHxP06Al3dmSs2ms"
);

// ==========================================
// CONFIGURAÇÃO INICIAL
// ==========================================

const app = express();

app.use(cors());

app.use(express.json());


// ==========================================
// PORTA DO SERVIDOR
// ==========================================

const PORT = 3000;


// ==========================================
// BANCO DE DADOS TEMPORÁRIO
// ==========================================

// Simulação de banco de dados
let candidatos = [];


// ==========================================
// ROTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {

    res.send("Potentia RH Backend funcionando!");

});


// ==========================================
// CADASTRAR CANDIDATO
// ==========================================

app.post("/candidatos", (req, res) => {

    // Recebe dados enviados pelo frontend
    const {

        nome,
        email,
        cidade,
        habilidades,
        area

    } = req.body;

    // Verifica campos obrigatórios
    if(!nome || !email){

        return res.status(400).json({

            erro: "Nome e e-mail são obrigatórios."

        });

    }

    // Cria objeto candidato
    const novoCandidato = {

        id: candidatos.length + 1,

        nome,
        email,
        cidade,
        habilidades,
        area

    };

    // Salva no array
    candidatos.push(novoCandidato);

    // Resposta
    res.status(201).json({

        mensagem: "Candidato cadastrado com sucesso!",

        candidato: novoCandidato

    });

});


// ==========================================
// LISTAR CANDIDATOS
// ==========================================

app.get("/candidatos", (req, res) => {

    res.json(candidatos);

});


// ==========================================
// BUSCAR CANDIDATO POR ID
// ==========================================

app.get("/candidatos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const candidato = candidatos.find(c => c.id === id);

    if(!candidato){

        return res.status(404).json({

            erro: "Candidato não encontrado."

        });

    }

    res.json(candidato);

});


// ==========================================
// ATUALIZAR CANDIDATO
// ==========================================

app.put("/candidatos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const candidato = candidatos.find(c => c.id === id);

    if(!candidato){

        return res.status(404).json({

            erro: "Candidato não encontrado."

        });

    }

    // Atualiza dados
    candidato.nome = req.body.nome || candidato.nome;

    candidato.email = req.body.email || candidato.email;

    candidato.cidade = req.body.cidade || candidato.cidade;

    candidato.habilidades = req.body.habilidades || candidato.habilidades;

    candidato.area = req.body.area || candidato.area;

    res.json({

        mensagem: "Candidato atualizado com sucesso!",

        candidato

    });

});


// ==========================================
// DELETAR CANDIDATO
// ==========================================

app.delete("/candidatos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const candidatoExiste = candidatos.find(c => c.id === id);

    if(!candidatoExiste){

        return res.status(404).json({

            erro: "Candidato não encontrado."

        });

    }

    candidatos = candidatos.filter(c => c.id !== id);

    res.json({

        mensagem: "Candidato removido com sucesso."

    });

});


// ==========================================
// SISTEMA DE COMPATIBILIDADE
// ==========================================

app.post("/compatibilidade", (req, res) => {

    const {

        comunicacao,
        lideranca,
        criatividade,
        equipe

    } = req.body;

    let pontuacao = 50;

    // Regras simples
    if(comunicacao === true){

        pontuacao += 10;

    }

    if(lideranca === true){

        pontuacao += 15;

    }

    if(criatividade === true){

        pontuacao += 10;

    }

    if(equipe === true){

        pontuacao += 15;

    }

    // Limite máximo
    if(pontuacao > 100){

        pontuacao = 100;

    }

    // Resultado
    res.json({

        compatibilidade: pontuacao + "%"

    });

});


// ==========================================
// LOGIN SIMPLES
// ==========================================

app.post("/login", (req, res) => {

    const { email, senha } = req.body;

    // Login fictício
    if(email === "admin@potentia.com" && senha === "123456"){

        return res.json({

            mensagem: "Login realizado com sucesso!"

        });

    }

    res.status(401).json({

        erro: "E-mail ou senha inválidos."

    });

});


// ==========================================
// INICIAR SERVIDOR
// ==========================================
// ==========================================
// IA - ANÁLISE DE PERFIL
// ==========================================

// ==========================================
// IA GEMINI
// ==========================================

app.post("/analisar-ia", async (req, res) => {

    const { texto } = req.body;

    try{

        const model = genAI.getGenerativeModel({

            model: "gemini-1.5-flash"

        });

        const prompt = `
        Você é um especialista em RH.

        Analise o seguinte perfil:

        "${texto}"

        Informe:
        - perfil comportamental;
        - pontos fortes;
        - compatibilidade profissional.
        `;

        const result = await model.generateContent(prompt);

        const resposta =
            result.response.text();

        res.json({

            resultado: resposta

        });

    }catch(erro){

        console.log(erro);

        res.status(500).json({

            erro: "Erro ao analisar perfil."

        });

    }

});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});
