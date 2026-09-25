'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const STRINGS = [
  'AI & Machine Learning Engineer',
  'Data Scientist',
  'Computer Vision Specialist',
  'LLM & RAG Pipeline Builder',
  'Full-Stack ML Developer',
];

export default function Hero() {
  const twRef = useRef(null);
  const canvasRef = useRef(null);

  // Typewriter
  useEffect(() => {
    let idx = 0, charIdx = 0, deleting = false, timer;
    const tick = () => {
      const el = twRef.current;
      if (!el) return;
      const str = STRINGS[idx];
      if (deleting) {
        el.textContent = str.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; idx = (idx + 1) % STRINGS.length; timer = setTimeout(tick, 400); return; }
        timer = setTimeout(tick, 40);
      } else {
        el.textContent = str.slice(0, ++charIdx);
        if (charIdx === str.length) { deleting = true; timer = setTimeout(tick, 1800); return; }
        timer = setTimeout(tick, 60);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], raf;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 70; i++)
      particles.push({ x: Math.random()*1920, y: Math.random()*900, r: Math.random()*2+0.5, dx: (Math.random()-0.5)*0.4, dy: (Math.random()-0.5)*0.4, a: Math.random()*0.5+0.1 });
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(99,102,241,${p.a})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x<0||p.x>W) p.dx*=-1;
        if (p.y<0||p.y>H) p.dy*=-1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);

  const Avatar = ({ className }) => (
    <div className={`hero-avatar ${className}`}>
      <div className="av-ring av-ring1" />
      <div className="av-ring av-ring2" />
      <div className="av-ring av-ring3" />
      <Image src="/images/profile/ali-shan-ai-ml-engineer.jpg" alt="Ali Shan — AI & ML Engineer" fill
        className="av-img" priority sizes="(max-width: 992px) 240px, 380px" style={{ objectFit:'cover', borderRadius:'50%' }} />
      <div className="av-badges">
        <div className="av-badge av-b1">AI</div>
        <div className="av-badge av-b2">ML</div>
        <div className="av-badge av-b3">CV</div>
        <div className="av-badge av-b4">LLM</div>
      </div>
    </div>
  );

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
        <canvas ref={canvasRef} id="particle-canvas" />
      </div>

      <div className="hero-inner container">
        <div className="hero-content">
          <div className="hero-badge"><span className="badge-dot" />Open to opportunities</div>
          <Avatar className="mobile-avatar" />
          <h1 className="hero-title">Hi, I&apos;m <span className="gradient-text">Ali Shan</span></h1>
          <div className="hero-typewriter">
            <span ref={twRef} id="tw-text" />
            <span className="cursor">|</span>
          </div>
          <p className="hero-desc">
            Results-driven <strong>AI & Machine Learning Engineer</strong> and <strong>Data Scientist</strong> with 2+ years building
            end-to-end ML systems across <strong>Computer Vision</strong>, <strong>NLP</strong>, <strong>Generative AI</strong>, and
            <strong> Data Analytics</strong>.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-ghost">Get In Touch</a>
          </div>
          <div className="hero-stats">
            {[['33+','GitHub Repos'],['2+','Years Exp'],['8+','Client Projects'],['3.17','CGPA / 4.0']].map(([n,l],i,arr) => (
              <div key={n} style={{ display: 'contents' }}>
                <div className="stat-item">
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
                {i < arr.length-1 && <div className="stat-div" />}
              </div>
            ))}
          </div>
        </div>

        <Avatar className="desktop-avatar" />
      </div>
    </section>
  );
}
