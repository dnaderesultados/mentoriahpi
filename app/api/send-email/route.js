import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { nome, email, telefone } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // seu email
        pass: process.env.EMAIL_PASS, // senha/app password
      },
    });

    await transporter.sendMail({
      from: `"Landing Page" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // destino
      subject: "Novo Cadastro",
      text: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}`,
    });

    // API de Conversão do Facebook
    const hashEmail = crypto.createHash("sha256").update(email).digest("hex");
    const hashPhone = crypto.createHash("sha256").update(telefone).digest("hex");

    await fetch(
      `https://graph.facebook.com/v20.0/696320590145627/events?access_token=EAATCxrdtnM8BPoHk0FNlyXPSUM0oZAsglre0ocZAYGqB6dw9RKY73NZCVmPv3WSC7HVFpy9K19O4fr8IkSA1hPrguZBLuoLQOxO5TE70ZCFs9ev5jkVzYNjZC62fTzyXx8KZCsxYgJc2heyOpzklgCRfZA34snmOhuMfez5HGOnHZBBswljUP07g7pXjaJ5O7lBa5nwZDZD`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: "Lead",
              event_time: Math.floor(Date.now() / 1000),
              action_source: "website",
              user_data: {
                em: [hashEmail],
                ph: [hashPhone],
              },
            },
          ],
        }),
      }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
