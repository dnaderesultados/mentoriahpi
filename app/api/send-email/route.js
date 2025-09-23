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

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
