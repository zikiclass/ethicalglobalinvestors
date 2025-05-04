"use client";
import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import fetchUser from "../_components/FetchUser";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
const UpdateEmail = () => {
  const t = useTranslations("Profile");
  const router = useRouter();
  const { data, error } = fetchUser(); // Assuming `fetchUser` provides both data and error
  const [email, setEmail] = useState("");

  // Handle the email update process
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updateEmail = await axios.put("/api/users/email", { email });
      if (updateEmail.data === "updated") {
        toast.success(t("update_email_success") + " " + email);

        await signOut({ redirect: false, callbackUrl: "/" });
        router.push("/api/auth/signout");
      } else {
        toast.error(t("update_email_error"));
      }
    } catch (error) {
      if (error.request) {
        // The request was made but no response was received
        toast.error("Email already exists");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Error: " + error.message);
      }
    }
  };

  // Ensure that `data` is not null before trying to access email
  if (!data) {
    return (
      <div>
        <DashboardNavbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          <DashboardPageNavigator text={t("update_email_title")} />
          <div className="dashboard_">
            <h3>{t("loading_data")}</h3>
          </div>
        </div>
        <BottomNavBar active="profile" />
      </div>
    );
  }

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("update_email_title")} />
        <div className="dashboard_">
          <div className="deposit">
            <h3>{t("update_email_title")}</h3>
            <div className="deposit__form">
              <Toaster position="bottom-left" />
              <form action="#" onSubmit={handleUpdate}>
                <p
                  style={{
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  {data.email} {/* Only display email if `data` is not null */}
                </p>

                <div className="input__deposit prof_email">
                  <label>{t("new_email_text")}</label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
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

export default UpdateEmail;
