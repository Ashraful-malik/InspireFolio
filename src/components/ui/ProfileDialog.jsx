"use client";
import React, { useEffect } from "react";
import Button from "./Button";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { logoutUser, userAvatar } from "../../services/authServices";
import { useRouter } from "next/navigation";

function profileDialogBox() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { user, setUser } = useAuth();
  const router = useRouter();

  const toggleDialog = () => {
    setIsDialogOpen((pre) => !pre);
  };

  const logout = async () => {
    try {
      const response = await logoutUser();
      setUser(null);
      console.log(response);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getUserAvatar = async () => {
      try {
        const profilePic = await userAvatar();
        setAvatar(profilePic);
        console.log(profilePic);
      } catch (error) {
        console.log(error);
      }
    };
    getUserAvatar();
  }, [user]);

  return (
    <div>
      <div className="flex items-center ">
        {user ? (
          <div className="relative cursor-pointer" onClick={toggleDialog}>
            <img className="w-10 h-10 rounded-full" src={avatar} alt="Avatar" />
          </div>
        ) : (
          <Button
            label="Login"
            size="small"
            style="outline"
            className="dark:bg-dark-border"
            onClick={() => router.push("/login")}
          />
        )}
      </div>
      {/* profile dialog box */}
      {isDialogOpen && user && (
        <div className="max-w-64 rounded overflow-hidden shadow-lg bg-white absolute right-2 top-16 text-left">
          <div className="px-6 ">
            <div className="py-4">
              <div className="font-bold text-xl   text-black">{user?.name}</div>
              <p className="text-gray-700 text-base">{user?.email}</p>
            </div>
            <div className="pb-2">
              <Button
                label="Logout"
                size="small"
                style="danger"
                onClick={logout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default profileDialogBox;
