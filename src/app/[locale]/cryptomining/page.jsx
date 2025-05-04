"use client";
import { last_revised } from "../../../../env";
import { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import BannerEmpty from "../../components/Banner2";
import "../../components/style1.css";
import { useTranslations } from "next-intl";

const CryptoMining = () => {
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
      <BannerEmpty
        text={t("cryptoMining")}
        smallText={`${t("lastRevised")}: ${last_revised}`}
      />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <div className="content">
            <h1>{t("cryptoMiningTitle")}</h1>
            <p>{t("cryptoMiningParagraph1")}</p>
            <p>{t("cryptoMiningParagraph2")}</p>

            <div className="content__paragraph">
              <h4>{t("howIsBitcoinSecure")}</h4>
              <p>{t("bitcoinSecurityParagraph")}</p>
            </div>
            <div className="content__paragraph">
              <h4>{t("minersIncentives")}</h4>
              <p>{t("minersIncentivesParagraph")}</p>
            </div>
            <div className="content__paragraph">
              <h4>{t("bigVisionOfCrypto")}</h4>
              <p>{t("bigVisionParagraph")}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CryptoMining;
