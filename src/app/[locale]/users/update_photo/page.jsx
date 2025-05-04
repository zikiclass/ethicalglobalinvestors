"use client";

import Button from "../../../components/Button";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import camera from "../../../../../public/img/camera.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
const UpdatePhoto = () => {
  const t = useTranslations("Profile");
  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("update_photo_title")} />
        <div className="dashboard_">
          <div className="deposit">
            <h3>{t("update_photo_title")}</h3>
            <div className="deposit__form">
              <form action="#">
                <div className="profile__pic__wrap">
                  <Image
                    src={camera}
                    className="profile__pic"
                    alt={t("update_photo_alt")}
                  />
                </div>

                <div className="input__deposit">
                  <input type="file" name="photo" />
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

export default UpdatePhoto;
