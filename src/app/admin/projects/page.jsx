"use client";
import React, { useEffect, useState } from "react";
import Toast from "../../../components/ui/Toast";
import {
  approvePost,
  deletePost,
  getUnapprovedPosts,
} from "../../../services/postService";
import { useRouter } from "next/navigation";
import { checkAuth } from "../../../services/authServices";
import TopLoadingBar from "../../../components/ui/TopLoader";
import Button from "../../../components/ui/Button";
import { deleteImage } from "../../../services/cloudinaryImageUplod";

function adminProjects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // State to manage toast
  const [user, setUser] = useState(null); // Store user state
  const router = useRouter();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getUnapprovedPosts();
      const postsWithIds = response.documents.map((post) => ({
        ...post,
      }));
      console.log("Posts fetched successfully==>", postsWithIds);

      setPosts(postsWithIds);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error while fetching posts", error);
      throw error;
    }
  };
  const handleApprove = async (id) => {
    console.log("approve", id);
    try {
      const response = await approvePost(id);
      console.log("Project approved response==>", response);
      setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== id));
    } catch (error) {
      console.error("Error approving project:", error);
    }
  };
  const deletePostHandler = async (id, publicId) => {
    try {
      await deletePost(id);
      console.log("Project public id ====>", publicId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== id));
      const deleteResponse = await deleteImage(publicId);

      if (deleteResponse.status === 200) {
        setToast({
          message: "Project deleted successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      const userData = await checkAuth();
      fetchPosts();
      if (!userData?.isAdmin) {
        router.push("/");
      } else {
        setUser(userData); // Set user if authenticated
        fetchPosts(); // Fetch posts only if the user is authenticated
      }
    };
    checkUserAuth();
  }, []);
  return (
    <div className="p-6 dark:bg-dark-bg dark:text-dark-textPrimary">
      {loading && <TopLoadingBar />}
      <h1 className="text-2xl font-bold mb-6">Project Approvals</h1>
      {posts.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">No posts to approve</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-white shadow-lg rounded-lg dark:bg-dark-surface p-4"
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-bold">{post.email}</p>
                </div>
                <p className="text-sm mb-4 break-words ">{post.description}</p>
                <div className="flex justify-center space-x-3 ">
                  <Button
                    type="button"
                    size="small"
                    style="outline"
                    label="View"
                    onClick={() => router.push(`/view/${post.$id}`)}
                    className="text-sm"
                  />
                  <Button
                    type="button"
                    style="danger"
                    size="small"
                    label={"Delete"}
                    onClick={() => deletePostHandler(post.$id, post.publicId)}
                  />
                  <Button
                    type="button"
                    size="small"
                    style="primary"
                    label={"Approve"}
                    onClick={() => handleApprove(post.$id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {toast && <Toast message={toast.message} />}
    </div>
  );
}

export default adminProjects;
