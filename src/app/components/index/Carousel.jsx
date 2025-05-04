"use client";
import React, { useState, useEffect } from "react";
import "./styles/carousel.css";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const Slider = ({ project_title }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Get locale from the first part of the path: "/fr/contact" -> "fr"
  const locale = pathname.split("/")[1] || "en";
  const t = useTranslations("Carousel");

  const slides = [
    {
      src: "/img/BgForex.jpg",
      title: t("welcome", { project: project_title }),
      description: t("welcomeDesc"),
      buttonLink: `/${locale}/signup`,
    },
    {
      src: "/img/BgStocks2.jpg",
      title: t("stocksTitle"),
      description: t("stocksDesc"),
      buttonLink: `/${locale}/signup`,
    },
    {
      src: "/img/BgTrader.jpg",
      title: t("forexTitle"),
      description: t("forexDesc", { project: project_title }),
      buttonLink: `/${locale}/signup`,
    },
    {
      src: "/img/Crypto4.jpeg",
      title: t("copyTitle"),
      description: t("copyDesc"),
      buttonLink: `/${locale}/signup`,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(33, 5, 172, 0.7), rgba(205, 12, 134, 0.6)), url(${slide.src})`,
            opacity: index === currentIndex ? 1 : 0,
            pointerEvents: index === currentIndex ? "auto" : "none",
            transition: "opacity 1s ease-in-out",
          }}
        >
          {index === currentIndex && (
            <div className="carousel__label-wrapper">
              <div className="carousel__label">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <Link href={slide.buttonLink} passHref>
                  <Button as="a">{t("getStarted")}</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
