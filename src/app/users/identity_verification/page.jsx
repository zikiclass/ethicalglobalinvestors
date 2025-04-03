"use client";

import Button from "../../components/Button";
import ButtonTransparent from "../../components/ButtonTransparent";
import DashboardPageNavigator from "../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/joy/CircularProgress";
import Swal from "sweetalert2";
import fetchUser from "../_components/FetchUser";
const IdentityVerification = () => {
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
        text: "Identity verification in progress...",
      });
      setButtonClicked(false);
      router.push("account_verification");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Unable to upload data" + error,
      });
      setButtonClicked(false);
    } finally {
    }
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text="Update Email" />
        <div className="dashboard_">
          <div className="deposit">
            <div className="deposit__form" style={{ width: "500px" }}>
              <h3 style={{ color: "var(--primary-color)" }}>
                Verify Your Identity
              </h3>
              <p
                style={{
                  marginTop: "10px",
                }}
              >
                Please verify your identity by uploading a valid government
                issued identification card. You may experience difficulties when
                uploading from an ios device. Make sure your browser has camera
                access in your ios settings.{" "}
              </p>
              <div className="input__deposit">
                <label>Select Front</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => handleFileChange(e, "idFront")}
                />
              </div>
              <div className="input__deposit">
                <label>Select Back</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => handleFileChange(e, "idBack")}
                />
              </div>
              {!buttonClicked ? (
                <Button title="Upload" onClick={handleSubmit} />
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

              <ButtonTransparent title="Skip" onClick={handleProceed} />
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="profile" />
    </div>
  );
};

export default IdentityVerification;
