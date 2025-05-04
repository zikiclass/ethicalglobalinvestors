"use client";
import React, { useEffect, useRef } from "react";
import { NavBarLight } from "../../HomeComponents";
import PageNavigator from "../../components/PageNavigator";
import "./forgot.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/img/logo.png";
import { useTranslations } from "next-intl";
const Forgot = () => {
  const forgotFormRef = useRef(null);
  const t = useTranslations("ForgotPassword");
  useEffect(() => {
    if (forgotFormRef.current) {
      forgotFormRef.current.classList.add("fadeIn");
    }
  }, []);
  return (
    <>
      <NavBarLight />
      <div className="container">
        <PageNavigator text={t("pageTitle")} />

        <div ref={forgotFormRef} className="forgot__wrap">
          <Link href="/">
            <Image src={Logo} alt="logo" className="logo" />
          </Link>
          <span style={{ fontSize: "14px", color: "#777", margin: "1rem" }}>
            {t("instruction")}
          </span>
          <div className="input__forgot">
            <input
              type="email"
              name="email"
              required
              className="forgot__email"
            />
            <label>{t("emailLabel")}</label>
          </div>
          <div className="cta">
            <button>{t("submit")}</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Forgot;
