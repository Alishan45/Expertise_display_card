import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: 'All fields are required.' }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
    }

    await sendContactEmail({ name, email, subject, message });
    return NextResponse.json({ ok: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('[api/contact] Error:', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to send email. Please try directly at alishan.cs01@gmail.com' },
      { status: 500 }
    );
  }
}
