import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import StatsSection from "../components/home/StatsSection";
import ProjectsSection from "../components/home/ProjectsSection";
import VerifySection from "../components/home/VerifySection";
import CertificatesSection from "../components/home/CertificatesSection";

const Home = () => {
  return (
    <MainLayout>

      {/* HERO */}
      <Hero />

      {/* STATS */}
      <StatsSection />

      {/* PROJECTS */}
      <ProjectsSection />

      {/* VERIFY */}
      <VerifySection />
      <CertificatesSection />

    </MainLayout>
  );
};

export default Home;