import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      email,
      last_name,
      first_name,
      society,
      department,
      typeClient,
      recaptchaToken,
    } = body;

    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" },
    );

    const recaptchaJson = await recaptchaRes.json();

    const isLocal = process.env.NODE_ENV === "development";
    const minimumScore = isLocal ? 0.1 : 0.5;

    if (!recaptchaJson.success || recaptchaJson.score < minimumScore) {
      return NextResponse.json(
        { error: "Comportement suspect détecté. Inscription impossible..." },
        { status: 403 },
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          nom: last_name,
          prenom: first_name,
          societe: society,
          departement: department,
          type: typeClient,
        },
        listIds: [parseInt(process.env.BREVO_LIST_ID)],
        updateEnabled: false,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 400 && result.code === "duplicate_parameter") {
        return NextResponse.json(
          {
            message:
              "Cette adresse email est déjà inscrite à notre newsletter.",
          },
          { status: 409 },
        );
      }

      console.error("Détails Erreur Brevo:", result);
      return NextResponse.json(
        {
          error: result.message || "Erreur Brevo",
          code: result.code,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
