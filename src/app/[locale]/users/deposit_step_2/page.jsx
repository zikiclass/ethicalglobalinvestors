"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import PanelPlain from "../_components/Panel";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { useTranslations } from "next-intl";
const DepositStep2 = () => {
  const t = useTranslations("Deposit");
  return (
    <>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <DepositStep2Content />
      </Suspense>
    </>
  );
};

const DepositStep2Content = () => {
  const t = useTranslations("Deposit");
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const depAccount = searchParams.get("depAccount");
  const router = useRouter();

  const handleClick = (e) => {
    router.push(`deposit_step_3?amount=${amount}&depAccount=${depAccount}`);
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("title")} />
        <div className="dashboard_">
          <div className="deposit">
            <h2>
              {t("pay")}{" "}
              {Number(amount).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <p style={{ marginTop: "-20px" }}>{t("paymentmethod")}</p>

            <PanelPlain
              title={t("sendcrypto")}
              text={t("sendcrypto_message")}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <BottomNavBar active="dashboard" />
    </div>
  );
};
export default DepositStep2;
