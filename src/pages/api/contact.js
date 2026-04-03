import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nome, celular, email, imovel, mensagem } = req.body;

    if (!nome || !celular || !email || !mensagem) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const imovelInfo = imovel ? `\n\nImóvel de interesse: ${imovel}` : '';

    await resend.emails.send({
      from: 'Megli Negócios <contato@megli.com.br>',
      to: 'meglinegociosimobiliarios@gmail.com',
      subject: `Nova mensagem de contato - ${nome}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Celular:</strong> ${celular}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${imovelInfo}
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Erro ao enviar email' });
  }
}
