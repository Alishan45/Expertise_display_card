export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Who I Am</span>
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>I&apos;m <strong>Ali Shan</strong>, an AI &amp; Machine Learning Engineer and Data Scientist based in Wah Cantt, Pakistan. I specialize in building production-ready AI systems — from data preparation through deployment, dashboards, automation, and cloud/edge delivery.</p>
            <p>My expertise spans <strong>Computer Vision (YOLOv5/8/11)</strong>, <strong>Large Language Models &amp; RAG Pipelines</strong>, <strong>NLP</strong>, <strong>Generative AI</strong>, and <strong>Full-Stack ML integration</strong> with React/Next.js and FastAPI.</p>
            <p>Currently a <strong>Data Scientist at Chang Sheng Agro Chemical Pvt Ltd</strong>, developing predictive models for agricultural supply-chains. Winner of the <strong>COMSATS AI Hackathon 2024</strong> and <strong>Lead ML Mentor at Google Developer Student Clubs</strong> (6 workshops on CV &amp; Generative AI).</p>
            <div className="social-links">
              {[
                ['🐙 GitHub','https://github.com/Alishan45'],
                ['💼 LinkedIn','https://linkedin.com/in/ali-shan-542246235'],
                ['✉ Email','mailto:alishan.cs01@gmail.com'],
                ['🌐 Portfolio','https://alishanai.vercel.app'],
              ].map(([label, href]) => (
                <a key={label} href={href} target={href.startsWith('http')?'_blank':undefined}
                  rel="noopener noreferrer" className="social-link">{label}</a>
              ))}
            </div>
          </div>
          <div className="info-cards">
            {[
              ['🎓','Education','B.Sc. (Hons) Computer Science','COMSATS University · CGPA 3.17/4.00'],
              ['🏢','Current Role','Data Scientist','Chang Sheng Agro Chemical · Nov 2025–Present'],
              ['🎯','Focus Areas','CV · LLMs · RAG · NLP','FastAPI · React/Next.js · MLOps'],
              ['🏆','Achievement','COMSATS AI Hackathon 2024 Winner','Lead ML Mentor — Google DSC'],
              ['🌍','Languages','Urdu (Native) · English (C1)','Chinese (A1 Basic)'],
              ['📧','Contact','alishan.cs01@gmail.com','Wah Cantt, Pakistan · Open to remote'],
            ].map(([icon,title,p,span]) => (
              <div className="info-card reveal" key={title}>
                <div className="info-icon">{icon}</div>
                <div><h4>{title}</h4><p>{p}</p><span>{span}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
