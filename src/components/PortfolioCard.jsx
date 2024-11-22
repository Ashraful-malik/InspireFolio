"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getApprovePost } from "../services/postService";
import TopLoadingBar from "../components/ui/TopLoader";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import Image from "next/image";
function PortfolioCard() {
  const [cursor, setCursor] = useState(null); // Cursor for pagination
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchPortfolios = async () => {
    if (isLoading || !hasMore || (cursor === null && portfolio.length > 0))
      return; // Prevent invalid fetch
    setIsLoading(true);
    setError(null);
    try {
      const response = await getApprovePost(cursor, 10);
      const newPosts = response.documents;
      setPortfolio((prev) =>
        cursor === null ? newPosts : [...prev, ...newPosts]
      ); // Avoid duplication
      setCursor(newPosts[newPosts.length - 1]?.$id || null);
      setHasMore(newPosts.length === 20);
    } catch (error) {
      setError("Failed to load portfolio items.");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPortfolio([]); // Clear portfolio
    setCursor(null); // Reset cursor
    setHasMore(true); // Reset pagination status
    fetchPortfolios(); // Fetch new portfolio items
  }, [router.asPath]);

  return (
    <>
      {isLoading && <TopLoadingBar />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto  ">
        {error && <p className="col-span-full text-red-500">{error}</p>}
        {portfolio.length === 0 && !isLoading && !error && (
          <p className="col-span-full">No portfolio items available.</p>
        )}
        {portfolio.map((item) => (
          <div
            key={item.$id}
            className=" relative w-full h-80 overflow-hidden rounded-lg p-1 dark:bg-dark-overlay cursor-pointer border dark:border-dark-border"
            onClick={() => {
              router.push(`/view/${item.$id}`);
            }}
          >
            <Image
              src={item.imageUrl} // URL to the image
              alt="Portfolio image"
              width={600} // Define width to maintain aspect ratio
              height={400}
              className="object-cover object-top rounded-lg"
              quality={75} // Set image quality (adjust this value based on your needs)
              priority={true}
            />
          </div>
        ))}
      </div>
      <div className="flex  item-center justify-center mt-8 ">
        {hasMore && !isLoading && (
          <Button
            label="Load more"
            onClick={fetchPortfolios}
            type="button"
            style="dark"
          />
        )}
      </div>
    </>
  );
}

PortfolioCard.propTypes = {
  alert: PropTypes.string,
};

export default PortfolioCard;
