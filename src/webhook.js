import { WEBHOOK_URL } from "./lib/env.js";

export async function sendToWebhook(payload) {
  if (!WEBHOOK_URL) {
    return { success: false, error: "Webhook não configurado." };
  }

  const body = {
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
    page_type: payload.page_type,
    event_type: payload.event_type,
    form_data: {
      name: payload.name ?? null,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      model: payload.model ?? null,
      version: payload.version ?? null,
      model_interest: payload.model_interest ?? null,
      interest_type: payload.interest_type ?? null,
      message: payload.message ?? null,
    },
    datalayer_snapshot: [...(window.dataLayer || [])],
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(body),
    });
    return { success: true };
  } catch (error) {
    console.error("[Webhook] Erro ao enviar:", error);
    return { success: false, error: error.message };
  }
}
