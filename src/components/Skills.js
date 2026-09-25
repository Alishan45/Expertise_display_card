const SKILLS = [
  { icon:'🤖', title:'AI / ML & Deep Learning', tags:['PyTorch','TensorFlow / Keras','HuggingFace Transformers','YOLOv5 / v8 / v11','OpenCV','Scikit-Learn','ResNet-50','ONNX','NVIDIA TensorRT'] },
  { icon:'🧠', title:'GenAI, LLMs & NLP', tags:['LangChain','RAG Pipelines','Prompt Engineering','LLM Fine-tuning','Diffusion Models','Gemini API','LLaMA / Mistral','BM25 / Vector Search'] },
  { icon:'👁️', title:'Computer Vision', tags:['Object Detection','Instance Segmentation','Pose Estimation','ByteTrack Tracking','Thermal Imaging','Roboflow','Edge Deployment'] },
  { icon:'📊', title:'Data Science & Analytics', tags:['Pandas','NumPy','Statistical Analysis','Feature Engineering','Predictive Modeling','Power BI','Tableau','Matplotlib'] },
  { icon:'💻', title:'Full-Stack & Serving', tags:['Python','FastAPI','Flask','React / Next.js','TypeScript','Node.js','Streamlit','Gradio','REST APIs'] },
  { icon:'🔧', title:'MLOps, Cloud & Databases', tags:['Docker','GitHub Actions CI/CD','AWS S3 / EC2','GCP Vertex AI','MongoDB','PostgreSQL','Firebase Firestore','Supabase'] },
  { icon:'🗣️', title:'Programming Languages', tags:['Python','C++','Java','JavaScript / TypeScript','Dart','Bash'] },
  { icon:'🏅', title:'Certifications', tags:['Kaggle — ML & Deep Learning','Walmart — Advanced Software Engineering','HP LIFE — Data Science & Analytics','Codanics — Data Science Bootcamp'] },
];

export default function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What I Know</span>
          <h2 className="section-title">Skills &amp; Technologies</h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map(({ icon, title, tags }) => (
            <div className="skill-cat reveal" key={title}>
              <h3 className="skill-cat-title"><span className="skill-cat-icon">{icon}</span>{title}</h3>
              <div className="skill-tags">
                {tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
