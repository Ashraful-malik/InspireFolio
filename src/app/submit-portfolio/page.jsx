import React, { Suspense } from "react";
import SubmitPortfolio from "./SubmitPortfolio";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading portfolio submission form...</div>}>
      <SubmitPortfolio />
    </Suspense>
  );
}
