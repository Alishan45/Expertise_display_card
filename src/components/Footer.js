export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>AS<span className="logo-bracket">/&gt;</span>
          </div>
          <p className="footer-text">Built by <strong>Ali Shan</strong> — AI &amp; ML Engineer · Data Scientist · Python Developer</p>
          <div className="footer-links">
            {[
              ['GitHub','https://github.com/Alishan45'],
              ['LinkedIn','https://linkedin.com/in/ali-shan-542246235'],
              ['Email','mailto:alishan.cs01@gmail.com'],
              ['Download CV','/Ali_Shan_CV.pdf'],
              ['Portfolio','https://alishanportfolio.vercel.app'],
            ].map(([label, href]) => (
              <a key={label} href={href} target={href.startsWith('http')?'_blank':undefined}
                rel="noopener noreferrer"
                download={label === 'Download CV' ? true : undefined}>{label}</a>
            ))}
          </div>
          <p className="footer-copy">&copy; 2026 Ali Shan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
