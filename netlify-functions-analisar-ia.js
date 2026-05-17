const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event) {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método não permitido" };
  }

  const { texto } = JSON.parse(event.body);

  if (!texto) {
    return {
      statusCode: 400,
      body: JSON.stringify({ erro: "Texto não informado." })
    };
  }

  const genAI = new GoogleGenerativeAI(process.env.AIzaSyDsbWARemkpqUbDzu7XE2URY236eivJSKM);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Você é um especialista em RH.
    Analise o seguinte perfil: "${texto}"
    Informe:
    - Perfil comportamental
    - Pontos fortes
    - Compatibilidade profissional
  `;

  const result = await model.generateContent(prompt);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resultado: result.response.text() })
  };
};
