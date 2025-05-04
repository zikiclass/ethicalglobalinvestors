"use client";
import React from "react";
import "./styles/latestpayouts.css";
import { useTranslations } from "next-intl";
import { payouts, testimonies } from "./data";
import TM1 from "../../../../public/img/TM1.jpeg";
import TM2 from "../../../../public/img/TM2.jpeg";
import TW1 from "../../../../public/img/TW1.jpeg";
import TW2 from "../../../../public/img/TW2.jpeg";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

const LatestPayouts = () => {
  const t = useTranslations(); // Use the useTranslations hook to get translations

  const testimonies = [
    {
      id: 1,
      name: t("testimonials.name_1"),
      comment: t("testimonials.comment_1"),
      image: TM2,
    },
    {
      id: 2,
      name: t("testimonials.name_2"),
      comment: t("testimonials.comment_2"),
      image: TW2,
    },
    {
      id: 3,
      name: t("testimonials.name_3"),
      comment: t("testimonials.comment_3"),
      image: TW1,
    },
    {
      id: 4,
      name: t("testimonials.name_4"),
      comment: t("testimonials.comment_4"),
      image: TM1,
    },
  ];

  const payouts = [
    { id: 1, color: "#7653e1", text: t("payouts.1"), amount: "2,328.00" },
    { id: 2, color: "#7cbef9", text: t("payouts.2"), amount: "7,474.00" },
    { id: 3, color: "#f0a560", text: t("payouts.3"), amount: "6,967.00" },
    { id: 4, color: "#6d6af6", text: t("payouts.4"), amount: "1,372.00" },
    { id: 5, color: "#371e8c", text: t("payouts.5"), amount: "4,234.00" },
    { id: 6, color: "#371e8c", text: t("payouts.6"), amount: "3,306.00" },
    { id: 7, color: "#371e8c", text: t("payouts.7"), amount: "7,684.00" },
    { id: 8, color: "#7cbef9", text: t("payouts.8"), amount: "8,486.00" },
    { id: 9, color: "#6d6af6", text: t("payouts.9"), amount: "2,095.00" },
    { id: 10, color: "#371e8c", text: t("payouts.10"), amount: "1,389.00" },
    { id: 11, color: "#79dac8", text: t("payouts.11"), amount: "4,278.00" },
    { id: 12, color: "#79dac8", text: t("payouts.12"), amount: "3,166.00" },
    { id: 13, color: "#f0a560", text: t("payouts.13"), amount: "6,125.00" },
    { id: 14, color: "#6d6af6", text: t("payouts.14"), amount: "5,257.00" },
    { id: 15, color: "#7653e1", text: t("payouts.15"), amount: "1,033.00" },
    {
      id: 16,
      color: "#6d6af6",
      text: t("payouts.16"),
      amount: "2,576.00",
    },
    { id: 17, color: "#371e8c", text: t("payouts.17"), amount: "6,991.00" },
    { id: 18, color: "#79dac8", text: t("payouts.18"), amount: "2,100.00" },
  ];

  return (
    <>
      <div className="container">
        <div className="payouts__row">
          <div className="col_payout_1">
            {testimonies.map((testimony) => (
              <Fade
                direction="up"
                key={testimony.id}
                triggerOnce
                style={{ flex: "0 0 50%" }}
              >
                <div className="testimony">
                  <Image
                    src={testimony.image}
                    alt={testimony.name}
                    className="img-testimony"
                  />
                  <span id="name">{testimony.name}</span>
                  <span id="comment">{testimony.comment}</span>
                </div>
              </Fade>
            ))}
          </div>
          <Fade direction="up" triggerOnce style={{ flex: "1.3" }}>
            <div className="col_payout_2">
              <h4>{t("latest_payouts")}</h4> {/* Translated heading */}
              {payouts.map((payout) => (
                <div className="payout" key={payout.id}>
                  <div id="box_wrapper">
                    <div
                      className="box"
                      style={{ backgroundColor: `${payout.color}` }}
                    ></div>
                    <span>{payout.text}</span>
                  </div>
                  <span>{payout.amount}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default LatestPayouts;
