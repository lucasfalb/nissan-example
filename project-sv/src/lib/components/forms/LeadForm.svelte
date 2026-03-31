<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import {
    interestTypeOptions,
    modelInterestOptions,
  } from "$lib/content/form-options";
  import type { PageDefinition } from "$lib/types/content";
  import { getPageModel, getPageType } from "$lib/utils/page-meta";
  import { pushEvent } from "$lib/utils/tracking";
  import { sendToWebhook } from "$lib/utils/webhook";

  const emailPattern =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;

  let { page } = $props<{ page: PageDefinition }>();

  let formElement: HTMLFormElement | undefined;

  let name = $state("");
  let email = $state("");
  let phone = $state("");
  let version = $state("");
  let interestType = $state("");
  let modelInterest = $state("");
  let message = $state("");
  let consent = $state(false);
  let isSubmitting = $state(false);
  let feedback = $state<{ type: "success" | "error"; text: string } | null>(
    null,
  );
  let errors = $state<Record<string, string>>({});

  const trackedFields = new Set<string>();
  const formId = "lead-form";
  const isTypeA = $derived(
    page.kind === "campaign" || page.kind === "standalone",
  );
  const pageType = $derived(getPageType(page));
  const pageModel = $derived(getPageModel(page));

  function getValue(fieldName: string) {
    switch (fieldName) {
      case "name":
        return name.trim();
      case "email":
        return email.trim();
      case "phone":
        return phone.trim();
      case "version":
        return version.trim();
      case "interest_type":
        return interestType.trim();
      case "model_interest":
        return modelInterest.trim();
      case "message":
        return message.trim();
      default:
        return "";
    }
  }

  function clearFieldError(fieldName: string) {
    if (!errors[fieldName]) {
      return;
    }

    const nextErrors = { ...errors };
    delete nextErrors[fieldName];
    errors = nextErrors;
  }

  function trackFieldInteraction(fieldName: string) {
    const value = getValue(fieldName);
    if (!value || trackedFields.has(fieldName)) {
      return;
    }

    trackedFields.add(fieldName);
    pushEvent("form_field_interaction", {
      form_id: formId,
      field_name: fieldName,
      page_model: pageModel,
      page_path: page.seo.canonicalPath,
    });
  }

  function handleStart() {
    if (formElement?.dataset.started === "true") {
      return;
    }

    if (formElement) {
      formElement.dataset.started = "true";
    }

    pushEvent("form_start", {
      form_id: formId,
      page_model: pageModel,
      page_path: page.seo.canonicalPath,
    });
  }

  function handleFieldInput(fieldName: string) {
    clearFieldError(fieldName);
    trackFieldInteraction(fieldName);
  }

  function isValidPhoneNumber(value: string) {
    const normalized = value.replace(/\s+/g, "");

    if (!/^\+?[0-9().-]+$/.test(normalized)) {
      return false;
    }

    const digits = value.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 15;
  }

  function validateForm() {
    const nextErrors: Record<string, string> = {};
    const requiredFields = ["name", "email", "phone"];

    if (isTypeA) {
      requiredFields.push("model_interest");
    } else {
      requiredFields.push("version", "interest_type");
    }

    for (const fieldName of requiredFields) {
      if (!getValue(fieldName)) {
        nextErrors[fieldName] = "Campo obrigatorio.";
      }
    }

    if (email && !emailPattern.test(email.trim())) {
      nextErrors.email = "Introduza um e-mail valido.";
    }

    if (phone && !isValidPhoneNumber(phone.trim())) {
      nextErrors.phone = "Introduza um telefone valido.";
    }

    errors = nextErrors;

    const firstError = Object.entries(nextErrors)[0];
    if (firstError) {
      pushEvent("form_error", {
        form_id: formId,
        page_model: pageModel,
        page_path: page.seo.canonicalPath,
        error_field: firstError[0],
      });
    }

    return Object.keys(nextErrors).length === 0;
  }

  function resetForm() {
    name = "";
    email = "";
    phone = "";
    version = "";
    interestType = "";
    modelInterest = "";
    message = "";
    consent = false;
    errors = {};
    trackedFields.clear();

    if (formElement) {
      formElement.dataset.started = "false";
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    feedback = null;

    pushEvent("form_submit_attempt", {
      form_id: formId,
      page_model: pageModel,
      page_path: page.seo.canonicalPath,
      interest_type: isTypeA ? null : interestType || null,
      version: isTypeA ? null : version || null,
    });

    if (!validateForm()) {
      return;
    }

    pushEvent("lead_submit", {
      form_id: formId,
      page_model: pageModel,
      form_model: isTypeA ? modelInterest : pageModel,
      form_version: isTypeA ? null : version || null,
      form_model_interest: isTypeA ? modelInterest : null,
      form_interest_type: isTypeA ? null : interestType || null,
      form_has_message: Boolean(message.trim()),
    });

    isSubmitting = true;

    const result = await sendToWebhook({
      page_type: pageType,
      event_type: "lead_submit",
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      model: pageModel,
      version: isTypeA ? null : version.trim() || null,
      model_interest: isTypeA ? modelInterest.trim() || null : null,
      interest_type: isTypeA ? null : interestType.trim() || null,
      message: isTypeA ? message.trim() || null : null,
    });

    if (!result.success) {
      pushEvent("form_submit_failure", {
        form_id: formId,
        page_model: pageModel,
        page_path: page.seo.canonicalPath,
        error_message: result.error,
      });

      feedback = {
        type: "error",
        text: "Nao foi possivel enviar o pedido agora. Tente novamente dentro de instantes.",
      };
      isSubmitting = false;
      return;
    }

    pushEvent("form_submit_success", {
      form_id: formId,
      page_model: pageModel,
      page_path: page.seo.canonicalPath,
      interest_type: isTypeA ? null : interestType || null,
      version: isTypeA ? null : version || null,
    });

    feedback = {
      type: "success",
      text: "Pedido enviado com sucesso. Um consultor podera acompanhar o seu interesse a partir deste pedido.",
    };
    resetForm();
    isSubmitting = false;
  }

  onMount(() => {
    if (!browser || !formElement) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      pushEvent("form_view", {
        form_id: formId,
        page_path: page.seo.canonicalPath,
        page_type: pageType,
        page_model: pageModel,
      });
      return;
    }

    let hasTrackedView = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasTrackedView) {
          return;
        }

        hasTrackedView = true;
        pushEvent("form_view", {
          form_id: formId,
          page_path: page.seo.canonicalPath,
          page_type: pageType,
          page_model: pageModel,
        });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(formElement);

    return () => {
      observer.disconnect();
    };
  });
</script>

<section
  class="relative z-10 mx-auto -mt-32 grid w-[min(95.9%,1170px)] rounded-t-[32px] gap-5 rounded-t-4xl border border-neutral-200/70 border-b-0 bg-white p-5 md:gap-6 md:p-7 lg:grid-cols-[minmax(280px,0.72fr)_minmax(420px,0.95fr)] lg:p-8"
>
  <div
    class="order-2 my-auto grid h-fit content-start gap-6 rounded-[32px] border border-neutral-200/50 bg-linear-to-b from-[#fafafa] to-[#f3f4f6] p-6 md:p-8 lg:order-1"
    data-form-stage="panel"
  >
    <div>
      <p
        class="mb-2 text-[12px] font-bold uppercase tracking-[0.15rem] text-[#c3002f]"
      >
        {page.eyebrow}
      </p>
      <h2
        class="m-0 text-[clamp(2rem,1.8rem+1vw,2.8rem)] font-extrabold uppercase leading-[0.95] tracking-tighter text-neutral-900"
      >
        A proposta certa <br />para a sua
        <span class="text-[#c3002f]">escolha.</span>
      </h2>
      <p class="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-neutral-600">
        Fale com a equipa certa, receba uma proposta clara e avance mais
        depressa para o Nissan que procura.
      </p>
    </div>

    <div class="rounded-[24px] bg-neutral-950 p-6 text-white shadow-xl">
      <p
        class="mb-4 text-[12px] font-bold uppercase tracking-[0.1rem] text-neutral-400"
      >
        Porque converter aqui
      </p>
      <ul class="m-0 grid gap-3 p-0">
        <li
          class="flex list-none items-start gap-3 text-[14px] leading-tight text-neutral-200"
        >
          <span class="font-bold text-[#c3002f]">-</span>
          <span
            >Resposta comercial mais rapida e focada no modelo escolhido.</span
          >
        </li>
        <li
          class="flex list-none items-start gap-3 text-[14px] leading-tight text-neutral-200"
        >
          <span class="font-bold text-[#c3002f]">-</span>
          <span>Proposta, catalogo ou test drive tratados no mesmo pedido.</span
          >
        </li>
        <li
          class="flex list-none items-start gap-3 text-[14px] leading-tight text-neutral-200"
        >
          <span class="font-bold text-[#c3002f]">-</span>
          <span>Contacto simples, sem passos desnecessarios.</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="order-1 lg:sticky lg:top-28 lg:order-2" data-form-stage="card">
    <div
      class="rounded-[32px] border border-neutral-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-7"
    >
      <div class="mb-5 border-b border-neutral-100 pb-4">
        <p
          class="mb-2 text-[11px] uppercase tracking-[0.09rem] text-neutral-500"
        >
          {page.categoryLabel}
        </p>
        <h2 class="m-0 text-[24px] uppercase leading-[1.1] text-neutral-950">
          Peca contacto
        </h2>
        <p class="mt-3 max-w-[44ch] text-[14px] leading-[1.6] text-neutral-600">
          Um formulario objetivo, com campos claros e sem excesso de informacao.
        </p>
      </div>

      <form
        bind:this={formElement}
        class="grid gap-4"
        id={formId}
        novalidate
        onsubmit={handleSubmit}
      >
        <div class="grid gap-4 md:grid-cols-2">
          <div class="relative">
            <label
              class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700"
              for="name">Nome</label
            >
            <input
              bind:value={name}
              class="min-h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-neutral-400 focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10"
              id="name"
              name="name"
              type="text"
              placeholder="Nome completo"
              autocomplete="name"
              required
              onfocus={handleStart}
              oninput={() => handleFieldInput("name")}
            />
            {#if errors.name}<div class="mt-2 text-[11px] text-[#c3002f]">
                {errors.name}
              </div>{/if}
          </div>

          <div class="relative">
            <label
              class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700"
              for="email">E-mail</label
            >
            <input
              bind:value={email}
              class="min-h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-neutral-400 focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10"
              id="email"
              name="email"
              type="email"
              placeholder="nome@email.com"
              autocomplete="email"
              inputmode="email"
              required
              onfocus={handleStart}
              oninput={() => handleFieldInput("email")}
            />
            {#if errors.email}<div class="mt-2 text-[11px] text-[#c3002f]">
                {errors.email}
              </div>{/if}
          </div>
        </div>

        <div class="relative">
          <label
            class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700"
            for="phone">Telefone</label
          >
          <input
            bind:value={phone}
            class="min-h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-neutral-400 focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10"
            id="phone"
            name="phone"
            type="tel"
            placeholder="+351 910 000 000"
            autocomplete="tel"
            inputmode="tel"
            required
            onfocus={handleStart}
            oninput={() => handleFieldInput("phone")}
          />
          {#if errors.phone}<div class="mt-2 text-[11px] text-[#c3002f]">
              {errors.phone}
            </div>{/if}
        </div>

        {#if isTypeA}
          <div class="relative">
            <label
              class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700"
              for="model_interest">Modelo de interesse</label
            >
            <select
              bind:value={modelInterest}
              class="min-h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10"
              id="model_interest"
              name="model_interest"
              required
              onfocus={handleStart}
              onchange={() => handleFieldInput("model_interest")}
            >
              <option value="">Selecionar modelo</option>
              {#each modelInterestOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
            {#if errors.model_interest}<div
                class="mt-2 text-[11px] text-[#c3002f]"
              >
                {errors.model_interest}
              </div>{/if}
          </div>

          <div class="relative">
            <label
              class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700"
              for="message">Mensagem</label
            >
            <textarea
              bind:value={message}
              class="min-h-[132px] w-full resize-y rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-neutral-400 focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10"
              id="message"
              name="message"
              placeholder="Descreva brevemente o que procura"
              onfocus={handleStart}
              oninput={() => handleFieldInput("message")}
            ></textarea>
          </div>
        {:else}
          <div class="relative">
            <label
              class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700"
              for="version">Versao</label
            >
            <select
              bind:value={version}
              class="min-h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10"
              id="version"
              name="version"
              required
              onfocus={handleStart}
              onchange={() => handleFieldInput("version")}
            >
              <option value="">Selecionar versao</option>
              {#if "versions" in page}
                {#each page.versions as option}
                  <option value={option}>{option}</option>
                {/each}
              {/if}
            </select>
            {#if errors.version}<div class="mt-2 text-[11px] text-[#c3002f]">
                {errors.version}
              </div>{/if}
          </div>

          <div class="relative">
            <label
              class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.09rem] text-neutral-700"
              for="interest_type">Tipo de interesse</label
            >
            <select
              bind:value={interestType}
              class="min-h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[14px] text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:border-[#c3002f] focus:bg-white focus:ring-4 focus:ring-[#c3002f]/10"
              id="interest_type"
              name="interest_type"
              required
              onfocus={handleStart}
              onchange={() => handleFieldInput("interest_type")}
            >
              <option value="">Selecionar interesse</option>
              {#each interestTypeOptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
            {#if errors.interest_type}<div
                class="mt-2 text-[11px] text-[#c3002f]"
              >
                {errors.interest_type}
              </div>{/if}
          </div>
        {/if}

        <label
          class="flex cursor-pointer gap-3 rounded-[20px] border border-neutral-200 bg-neutral-50 px-4 py-4 text-[13px] leading-[1.6] text-neutral-600 transition hover:border-neutral-300 sm:items-center"
        >
          <input
            bind:checked={consent}
            type="checkbox"
            name="consent"
            class="mt-1 h-4 w-4 rounded border-neutral-300 accent-[#c3002f]"
          />
          <span>Aceito ser contactado para seguimento deste pedido.</span>
        </label>

        {#if feedback}
          <div
            class={`rounded-[16px] px-4 py-3 text-[13px] ${feedback.type === "success" ? "border border-green-300 bg-green-50 text-green-800" : "border border-red-300 bg-red-50 text-red-800"}`}
          >
            {feedback.text}
          </div>
        {/if}

        <button
          class="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#c3002f] px-5 text-[14px] font-semibold uppercase tracking-[0.05rem] text-white shadow-[0_18px_40px_rgba(195,0,47,0.24)] transition hover:bg-[#920023] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70"
          id="btn-submit-lead"
          type="submit"
          disabled={isSubmitting}
        >
          <span
            data-submit-loader
            class:hidden={!isSubmitting}
            class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
          ></span>
          <span data-submit-label
            >{isSubmitting ? "A enviar pedido..." : "Enviar pedido"}</span
          >
        </button>
      </form>
    </div>
  </div>
</section>
