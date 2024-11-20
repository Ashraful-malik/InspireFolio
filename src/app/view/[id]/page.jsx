"use client";

import React, { useEffect, useState } from "react";
import { deletePost, getIndividualPost } from "../../../services/postService";
import { use } from "react";
import Container from "../../../components/Container";
import Link from "next/link";
import { checkAuth } from "../../../services/authServices";
import TopLoadingBar from "../../../components/ui/TopLoader";
import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";
import Image from "next/image";

function Page({ params }) {
  const { id } = use(params);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await getIndividualPost(id);
      setPost(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error while fetching posts", error);
      throw error;
    }
  };

  const deletePortfolio = async (id) => {
    try {
      console.log(id);
      const result = await deletePost(id);
      console.log(result);
      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      const userData = await checkAuth();
      setUser(userData);
      fetchPosts();

      // if (!userData) {
      //   router.push("/");
      // } else {
      //   fetchPosts();
      // }
    };
    checkUserAuth();
  }, [id]);

  if (loading) return <TopLoadingBar />;
  if (!post)
    return <p className="text-center text-gray-300 text-2xl">Post not found</p>;

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-20 ">
        <div className=" lg:col-span-2 lg:col-start-1">
          <Image
            src={post.imageUrl}
            alt={post.description}
            className="w-full rounded-lg shadow-md"
            width={1000}
            height={1000}
            layout="responsive"
            loading="lazy"
          />
        </div>
        <div className="rounded-lg ">
          <div className=" overflow-hidden">
            <h2 className="text-2xl font-bold text-white dark:text-dark-textPrimary break-words">
              {post.description}
            </h2>
          </div>
          <div className="space-y-2 mt-4">
            <p className="text-gray-400 text-sm">
              Website:{" "}
              <Link
                href={post.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-white underline"
              >
                {post.websiteUrl}
              </Link>
            </p>
            <span
              className="inline-block bg-gray-200 
            rounded-full px-3 py-1 text-sm font-semibold 
            text-gray-700 mr-2 dark:text-dark-textSecondary dark:bg-dark-overlay"
            >
              {post.category}
            </span>

            <div className="action flex  items-center space-x-2">
              {(user?.$id === post.userId || user?.isAdmin) && (
                <>
                  <Link
                    href={`/submit-portfolio?id=${id}`}
                    className="py-1 px-5 bg-green-700 rounded-3xl"
                  >
                    Edit
                  </Link>

                  {/* delete portfolio */}
                  <Button
                    label="Delete"
                    size="small"
                    style="danger"
                    type="button"
                    onClick={() => deletePortfolio(id)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Page;
