const evento =
  JSON.parse(localStorage.getItem("eventoSelecionado"));
const btnExcluir =
  document.getElementById("btnExcluir");

if(evento){

  document.getElementById("titulo").textContent =
    evento.nome;

  document.getElementById("local").textContent =
    evento.endereco;

  document.getElementById("data").textContent =
    evento.data;

  if(evento.inicio && evento.fim){
    document.getElementById("horario").textContent =
      `${evento.inicio} às ${evento.fim}`;
  }else{
    document.getElementById("horario").textContent =
      "Não informado";
  }

  document.getElementById("descricao").textContent =
    evento.descricao || "Descrição não informada";

  document.getElementById("entrada").textContent =
  evento.tipoEntrada || "Não informado";

document.getElementById("valorIngresso").textContent =
  evento.valorIngresso || "Não informado";

document.getElementById("alimento").textContent =
  evento.alimentoSolidario || "Não informado";

  if(evento.convidados && evento.convidados.length > 0){
  document.getElementById("convidados").innerHTML =
    evento.convidados.join("<br>");
}else{
  document.getElementById("convidados").textContent =
    "Nenhum convidado informado";
}

if(evento.atracoes && evento.atracoes.length > 0){

  document.getElementById("atracoes").innerHTML = "";

  evento.atracoes.forEach(atracao => {

    if(atracao.nome){

      document.getElementById("atracoes").innerHTML += `
        <div class="atracao">
          <h3>${atracao.nome}</h3>
          <p>${atracao.descricao || "Sem descrição"}</p>
        </div>
      `;

    }

  });

}else{

  document.getElementById("atracoes").innerHTML =
    "<p>Nenhuma atração informada.</p>";

}

  const imagem = document.getElementById("imagem");

if(evento.imagem){
  imagem.src = evento.imagem;
  imagem.style.display = "block";
}else{
  imagem.style.display = "none";
}

    const eventosSalvos =
  JSON.parse(localStorage.getItem("eventosGeek")) || [];

const eventoCriado =
  eventosSalvos.find(e =>
    e.nome === evento.nome &&
    e.data === evento.data
  );

if(!eventoCriado){
  btnExcluir.style.display = "none";
}

btnExcluir.addEventListener("click", () => {

  const confirmar =
    confirm("Deseja realmente excluir este evento?");

  if(!confirmar){
    return;
  }

  let eventos =
    JSON.parse(localStorage.getItem("eventosGeek")) || [];

  eventos = eventos.filter(e =>
  e.nome !== evento.nome ||
  e.data !== evento.data
);

  localStorage.setItem(
    "eventosGeek",
    JSON.stringify(eventos)
  );

  localStorage.removeItem("eventoSelecionado");

  alert("Evento excluído com sucesso!");

  window.location.href = "eventos.html";

});
}




