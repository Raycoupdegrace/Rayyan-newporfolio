/**
 * Contact form endpoint — delivers submissions straight to the owner's inbox.
 *
 * Delivery order:
 *   1. SMTP via nodemailer (Gmail app password, or any SMTP provider).
 *   2. `CONTACT_WEBHOOK_URL` (Zapier / Make / custom endpoint) as a fallback.
 *
 * If neither is configured the request is rejected in production (so a broken
 * setup never silently swallows a message) and acknowledged in development so
 * the UI flow stays testable.
 */
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16 * 1024;

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return Response.json({ error: 'Request is too large.' }, { status: 413 });
    }

    const reader = request.body?.getReader();
    if (!reader) {
      return Response.json({ error: 'Request body is required.' }, { status: 400 });
    }

    const chunks: Uint8Array[] = [];
    let bodyBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bodyBytes += value.byteLength;
      if (bodyBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return Response.json({ error: 'Request is too large.' }, { status: 413 });
      }
      chunks.push(value);
    }

    const bodyBuffer = new Uint8Array(bodyBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bodyBuffer.set(chunk, offset);
      offset += chunk.byteLength;
    }

    let body: unknown;
    try {
      body = JSON.parse(new TextDecoder().decode(bodyBuffer));
    } catch {
      return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return Response.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const name = typeof input.name === 'string' ? input.name.trim() : '';
    const email = typeof input.email === 'string' ? input.email.trim() : '';
    const message = typeof input.message === 'string' ? input.message.trim() : '';

    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 422 });
    }
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return Response.json(
        { error: 'One or more fields exceed the allowed length.' },
        { status: 422 },
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return Response.json(
        { error: 'Please provide a valid email address.' },
        { status: 422 },
      );
    }
    if (message.length < 10) {
      return Response.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 422 },
      );
    }

    const to = process.env.CONTACT_TO ?? 'muhammadrayyanyuwono@gmail.com';
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    // ---- 1. SMTP (preferred) ----
    if (host && user && pass) {
      const port = Number(process.env.SMTP_PORT ?? 465);
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${user}>`,
        to,
        replyTo: `${name} <${email}>`,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family:system-ui,sans-serif;line-height:1.6">
            <h2 style="margin:0 0 12px">New portfolio message</h2>
            <p style="margin:0"><strong>Name:</strong> ${esc(name)}</p>
            <p style="margin:0"><strong>Email:</strong> ${esc(email)}</p>
            <p style="margin:16px 0 0;white-space:pre-wrap">${esc(message)}</p>
          </div>
        `,
      });

      return Response.json({ ok: true, via: 'smtp' });
    }

    // ---- 2. Webhook fallback ----
    if (webhookUrl) {
      const secret = process.env.CONTACT_WEBHOOK_SECRET;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (secret) headers['x-webhook-secret'] = secret;

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name,
          email,
          message,
          submittedAt: new Date().toISOString(),
          source: 'portfolio',
        }),
      });

      if (!res.ok) {
        console.error('[contact/route] Webhook returned status:', res.status);
        return Response.json(
          { error: 'Upstream delivery failed. Please try later.' },
          { status: 502 },
        );
      }
      return Response.json({ ok: true, via: 'webhook' });
    }

    // ---- 3. Nothing configured ----
    if (process.env.NODE_ENV === 'production') {
      console.error(
        '[contact/route] No delivery channel configured (SMTP_* or CONTACT_WEBHOOK_URL).',
      );
      return Response.json(
        { error: 'Contact delivery is not configured.' },
        { status: 503 },
      );
    }
    return Response.json({ ok: true, dev: true });
  } catch (err) {
    console.error('[contact/route] Delivery failed:', err);
    return Response.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 },
    );
  }
}
