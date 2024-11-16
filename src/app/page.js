"use client";
import HeroSection from "../components/HeroSection";
import PortfolioCard from "../components/PortfolioCard";
import Container from "../components/Container";
import { useState } from "react";

const Home = () => {
  return (
    <>
      <Container>
        <HeroSection />
        <div>
          <PortfolioCard />
        </div>
      </Container>
    </>
  );
};

export default Home;
