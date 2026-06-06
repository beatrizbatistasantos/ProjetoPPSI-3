const filtro = document.getElementById("filtroCidade");
const grupos = document.querySelectorAll(".grupo-cidade");

filtro.addEventListener("change", () => {
  const cidadeSelecionada = filtro.value;

  grupos.forEach(grupo => {
    if (
      cidadeSelecionada === "todas" ||
      grupo.dataset.cidade === cidadeSelecionada
    ) {
      grupo.style.display = "block";
    } else {
      grupo.style.display = "none";
    }
  });
});


// CARDS FIXOS
document.querySelectorAll(".evento-card").forEach(card => {

  card.addEventListener("click", () => {

    const infos = card.querySelectorAll(".info");

    const evento = {
      nome: card.querySelector("h2").textContent,
      endereco: infos[0].innerText.replace("📍 Endereço:", "").trim(),
      data: infos[1].innerText.replace("📅 Data:", "").trim(),
      descricao: "Descrição não informada",
      inicio: "",
      fim: ""
    };

    localStorage.setItem(
      "eventoSelecionado",
      JSON.stringify(evento)
    );

    window.location.href = "evento.html";
  });

});


// EVENTOS CRIADOS PELO USUÁRIO
const eventosSalvos =
  JSON.parse(localStorage.getItem("eventosGeek")) || [];

eventosSalvos.forEach(evento => {

  let cidadeId = "";

  if(evento.cidade === "São Vicente"){
    cidadeId = "saovicente";
  }

  if(evento.cidade === "Santos"){
    cidadeId = "santos";
  }

  if(evento.cidade === "Guarujá"){
    cidadeId = "guaruja";
  }

  if(evento.cidade === "Praia Grande"){
    cidadeId = "praiagrande";
  }

  const secaoCidade =
  document.querySelector(
    `.grupo-cidade[data-cidade="${cidadeId}"] .eventos`
  );

if(!secaoCidade){
  return;
}

  const card = document.createElement("div");

  card.className = "evento-card";

  card.addEventListener("click", () => {

    localStorage.setItem(
      "eventoSelecionado",
      JSON.stringify(evento)
    );

    window.location.href = "evento.html";

  });

  card.innerHTML = `
  <h2>${evento.nome}</h2>

  ${
    evento.imagem
      ? `<img src="${evento.imagem}" class="evento-img-real" alt="${evento.nome}">`
      : `<div class="evento-img">SEM IMAGEM</div>`
  }

  <div class="info">
    <span class="label">📍 Endereço:</span><br>
    ${evento.endereco}
  </div>

  <div class="info">
    <span class="label">📅 Data:</span><br>
    ${evento.data}
  </div>

  <div class="info">
    <span class="label">⏰ Horário:</span><br>
    ${evento.inicio} até ${evento.fim}
  </div>
`;

  secaoCidade.appendChild(card);

});