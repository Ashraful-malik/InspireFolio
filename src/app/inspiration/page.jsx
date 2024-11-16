import React from "react";
import Container from "../../components/Container";
import PortfolioCard from "../../components/PortfolioCard";

function page() {
  return (
    <div>
      <Container>
        <div>
          <h1>Inspiration</h1>
        </div>
        <div className="mt-12">
          <PortfolioCard />
        </div>
      </Container>
    </div>
  );
}

export default page;
