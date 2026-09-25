'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AIChatBot = dynamic(() => import('./AIChatBot'), { ssr: false });

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setForm({ name:'', email:'', subject:'', message:'' });
        setTimeout(() => setStatus(null), 7000);
      } else {
        setStatus('error'); setErrMsg(data.error || 'Failed to send.');
      }
    } catch {
      setStatus('error'); setErrMsg('Network error. Please email directly.');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Let&apos;s Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Open to opportunities, collaborations, or just talking AI and tech.</p>
        </div>
        <div className="contact-grid">
          <div>
            <div className="contact-info-grid">
              {[
                ['📧','Email','alishan.cs01@gmail.com','mailto:alishan.cs01@gmail.com'],
                ['🐙','GitHub','github.com/Alishan45','https://github.com/Alishan45'],
                ['💼','LinkedIn','ali-shan-542246235','https://linkedin.com/in/ali-shan-542246235'],
                ['🏢','Current Role','Data Scientist — Chang Sheng Agro Chemical',''],
                ['✅','Status','Available for Hire',''],
                ['📍','Location','Wah Cantt, Pakistan · Open to remote',''],
              ].map(([icon, title, val, href]) => (
                <div className="contact-card reveal" key={title}>
                  <div className="contact-icon">{icon}</div>
                  <h4>{title}</h4>
                  {href ? <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer">{val}</a>
                    : title === 'Status' ? <span className="available">{val}</span>
                    : <span>{val}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap">
            <h3 style={{ marginBottom: '20px', fontSize: '1.4rem', color: 'var(--text)' }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              {[
                { name:'name', label:'Name', type:'text', placeholder:'Your name' },
                { name:'email', label:'Email', type:'email', placeholder:'your@email.com' },
                { name:'subject', label:'Subject', type:'text', placeholder:'Project inquiry, collaboration...' },
              ].map(({ name, label, type, placeholder }) => (
                <div className="form-group" key={name}>
                  <label htmlFor={name}>{label}</label>
                  <input id={name} name={name} type={type} placeholder={placeholder}
                    value={form[name]} onChange={handleChange} required />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5}
                  placeholder="Tell me about your project or how I can help..."
                  value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
              {status === 'success' && <div className="form-success show">✅ Message sent! I&apos;ll get back to you soon.</div>}
              {status === 'error' && <div className="form-error show">❌ {errMsg}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
