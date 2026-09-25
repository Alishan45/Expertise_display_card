'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AIChatBot = dynamic(() => import('./AIChatBot'), { ssr: false });

const ICONS = {
  email: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  github: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
  linkedin: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  briefcase: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
  check: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  map: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
};

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(null);
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
                [ICONS.email, 'Email', 'alishan.cs01@gmail.com', 'mailto:alishan.cs01@gmail.com'],
                [ICONS.github, 'GitHub', 'github.com/Alishan45', 'https://github.com/Alishan45'],
                [ICONS.linkedin, 'LinkedIn', 'ali-shan-542246235', 'https://linkedin.com/in/ali-shan-542246235'],
                [ICONS.briefcase, 'Current Role', 'Data Scientist — Chang Sheng Agro Chemical', ''],
                [ICONS.check, 'Status', 'Available for Hire', ''],
                [ICONS.map, 'Location', 'Wah Cantt, Pakistan · Open to remote', ''],
              ].map(([icon, title, val, href]) => (
                <div className="contact-card reveal premium-contact-card" key={title}>
                  <div className="contact-icon">{icon}</div>
                  <h4>{title}</h4>
                  {href ? <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer">{val}</a>
                    : title === 'Status' ? <span className="available">{val}</span>
                    : <span>{val}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap premium-form">
            <h3 style={{ marginBottom: '24px', fontSize: '1.6rem', color: 'var(--text)', fontWeight: 600 }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="Project inquiry, collaboration..." value={form.subject} onChange={handleChange} required />
              </div>
              
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about your project or how I can help..." value={form.message} onChange={handleChange} required />
              </div>
              
              <button type="submit" className="btn btn-primary btn-full premium-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
              
              {status === 'success' && <div className="form-success show" style={{marginTop: '16px'}}>✅ Message sent! I'll get back to you soon.</div>}
              {status === 'error' && <div className="form-error show" style={{marginTop: '16px'}}>❌ {errMsg}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
