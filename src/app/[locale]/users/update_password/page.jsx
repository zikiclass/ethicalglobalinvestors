"use client";
import React, { useState } from "react";
import Button from "../../../components/Button";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
const UpdatePassword = () => {
  const t = useTranslations("Profile");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/users/password", {
        password,
        newPassword,
        confirmPassword,
      });

      if (response.data === "Password updated") {
        toast.success(t("update_password_success"));
        await signOut({ redirect: false, callbackUrl: "/" });
        router.push("/api/auth/signout");
      } else {
        if (response.data.error === "Password should be at least 4 characters")
          toast.error(t("update_password_error_1"));
        else if (response.data.error === "User not found")
          toast.error(t("update_password_error_2"));
        else if (response.data.error === "Current password is incorrect")
          toast.error(t("update_password_error_3"));
        else if (
          response.data.error ===
          "New password does not match confirmation password"
        )
          toast.error(t("update_password_error_4"));
      }
    } catch (error) {
      toast.error("Error updating password: " + error.message);
    }
  };
  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("update_password_title")} />
        <div className="dashboard_">
          <div className="deposit">
            <h3>{t("update_password_title")}</h3>
            <div className="deposit__form">
              <Toaster position="bottom-left" />
              <form action="#" onSubmit={handleUpdate}>
                <div className="input__deposit prof_email">
                  <label>{t("password")}</label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input__deposit prof_email">
                  <label>{t("new_password")}</label>
                  <input
                    type="password"
                    name="new__password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input__deposit prof_email">
                  <label>{t("confirm_password")}</label>
                  <input
                    type="password"
                    name="confirm__password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button title={t("update")} />
              </form>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="profile" />
    </div>
  );
};

export default UpdatePassword;
