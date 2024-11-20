"use client";
import HeroSection from "../components/HeroSection";
import PortfolioCard from "../components/PortfolioCard";
import Container from "../components/Container";
import BackToTop from "../components/ui/BackToTop";

const Home = () => {
  return (
    <>
      <Container>
        <BackToTop />
        <HeroSection />
        <div>
          <PortfolioCard />
        </div>
      </Container>
    </>
  );
};

export default Home;
