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

  const prompt = `
    Você é um especialista em RH.
    Analise o seguinte perfil: "${texto}"
    Informe:
    - Perfil comportamental
    - Pontos fortes
    - Compatibilidade profissional
  `;

  const resposta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AIzaSyAYW6SXyyBNlIjpnKuiHxP06Al3dmSs2ms}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const dados = await resposta.json();

  const resultado = dados.candidates[0].content.parts[0].text;

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resultado })
  };

};
