"use client";
import { useState } from "react";
import Button from "../../../components/Button";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import fetchUser from "../_components/FetchUser";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";
const EmailVerification = () => {
  const t = useTranslations("Profile");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { data } = fetchUser();

  const resendPin = async () => {
    if (email) {
      if (email !== data?.email) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: t("verify_email_error"),
          timer: 1500,
        });
      } else {
        try {
          const response = await axios.get(
            `/api/users/email_verification?email=${data?.email}`
          );

          if (response.data.updateEmailVerification) {
            Swal.fire({
              icon: "success",
              title: "Message Sent!",
              text: t("verify_email_success", { email }),
              timer: 1500,
            });

            router.push(`account_verification`);
          }
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Enter a valid email",
        timer: 1500,
      });
    }
  };
  const verifyEmail = async () => {
    if (pin) {
      if (pin === data?.emailPIN) {
        try {
          const response = await axios.put(
            `/api/users/email_verification?email=${data?.email}`
          );

          if (response.data.updateEmailVerification) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: t("verify_email_success_2"),
              timer: 1500,
            });
            router.push(`account_verification`);
          }
        } catch (error) {
          console.error(t("verify_email_error_2", { error }));
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: t("verify_email_error_3"),
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: t("verify_email_error_3"),
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("verify_email_title")} />
        <div className="dashboard_">
          <div className="deposit">
            <div className="deposit__form" style={{ width: "500px" }}>
              <h3 style={{ color: "var(--primary-color)" }}>
                {t("email_verification")}
              </h3>
              <p
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {t("paragraph1")}
              </p>

              <div className="input__deposit prof_email">
                <label>{t("pin")}</label>
                <input
                  type="text"
                  name="pin"
                  style={{ marginBottom: "1.2rem" }}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>

              <Button title={t("verify_email_title_2")} onClick={verifyEmail} />
              <div
                className="input__deposit prof_email"
                style={{ marginTop: "2rem" }}
              >
                <label>{t("email_2")}</label>
                <input
                  type="email"
                  name="email"
                  style={{ marginBottom: "1.2rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button title={t("resend")} onClick={resendPin} />
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="profile" />
    </div>
  );
};

export default EmailVerification;
