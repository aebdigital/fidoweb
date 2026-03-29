import { NextResponse } from "next/server";

const SMTP2GO_API_URL = "https://api.smtp2go.com/v3/email/send";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = clean(body.name);
    const email = clean(body.email);
    const company = clean(body.company);
    const message = clean(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Vyplňte prosím meno, e-mail a správu.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Zadajte prosím platný e-mail.",
        },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    const apiKey = process.env.SMTP2GO_API_KEY;
    const sender = process.env.SMTP2GO_SENDER;

    if (!contactEmail || !apiKey || !sender) {
      return NextResponse.json(
        {
          error: "Kontakt formulár ešte nie je nakonfigurovaný.",
        },
        { status: 500 }
      );
    }

    const lines = [
      `Meno: ${name}`,
      `E-mail: ${email}`,
      `Firma / tím: ${company || "Neuvedené"}`,
      "",
      "Správa:",
      message,
    ];

    const htmlBody = `
      <h2>Nový kontakt z webu FIDO Calcul</h2>
      <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Firma / tím:</strong> ${escapeHtml(company || "Neuvedené")}</p>
      <p><strong>Správa:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `;

    const smtpResponse = await fetch(SMTP2GO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        to: [contactEmail],
        sender,
        reply_to: email,
        subject: `FIDO Calcul kontakt: ${name}`,
        text_body: lines.join("\n"),
        html_body: htmlBody,
      }),
    });

    const smtpData = (await smtpResponse.json()) as {
      data?: { succeeded?: number; error?: string };
      error?: string;
    };

    if (!smtpResponse.ok || !smtpData?.data?.succeeded) {
      return NextResponse.json(
        {
          error: "Správu sa nepodarilo odoslať. Skúste to prosím ešte raz.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Správa bola odoslaná. Ozveme sa vám čo najskôr.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Správu sa nepodarilo odoslať. Skúste to prosím ešte raz.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
