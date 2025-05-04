"use client";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import Feature1 from "../../../../public/img/Feature1.png";
import Feature2 from "../../../../public/img/Feature2.png";
import Feature3 from "../../../../public/img/Feature3.png";
import "./styles/features.css";
import { useTranslations } from "next-intl";

const Features = () => {
  const t = useTranslations("features"); // Look inside "features" namespace

  const features = [
    {
      id: 1,
      heading: t("feature1Heading"),
      paragraph: t("feature1Paragraph"),
      image: Feature1,
    },
    {
      id: 2,
      heading: t("feature2Heading"),
      paragraph: t("feature2Paragraph"),
      image: Feature2,
    },
    {
      id: 3,
      heading: t("feature3Heading"),
      paragraph: t("feature3Paragraph"),
      image: Feature3,
    },
  ];

  return (
    <div className="container features__container">
      {features.map((feature) => (
        <Slide direction="up" triggerOnce key={feature.id}>
          <div className="feature__card">
            <Image src={feature.image} alt={feature.heading} />
            <h4>{feature.heading}</h4>
            <p>{feature.paragraph}</p>
          </div>
        </Slide>
      ))}
    </div>
  );
};

export default Features;
