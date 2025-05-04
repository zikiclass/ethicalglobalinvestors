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
import fetchUser from "../_components/FetchUser";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
const AddressVerification = () => {
  const t = useTranslations("Profile");
  const { data } = fetchUser();
  const [formData, setFormData] = useState({
    bill: "",
    email: data?.email,
  });

  const handleFileChange = (event, type, index = null) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "bill") {
        setFormData({ ...formData, bill: file });
      }
    }
  };

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

  const handleSubmit = async () => {
    setButtonClicked(true);
    try {
      // Prepare the data to be sent to the backend
      const dataToSubmit = new FormData();

      dataToSubmit.append("bill", formData.bill);
      dataToSubmit.append("email", data?.email);

      // Send the form data to the backend
      await fetch("/api/users/address_verification", {
        method: "POST",
        body: dataToSubmit,
      });

      Swal.fire({
        icon: "success",
        text: t("address_verify_success"),
      });
      setButtonClicked(false);
      router.push("account_verification");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: t("address_verify_error", { error }),
      });
      setButtonClicked(false);
    } finally {
    }
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("address_verification_title")} />
        <div className="dashboard_">
          <div className="deposit">
            <div className="deposit__form" style={{ width: "500px" }}>
              <h3>{t("address_verification_title")}</h3>
              <p
                style={{
                  marginTop: "10px",
                }}
              >
                <b>{t("city")}</b> <span>{data?.city}</span>
                <br />
                <b>{t("state")}</b> <span>{data?.state}</span>
                <br />
                <b>{t("zip_code")}</b> <span>{data?.postal_code}</span>
                <br />
                <b>{t("country")}</b> <span>{data?.country}</span>
                <br />
                <b>{t("street")}</b> <span>{data?.street_address}</span>
                <br />
              </p>
              <div className="input__deposit">
                <label>{t("bill")}</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => handleFileChange(e, "bill")}
                />
              </div>
              {!buttonClicked ? (
                <Button title={t("submit")} onClick={handleSubmit} />
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

export default AddressVerification;
