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
    subject: `Portfolio Message from ${name}: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f9fafb; -webkit-font-smoothing: antialiased;">
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4f46e5; padding: 24px 20px; text-align: center;">
            <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">New Contact Submission</h2>
          </div>
          <div style="padding: 24px 20px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 80px;">Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4f46e5; font-size: 15px; font-weight: 500;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Subject:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 500;">${subject}</td>
              </tr>
            </table>
            <h3 style="color: #374151; font-size: 15px; margin-bottom: 12px; font-weight: 600;">Message:</h3>
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${message}</div>
          </div>
          <div style="background-color: #f3f4f6; padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
            Received from <a href="https://alishanportfolio.vercel.app" style="color: #4f46e5; text-decoration: none;">Your Portfolio Website</a>
          </div>
        </div>
      </body>
      </html>
    `,
  });

  // Auto-reply to sender
  await transporter.sendMail({
    from: `"Ali Shan" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `Re: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f9fafb; -webkit-font-smoothing: antialiased;">
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4f46e5; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Message Received!</h1>
            <p style="margin: 8px 0 0; color: #e0e7ff; font-size: 15px;">Thank you for getting in touch, ${name}.</p>
          </div>
          <div style="padding: 24px 20px;">
            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-top: 0;">Hi ${name},</p>
            <p style="color: #374151; font-size: 15px; line-height: 1.6;">Thank you for contacting me regarding <strong>"${subject}"</strong>. I have successfully received your message and will review it shortly. You can expect to hear back from me within 24 to 48 hours.</p>
            <div style="margin: 24px 0; border-left: 4px solid #4f46e5; padding-left: 16px;">
              <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Your Message:</p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic; word-break: break-word;">"${message}"</p>
            </div>
            <p style="color: #374151; font-size: 15px; line-height: 1.6;">Best regards,<br><strong style="color: #111827; font-size: 16px; display: inline-block; margin-top: 8px;">Ali Shan</strong><br><span style="color: #6b7280; font-size: 13px;">AI & ML Engineer · Data Scientist</span></p>
          </div>
          <div style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 20px; text-align: center;">
            <p style="margin: 0 0 16px; color: #6b7280; font-size: 13px;">Connect with me:</p>
            <div>
              <a href="https://linkedin.com/in/ali-shan-542246235" style="display: inline-block; padding: 8px 16px; background-color: #ffffff; border: 1px solid #d1d5db; color: #374151; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500; margin: 4px;">LinkedIn</a>
              <a href="https://github.com/Alishan45" style="display: inline-block; padding: 8px 16px; background-color: #ffffff; border: 1px solid #d1d5db; color: #374151; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500; margin: 4px;">GitHub</a>
              <a href="https://alishanportfolio.vercel.app" style="display: inline-block; padding: 8px 16px; background-color: #ffffff; border: 1px solid #d1d5db; color: #374151; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500; margin: 4px;">Portfolio</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}
