"use client";
import HeroSection from "../components/HeroSection";
import PortfolioCard from "../components/PortfolioCard";
import Container from "../components/Container";
import BackToTop from "../components/ui/BackToTop";

const Home = () => {
  return (
    <>
      <Container>
        <BackToTop link="/" />
        <HeroSection />
        <div className="mb-9">
          <PortfolioCard />
        </div>
      </Container>
    </>
  );
};

export default Home;
