const desafios = [
  {
    pergunta: "Quanto é 2 + 2?",
    opcoes: ["3", "4", "5"],
    correta: 1
  },
  {
    pergunta: "Qual é a capital do Brasil?",
    opcoes: ["São Paulo", "Rio de Janeiro", "Brasília"],
    correta: 2
  },
  {
    pergunta: "Quantos lados tem um triângulo?",
    opcoes: ["2", "3", "4"],
    correta: 1
  }
];

let indiceAtual = 0;
let respondeu = false;

const tituloEl = document.getElementById("titulo");
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const feedbackEl = document.getElementById("feedback");
const proximoBtn = document.getElementById("proximo");

function carregarDesafio() {
  respondeu = false;
  feedbackEl.textContent = "";
  proximoBtn.disabled = true;

  const desafio = desafios[indiceAtual];
  tituloEl.textContent = `Desafio ${indiceAtual + 1} de ${desafios.length}`;
  perguntaEl.textContent = desafio.pergunta;
  opcoesEl.innerHTML = "";

  desafio.opcoes.forEach((texto, i) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.classList.add("opcao");
    btn.addEventListener("click", () => verificarResposta(i, btn));
    opcoesEl.appendChild(btn);
  });
}

function verificarResposta(escolha, botaoClicado) {
  if (respondeu) return; // evita clicar duas vezes
  respondeu = true;

  const desafio = desafios[indiceAtual];
  const botoes = document.querySelectorAll(".opcao");

  if (escolha === desafio.correta) {
    feedbackEl.textContent = "✅ Resposta correta!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = "❌ Resposta incorreta.";
    feedbackEl.style.color = "red";
  }

  // destaca a resposta certa e desabilita os botões
  botoes.forEach((b, i) => {
    b.disabled = true;
    if (i === desafio.correta) b.classList.add("correta");
    if (i === escolha && escolha !== desafio.correta) b.classList.add("errada");
  });

  // habilita o botão "Próximo" (ou mostra fim do jogo)
  proximoBtn.disabled = false;
  if (indiceAtual === desafios.length - 1) {
    proximoBtn.textContent = "Ver Resultado";
  }
}

proximoBtn.addEventListener("click", () => {
  indiceAtual++;
  if (indiceAtual < desafios.length) {
    carregarDesafio();
    proximoBtn.textContent = "Próximo Desafio";
  } else {
    tituloEl.textContent = "🎉 Parabéns!";
    perguntaEl.textContent = "Você concluiu todos os desafios!";
    opcoesEl.innerHTML = "";
    feedbackEl.textContent = "";
    proximoBtn.disabled = true;
  }
});

// inicia o jogo
carregarDesafio();
