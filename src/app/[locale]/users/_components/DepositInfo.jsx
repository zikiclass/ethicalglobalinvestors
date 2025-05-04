"use client";
import React, { useEffect, useState } from "react";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import GroupIcon from "@mui/icons-material/Group";
import SavingsIcon from "@mui/icons-material/Savings";
import "./styles/user.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
const DepositInfo = ({ data }) => {
  const t = useTranslations();
  const formatNumber = (number) => {
    // Check if the number is a valid number or convert it to a string
    const parts = parseFloat(number).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  return (
    <div className="min_flex">
      <div className="deposit__top">
        <div className="deposit__top__item">
          <div>
            <span>
              {data && data.transactions && data.transactions.length > 0
                ? data.currency + formatNumber(data.transactions[0]?.deposit)
                : ""}
            </span>
            <span>{t("DepositInfo.deposit")}</span>
          </div>
          <div>
            <span>
              {data && data.transactions && data.transactions.length > 0
                ? data.currency + formatNumber(data.transactions[0]?.profit)
                : ""}
            </span>
            <span>{t("DepositInfo.profit")}</span>
          </div>
        </div>
        <div className="deposit__top__item__">
          <div className="progress">
            <div className="progressValue" style={{ width: "50px" }}></div>
          </div>
          <span>{t("DepositInfo.signal")}</span>
        </div>
      </div>

      <div className="deposit__bottom">
        <Link href="deposit" className="dep">
          <SystemUpdateAltIcon style={{ fontSize: "2rem" }} />
          <span>{t("DepositInfo.deposit")}</span>
        </Link>

        <Link href="traders" className="dep">
          <GroupIcon style={{ fontSize: "2rem" }} />
          <span>{t("DepositInfo.copytraders")}</span>
        </Link>
        <Link href="referrals" className="dep">
          <SavingsIcon style={{ fontSize: "2rem" }} />
          <span>{t("DepositInfo.refer")}</span>
        </Link>
      </div>
    </div>
  );
};

export default DepositInfo;
