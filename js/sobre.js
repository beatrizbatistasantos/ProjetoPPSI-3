document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initFAQ();
    });

function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!galleryGrid || filterButtons.length === 0) return;
    const galleryItems = [
        { id: 1, category: "anime", title: "Palestra de Dubladores", desc: "Super bate-papo com lendas da dublagem nacional contando bastidores de animes.", date: "Maio, 2025", icon: "fa-solid fa-microphone-lines" },
        { id: 2, category: "cosplay", title: "Desfile Cosplay Oficial", desc: "Apresentação dos melhores cosplayers da Baixada Santista sob os holofotes.", date: "Junho, 2025", icon: "fa-solid fa-crown" },
        { id: 3, category: "games", title: "Arena de Fighting Games", desc: "Campeonatos disputadíssimos de Street Fighter e Mortal Kombat com a torcida vibrando.", date: "Maio, 2025", icon: "fa-solid fa-gamepad" },
        { id: 4, category: "kpop", title: "Concurso Cover K-Pop", desc: "Coreografias incríveis de grupos que agitaram todo o público do festival.", date: "Setembro, 2025", icon: "fa-solid fa-music" },
        { id: 5, category: "anime", title: "Artist's Alley", desc: "Mais de 30 artistas locais expondo e vendendo prints, adesivos, chaveiros e zines.", date: "Novembro, 2025", icon: "fa-solid fa-pen-nib" },
        { id: 6, category: "cosplay", title: "Painel de Fotos Cosplay", desc: "Sessão fotográfica incrível que reuniu centenas de cosplayers no pavilhão.", date: "Fevereiro, 2026", icon: "fa-solid fa-camera-retro" },
        { id: 7, category: "games", title: "Mundo do RPG de Mesa", desc: "Campanhas rápidas (one-shots) de Dungeons & Dragons e Call of Cthulhu para iniciantes.", date: "Janeiro, 2026", icon: "fa-solid fa-dice-d20" },
        { id: 8, category: "kpop", title: "Random Play Dance", desc: "A galera se juntou no pátio para dançar os refrões mais estourados do pop coreano.", date: "Abril, 2026", icon: "fa-solid fa-compact-disc" }
    ];
    function renderCards(filter = 'all') {
        galleryGrid.innerHTML = '';
        const filteredItems = filter === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === filter);
        filteredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.style.animation = 'fadeInUp 0.3s ease forwards';
            card.innerHTML = `
                <div class="gallery-media">
                    <span class="gallery-tag">${item.category}</span>
                    <i class="${item.icon}"></i>
                </div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="gallery-date">
                        <i class="fa-solid fa-calendar-days"></i>
                        <span>${item.date}</span>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            renderCards(filterValue);
        });
    });
    renderCards();
}

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            }
        });
    });
}