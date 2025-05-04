"use client";
import React, { useEffect, useRef, useState } from "react";
import { DashboardNavbar } from "../../../HomeComponents";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import BottomNavBar from "../_components/BottomNavBar";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import Link from "next/link";
import Button from "../../../components/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
const Deposit = () => {
  const t = useTranslations("Profile");

  return (
    <>
      <div>
        <DashboardNavbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          <DashboardPageNavigator text={t("notifications")} />
          <div className="dashboard_">
            <div className="deposit">
              <div className="deposit__form notifications">
                <p>{t("notification_permission")}</p>
                <p></p>
                <p>{t("notification_permission_2")}</p>
                <form action="#">
                  <div className="input__deposit">
                    <label>{t("notification_permission_3")}</label>
                    <select name="to__deposit" className="select__deposit">
                      <option value="Denied">{t("denied")}</option>
                      <option value="Granted">{t("granted")}</option>
                    </select>
                  </div>
                  <Button title={t("update")} />
                </form>
              </div>
            </div>
          </div>
        </div>
        <BottomNavBar active="profile" />
      </div>
    </>
  );
};

export default Deposit;
