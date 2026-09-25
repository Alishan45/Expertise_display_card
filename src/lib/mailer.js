import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send contact form email to Ali Shan + auto-reply to sender.
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const to = process.env.CONTACT_TO_EMAIL || 'alishan.cs01@gmail.com';

  // Email to Ali Shan
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0c;color:#f0f0f0;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#6366f1,#a855f7);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:1.4rem;">New Contact Form Submission</h2>
        </div>
        <div style="padding:32px;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#818cf8;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border:1px solid #2a2a35;margin:20px 0;" />
          <p style="white-space:pre-wrap;line-height:1.7;">${message}</p>
        </div>
        <div style="background:#15151a;padding:16px 32px;font-size:0.8rem;color:#6b7280;">
          Sent via alishanportfolio.vercel.app
        </div>
      </div>
    `,
  });

  // Auto-reply to sender
  await transporter.sendMail({
    from: `"Ali Shan" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `Re: ${subject} — Thanks for reaching out!`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0c;color:#f0f0f0;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#6366f1,#a855f7);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;">Thanks for reaching out, ${name}!</h2>
        </div>
        <div style="padding:32px;">
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you as soon as possible, usually within 24–48 hours.</p>
          <p style="margin-top:20px;"><strong>Your message:</strong></p>
          <blockquote style="border-left:3px solid #6366f1;padding-left:16px;color:#9ea3b0;margin:12px 0;">${message}</blockquote>
          <p style="margin-top:24px;">Best regards,<br/><strong>Ali Shan</strong><br/>AI & ML Engineer · Data Scientist</p>
          <div style="margin-top:24px;display:flex;gap:12px;">
            <a href="https://github.com/Alishan45" style="color:#818cf8;">GitHub</a> ·
            <a href="https://linkedin.com/in/ali-shan-542246235" style="color:#818cf8;">LinkedIn</a> ·
            <a href="https://alishanportfolio.vercel.app" style="color:#818cf8;">Portfolio</a>
          </div>
        </div>
      </div>
    `,
  });
}
