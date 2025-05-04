"use client";
import AboutBanner from "../../../../public/img/Hero3.jpg";
import { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import Banner from "../../components/Banner";
import "../../components/style1.css";
import { useTranslations } from "next-intl";
const About = () => {
  const t = useTranslations("About");
  const refHandle = useRef();

  useEffect(() => {
    if (refHandle.current) {
      refHandle.current.classList.add("fadeIn");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Banner text="About Us" smallText="" image={AboutBanner} />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <div className="content">
            <h1>{t("title")}</h1>
            <p>{t("paragraph1")}</p>

            <p>{t("paragraph2")}</p>

            <p>{t("paragraph3")}</p>

            <p>{t("paragraph4")}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
