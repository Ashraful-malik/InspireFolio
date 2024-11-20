import React from "react";
import Container from "../../components/Container";
import PortfolioCard from "../../components/PortfolioCard";
import BackToTop from "../../components/ui/BackToTop";

function page() {
  return (
    <div>
      <Container>
        <BackToTop />
        <div className="mt-12">
          <PortfolioCard />
        </div>
      </Container>
    </div>
  );
}

export default page;
