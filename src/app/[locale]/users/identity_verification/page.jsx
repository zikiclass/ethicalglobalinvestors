"use client";

import Button from "../../../components/Button";
import ButtonTransparent from "../../../components/ButtonTransparent";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/joy/CircularProgress";
import Swal from "sweetalert2";
import fetchUser from "../_components/FetchUser";
import { useTranslations } from "next-intl";
const IdentityVerification = () => {
  const t = useTranslations("Profile");
  const { data } = fetchUser();
  const [formData, setFormData] = useState({
    idFront: "",
    idBack: "",
    email: data?.email,
  });

  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();
  const handleProceed = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 2000);
    router.push(`dashboard`);
  };

  const handleFileChange = (event, type, index = null) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "idFront") {
        setFormData({ ...formData, idFront: file });
      } else {
        setFormData({ ...formData, idBack: file });
      }
    }
  };

  const handleSubmit = async () => {
    setButtonClicked(true);
    try {
      // Prepare the data to be sent to the backend
      const dataToSubmit = new FormData();

      dataToSubmit.append("idFront", formData.idFront);
      dataToSubmit.append("idBack", formData.idBack);
      dataToSubmit.append("email", data?.email);

      // Send the form data to the backend
      await fetch("/api/users/identity_verification", {
        method: "POST",
        body: dataToSubmit,
      });

      Swal.fire({
        icon: "success",
        text: t("verify_identity_success"),
      });
      setButtonClicked(false);
      router.push("account_verification");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: t("verify_identity_error", { error }),
      });
      setButtonClicked(false);
    } finally {
    }
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("verify_identity_title")} />
        <div className="dashboard_">
          <div className="deposit">
            <div className="deposit__form" style={{ width: "500px" }}>
              <h3 style={{ color: "var(--primary-color)" }}>
                {t("verify_your_title")}
              </h3>
              <p
                style={{
                  marginTop: "10px",
                }}
              >
                {t("paragraph2")}{" "}
              </p>
              <div className="input__deposit">
                <label>{t("select_front")}</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => handleFileChange(e, "idFront")}
                />
              </div>
              <div className="input__deposit">
                <label>{t("select_back")}</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => handleFileChange(e, "idBack")}
                />
              </div>
              {!buttonClicked ? (
                <Button title={t("upload")} onClick={handleSubmit} />
              ) : (
                <center
                  style={{
                    padding: "0px",
                  }}
                >
                  <CircularProgress thickness={4} />
                </center>
              )}

              <br />

              <ButtonTransparent title={t("skip")} onClick={handleProceed} />
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="profile" />
    </div>
  );
};

export default IdentityVerification;
