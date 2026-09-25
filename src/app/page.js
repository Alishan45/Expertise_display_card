import { fetchAllRepos, getLanguageStats } from '@/lib/github';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import GitHubSection from '@/components/GitHubSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import AIChatBot from '@/components/AIChatBot';

// Revalidate page every hour
export const revalidate = 3600;

export default async function Home() {
  let repos = [], langStats = [];
  try {
    repos = await fetchAllRepos();
    langStats = getLanguageStats(repos);
  } catch {
    // GitHub unavailable — portfolio still works with static data
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects repos={repos} />
        <GitHubSection repos={repos} langStats={langStats} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIChatBot />
      <ScrollReveal />
    </>
  );
}
