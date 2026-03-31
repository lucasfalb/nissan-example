type LeadPayload = {
  page_type: string;
  event_type: string;
  name: string;
  email: string;
  phone: string;
  model: string | null;
  version: string | null;
  model_interest: string | null;
  interest_type: string | null;
  message: string | null;
};

export async function sendToWebhook(payload: LeadPayload) {
  const webhookUrl = import.meta.env.PUBLIC_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: 'Webhook não configurado.' };
  }

  const body = {
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
    page_type: payload.page_type,
    event_type: payload.event_type,
    form_data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      model: payload.model,
      version: payload.version,
      model_interest: payload.model_interest,
      interest_type: payload.interest_type,
      message: payload.message
    },
    datalayer_snapshot: [...(window.dataLayer || [])]
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body)
    });

    return { success: true };
  } catch (error) {
    console.error('[Webhook] Erro ao enviar:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'unknown_error'
    };
  }
}
