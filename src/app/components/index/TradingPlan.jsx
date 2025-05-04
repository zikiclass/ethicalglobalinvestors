"use client";
import { Fade } from "react-awesome-reveal";
import Button from "../Button";
import "./styles/tradingplan.css";
import { useTranslations } from "next-intl";
const TradingPlan = () => {
  const t = useTranslations("TradingPlan");

  const plans = [
    { title: "Bronze", amount: "300" },
    { title: "Premium", amount: "600" },
    { title: "Gold", amount: "1200" },
    { title: "Platinum", amount: "50000" },
  ];
  return (
    <>
      <div className="trading__container">
        <div className="container">
          <h3>{t("title")}</h3>
          <Fade>
            <p className="text-center">{t("description")}</p>
          </Fade>
          <div className="rows_">
            {plans.map((plan, index) => (
              <Fade
                triggerOnce
                direction="up"
                style={{ flex: 1 }}
                key={plan.title}
              >
                <div className="card_plan">
                  <span>{t(`plans.${index}.title`)}</span>
                  <span className="amount">${plan.amount}</span>
                  <span>${plan.amount}</span>
                  <span>{t(`plans.${index}.referralBonus`)}</span>
                  <span>{t(`plans.${index}.itSupport`)}</span>
                  <Button href="/" title={t(`plans.${index}.purchasePlan`)} />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default TradingPlan;
