/* ==========================================================================
   GEEK BAIXADA - PLAYFUL LOGIN INTERACTION ENGINE (script.js)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const loginCard = document.getElementById('card-login');
  
  // 1. Sintetizador de Som 8-bit Retro (Web Audio API)
  let audioCtx = null;
  function playSound(type) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      // Reseta estado do AudioContext se suspenso pelo navegador
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      if (type === 'click') {
        // Som de clique/bip rápido de menu
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'success') {
        // Arpejo de vitória estilo 8-bit level up
        osc.type = 'triangle';
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, index) => {
          const startTime = now + index * 0.08;
          osc.frequency.setValueAtTime(freq, startTime);
        });
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.setValueAtTime(0.12, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'error') {
        // Som decrescente de erro
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.3);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn("Web Audio API bloqueada ou não suportada neste navegador.", e);
    }
  }
  // 2. Parallax Dinâmico nos Círculos de Fundo
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 40;
    const y = (e.clientY - window.innerHeight / 2) / 40;
    
    // Passa os valores como variáveis CSS para animar os pseudo-elementos
    document.documentElement.style.setProperty('--parallax-x', `${x}px`);
    document.documentElement.style.setProperty('--parallax-y', `${y}px`);
  });
  // 3. Sistema de Confetes (Canvas Render)
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#5c2ed8', '#ff9000', '#ffa800', '#ff3366', '#00bcd4', '#4caf50'];
    const particles = [];
    // Cria as partículas
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -50,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }
    let animationId;
    const startTime = Date.now();
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });
      // Encerra após 3 segundos
      if (Date.now() - startTime < 3000) {
        animationId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationId);
        canvas.remove();
      }
    }
    draw();
  }
  // 4. Criação Dinâmica dos Templates de Formulário (DOM Swap)
  const templates = {
    login: `
      <div class="card-header">
        <div class="title-with-icon">
          <span class="emoji-icon">🔑</span>
          <h1 class="card-title">Entrar na Conta</h1>
        </div>
        <p class="card-subtitle">Conecte-se para publicar eventos e favoritar os seus preferidos.</p>
      </div>
      <form class="login-form" id="form-element" novalidate>
        <div class="form-group">
          <label for="login-email">Nome de Usuário ou E-mail</label>
          <input type="email" id="login-email" required placeholder="Digite o seu e-mail" autocomplete="email">
        </div>
        <div class="form-group">
          <div class="label-row">
            <label for="login-password">Senha</label>
            <a href="#" class="forgot-link" id="link-forgot-pass">Esqueceu a senha?</a>
          </div>
          <div class="password-input-wrapper">
            <input type="password" id="login-password" required placeholder="Digite a sua senha" autocomplete="current-password">
            <button type="button" class="password-toggle" aria-label="Mostrar senha">👁️</button>
          </div>
        </div>
        <button type="submit" class="btn btn-login" id="btn-submit">Entrar</button>
      </form>
      <div class="card-footer">
        <span>Não tem uma conta? <a href="#" class="signup-link" id="link-signup">Criar Conta</a></span>
      </div>
    `,
    register: `
      <div class="card-header">
        <div class="title-with-icon">
          <span class="emoji-icon">👾</span>
          <h1 class="card-title">Criar Conta</h1>
        </div>
        <p class="card-subtitle">Junte-se à maior rede de geeks e otakus da região!</p>
      </div>
      <form class="login-form" id="form-element" novalidate>
        <div class="form-group">
          <label for="register-name">Nome Completo</label>
          <input type="text" id="register-name" required placeholder="Digite o seu nome" autocomplete="name">
        </div>
        <div class="form-group">
          <label for="register-email">E-mail</label>
          <input type="email" id="register-email" required placeholder="Digite seu e-mail" autocomplete="email">
        </div>
        <div class="form-group">
          <label for="register-password">Escolha sua Senha</label>
          <div class="password-input-wrapper">
            <input type="password" id="register-password" required placeholder="Crie uma senha de no mínimo 6 caracteres" autocomplete="new-password">
            <button type="button" class="password-toggle" aria-label="Mostrar senha">👁️</button>
          </div>
        </div>
        <button type="submit" class="btn btn-login" id="btn-submit">Criar Minha Conta</button>
      </form>
      <div class="card-footer">
        <span>Já possui uma conta? <a href="#" class="signup-link" id="link-login">Entrar</a></span>
      </div>
    `,
    forgot: `
      <div class="card-header">
        <div class="title-with-icon">
          <span class="emoji-icon">🔮</span>
          <h1 class="card-title">Recuperar Senha</h1>
        </div>
        <p class="card-subtitle">Ficou preso no labirinto? Digite seu e-mail para enviarmos as instruções.</p>
      </div>
      <form class="login-form" id="form-element" novalidate>
        <div class="form-group">
          <label for="forgot-email">Seu E-mail Cadastrado</label>
          <input type="email" id="forgot-email" required placeholder="Digite seu e-mail para recuperação">
        </div>
        <button type="submit" class="btn btn-login" id="btn-submit">Enviar Link Mágico</button>
      </form>
      <div class="card-footer">
        <span>Lembrou da senha? <a href="#" class="signup-link" id="link-back-login">Voltar para o Login</a></span>
      </div>
    `
  };
  // Função para renderizar o formulário e configurar seus listeners
  function setFormMode(mode) {
    playSound('click');
    // Transição de fade suave
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'scale(0.95)';
    setTimeout(() => {
      loginCard.innerHTML = templates[mode];
      
      // Vincula os comportamentos específicos do novo form inserido no DOM
      setupFormBehaviors(mode);
      
      // Mostra novamente com animação
      loginCard.style.opacity = '1';
      loginCard.style.transform = 'scale(1)';
    }, 180);
  }
  // Configurações do comportamento do DOM para os inputs e botões criados
  function setupFormBehaviors(mode) {
    const form = document.getElementById('form-element');
    
    // Liga os botões de controle de alternância de telas
    if (mode === 'login') {
      document.getElementById('link-signup').addEventListener('click', (e) => {
        e.preventDefault();
        setFormMode('register');
      });
      document.getElementById('link-forgot-pass').addEventListener('click', (e) => {
        e.preventDefault();
        setFormMode('forgot');
      });
    } else if (mode === 'register') {
      document.getElementById('link-login').addEventListener('click', (e) => {
        e.preventDefault();
        setFormMode('login');
      });
    } else if (mode === 'forgot') {
      document.getElementById('link-back-login').addEventListener('click', (e) => {
        e.preventDefault();
        setFormMode('login');
      });
    }
    // Toggle de visibilidade da senha (DOM Dinâmico)
    const togglePassBtn = form.querySelector('.password-toggle');
    if (togglePassBtn) {
      togglePassBtn.addEventListener('click', (e) => {
        playSound('click');
        const input = togglePassBtn.previousElementSibling;
        if (input.type === 'password') {
          input.type = 'text';
          togglePassBtn.textContent = '🙈';
        } else {
          input.type = 'password';
          togglePassBtn.textContent = '👁️';
        }
      });
    }
    // Interceptador e Validador do Form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      
      let hasError = false;
      // Validação por Modo
      if (mode === 'login') {
        const email = document.getElementById('login-email');
        const pass = document.getElementById('login-password');
        if (!validateEmail(email.value)) {
          showError(email, 'Insira um endereço de e-mail válido!');
          hasError = true;
        }
        if (pass.value.trim() === '') {
          showError(pass.parentElement, 'Por favor, digite sua senha!');
          hasError = true;
        }
      } else if (mode === 'register') {
        const name = document.getElementById('register-name');
        const email = document.getElementById('register-email');
        const pass = document.getElementById('register-password');
        if (name.value.trim().length < 3) {
          showError(name, 'Seu nome precisa ter mais de 3 letras!');
          hasError = true;
        }
        if (!validateEmail(email.value)) {
          showError(email, 'Insira um endereço de e-mail válido!');
          hasError = true;
        }
        if (pass.value.length < 6) {
          showError(pass.parentElement, 'A senha precisa ter pelo menos 6 caracteres!');
          hasError = true;
        }
      } else if (mode === 'forgot') {
        const email = document.getElementById('forgot-email');
        if (!validateEmail(email.value)) {
          showError(email, 'Insira o seu e-mail cadastrado!');
          hasError = true;
        }
      }
      if (hasError) {
        playSound('error');
        triggerCardBounce();
      } else {
        playSound('success');
        launchConfetti();
        
        // Simulação de Sucesso
        const submitBtn = document.getElementById('btn-submit');
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        if (mode === 'login') {
          submitBtn.textContent = 'Autenticando...';
          setTimeout(() => {
            alert('Acesso permitido! Bem-vindo de volta ao Geek Baixada!');
            window.location.href = 'index.html';
          }, 1500);
        } else if (mode === 'register') {
          submitBtn.textContent = 'Criando Conta...';
          setTimeout(() => {
            alert('Cadastro realizado com sucesso! Faça login agora.');
            setFormMode('login');
          }, 1500);
        } else if (mode === 'forgot') {
          submitBtn.textContent = 'Enviando...';
          setTimeout(() => {
            alert('Link mágico enviado para a sua caixa de entrada!');
            setFormMode('login');
          }, 1500);
        }
      }
    });
    // Limpa erro ao digitar
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        // Encontra se há balão de erro
        const group = input.closest('.form-group');
        const bubble = group.querySelector('.error-bubble');
        if (bubble) bubble.remove();
      });
    });
  }
  // 5. Auxiliares de Validação e DOM (Error Bubbles)
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  function showError(targetElement, message) {
    const group = targetElement.closest('.form-group');
    
    // Evita duplicados
    if (group.querySelector('.error-bubble')) return;
    const bubble = document.createElement('div');
    bubble.className = 'error-bubble bounce-in';
    bubble.textContent = message;
    
    // Adiciona o balão abaixo do input
    group.appendChild(bubble);
  }
  function clearErrors() {
    document.querySelectorAll('.error-bubble').forEach(b => b.remove());
  }
  function triggerCardBounce() {
    loginCard.classList.add('bounce-effect');
    setTimeout(() => {
      loginCard.classList.remove('bounce-effect');
    }, 600);
  }
  // Botão de voltar faz som
  document.getElementById('btn-back').addEventListener('click', () => {
    playSound('click');
  });
  // Inicializa o formulário no modo Login
  setFormMode('login');
});
