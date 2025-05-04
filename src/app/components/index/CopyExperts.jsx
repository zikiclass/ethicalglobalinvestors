"use client";
import ChartExample from "../../../../public/img/ChartExample.png";
import Image from "next/image";
import { Bounce, Fade, Slide } from "react-awesome-reveal";
import "./styles/copyexpert.css";
import { project_name } from "../../../../env";
import { useTranslations } from "next-intl";

const CopyExperts = ({ project_title }) => {
  const t = useTranslations("CopyExperts");

  return (
    <>
      <div className="copyexpert__container">
        <div className="container">
          <Fade>
            <h3>{t("title")}</h3>
            <div className="copyexpert__rows">
              <div className="copyexpert__col__1">
                <Fade triggerOnce>
                  <p>{t("paragraph1")}</p>
                  <p>{t("paragraph2")}</p>
                  <p>{t("paragraph3")}</p>
                  <p>{t("paragraph4")}</p>
                  <p>{t("paragraph5", { project_name, project_title })}</p>
                </Fade>
              </div>
              <div className="copyexpert__col__2">
                <Bounce triggerOnce>
                  <Image src={ChartExample} alt="Chart" />
                </Bounce>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default CopyExperts;
