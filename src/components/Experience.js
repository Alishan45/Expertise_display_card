const TIMELINE = [
  {
    date: 'Nov 2025 – Present', badge: 'b-work', badgeLabel: 'Work',
    title: 'Data Scientist', org: 'Chang Sheng Agro Chemical Pvt Ltd — Lahore, Pakistan',
    desc: 'Develop and deploy data-driven solutions to optimize agricultural chemical production and supply-chain processes, including predictive models for demand forecasting, crop-yield analysis, and disease-pattern prediction.',
    bullets: [
      'Build and maintain ETL pipelines and interactive dashboards using Power BI, Tableau, and Matplotlib',
      'Apply statistical techniques and feature engineering using Python (Pandas, NumPy)',
      'Automate data pipelines and reporting workflows to reduce manual effort',
      'Collaborate with cross-functional teams to translate business requirements into data science solutions',
    ],
    tags: ['Pandas','Power BI','Tableau','Predictive Modeling','NumPy'],
  },
  {
    date: 'Jan 2023 – Present', badge: 'b-work', badgeLabel: 'Work',
    title: 'AI Engineer (Freelance / Contract)', org: 'Independent Consultant — Remote',
    desc: 'Delivered 8+ end-to-end client projects spanning healthcare, security, and e-commerce — owning pipelines from data collection through deployment.',
    bullets: [
      'Built production ML pipelines with PyTorch, served through FastAPI, integrated into React and Flutter apps',
      'Applied pruning and quantization to CV models, achieving up to 3× faster inference',
      'Established CI/CD workflows using GitHub Actions with Dockerized, automated deployments',
    ],
    tags: ['PyTorch','FastAPI','Docker','React','Flutter','CI/CD'],
  },
  {
    date: 'Jul 2025 – Oct 2025', badge: 'b-intern', badgeLabel: 'Internship',
    title: 'Artificial Intelligence Intern', org: 'AISoftDevs — Remote',
    desc: 'Built and shipped multiple production AI tools including a content-to-PDF enhancer, a Prompt-to-JSON Chrome extension, an AI stock-market analysis agent, and an automated blogging agent.',
    bullets: [],
    tags: ['React','TypeScript','LLMs','Chrome Extension','Full-Stack'],
  },
  {
    date: 'Jun 2024 – Aug 2024', badge: 'b-intern', badgeLabel: 'Internship',
    title: 'Machine Learning Intern', org: 'Pakistan Ordnance Factories (POF) — Wah Cantt, Pakistan',
    desc: 'Prototyped a soldier-worn thermal-vision concealed-weapon detector, reducing false positives by 18% vs YOLOv5s baseline. Authored internal whitepaper on edge-deployment strategies for defense-grade computer vision.',
    bullets: [],
    tags: ['YOLOv5','Thermal Vision','Edge Deployment','Computer Vision'],
  },
  {
    date: '2021 – 2025', badge: 'b-edu', badgeLabel: 'Education',
    title: 'B.Sc. (Honours) in Computer Science', org: 'COMSATS University Islamabad, Wah Campus',
    desc: 'CGPA: 3.17 / 4.00 · Focus on Artificial Intelligence, Machine Learning, Data Structures, Algorithms, and Software Engineering.',
    bullets: [
      '🏆 Winner — COMSATS AI Hackathon 2024 (real-time flood-detection drone vision system)',
      '🎓 Lead ML Mentor — Google Developer Student Clubs (6 workshops on CV & Generative AI)',
    ],
    tags: ['AI/ML','Algorithms','Software Engineering','Research'],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">My Journey</span>
          <h2 className="section-title">Experience &amp; Education</h2>
        </div>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div className="tl-item reveal" key={i}>
              <div className="tl-dot" />
              <div className="tl-content">
                <div className="tl-date">{item.date}</div>
                <div className={`tl-badge ${item.badge}`}>{item.badgeLabel}</div>
                <h3>{item.title}</h3>
                <h4>{item.org}</h4>
                <p>{item.desc}</p>
                {item.bullets.length > 0 && (
                  <ul className="tl-list">
                    {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
                <div className="tl-tags">
                  {item.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
