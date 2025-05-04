"use client";
import "./styles/financialmarkets.css";
import { useTranslations } from "next-intl";
const FinancialMarket = () => {
  const t = useTranslations("FinancialMarket");

  return (
    <>
      <div className="container">
        <h3>{t("title")}</h3>
        <div className="row__financial">
          <div className="col_1">
            <video controls>
              <source src="/videos/financial_markets.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="col_2">
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
            <p>{t("description3")}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default FinancialMarket;
