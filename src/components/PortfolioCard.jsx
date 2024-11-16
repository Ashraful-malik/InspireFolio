"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getApprovePost } from "../services/postService";
import SpinLoader from "../components/ui/SpinLoader";
import { useRouter } from "next/navigation";
function PortfolioCard({ alert = "portfolio image" }) {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const fetchPortfolios = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getApprovePost();
      setPortfolio(result.documents || []);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to load portfolio items.");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <>
      {isLoading && <SpinLoader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">
        {error && <p className="col-span-full text-red-500">{error}</p>}
        {portfolio.length === 0 && !isLoading && !error && (
          <p className="col-span-full">No portfolio items available.</p>
        )}
        {portfolio.map((item) => (
          <div
            key={item.$id}
            className="overflow-hidden rounded-lg shadow-lg p-2 dark:bg-dark-surface cursor-pointer"
            onClick={() => {
              router.push(`/view/${item.$id}`);
            }}
          >
            <img
              src={item.imageUrl}
              alt={alert || item.category}
              className="w-full h-80 object-cover object-top rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
}

PortfolioCard.propTypes = {
  alert: PropTypes.string,
};

export default PortfolioCard;
