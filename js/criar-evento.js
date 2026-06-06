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
            imagem: leitor.result
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

