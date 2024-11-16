import React from "react";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
function HeroSection() {
  const router = useRouter();
  const content = {
    title: "Your Work Deserves to Be Seen",
    description:
      "Submit your portfolio and become part of a curated collection that inspires the next generation of creators.",
    cta: "Share your portfolio",
  };
  return (
    <>
      <div className="flex items-center justify-center md:px-8 lg:px-12 h-96">
        <div className="text-center md:w-1/2 lg:w-2/3 ">
          <h1 className="text-5xl font-bold dark:text-dark-textPrimary">
            {content.title}
          </h1>
          <p className="text-base mt-3 max-w-lg mx-auto  dark:text-dark-textSecondary ">
            {content.description}
          </p>
          <div className="mt-6">
            <Button
              style="primary"
              label={content.cta}
              onClick={() => {
                router.push("/submit-portfolio");
              }}
              type={"submit"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
