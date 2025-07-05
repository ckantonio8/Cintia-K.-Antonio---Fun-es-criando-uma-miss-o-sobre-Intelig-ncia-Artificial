let usuario = {};
let respostas = Array(10).fill(null);
let perguntaAtual = 0;

const perguntas = [
  { id: 1, texto: "Você acha que a Inteligência Artificial é segura?", tipo: "alternativa", opcoes: ["Sim", "Não"] },
  { id: 2, texto: "Acha que a Inteligência Artificial trouxe mais benefícios do que malefícios?", tipo: "alternativa", opcoes: ["Sim", "Não"] },
  { id: 3, texto: "No futuro, acha que a IA possa trazer problemas?", tipo: "alternativa", opcoes: ["Sim", "Não"] },
  { id: 4, texto: "Elon Musk prevê que a IA eventualmente superará a inteligência humana e pode transformar a natureza do trabalho, possivelmente tornando-o opcional. Concorda com isso?", tipo: "alternativa", opcoes: ["Sim", "Não"] },
  { id: 5, texto: "Acha que as pessoas estão deixando cada vez mais de usar suas funções cognitivas por conta da IA?", tipo: "alternativa", opcoes: ["Sim", "Nâo"] },
  { id: 6, texto: "Qual é o principal benefício que a IA traz? Na sua opinião?", tipo: "descritiva" },
  { id: 7, texto: "Qual é o principal perigo que a IA traz? Na sua opinião?", tipo: "descritiva" },
  { id: 8, texto: "Como você utiliza a IA em seu cotidiano?", tipo: "descritiva" },
  { id: 9, texto: "Acha que a IA te prejudicou em algum momento, se sim, sem qual?", tipo: "descritiva" },
  { id: 10, texto: "Sobre o futuro, o que acha que pode acontecer com o avanço das IAs?", tipo: "descritiva" }
];

function iniciarQuestionario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  usuario = { nome, email };
  document.getElementById("usuarioNome").textContent = nome;

  document.getElementById("cadastro").style.display = "none";
  document.getElementById("questionario").style.display = "block";

  exibirPerguntaAtual();
}

function exibirPerguntaAtual() {
  const pergunta = perguntas[perguntaAtual];
  const div = document.getElementById("perguntaAtual");
  div.innerHTML = "";

  const label = document.createElement("label");
  label.innerHTML = `<strong>${perguntaAtual + 1}. ${pergunta.texto}</strong>`;
  div.appendChild(label);

  const respostaContainer = document.createElement("div");

  if (pergunta.tipo === "alternativa") {
    pergunta.opcoes.forEach((opcao) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "resposta";
      input.value = opcao;
      if (respostas[perguntaAtual] === opcao) input.checked = true;

      const span = document.createElement("span");
      span.textContent = opcao;

      const opcaoLabel = document.createElement("label");
      opcaoLabel.appendChild(input);
      opcaoLabel.appendChild(span);
      respostaContainer.appendChild(opcaoLabel);
      respostaContainer.appendChild(document.createElement("br"));
    });
  } else {
    const textarea = document.createElement("textarea");
    textarea.name = "resposta";
    textarea.rows = 4;
    textarea.value = respostas[perguntaAtual] || "";
    respostaContainer.appendChild(textarea);
  }

  div.appendChild(respostaContainer);

  document.getElementById("btnVoltar").disabled = perguntaAtual === 0;
  verificarResposta();

  document.querySelectorAll('[name="resposta"]').forEach(el => {
    el.addEventListener("input", verificarResposta);
    el.addEventListener("change", verificarResposta);
  });
}

function verificarResposta() {
  const tipo = perguntas[perguntaAtual].tipo;
  let preenchido = false;

  if (tipo === "alternativa") {
    preenchido = document.querySelector('[name="resposta"]:checked') !== null;
  } else {
    const val = document.querySelector('[name="resposta"]').value.trim();
    preenchido = val.length > 0;
  }

  document.getElementById("btnProximo").disabled = !preenchido;
}

function salvarResposta() {
  const tipo = perguntas[perguntaAtual].tipo;

  if (tipo === "alternativa") {
    const selecionada = document.querySelector('[name="resposta"]:checked');
    respostas[perguntaAtual] = selecionada ? selecionada.value : null;
  } else {
    const texto = document.querySelector('[name="resposta"]').value.trim();
    respostas[perguntaAtual] = texto;
  }
}

function proximaPergunta() {
  salvarResposta();

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    exibirPerguntaAtual();
  } else {
    finalizarQuestionario();
  }
}

function voltarPergunta() {
  salvarResposta();

  if (perguntaAtual > 0) {
    perguntaAtual--;
    exibirPerguntaAtual();
  }
}

function finalizarQuestionario() {
  document.getElementById("questionario").style.display = "none";
  document.getElementById("final").style.display = "block";

  const hora = new Date().getHours();
  const saudacao = hora < 18 ? "um ótimo dia" : "uma ótima noite";
  document.getElementById("mensagemFinal").innerText = `Obrigada, ${usuario.nome}, por responder. Tenha ${saudacao}!`;
}

function refazerQuestionario() {
  respostas = Array(10).fill(null);
  perguntaAtual = 0;
  document.getElementById("final").style.display = "none";
  document.getElementById("respostasUsuario").style.display = "none";
  document.getElementById("questionario").style.display = "block";
  exibirPerguntaAtual();
}

function mostrarRespostas() {
  const div = document.getElementById("respostasUsuario");
  div.innerHTML = "<h3>Suas respostas:</h3>";
  respostas.forEach((resp, i) => {
    div.innerHTML += `<p><strong>${i + 1}. ${perguntas[i].texto}</strong><br>${resp}</p>`;
  });
  div.style.display = "block";
}
