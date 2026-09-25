'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PROJECT_META, FEATURED_REPOS } from '@/lib/projectsData';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'medical', label: 'Medical AI' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'nlp', label: 'NLP & LLMs' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'automation', label: 'Automation' },
  { id: 'data', label: 'Data Science' },
];

export default function Projects({ repos = [] }) {
  const [active, setActive] = useState('all');

  // Merge static meta with GitHub API data
  const projects = FEATURED_REPOS.map(repoName => {
    const meta = PROJECT_META[repoName];
    if (!meta) return null;
    const ghData = repos.find(r => r.name === repoName) || {};
    return {
      ...meta,
      repoName,
      url: ghData.html_url || `https://github.com/Alishan45/${repoName}`,
      homepage: meta.homepage || ghData.homepage || '',
      stars: ghData.stargazers_count || 0,
      updatedAt: ghData.updated_at || '',
    };
  }).filter(Boolean);

  const visible = active === 'all'
    ? projects
    : projects.filter(p => p.categories.includes(active));

  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What I&apos;ve Built</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Selected work showcasing the full pipeline — research, engineering, and deployment.</p>
        </div>

        <div className="filter-tabs">
          {FILTERS.map(f => (
            <button key={f.id} className={`filter-btn${active === f.id ? ' active' : ''}`}
              onClick={() => setActive(f.id)}>{f.label}</button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map(proj => (
            <div key={proj.repoName} className={`project-card${proj.featured ? ' featured' : ''}`}>
              <div className="proj-img-wrap">
                <Image src={proj.image} alt={proj.title} fill
                  className="proj-img" style={{ objectFit:'cover' }} sizes="(max-width:768px) 100vw, 33vw" />
                <div className="proj-overlay">
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                    View on GitHub
                  </a>
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-meta">
                  <span className={`proj-lang lang-${proj.langClass}`}>{proj.lang}</span>
                  {proj.tags.slice(0,2).map(t => <span className="proj-tag" key={t}>{t}</span>)}
                </div>
                <h3 className="proj-title">{proj.title}</h3>
                <p className="proj-desc">{proj.description}</p>
                <div className="proj-footer">
                  <span className="cat-badge">{proj.badge}</span>
                  <div className="proj-links">
                    {proj.homepage && (
                      <a href={proj.homepage} target="_blank" rel="noopener noreferrer" className="proj-link demo">
                        Live →
                      </a>
                    )}
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="proj-link">GitHub →</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
