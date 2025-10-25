// Types
/**
 * @typedef {Object} Orcamento
 * @property {string} cliente
 * @property {number} valor
 * @property {string} data
 * @property {string} descricao
 * @property {string} status
 */

// Constants
const STORAGE_KEY = "solicitacoes";
const ITENS_POR_PAGINA = 5;

// Validation Rules
const VALIDATION_RULES = {
  cliente: {
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
    errorMessages: {
      required: "O nome do cliente é obrigatório.",
      minLength: "O nome deve ter pelo menos 3 caracteres.",
      maxLength: "O nome não pode ter mais de 100 caracteres.",
      pattern: "O nome deve conter apenas letras e espaços.",
    },
  },
  valor: {
    min: 0.01,
    max: 999999.99,
    errorMessages: {
      required: "O valor é obrigatório.",
      min: "O valor mínimo é R$ 0,01.",
      max: "O valor máximo é R$ 999.999,99.",
      invalid: "Digite um valor válido.",
    },
  },
  data: {
    errorMessages: {
      required: "A data é obrigatória.",
      future: "A data não pode ser futura.",
      invalid: "Digite uma data válida.",
    },
  },
  descricao: {
    minLength: 10,
    maxLength: 500,
    errorMessages: {
      required: "A descrição é obrigatória.",
      minLength: "A descrição deve ter pelo menos 10 caracteres.",
      maxLength: "A descrição não pode ter mais de 500 caracteres.",
    },
  },
};

// State
let solicitacoes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let ordenacao = { coluna: null, asc: true };
let paginaAtual = 1;

// DOM Elements
const filtro = document.getElementById("filtro");
const limpaFiltro = document.getElementById("limpaFiltro");
const modalNovoOrcamento = document.getElementById("modalNovoOrcamento");
const formNovoOrcamento = document.getElementById("formNovoOrcamento");

// Modal Functions
function abrirModalNovoOrcamento() {
  modalNovoOrcamento.classList.add("active");
  document.getElementById("data").valueAsDate = new Date();
}

function fecharModalNovoOrcamento() {
  modalNovoOrcamento.classList.remove("active");
  formNovoOrcamento.reset();
  limparErros();
}

function limparErros() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });
}

// Form Validation
/**
 * Validates a form field
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input element to validate
 * @returns {boolean} Whether the field is valid
 */
function validateField(input) {
  const errorElement = document.getElementById(`${input.id}Error`);
  const rules = VALIDATION_RULES[input.id];
  let isValid = true;
  let errorMessage = "";

  if (!rules) return true;

  // Required field validation
  if (!input.value.trim()) {
    isValid = false;
    errorMessage = rules.errorMessages.required;
  }

  // Type-specific validation
  if (isValid && input.value.trim()) {
    switch (input.id) {
      case "cliente":
        if (input.value.length < rules.minLength) {
          isValid = false;
          errorMessage = rules.errorMessages.minLength;
        } else if (input.value.length > rules.maxLength) {
          isValid = false;
          errorMessage = rules.errorMessages.maxLength;
        } else if (!rules.pattern.test(input.value)) {
          isValid = false;
          errorMessage = rules.errorMessages.pattern;
        }
        break;

      case "valor":
        const valor = parseFloat(input.value.replace(",", "."));
        if (isNaN(valor)) {
          isValid = false;
          errorMessage = rules.errorMessages.invalid;
        } else if (valor < rules.min) {
          isValid = false;
          errorMessage = rules.errorMessages.min;
        } else if (valor > rules.max) {
          isValid = false;
          errorMessage = rules.errorMessages.max;
        }
        break;

      case "data":
        const data = new Date(input.value);
        if (isNaN(data.getTime())) {
          isValid = false;
          errorMessage = rules.errorMessages.invalid;
        } else if (data > new Date()) {
          isValid = false;
          errorMessage = rules.errorMessages.future;
        }
        break;

      case "descricao":
        if (input.value.length < rules.minLength) {
          isValid = false;
          errorMessage = rules.errorMessages.minLength;
        } else if (input.value.length > rules.maxLength) {
          isValid = false;
          errorMessage = rules.errorMessages.maxLength;
        }
        break;
    }
  }

  // Update error message
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }

  // Update input style
  input.classList.toggle("error", !isValid);
  input.classList.toggle("valid", isValid && input.value.trim());

  return isValid;
}

/**
 * Formats a number as currency
 * @param {number} value - The number to format
 * @returns {string} The formatted currency string
 */
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Table Functions
/**
 * Renders the solicitacoes table with filtering, sorting and pagination
 */
function renderizarSolicitacoes() {
  const filtroTexto = filtro.value.toLowerCase();

  let filtradas = solicitacoes.filter(
    (sol) =>
      sol.cliente.toLowerCase().includes(filtroTexto) ||
      sol.descricao.toLowerCase().includes(filtroTexto)
  );

  if (ordenacao.coluna) {
    const { coluna, asc } = ordenacao;
    filtradas.sort((a, b) => {
      let valA = a[coluna];
      let valB = b[coluna];
      if (coluna === "valor") {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      } else {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return asc ? -1 : 1;
      if (valA > valB) return asc ? 1 : -1;
      return 0;
    });
  }

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const paginadas = filtradas.slice(inicio, fim);

  const tbody = document.getElementById("solicitacoes-body");
  tbody.innerHTML = "";

  paginadas.forEach((sol, index) => {
    const realIndex = solicitacoes.indexOf(sol);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sol.cliente}</td>
      <td>${formatCurrency(parseFloat(sol.valor))}</td>
      <td>${formatarData(sol.data)}</td>
      <td class="descricao-coluna">${sol.descricao}</td>
      <td>${sol.status || "Solicitado"}</td>
      <td>
        <button class="pdf" onclick="gerarPDF(${realIndex})" title="Gerar PDF">
          <i class="fa-solid fa-file-pdf"></i>
        </button>
        <button class="pdf" onclick="aprovarOrcamento(${realIndex})" title="Enviar Orçamento">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
        <button class="pdf" onclick="excluirSolicitacao(${realIndex})" title="Excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  atualizarPaginacao(filtradas.length);
}

/**
 * Updates the pagination info
 * @param {number} totalItems - Total number of items
 */
function atualizarPaginacao(totalItems) {
  const totalPages = Math.ceil(totalItems / ITENS_POR_PAGINA);
  const paginacaoInfo = document.getElementById("paginacao-info");
  if (paginacaoInfo) {
    paginacaoInfo.textContent = `Página ${paginaAtual} de ${totalPages}`;
  }
}

/**
 * Formats a date string to Brazilian format
 * @param {string} dateString - The date string to format
 * @returns {string} The formatted date
 */
function formatarData(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

// Event Handlers
function ordenarPor(coluna) {
  ordenacao.asc = ordenacao.coluna === coluna ? !ordenacao.asc : true;
  ordenacao.coluna = coluna;
  renderizarSolicitacoes();
}

function gerarPDF(index) {
  const sol = solicitacoes[index];
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Orçamento", 105, 20, null, null, "center");

  doc.setFontSize(12);
  doc.text(`Cliente: ${sol.cliente}`, 20, 40);
  doc.text(`Valor: ${formatCurrency(parseFloat(sol.valor))}`, 20, 50);
  doc.text(`Data: ${formatarData(sol.data)}`, 20, 60);
  doc.text("Descrição:", 20, 70);
  doc.text(sol.descricao, 20, 80);
  doc.text(`Status: ${sol.status || "Solicitado"}`, 20, 100);

  doc.save(`orcamento_${sol.cliente}.pdf`);
}

function excluirSolicitacao(index) {
  if (confirm("Tem certeza que deseja excluir esta solicitação?")) {
    solicitacoes.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitacoes));
    renderizarSolicitacoes();
  }
}

function aprovarOrcamento(index) {
  solicitacoes[index].status = "Enviado";

  // Atualiza também no orçamentos para refletir no teste.html
  let orcamentos = JSON.parse(localStorage.getItem("orcamentos")) || [];
  const solicitacao = solicitacoes[index];

  const indexOrcamento = orcamentos.findIndex(
    (o) =>
      o.cliente === solicitacao.cliente &&
      o.data === solicitacao.data &&
      o.valor === solicitacao.valor &&
      o.descrição === solicitacao.descricao
  );

  if (indexOrcamento !== -1) {
    orcamentos[indexOrcamento].status = "Enviado";
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitacoes));
  renderizarSolicitacoes();

  alert("Orçamento enviado com sucesso!");
}

// Sidebar Toggle
function toggleSidebar() {
  const sidebarFrame = document.getElementById("sidebar-frame");
  const geral = document.getElementById("geral");
  const toggleButton = document.getElementById("toggleSidebar");

  if (sidebarFrame && geral && toggleButton) {
    const isCollapsed = sidebarFrame.classList.contains("collapsed");

    if (isCollapsed) {
      // Expandir
      sidebarFrame.classList.remove("collapsed");
      geral.classList.remove("expanded");
      toggleButton.classList.remove("collapsed");
      geral.style.marginLeft = "250px";
    } else {
      // Recolher
      sidebarFrame.classList.add("collapsed");
      geral.classList.add("expanded");
      toggleButton.classList.add("collapsed");
      geral.style.marginLeft = "0";
    }
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Add toggle button event listener
  const toggleButton = document.getElementById("toggleSidebar");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleSidebar);
  }

  // Filter listeners
  filtro.addEventListener("input", () => {
    paginaAtual = 1;
    renderizarSolicitacoes();
  });

  limpaFiltro.addEventListener("click", () => {
    filtro.value = "";
    paginaAtual = 1;
    renderizarSolicitacoes();
  });

  // New budget form listeners
  formNovoOrcamento.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const formData = {};

    // Validate all fields
    formNovoOrcamento.querySelectorAll("input, textarea").forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
      formData[input.id] = input.value.trim();
    });

    if (!isValid) return;

    // Add new budget
    const novoOrcamento = {
      ...formData,
      status: "Solicitado",
    };

    solicitacoes.push(novoOrcamento);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitacoes));

    // Close modal and refresh table
    fecharModalNovoOrcamento();
    renderizarSolicitacoes();
    alert("Orçamento criado com sucesso!");
  });

  // Add input event listeners for real-time validation
  formNovoOrcamento.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  // Initial render
  renderizarSolicitacoes();
});

// Message Listener
window.addEventListener("message", function (event) {
  if (event.data === "toggle") {
    toggleSidebar();
  }
});
