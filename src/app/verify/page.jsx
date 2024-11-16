"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { account } from "../index";
import SpinLoader from "../../components/ui/SpinLoader";
const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const [isVerified, setIsVerified] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      if (userId && secret) {
        try {
          const response = await account.updateVerification(userId, secret);
          setIsVerified(true);
          router.push("/submit-portfolio");
        } catch (error) {
          setError(error.message);
          if (error.code === 401) {
            setStatus(
              "Your verification link has expired. Please log in again to request a new verification email."
            );
          }
          setIsVerified(false);
        }
      }
    };

    verifyUser();
  }, [userId, secret]);

  return (
    <>
      {isVerified ? (
        <div className="flex item-center justify-center text-gray-300 ">
          <p className="text-2xl mt-8 text-green-600">
            Email verified successfully you can continue ....{" "}
          </p>
        </div>
      ) : (
        <div className="flex item-center justify-center text-gray-300 ">
          {error ? (
            <p className="text-red-500 mt-8 text-2xl ">
              {error}
              {status}
            </p>
          ) : (
            <>
              <SpinLoader />
              <p className="text-2xl mt-8">Verifying email...</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
