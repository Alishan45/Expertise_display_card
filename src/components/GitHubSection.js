'use client';
import { useEffect, useRef } from 'react';

const FEATURED_NAMES = ['Medbot','HeartVision-AI','conceal-weaponDetection','skinCancerClassifcation','GPT-Vision-Docs-LLM','medbot_vectorizedDatasetWithLLMS','dental-implant-detection-','eye-gender-classifier','futuristic-emotion-detector','plant_desease_classifier','satilliteHouseDetection','AI-Content-to-PDF-Enhancer','yoloModelsInference','sk_professors','RAG-Full-parameterized-fine-tuning','Multi_Camera_Surveillance_Person_Reid_Tracking','DataScienceMastery'];

function langBadge(lang) {
  if (!lang) return 'rl-other';
  if (lang.includes('Python')) return 'rl-python';
  if (lang.includes('TypeScript')) return 'rl-ts';
  if (lang.includes('JavaScript')) return 'rl-js';
  if (lang.includes('Jupyter')) return 'rl-jupyter';
  return 'rl-other';
}

export default function GitHubSection({ repos = [], langStats = [] }) {
  const barRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('animated'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    barRefs.current.forEach(b => b && observer.observe(b));
    return () => observer.disconnect();
  }, [langStats]);

  const moreRepos = repos.filter(r => !FEATURED_NAMES.includes(r.name) && !r.fork && !r.archived);
  const total = repos.length;

  // Compute tech bars from actual data or fallback
  const displayStats = langStats.length > 0 ? langStats.slice(0, 5) : [
    { lang: 'Jupyter Notebook', count: 14 },
    { lang: 'Python', count: 9 },
    { lang: 'TypeScript', count: 4 },
    { lang: 'JavaScript', count: 2 },
    { lang: 'HTML/CSS/Other', count: 4 },
  ];
  const maxCount = Math.max(...displayStats.map(s => s.count), 1);

  function dotClass(lang) {
    if (lang.includes('Jupyter')) return 'd-jupyter';
    if (lang.includes('Python')) return 'd-python';
    if (lang.includes('TypeScript')) return 'd-ts';
    if (lang.includes('JavaScript')) return 'd-js';
    return 'd-other';
  }

  return (
    <section className="section" id="github">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Open Source</span>
          <h2 className="section-title">GitHub Activity</h2>
          <p className="section-subtitle">{total || 33} public repositories across AI, ML, Data Science, and Full-Stack development.</p>
        </div>

        <div className="gh-stats-grid">
          <div className="gh-profile-card">
            <div className="gh-avatar-emoji">🐙</div>
            <h3><a href="https://github.com/Alishan45" target="_blank" rel="noopener noreferrer">Alishan45</a></h3>
            <p>{total || 33} public repositories</p>
            <a href="https://github.com/Alishan45" target="_blank" rel="noopener noreferrer"
              className="btn btn-outline" style={{ marginTop: 8 }}>Visit GitHub Profile →</a>
          </div>

          <div className="tech-dist">
            <h3>Technology Distribution</h3>
            <p className="tech-note">Based on actual GitHub repository data</p>
            <div className="tech-bars">
              {displayStats.map(({ lang, count }, i) => {
                const pct = Math.round((count / maxCount) * 100);
                return (
                  <div className="tech-bar-item" key={lang}>
                    <div className="tech-bar-label">
                      <span className={`lang-dot ${dotClass(lang)}`} />
                      {lang}
                      <span className="tech-count">{count} repos</span>
                    </div>
                    <div className="tech-bar-bg">
                      <div className="tech-bar-fill" ref={el => (barRefs.current[i] = el)}
                        style={{ '--target-width': `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {moreRepos.length > 0 && (
          <>
            <div className="more-repos-header">
              <h3>More on GitHub</h3>
              <p>Additional repositories beyond the featured projects</p>
            </div>
            <div className="more-repos-grid">
              {moreRepos.slice(0, 12).map(r => (
                <div className="repo-card reveal" key={r.name}>
                  <div className="repo-card-top">
                    <span className="repo-name">{r.name}</span>
                    {r.language && <span className={`repo-lang-badge ${langBadge(r.language)}`}>{r.language.replace(' Notebook','')}</span>}
                  </div>
                  <p className="repo-desc">{r.description || 'No description provided.'}</p>
                  <div className="repo-card-footer">
                    <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">View Repo</a>
                    {r.homepage && (
                      <a href={r.homepage} target="_blank" rel="noopener noreferrer" className="repo-link live">Live Demo</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
