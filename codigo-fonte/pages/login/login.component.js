var formSignin = document.querySelector("#signin");
var formSignup = document.querySelector("#signup");
var btnColor = document.querySelector(".btnColor");
var container = document.querySelector(".container");

document.querySelector("#btnSignin").addEventListener("click", () => {
  formSignin.style.left = "25px";
  formSignup.style.left = "450px";
  btnColor.style.left = "0px";

  // 🔥 Define altura menor para login
  container.style.height = "24em";
});

document.querySelector("#btnSignup").addEventListener("click", () => {
  formSignin.style.left = "-450px";
  formSignup.style.left = "25px";
  btnColor.style.left = "110px";

  // 🔥 Define altura maior para cadastro
  container.style.height = "32em";
});

// Função para salvar cadastro no localStorage
function salvarCadastro(email, senha, empresa, segmento) {
  const usuario = {
    email: email,
    senha: senha,
    empresa: empresa,
    segmento: segmento,
  };

  localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));
}

// Validação para cadastrar
document.getElementById("signup").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("emailc").value.trim();
  const senha = document.getElementById("passwordc").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const segmento = document.getElementById("segmento").value.trim();

  const erroEmail = document.getElementById("erro-emailc");
  const erroPassword = document.getElementById("erro-passwordc");
  const erroEmpresa = document.getElementById("erro-empresa");
  const erroSegmento = document.getElementById("erro-segmento");

  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    erroEmail.textContent = "Informe seu email.";
    erroEmail.style.display = "block";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    erroEmail.textContent = "Informe um email válido.";
    erroEmail.style.display = "block";
    isValid = false;
  } else {
    erroEmail.style.display = "none";
  }

  if (senha === "") {
    erroPassword.textContent = "Informe sua senha.";
    erroPassword.style.display = "block";
    isValid = false;
  } else if (senha.length < 6) {
    erroPassword.textContent = "A senha deve ter pelo menos 6 caracteres.";
    erroPassword.style.display = "block";
    isValid = false;
  } else {
    erroPassword.style.display = "none";
  }

  if (empresa === "") {
    erroEmpresa.textContent = "Informe o nome da empresa.";
    erroEmpresa.style.display = "block";
    isValid = false;
  } else {
    erroEmpresa.style.display = "none";
  }

  if (segmento === "") {
    erroSegmento.textContent = "Escolha seu segmento de trabalho.";
    erroSegmento.style.display = "block";
    isValid = false;
  } else {
    erroSegmento.style.display = "none";
  }

  if (isValid) {
    salvarCadastro(email, senha, empresa, segmento);
    alert("Cadastro realizado com sucesso!");
    formSignin.style.left = "25px";
    formSignup.style.left = "450px";
    btnColor.style.left = "0px";
  }
});

// Validação para login
document.getElementById("signin").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value.trim();

  const erroEmail = document.getElementById("erro-email");
  const erroPassword = document.getElementById("erro-password");

  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    erroEmail.textContent = "Informe seu email.";
    erroEmail.style.display = "block";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    erroEmail.textContent = "Informe um email válido.";
    erroEmail.style.display = "block";
    isValid = false;
  } else {
    erroEmail.style.display = "none";
  }

  if (senha === "") {
    erroPassword.textContent = "Informe sua senha.";
    erroPassword.style.display = "block";
    isValid = false;
  } else if (senha.length < 6) {
    erroPassword.textContent = "A senha deve ter pelo menos 6 caracteres.";
    erroPassword.style.display = "block";
    isValid = false;
  } else {
    erroPassword.style.display = "none";
  }

  if (isValid) {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    if (
      usuarioSalvo &&
      usuarioSalvo.email === email &&
      usuarioSalvo.senha === senha
    ) {
      alert("Login realizado com sucesso!");
      window.location.href = "./../central-do-usuario/index.html"; // Caminho da sua página de sucesso
    } else {
      alert("Email ou senha incorretos, ou usuário não cadastrado.");
    }
  }
});
