    document.getElementById("formEvento").addEventListener("submit", function(e){

    e.preventDefault();

    const arquivo =
      document.getElementById("imagemEvento").files[0];

    const leitor = new FileReader();

    leitor.onload = function(){

        const evento = {
    nome: document.getElementById("nomeEvento").value,
    descricao: document.getElementById("descricaoEvento").value,
    cidade: document.getElementById("cidadeEvento").value,
    endereco: document.getElementById("enderecoEvento").value,
    data: document.getElementById("dataEvento").value,
    inicio: document.getElementById("horaInicio").value,
    fim: document.getElementById("horaFim").value,
    imagem: leitor.result,

    tipoEntrada: document.getElementById("tipoEntrada").value,
    valorIngresso: document.getElementById("valorIngresso").value,
    alimentoSolidario: document.getElementById("alimentoSolidario").value,

    convidados: [
        document.getElementById("convidado1").value,
        document.getElementById("convidado2").value,
        document.getElementById("convidado3").value,
        document.getElementById("convidado4").value
    ].filter(c => c.trim() !== ""),

    atracoes: [
        {
            nome: document.getElementById("atracao1").value,
            descricao: document.getElementById("descricaoAtracao1").value
        },
        {
            nome: document.getElementById("atracao2").value,
            descricao: document.getElementById("descricaoAtracao2").value
        },
        {
            nome: document.getElementById("atracao3").value,
            descricao: document.getElementById("descricaoAtracao3").value
        }
    ].filter(a => a.nome.trim() !== "")
};

        let eventos =
          JSON.parse(localStorage.getItem("eventosGeek")) || [];

        eventos.push(evento);

        localStorage.setItem(
          "eventosGeek",
          JSON.stringify(eventos)
        );

        alert("Evento publicado com sucesso!");
        document.getElementById("formEvento").reset();
    };

    if(arquivo){
        leitor.readAsDataURL(arquivo);
    }else{
        leitor.onload();
    }

});

