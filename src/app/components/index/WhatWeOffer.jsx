"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import Button from "../Button";
import { useTranslations } from "next-intl"; // Import useTranslations hook
import Crypto from "../../../../public/img/Crypto.jpeg";
import Trading from "../../../../public/img/Trading.jpeg";
import Expert from "../../../../public/img/Expert.jpg";
import "./styles/whatweoffer.css";

const WhatWeOffer = () => {
  const t = useTranslations("WhatWeOffer"); // Fetch translations for the "WhatWeOffer" namespace

  const offerList = [
    {
      id: 1,
      img: Crypto,
      heading: t("offerList.0.heading"), // Translate heading
      paragraph: t("offerList.0.paragraph"), // Translate paragraph
      link: t("offerList.0.link"), // Translate link
    },
    {
      id: 2,
      img: Trading,
      heading: t("offerList.1.heading"), // Translate heading
      paragraph: t("offerList.1.paragraph"), // Translate paragraph
      link: t("offerList.1.link"), // Translate link
    },
    {
      id: 3,
      img: Expert,
      heading: t("offerList.2.heading"), // Translate heading
      paragraph: t("offerList.2.paragraph"), // Translate paragraph
      link: t("offerList.2.link"), // Translate link
    },
  ];

  return (
    <>
      <div className="container">
        <div className="heading">
          <h3>{t("title")}</h3> {/* Use translated title */}
          <p className="text-center">
            {t("description")} {/* Use translated description */}
          </p>
        </div>
        <div className="cards">
          {offerList.map((offer) => (
            <Fade direction="up" triggerOnce key={offer.id}>
              <div className="card">
                <Image
                  src={offer.img}
                  alt={offer.heading}
                  style={{ width: "100%", height: "250px" }}
                />
                <div className="card__content">
                  <h4>{offer.heading}</h4> {/* Use translated heading */}
                  <p>{offer.paragraph}</p> {/* Use translated paragraph */}
                  <Button href={offer.link} title={t("learnMore")} />{" "}
                  {/* Use translated button label */}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhatWeOffer;
