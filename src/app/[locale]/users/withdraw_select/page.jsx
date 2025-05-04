"use client";
import React, { useEffect, useRef } from "react";
import { DashboardNavbar } from "../../../HomeComponents";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import BottomNavBar from "../_components/BottomNavBar";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "use-intl";
const WithdrawalSelect = () => {
  const t = useTranslations("Withdrawal");
  const dashboardRef = useRef(null);

  const router = useRouter();
  useEffect(() => {
    if (dashboardRef.current) {
      dashboardRef.current.classList.add("fadeIn");
    }
  }, []);
  const withdrawals = [
    { id: 1, title: "Bank", href: "bankwithdraw" },
    { id: 2, title: "Crypto", href: "cryptowithdraw" },
    { id: 3, title: "PayPal", href: "paypalwithdraw" },
    { id: 4, title: "CashApp", href: "cashappwithdraw" },
  ];
  return (
    <>
      <div>
        <DashboardNavbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          <DashboardPageNavigator text={t("title")} />
          <div className="dashboard_" ref={dashboardRef}>
            <h5>{t("selectmethod")}</h5>
            {withdrawals.map((withdraw) => (
              <Link href={withdraw.href} className="panel__" key={withdraw.id}>
                <span className="panel__text">{withdraw.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <BottomNavBar active="dashboard" />
      </div>
    </>
  );
};
export default WithdrawalSelect;
