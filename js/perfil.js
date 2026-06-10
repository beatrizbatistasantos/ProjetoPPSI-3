

const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === "" || password === "") {
    message.textContent = "⚠️ Preencha todos os campos!";
    message.className = "message error";
  } else if (username === "geek" && password === "baixada") {
    message.textContent = "✅ Login realizado com sucesso!";
    message.className = "message success";

    document.querySelector('.login-container').style.background = "#33cc33";
  } else {
    message.textContent = "❌ Usuário ou senha inválidos!";
    message.className = "message error";

    form.classList.add("shake");
    setTimeout(() => form.classList.remove("shake"), 500);
  }
});
