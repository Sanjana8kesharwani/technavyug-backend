import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import StatsSection from "../components/home/StatsSection";
import ProjectsSection from "../components/home/ProjectsSection";
import VerifySection from "../components/home/VerifySection";
import CertificatesSection from "../components/home/CertificatesSection";
import TopAchievers from "../components/home/TopAchieversSection";
import PartnersSection from "../components/home/PartnersSection";


const Home = () => {
  return (
    <MainLayout>

      {/* HERO */}
      <Hero />

      {/* STATS */}
      <StatsSection />

      <PartnersSection /> 

       <TopAchievers /> 

      {/* PROJECTS */}
      <ProjectsSection />

      {/* VERIFY */}
      <VerifySection />
      <CertificatesSection />

    </MainLayout>
  );
};

export default Home;