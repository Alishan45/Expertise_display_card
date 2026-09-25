import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_CONTEXT = `You are Ali Shan's portfolio assistant. Ali Shan is an AI & Machine Learning Engineer and Data Scientist based in Pakistan.

Key facts about Ali Shan:
- Current role: Data Scientist at Chang Sheng Agro Chemical Pvt Ltd (Nov 2025–Present)
- Freelance AI Engineer (Jan 2023–Present) — 8+ client projects delivered
- Internships: AISoftDevs (AI Intern, Jul–Oct 2025), Pakistan Ordnance Factories (ML Intern, Jun–Aug 2024)
- Education: B.Sc. (Hons) Computer Science — COMSATS University Islamabad, Wah Campus — CGPA 3.17/4.00 (2021–2025)
- Skills: PyTorch, TensorFlow, YOLO, LangChain, RAG, FastAPI, React/Next.js, Docker, AWS, Power BI
- Achievements: COMSATS AI Hackathon 2024 Winner, Lead ML Mentor at Google DSC
- Contact: alishan.cs01@gmail.com | GitHub: Alishan45 | LinkedIn: ali-shan-542246235
- Languages: Python, C++, Java, JavaScript/TypeScript, Dart, Bash

Answer questions about Ali's skills, projects, experience, and availability. Be concise and professional. If asked something unrelated to Ali's portfolio, politely redirect. Never invent facts not listed above.`;

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();
    if (!message) return NextResponse.json({ ok: false, error: 'No message provided.' }, { status: 400 });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      systemInstruction: SYSTEM_CONTEXT
    });

    // Remove the initial hardcoded 'model' greeting from the history to prevent role collision.
    // Gemini strictly requires alternating user/model roles.
    const cleanHistory = history.filter((m, i) => !(i === 0 && m.role === 'model'));

    const chat = model.startChat({
      history: cleanHistory.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error('[api/chat] Gemini error:', err);
    return NextResponse.json(
      { ok: false, reply: "I'm having trouble connecting right now. Please email Ali directly at alishan.cs01@gmail.com" },
      { status: 200 }
    );
  }
}
