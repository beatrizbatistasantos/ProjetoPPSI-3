document.addEventListener("DOMContentLoaded", () => {
    
    const containerDestaques = document.getElementById("containerDestaques");
    const containerIndicadores = document.getElementById("carrosselIndicadores");
    const btnEsquerda = document.getElementById("setaEsquerda");
    const btnDireita = document.getElementById("setaDireita");

    if (!localStorage.getItem("eventosGeek") || JSON.parse(localStorage.getItem("eventosGeek")).length === 0) {
        const eventosIniciais = [
            {
                nome: "Anime Summer Baixada",
                cidade: "Santos",
                data: "2026-07-20",
                imagem: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500"
            },
            {
                nome: "Encontro RPG & Boardgames",
                cidade: "Guarujá",
                data: "2026-06-28",
                imagem: "" 
            },
            {
                nome: "Geek Fest Zero Treze",
                cidade: "São Vicente",
                data: "2026-08-05",
                imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500"
            },
            {
                nome: "Torneio de Card Games",
                cidade: "Praia Grande",
                data: "2026-06-15",
                imagem: "" 
            }
        ];
        localStorage.setItem("eventosGeek", JSON.stringify(eventosIniciais));
    }

    const eventosSalvos = JSON.parse(localStorage.getItem("eventosGeek")) || [];

    function normalizarDataParaFila(dataString) {
        if (!dataString) return new Date(2099, 11, 31);
        try {
            if (dataString.includes('-')) {
                return new Date(dataString + "T00:00:00");
            }
            if (dataString.includes('/')) {
                const partes = dataString.split('/');
                return new Date(partes[2], partes[1] - 1, partes[0]);
            }
            return new Date(dataString);
        } catch (e) {
            return new Date(2099, 11, 31);
        }
    }

    const eventosOrdenados = eventosSalvos
        .filter(evento => evento !== null && typeof evento === 'object')
        .map(evento => {
            return {
                ...evento,
                nome: evento.nome || "Evento Geek",
                _dataObjeto: normalizarDataParaFila(evento.data)
            };
        })
        .sort((a, b) => a._dataObjeto - b._dataObjeto);

    const eventosDestaque = eventosOrdenados.slice(0, 6);

    containerDestaques.innerHTML = "";
    containerIndicadores.innerHTML = "";

    eventosDestaque.forEach((evento, indice) => {
        const card = document.createElement("div");
        card.className = "card-destaque";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;
        card.appendChild(titulo);

        if (evento.imagem && evento.imagem.trim() !== "" && evento.imagem !== "undefined") {
            const img = document.createElement("img");
            img.src = evento.imagem;
            img.className = "destaque-img-real";
            img.alt = evento.nome;
            card.appendChild(img);
        } else {
            const divSemImg = document.createElement("div");
            divSemImg.className = "destaque-sem-img";
            divSemImg.innerHTML = "🎮<br><span>GEEK EVENTO</span>";
            card.appendChild(divSemImg);
        }

        const infoBloco = document.createElement("div");
        infoBloco.className = "destaque-info";
        infoBloco.innerHTML = `
            <div><span class="destaque-label">📍 Cidade:</span> ${evento.cidade || "Baixada Santista"}</div>
            <div style="margin-top: 5px;"><span class="destaque-label">📅 Data:</span> ${evento.data || "A definir"}</div>
        `;
        card.appendChild(infoBloco);

        card.addEventListener("click", () => {
            localStorage.setItem("eventoSelecionado", JSON.stringify(evento));
            window.location.href = "pages/evento.html";
        });

        containerDestaques.appendChild(card);

        const dot = document.createElement("button");
        dot.className = "bolinha-dot";
        dot.setAttribute("aria-label", `Slide ${indice + 1}`);
        
        dot.addEventListener("click", () => {
            desligarTemporizador();
            indiceAtual = indice;
            atualizarExibicao();
            ligarTemporizador();
        });

        containerIndicadores.appendChild(dot);
    });

    let indiceAtual = 0;
    let autoplay = null;
    
    const cardsInstanciados = containerDestaques.querySelectorAll(".card-destaque");
    const dotsInstanciados = containerIndicadores.querySelectorAll(".bolinha-dot");

    function atualizarExibicao() {
        cardsInstanciados.forEach(card => card.classList.remove("ativo"));
        dotsInstanciados.forEach(dot => dot.classList.remove("ativa"));
        
        if (cardsInstanciados[indiceAtual]) cardsInstanciados[indiceAtual].classList.add("ativo");
        if (dotsInstanciados[indiceAtual]) dotsInstanciados[indiceAtual].classList.add("ativa");
    }

    function avancarMudar() {
        indiceAtual = (indiceAtual < cardsInstanciados.length - 1) ? indiceAtual + 1 : 0;
        atualizarExibicao();
    }

    function retrocederMudar() {
        indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : cardsInstanciados.length - 1;
        atualizarExibicao();
    }

    function ligarTemporizador() {
        desligarTemporizador();
        autoplay = setInterval(avancarMudar, 3500);
    }

    function desligarTemporizador() {
        if (autoplay) clearInterval(autoplay);
    }

    btnEsquerda.addEventListener("click", () => {
        desligarTemporizador();
        retrocederMudar();
        ligarTemporizador();
    });

    btnDireita.addEventListener("click", () => {
        desligarTemporizador();
        avancarMudar();
        ligarTemporizador();
    });

    const wrapper = document.querySelector('.carrossel-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', desligarTemporizador);
        wrapper.addEventListener('mouseleave', ligarTemporizador);
    }

    atualizarExibicao();
    ligarTemporizador();
});