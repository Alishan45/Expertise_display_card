import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://alishanai.vercel.app'),
  title: {
    default: 'Ali Shan — AI & Machine Learning Engineer | Data Scientist',
    template: '%s | Ali Shan Portfolio'
  },
  description: 'Results-driven AI Engineer and Data Scientist with 2+ years building end-to-end ML systems in Computer Vision, NLP, Generative AI, and Data Analytics.',
  keywords: [
    'Ali', 'Shan', 'Ali Shan', 'Ali Shan Portfolio', 'Ali Shan AI', 'Ali Shan Machine Learning', 
    'Ali Shan Developer', 'Ali Shan Software Engineer', 'Ali Shan Data Scientist', 'Ali Shan Portfolio Website',
    'AI Engineer Pakistan', 'Machine Learning Engineer', 'Data Scientist', 'Computer Vision Specialist',
    'Deep Learning', 'NLP Engineer', 'Generative AI', 'LLM Developer', 'RAG Pipeline Builder',
    'YOLO Object Detection', 'Python Developer', 'PyTorch Expert', 'TensorFlow', 'Data Analytics',
    'Flask', 'FastAPI', 'React', 'Next.js', 'Full-Stack ML Developer', 'AI Consultant',
    'Freelance AI Engineer', 'Data Science Portfolio', 'AI Portfolio', 'Machine Learning Portfolio',
    'Medical AI', 'Streamlit', 'LangChain', 'Vector Databases', 'Computer Vision Portfolio',
    'AI Solutions Developer', 'Artificial Intelligence Engineer', 'Data Engineering', 'Model Fine-tuning',
    'AI Automation', 'Data Visualization', 'Scikit-Learn', 'OpenCV'
  ],
  authors: [{ name: 'Ali Shan', url: 'https://alishanai.vercel.app' }],
  creator: 'Ali Shan',
  publisher: 'Ali Shan',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Ali Shan — AI & Machine Learning Engineer',
    description: 'Results-driven AI Engineer and Data Scientist building end-to-end ML systems in Computer Vision, NLP, and Generative AI.',
    url: 'https://alishanai.vercel.app',
    siteName: 'Ali Shan Portfolio',
    images: [{ url: '/ali-shan-icon.jpg', width: 800, height: 800, alt: 'Ali Shan AI Portfolio' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Shan — AI & ML Engineer',
    description: 'Results-driven AI Engineer and Data Scientist building end-to-end ML systems.',
    images: ['/ali-shan-icon.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/ali-shan-icon.jpg',
    shortcut: '/ali-shan-icon.jpg',
    apple: '/ali-shan-icon.jpg',
  },
  verification: {
    google: 'GoVY514zhiJbKBcxB-NMo2-mgX-oQYUOYdIzoPCRTIw',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ali Shan',
    url: 'https://alishanai.vercel.app',
    jobTitle: 'AI & Machine Learning Engineer | Data Scientist',
    description: 'Results-driven AI Engineer and Data Scientist with 2+ years building end-to-end ML systems in Computer Vision, NLP, Generative AI, and Data Analytics.',
    image: 'https://alishanai.vercel.app/images/profile/ali-shan.jpg',
    sameAs: [
      'https://alishanai.vercel.app',
      'https://github.com/Alishan45',
      'https://linkedin.com/in/ali-shan-542246235'
    ],
    knowsAbout: [
      'Machine Learning', 'Artificial Intelligence', 'Computer Vision', 'Natural Language Processing',
      'Generative AI', 'Deep Learning', 'Data Science', 'Python', 'React', 'Next.js'
    ]
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
