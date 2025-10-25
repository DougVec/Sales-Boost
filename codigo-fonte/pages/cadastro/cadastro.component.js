document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const servico = document.getElementById("servico");
    const segmento = document.getElementById("segmento");

    const erroNome = document.getElementById("erro-nome");
    const erroEmail = document.getElementById("erro-email");
    const erroTelefone = document.getElementById("erro-telefone");
    const erroServico = document.getElementById("erro-servico");
    const erroSegmento = document.getElementById("erro-segmento");
    const containerErro = document.getElementById("error-container");

    let valido = true;

    // Limpa erros anteriores
    [nome, email, telefone, servico, segmento].forEach((input) =>
      input.classList.remove("input-error")
    );
    [erroNome, erroEmail, erroTelefone, erroServico, erroSegmento].forEach(
      (div) => (div.style.display = "none")
    );

    if (!nome.value.trim()) {
      nome.classList.add("input-error");
      erroNome.style.display = "block";
      valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.classList.add("input-error");
      erroEmail.style.display = "block";
      valido = false;
    }

    const telRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!telRegex.test(telefone.value.trim())) {
      telefone.classList.add("input-error");
      erroTelefone.style.display = "block";
      valido = false;
    }

    if (!segmento.value) {
      segmento.classList.add("input-error");
      erroSegmento.style.display = "block";
      valido = false;
    }

    if (!servico.value) {
      servico.classList.add("input-error");
      erroServico.style.display = "block";
      valido = false;
    }

    if (valido) {
      window.location.href = "../teste.html";
    }
  });

// Tela de carregamento
