"use client";
import React, { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import Banner from "../../components/Banner";
import "../../components/style1.css";
import CookieBanner from "../../../../public/img/Hero3.jpg";
import { last_revised, project_name } from "../../../../env";
import { useTranslations } from "next-intl";
const Privacy = () => {
  const t = useTranslations();
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
        text={t("privacyPolicy")}
        smallText={`${t("lastRevised")}: ${last_revised}`}
        image={CookieBanner}
      />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <div className="content">
            <h1>{t("privacyPolicy")}</h1>
            <p>
              {project_name} {t("limited")} (“us“, “we” or “Company“){" "}
              {t("respectPrivacy")} {t("usersCommitment")}
            </p>
            <p>{t("informationCollection")}</p>
            <p>{t("agreeToTerms")}</p>
            <p>{t("retainInformation")}</p>
            <p>{t("protectingInformation")}</p>
            <p>{t("advertisements")}</p>
            <p>{t("advertisingId")}</p>
            <p>{t("cookiesAndAnalytics")}</p>

            <div className="content__paragraph">
              <h4>{t("shareInformation")}</h4>
              <p>{t("sharingDetails")}</p>
            </div>
            <div className="content__paragraph">
              <h4>{t("retainInformation")}</h4>
              <p>{t("retentionDetails")}</p>
            </div>
            <div className="content__paragraph">
              <h4>{t("protectingInformation")}</h4>
              <p>{t("protectionDetails")}</p>
            </div>
            <div className="content__paragraph">
              <h4>{t("advertisements")}</h4>
              <p>{t("advertisementDetails")}</p>
            </div>
            <div className="content__paragraph">
              <h4>{t("advertisingId")}</h4>
              <p>{t("advertisingIdDetails")}</p>
            </div>
            <div className="content__paragraph">
              <h4>{t("updatePrivacyPolicy")}</h4>
              <p>{t("updateDetails")}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
