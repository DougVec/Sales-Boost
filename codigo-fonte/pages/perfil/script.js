// Types
/**
 * @typedef {Object} ProfileData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} empresa
 * @property {string} cpfCnpj
 * @property {string} email
 * @property {string} telefone
 * @property {string} endereco
 * @property {string} cidade
 * @property {string} estado
 * @property {string} cep
 * @property {string} pais
 */

// Constants
const STORAGE_KEY = "perfil";
const FORM_FIELDS = [
  { id: "firstName", name: "Primeiro Nome", type: "text" },
  { id: "lastName", name: "Sobrenome", type: "text" },
  { id: "empresa", name: "Empresa", type: "text" },
  { id: "cpfCnpj", name: "CPF ou CNPJ", type: "text" },
  { id: "email", name: "Email", type: "email" },
  { id: "telefone", name: "Telefone", type: "tel" },
  { id: "endereco", name: "Endereço", type: "text" },
  { id: "cidade", name: "Cidade", type: "text" },
  { id: "estado", name: "Estado", type: "text" },
  { id: "cep", name: "CEP", type: "text" },
  { id: "pais", name: "País", type: "text" },
];

// Sidebar Toggle
function toggleSidebar() {
  const sidebarFrame = document.getElementById("sidebar-frame");
  const main = document.getElementById("main");

  if (sidebarFrame && main) {
    sidebarFrame.contentWindow.postMessage("toggle", "*");
    main.classList.toggle("close");
  }
}

// Message Listener
window.addEventListener("message", function (event) {
  if (event.data === "toggle") {
    const main = document.getElementById("main");
    if (main) {
      main.classList.toggle("close");
    }
  }
});

// Form Validation
/**
 * Validates a form field
 * @param {HTMLInputElement} input - The input element to validate
 * @returns {boolean} Whether the field is valid
 */
function validateField(input) {
  const errorElement = document.getElementById(`${input.id}Error`);
  let isValid = true;
  let errorMessage = "";

  // Required field validation
  if (!input.value.trim()) {
    isValid = false;
    errorMessage = "Este campo é obrigatório.";
  }

  // Type-specific validation
  if (isValid && input.value.trim()) {
    switch (input.type) {
      case "email":
        if (!isValidEmail(input.value)) {
          isValid = false;
          errorMessage = "Email inválido.";
        }
        break;
      case "tel":
        if (!isValidPhone(input.value)) {
          isValid = false;
          errorMessage = "Telefone inválido.";
        }
        break;
    }
  }

  // CPF/CNPJ specific validation
  if (input.id === "cpfCnpj" && input.value.trim()) {
    if (!validarCpfCnpj(input.value)) {
      isValid = false;
      errorMessage = "CPF ou CNPJ inválido.";
    }
  }

  // Update error message
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }

  return isValid;
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
function isValidPhone(phone) {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "");

  // Check if it's a valid Brazilian phone number (10 or 11 digits)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return false;
  }

  // Check if it's a valid DDD (first two digits)
  const ddd = cleanPhone.substring(0, 2);
  if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
    return false;
  }

  return true;
}

/**
 * Formats a phone number to Brazilian format
 * @param {string} phone - The phone number to format
 * @returns {string} The formatted phone number
 */
function formatPhone(phone) {
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length === 11) {
    return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(
      2,
      7
    )}-${cleanPhone.substring(7)}`;
  }

  return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(
    2,
    6
  )}-${cleanPhone.substring(6)}`;
}

// CPF/CNPJ Validation
/**
 * Validates a CPF or CNPJ
 * @param {string} value - The CPF or CNPJ to validate
 * @returns {boolean} Whether the CPF or CNPJ is valid
 */
function validarCpfCnpj(value) {
  const cleanValue = value.replace(/[^\d]+/g, "");

  if (cleanValue.length === 11) return validarCPF(cleanValue);
  if (cleanValue.length === 14) return validarCNPJ(cleanValue);
  return false;
}

/**
 * Validates a CPF
 * @param {string} cpf - The CPF to validate
 * @returns {boolean} Whether the CPF is valid
 */
function validarCPF(cpf) {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  return resto === parseInt(cpf[10]);
}

/**
 * Validates a CNPJ
 * @param {string} cnpj - The CNPJ to validate
 * @returns {boolean} Whether the CNPJ is valid
 */
function validarCNPJ(cnpj) {
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado == digitos.charAt(1);
}

// Form Handling
/**
 * Loads profile data from localStorage
 * @returns {ProfileData} The loaded profile data
 */
function loadProfileData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : {};
}

/**
 * Saves profile data to localStorage
 * @param {ProfileData} data - The profile data to save
 */
function saveProfileData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Populates the form with profile data
 * @param {ProfileData} data - The profile data to populate the form with
 */
function populateForm(data) {
  FORM_FIELDS.forEach((field) => {
    const input = document.getElementById(field.id);
    if (input && data[field.id]) {
      input.value = data[field.id];
    }
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  if (!form) return;

  // Load saved data
  const savedData = loadProfileData();
  populateForm(savedData);

  // Add input event listeners for real-time validation
  FORM_FIELDS.forEach((field) => {
    const input = document.getElementById(field.id);
    if (input) {
      if (field.id === "telefone") {
        // Format phone number as user types
        const formattedPhone = formatPhone(input.value);
        if (formattedPhone !== input.value) {
          input.value = formattedPhone;
        }
      }
      input.addEventListener("input", () => {
        if (field.id === "telefone") {
          // Format phone number as user types
          const formattedPhone = formatPhone(input.value);
          if (formattedPhone !== input.value) {
            input.value = formattedPhone;
          }
        }
        validateField(input);
      });
      input.addEventListener("blur", () => validateField(input));
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const formData = {};

    // Validate all fields
    FORM_FIELDS.forEach((field) => {
      const input = document.getElementById(field.id);
      if (input) {
        if (!validateField(input)) {
          isValid = false;
        }
        formData[field.id] = input.value.trim();
      }
    });

    if (!isValid) return;

    // Save data
    saveProfileData(formData);
    alert("Dados salvos com sucesso!");
  });
});
