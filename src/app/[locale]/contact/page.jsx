"use client";
import React, { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import Banner from "../../components/Banner";
import "../../components/style1.css";
import ContactUsBanner from "../../../../public/img/Hero5.jpg";
import { useTranslations } from "next-intl";
const Contact = () => {
  const refHandle = useRef();
  const t = useTranslations("ContactPage");

  useEffect(() => {
    if (refHandle.current) {
      refHandle.current.classList.add("fadeIn");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Banner text="Contact Us" smallText="" image={ContactUsBanner} />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <form action="">
            <input type="text" placeholder={t("name")} required />
            <input type="email" placeholder={t("email")} required />
            <input type="number" placeholder={t("phone")} required />
            <input type="text" placeholder={t("subject")} required />
            <textarea placeholder={t("message")} rows={5}></textarea>
            <div className="cta__contact">
              <button type="submit">
                <span>{t("send")}</span>
              </button>
              <span>
                <b>{t("note")} </b>
                {t("disclaimer")}
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
