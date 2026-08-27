import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { Resume } from "@/components/sections/resume";
import { GithubStats } from "@/components/sections/github-stats";
import { Contact } from "@/components/sections/contact";
import { JobFit } from "@/components/sections/job-fit";
import { PortfolioAssistant } from "@/components/ai/portfolio-assistant";
import { EasterEggs } from "@/components/easter-eggs";
import { RecruiterHidden } from "@/components/recruiter-hidden";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RecruiterHidden>
          <About />
        </RecruiterHidden>
        <Skills />
        <Projects />
        <RecruiterHidden>
          <Journey />
        </RecruiterHidden>
        <Resume />
        <GithubStats />
        <Contact />
        <RecruiterHidden>
          <JobFit />
        </RecruiterHidden>
      </main>
      <Footer />
      <PortfolioAssistant />
      <EasterEggs />
    </>
  );
}
