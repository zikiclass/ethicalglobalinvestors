"use client";
import { project_name } from "../../../../env";
import { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import BannerEmpty from "../../components/Banner2";
import "../../components/style1.css";
import { useTranslations } from "next-intl";
const BitcoinMining = () => {
  const t = useTranslations("BitcoinMining");
  const refHandle = useRef();

  useEffect(() => {
    if (refHandle.current) {
      refHandle.current.classList.add("fadeIn");
    }
  }, []);

  return (
    <>
      <NavBar />
      <BannerEmpty text="Bitcoin Mining" smallText="" />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <div className="content">
            <h1>{t("title")}</h1>

            <p>{t("paragraph1")}</p>

            <p>{t("paragraph2")}</p>

            <p>{t("paragraph3")}</p>

            <p>
              <b>{t("bold1")}</b>
              <br />
              {t("paragraph4")}
            </p>

            <p>
              <b>{t("bold2")}</b>
              <br />
              {t("paragraph5")}
            </p>

            <p>{t("paragraph6")}</p>

            <p>{t("paragraph7")}</p>

            <p>
              <b>{t("bold3")}</b>
              <br />
              {t("paragraph8")}
            </p>

            <p>{t("paragraph9")}</p>

            <p>{t("paragraph10")}</p>

            <p>{t("paragraph11")}</p>

            <p>
              <b>{t("bold4")}</b>
              <br />
              {t("paragraph12")}
            </p>

            <p>{t("paragraph13")}</p>

            <p>{t("paragraph14")}</p>

            <p>{t("paragraph15")}</p>

            <p>{t("paragraph16")}</p>

            <p>{t("paragraph17")}</p>

            <p>
              <b>{t("bold5")}U</b>
              <br />
              {t("paragraph18")}
            </p>

            <p>{t("paragraph19")}</p>

            <p>
              <b>{t("bold6")}</b>
              <br />
              {t("paragraph20")}
            </p>

            <p>{t("paragraph21")}</p>

            <p>{t("paragraph22")}</p>

            <p>
              <b>{t("bold7")}</b>
              <br />
              {t("paragraph23")}
            </p>

            <p>{t("paragraph24")}</p>

            <p>
              <b>{t("bold8")}</b>
              <br />
              {t("paragraph25")}
            </p>

            <p>
              {t("paragraph26")}
              <br />
              {t("paragraph27")}
            </p>

            <p>{t("paragraph28")}</p>

            <p>
              <b>{t("bold9")}</b>
              <br />
              {t("paragraph29")}
            </p>

            <p>{t("paragraph30")}</p>

            <p>{t("paragraph31")}</p>

            <p>{t("paragraph32")}</p>

            <p>{t("paragraph33")}</p>

            <p>{t("paragraph34")}</p>

            <p>{t("paragraph35")}</p>

            <p>{t("paragraph36")}</p>

            <p>{t("paragraph37")}</p>

            <p>
              <b>{t("bold10")}</b>
              <br />
              {t("paragraph38")}
            </p>

            <p>{t("paragraph39")}</p>

            <p>{t("paragraph40")}</p>

            <p>
              <b>{t("bold11")}</b>
              <br />
              {t("paragraph41")}
            </p>

            <p>{t("paragraph42")}</p>

            <p>
              <b>{t("bold12")}</b>
              <br />
              {t("paragraph43")}
            </p>

            <p>{t("paragraph44")}</p>

            <p>{t("paragraph45")}</p>

            <p>
              <b>{t("bold13")}</b>
              <br />
              {t("paragraph46")}
            </p>

            <p>{t("paragraph47")}</p>

            <p>{t("paragraph48", { project_name })}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BitcoinMining;
