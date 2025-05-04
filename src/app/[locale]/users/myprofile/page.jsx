"use client";

import Button from "../../../components/Button";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import camera from "../../../../../public/img/camera.png";
import Image from "next/image";
import fetchUser from "../_components/FetchUser";
import { useTranslations } from "next-intl";
const MyProfile = () => {
  const t = useTranslations("Profile");
  const { data } = fetchUser();
  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("myprofile")} />
        <div className="dashboard_">
          <div className="deposit">
            <div className="deposit__form__">
              <div className="profile__pic__wrap">
                <Image
                  src={camera}
                  className="profile__pic"
                  alt="profile pic"
                />
              </div>

              <table>
                <tbody>
                  <tr className="trcl">
                    <td>{t("email")}</td>
                    <td>{data?.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>{t("phone")}</td>
                    <td>{data?.mobile || "N/A"}</td>
                  </tr>
                  <tr className="trcl">
                    <td>{t("firstname")}</td>
                    <td>{data?.first_name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>{t("lastname")}</td>
                    <td>{data?.last_name || "N/A"}</td>
                  </tr>
                  <tr className="trcl">
                    <td>{t("streetaddress")}</td>
                    <td>{data?.street_address || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>{t("postalcode")}</td>
                    <td>{data?.postal_code || "N/A"}</td>
                  </tr>
                  <tr className="trcl">
                    <td>{t("city")}</td>
                    <td>{data?.city || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>{t("state")}</td>
                    <td>{data?.state || "N/A"}</td>
                  </tr>
                  <tr className="trcl">
                    <td>{t("country")}</td>
                    <td>{data?.country || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="profile" />
    </div>
  );
};

export default MyProfile;
