'use client';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CTO, TechVision AI',
    location: 'New York, USA',
    text: 'Ali delivered an exceptional computer vision pipeline that completely transformed our quality control process. His deep understanding of YOLO and PyTorch is remarkable.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Markus Weber',
    role: 'Founder, DataHealth',
    location: 'Berlin, Germany',
    text: 'Working with Ali on our Medical AI integration was a breeze. He structured our RAG pipeline flawlessly and handled the complex vector database architecture with ease.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Carter',
    role: 'Lead Product Manager',
    location: 'Toronto, Canada',
    text: 'A highly professional Data Scientist. Ali not only built our predictive models but also created comprehensive documentation and dashboards. Highly recommended!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Oliver Davies',
    role: 'Director of Innovation',
    location: 'London, UK',
    text: 'Ali’s expertise in Generative AI and LLMs helped us launch our automated agent months ahead of schedule. His clean code and communication are top-tier.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lucas Silva',
    role: 'CEO, Nexa Automations',
    location: 'São Paulo, Brazil',
    text: 'We hired Ali for a complex automation task using Python and FastAPI. He exceeded expectations and provided a scalable, robust API that handles thousands of requests.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Mia Thompson',
    role: 'Operations Head',
    location: 'Sydney, Australia',
    text: 'Incredible problem-solving skills! Ali quickly identified the bottleneck in our legacy machine learning models and optimized them for a 300% speed increase.',
    rating: 5,
  },
];

export default function Testimonials() {
  // Duplicate reviews to create a seamless infinite scrolling marquee
  const duplicatedReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="section" id="testimonials" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Global Impact</span>
          <h2 className="section-title">Client Feedback</h2>
          <p className="section-subtitle">What professionals from around the world are saying about my work.</p>
        </div>
      </div>
        
      <div className="testimonials-marquee-container">
        <div className="testimonials-marquee">
          {duplicatedReviews.map((review, i) => (
            <div key={`${review.id}-${i}`} className="review-card-premium">
              <div className="review-card-glow"></div>
              <div className="review-content-inner">
                <div className="review-header">
                  <div className="review-avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div className="review-author">
                    <h4>{review.name}</h4>
                    <p>{review.role}</p>
                  </div>
                </div>
                <div className="review-stars">
                  {'★'.repeat(review.rating)}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-footer">
                  <span className="review-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', opacity: 0.8}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {review.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
