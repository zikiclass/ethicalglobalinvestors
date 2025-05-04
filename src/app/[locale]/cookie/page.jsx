"use client";
import React, { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import Banner from "../../components/Banner";
import "../../components/style1.css";
import CookieBanner from "../../../../public/img/Hero3.jpg";
import { last_revised, project_name } from "../../../../env";
import { useTranslations } from "next-intl";
const Cookie = () => {
  const t = useTranslations("CookiePolicy");
  const refHandle = useRef();

  useEffect(() => {
    if (refHandle.current) {
      refHandle.current.classList.add("fadeIn");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Banner
        text={t("title")}
        smallText={`${t("lastRevised")}: ${last_revised}`}
        image={CookieBanner}
      />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <div className="content">
            <h1>{t("title")}</h1>
            <p>{t("purpose1", { project_name })}</p>
            <p>{t("purpose2")}</p>
            <p>{t("purpose3")}</p>
            <p>{t("purpose4")}</p>
            <p>{t("purpose5")}</p>

            <div className="content__paragraph">
              <h4>{t("whatAreCookiesTitle")}</h4>
              <p>{t("whatAreCookiesDesc")}</p>
            </div>

            <div className="content__paragraph">
              <h4>{t("managingCookiesTitle")}</h4>
              <p>{t("managingCookiesIntro", { project_name })}</p>
              <p>{t("managingCookiesBrowser")}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cookie;
