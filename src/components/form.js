import { pushEvent } from "../dataLayer.js";
import {
  interestTypeOptions,
  modelInterestOptions,
} from "../lib/page-definitions.js";
import { sendToWebhook } from "../webhook.js";

const inputClassName =
  "min-h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-neutral-400 focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10";

const labelClassName =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700";

const emailPattern =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;

function createFieldError() {
  const error = document.createElement("div");
  error.className =
    "form-error pointer-events-none absolute right-0 top-0 z-10 max-w-[180px] text-right text-[10px] font-medium leading-[1.2] text-[#c3002f] opacity-0 transition-opacity";
  error.setAttribute("aria-live", "polite");
  return error;
}

function buildSelectOptions(options, placeholder) {
  return `
    <option value="">${placeholder}</option>
    ${options
      .map((option) => {
        if (typeof option === "string") {
          return `<option value="${option}">${option}</option>`;
        }

        return `<option value="${option.value}">${option.label}</option>`;
      })
      .join("")}
  `;
}

function getFieldValue(form, name) {
  const field = form.elements.namedItem(name);

  if (!field) {
    return "";
  }

  if (field instanceof RadioNodeList) {
    return field.value || "";
  }

  return field.value.trim();
}

function getFieldBlock(field) {
  if (field instanceof HTMLInputElement && field.type === "radio") {
    return field.closest(".form-fieldset");
  }

  return field?.closest(".field-block") || field?.parentElement || null;
}

function showFieldError(errorNode, message) {
  if (!errorNode) {
    return;
  }

  errorNode.textContent = message;
  errorNode.classList.remove("opacity-0");
}

function clearFieldError(errorNode) {
  if (!errorNode) {
    return;
  }

  errorNode.textContent = "";
  errorNode.classList.add("opacity-0");
}

function setSubmittingState(form, isSubmitting) {
  const submitButton = form.querySelector("#btn-submit-lead");
  const buttonLabel = form.querySelector("[data-submit-label]");
  const buttonLoader = form.querySelector("[data-submit-loader]");

  if (
    !(submitButton instanceof HTMLButtonElement) ||
    !(buttonLabel instanceof HTMLElement) ||
    !(buttonLoader instanceof HTMLElement)
  ) {
    return;
  }

  submitButton.disabled = isSubmitting;
  submitButton.setAttribute("aria-busy", String(isSubmitting));
  submitButton.classList.toggle("opacity-70", isSubmitting);
  submitButton.classList.toggle("cursor-not-allowed", isSubmitting);
  buttonLabel.textContent = isSubmitting
    ? "A enviar pedido..."
    : "Enviar pedido";
  buttonLoader.classList.toggle("hidden", !isSubmitting);
}

function isValidPhoneNumber(value) {
  const normalized = value.replace(/\s+/g, "");

  if (!/^\+?[0-9().-]+$/.test(normalized)) {
    return false;
  }

  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function getErrorType(fieldName, value) {
  if (!value) {
    return "required";
  }

  if (fieldName === "email") {
    return "invalid_email";
  }

  if (fieldName === "phone") {
    return "invalid_phone";
  }

  return "invalid";
}

function validateForm(form, pageMeta, formType) {
  const errors = {};
  const requiredFields = ["name", "email", "phone"];

  if (formType === "typeA") {
    requiredFields.push("model_interest");
  } else {
    requiredFields.push("version", "interest_type");
  }

  requiredFields.forEach((fieldName) => {
    const value = getFieldValue(form, fieldName);
    if (!value) {
      errors[fieldName] = {
        message: "Campo obrigat\u00f3rio.",
        type: "required",
      };
    }
  });

  const email = getFieldValue(form, "email");
  if (email && !emailPattern.test(email)) {
    errors.email = {
      message: "Introduza um e-mail v\u00e1lido.",
      type: "invalid_email",
    };
  }

  const phone = getFieldValue(form, "phone");
  if (phone && !isValidPhoneNumber(phone)) {
    errors.phone = {
      message: "Introduza um telefone v\u00e1lido.",
      type: "invalid_phone",
    };
  }

  if (Object.keys(errors).length > 0) {
    const [fieldName, fieldError] = Object.entries(errors)[0];
    pushEvent("form_error", {
      form_id: "lead-form",
      page_model: pageMeta.pageModel,
      page_path: window.location.pathname,
      error_field: fieldName,
      error_type:
        fieldError.type || getErrorType(fieldName, getFieldValue(form, fieldName)),
    });
  }

  return errors;
}

function renderTypeFields(formType, pageConfig) {
  if (formType === "typeA") {
    return `
      <div class="field-block relative">
        <label class="${labelClassName}" for="model_interest">Modelo de interesse</label>
        <select class="${inputClassName}" id="model_interest" name="model_interest" required>
          ${buildSelectOptions(modelInterestOptions, "Selecionar modelo")}
        </select>
      </div>
      <div class="field-block relative">
        <label class="${labelClassName}" for="message">Mensagem</label>
        <textarea class="${inputClassName} min-h-[132px] resize-y py-3" id="message" name="message" placeholder="Descreva brevemente o que procura"></textarea>
      </div>
    `;
  }

  return `
    <div class="field-block relative">
      <label class="${labelClassName}" for="version">Vers\u00e3o</label>
      <select class="${inputClassName}" id="version" name="version" required>
        ${buildSelectOptions(pageConfig.versions, "Selecionar vers\u00e3o")}
      </select>
    </div>
    <div class="field-block form-fieldset relative">
      <label class="${labelClassName}" for="interest_type">Tipo de interesse</label>
      <select class="${inputClassName}" id="interest_type" name="interest_type" required>
        ${buildSelectOptions(interestTypeOptions, "Selecionar interesse")}
      </select>
    </div>
  `;
}

export function createLeadForm({ pageConfig, pageMeta }) {
  const formType = pageConfig.pageKind;
  const wrapper = document.createElement("section");

  wrapper.innerHTML = `
    <div class="relative z-10 mx-auto -mt-32 grid w-[min(95.9%,1170px)] gap-5 rounded-t-[32px] border border-b-0 bg-white p-5 md:gap-6 md:p-7 lg:grid-cols-[minmax(280px,0.72fr)_minmax(420px,0.95fr)] lg:p-8">
      <div class="order-2 my-auto grid h-fit content-start gap-6 rounded-[32px] border border-neutral-200/50 bg-gradient-to-b from-[#fafafa] to-[#f3f4f6] p-6 md:p-8 lg:order-1" data-form-stage="panel">
        <div>
          <p class="mb-2 text-[12px] font-bold uppercase tracking-[0.15rem] text-[#c3002f]">
            ${pageConfig.eyebrow}
          </p>
          <h2 class="m-0 text-[clamp(2rem,1.8rem+1vw,2.8rem)] font-extrabold uppercase leading-[0.95] tracking-tighter text-neutral-900">
            A proposta certa <br />para a sua <span class="text-[#c3002f]">escolha.</span>
          </h2>
          <p class="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-neutral-600">
            Fale com a equipa certa, receba uma proposta clara e avance mais depressa para o Nissan que procura.
          </p>
        </div>

        <div class="rounded-[24px] bg-neutral-950 p-6 text-white shadow-xl">
          <p class="mb-4 text-[12px] font-bold uppercase tracking-[0.1rem] text-neutral-400">
            Porque converter aqui
          </p>
          <ul class="m-0 grid gap-3 p-0">
            <li class="flex list-none items-start gap-3 text-[14px] leading-tight text-neutral-200">
              <span class="font-bold text-[#c3002f]">-</span>
              <span>Resposta comercial mais r\u00e1pida e focada no modelo escolhido.</span>
            </li>
            <li class="flex list-none items-start gap-3 text-[14px] leading-tight text-neutral-200">
              <span class="font-bold text-[#c3002f]">-</span>
              <span>Proposta, cat\u00e1logo ou test drive tratados no mesmo pedido.</span>
            </li>
            <li class="flex list-none items-start gap-3 text-[14px] leading-tight text-neutral-200">
              <span class="font-bold text-[#c3002f]">-</span>
              <span>Contacto simples, sem passos desnecess\u00e1rios.</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="order-1 lg:sticky lg:top-28 lg:order-2" data-form-stage="card">
        <div class="rounded-[32px] border border-neutral-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-7">
          <div class="mb-5 border-b border-neutral-100 pb-4">
            <p class="mb-2 text-[11px] uppercase tracking-[0.09rem] text-neutral-500">${pageConfig.categoryLabel}</p>
            <h2 class="m-0 text-[24px] uppercase leading-[1.1] text-neutral-950">Pe\u00e7a contacto</h2>
            <p class="mt-3 max-w-[44ch] text-[14px] leading-[1.6] text-neutral-600">
              Um formul\u00e1rio objetivo, com campos claros e sem excesso de informa\u00e7\u00e3o.
            </p>
          </div>

          <form class="grid gap-4" id="lead-form" novalidate>
            <div class="grid gap-4 md:grid-cols-2">
              <div class="field-block relative">
                <label class="${labelClassName}" for="name">Nome</label>
                <input class="${inputClassName}" id="name" name="name" type="text" placeholder="Nome completo" autocomplete="name" required />
              </div>
              <div class="field-block relative">
                <label class="${labelClassName}" for="email">E-mail</label>
                <input class="${inputClassName}" id="email" name="email" type="email" placeholder="nome@email.com" autocomplete="email" inputmode="email" required />
              </div>
            </div>

            <div class="field-block relative">
              <label class="${labelClassName}" for="phone">Telefone</label>
              <input class="${inputClassName}" id="phone" name="phone" type="tel" placeholder="+351 910 000 000" autocomplete="tel" inputmode="tel" required />
            </div>

            ${renderTypeFields(formType, pageConfig)}

            <label class="field-block flex cursor-pointer gap-3 rounded-[20px] border border-neutral-200 bg-neutral-50 px-4 py-4 text-[13px] leading-[1.6] text-neutral-600 transition hover:border-neutral-300 sm:items-center">
              <input type="checkbox" name="consent" class="mt-1 h-4 w-4 rounded border-neutral-300 accent-[#c3002f]" />
              <span>
                Aceito ser contactado para seguimento deste pedido.
              </span>
            </label>

            <div id="form-feedback"></div>

            <button class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#c3002f] px-5 text-[14px] font-semibold uppercase tracking-[0.05rem] text-white shadow-[0_18px_40px_rgba(195,0,47,0.24)] transition hover:bg-[#920023] disabled:pointer-events-none" id="btn-submit-lead" type="submit">
              <span data-submit-loader class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"></span>
              <span data-submit-label>Enviar pedido</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  const form = wrapper.querySelector("#lead-form");
  const feedback = wrapper.querySelector("#form-feedback");
  const fields = Array.from(form.querySelectorAll("input, select, textarea"));
  const trackedFields = new Set();
  let hasTrackedFormView = false;

  const observeFormView = () => {
    if (!("IntersectionObserver" in window)) {
      pushEvent("form_view", {
        form_id: "lead-form",
        page_path: window.location.pathname,
        page_type: pageMeta.pageType,
        page_model: pageMeta.pageModel,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasTrackedFormView) {
          return;
        }

        hasTrackedFormView = true;
        pushEvent("form_view", {
          form_id: "lead-form",
          page_path: window.location.pathname,
          page_type: pageMeta.pageType,
          page_model: pageMeta.pageModel,
        });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(form);
  };

  observeFormView();

  fields.forEach((field) => {
    const block = getFieldBlock(field);

    if (block && !block.querySelector(".form-error")) {
      block.appendChild(createFieldError());
    }

    field.addEventListener(
      "focus",
      () => {
        if (form.dataset.started === "true") {
          return;
        }

        form.dataset.started = "true";
        pushEvent("form_start", {
          form_id: "lead-form",
          page_model: pageMeta.pageModel,
          page_path: window.location.pathname,
        });
      },
      { once: true },
    );

    const trackFieldInteraction = () => {
      const fieldName = field.getAttribute("name");
      if (!fieldName || trackedFields.has(fieldName) || !getFieldValue(form, fieldName)) {
        return;
      }

      trackedFields.add(fieldName);
      pushEvent("form_field_interaction", {
        form_id: "lead-form",
        field_name: fieldName,
        page_model: pageMeta.pageModel,
        page_path: window.location.pathname,
      });
    };

    field.addEventListener("input", () => {
      clearFieldError(getFieldBlock(field)?.querySelector(".form-error"));
      trackFieldInteraction();
    });

    field.addEventListener("change", () => {
      clearFieldError(getFieldBlock(field)?.querySelector(".form-error"));
      trackFieldInteraction();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    feedback.innerHTML = "";

    form.querySelectorAll(".form-error").forEach((node) => {
      clearFieldError(node);
    });

    pushEvent("form_submit_attempt", {
      form_id: "lead-form",
      page_model: pageMeta.pageModel,
      page_path: window.location.pathname,
      interest_type:
        formType === "typeB" ? getFieldValue(form, "interest_type") : null,
      version: formType === "typeB" ? getFieldValue(form, "version") : null,
    });

    const errors = validateForm(form, pageMeta, formType);
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([fieldName, error]) => {
        const field = form.elements.namedItem(fieldName);

        if (field instanceof RadioNodeList) {
          showFieldError(
            form.querySelector(".form-fieldset .form-error"),
            error.message,
          );
          return;
        }

        showFieldError(
          getFieldBlock(field)?.querySelector(".form-error"),
          error.message,
        );
      });
      return;
    }

    const name = getFieldValue(form, "name");
    const email = getFieldValue(form, "email");
    const phone = getFieldValue(form, "phone");
    const version =
      formType === "typeB" ? getFieldValue(form, "version") : null;
    const interestType =
      formType === "typeB" ? getFieldValue(form, "interest_type") : null;
    const modelInterest =
      formType === "typeA" ? getFieldValue(form, "model_interest") : null;
    const message =
      formType === "typeA" ? getFieldValue(form, "message") : null;

    pushEvent("lead_submit", {
      form_id: "lead-form",
      page_model: pageMeta.pageModel,
      form_model: formType === "typeB" ? pageMeta.pageModel : modelInterest,
      form_version: version,
      form_model_interest: formType === "typeA" ? modelInterest : null,
      form_interest_type: interestType,
      form_has_message: Boolean(message),
    });

    setSubmittingState(form, true);

    try {
      const result = await sendToWebhook({
        page_type: pageMeta.pageType,
        event_type: "lead_submit",
        name,
        email,
        phone,
        model: pageMeta.pageModel,
        version,
        model_interest: modelInterest,
        interest_type: interestType,
        message,
      });

      if (!result.success) {
        throw new Error(result.error || "Falha ao enviar o pedido.");
      }

      pushEvent("form_submit_success", {
        form_id: "lead-form",
        page_model: pageMeta.pageModel,
        page_path: window.location.pathname,
        interest_type: interestType,
        version,
      });

      const success = document.createElement("div");
      success.className =
        "rounded-[16px] border border-green-300 bg-green-50 px-4 py-3 text-[13px] text-green-800";
      success.textContent =
        "Pedido enviado com sucesso. Um consultor poder\u00e1 acompanhar o seu interesse a partir deste pedido.";
      feedback.replaceChildren(success);
      form.reset();
      form.dataset.started = "false";
      trackedFields.clear();
    } catch (error) {
      pushEvent("form_submit_failure", {
        form_id: "lead-form",
        page_model: pageMeta.pageModel,
        page_path: window.location.pathname,
        error_message:
          error instanceof Error ? error.message : "unknown_error",
      });

      const failure = document.createElement("div");
      failure.className =
        "rounded-[16px] border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-800";
      failure.textContent =
        "N\u00e3o foi poss\u00edvel enviar o pedido agora. Tente novamente dentro de instantes.";
      feedback.replaceChildren(failure);
      console.error("[LeadForm] Erro ao enviar pedido:", error);
    } finally {
      setSubmittingState(form, false);
    }
  });

  return wrapper;
}
