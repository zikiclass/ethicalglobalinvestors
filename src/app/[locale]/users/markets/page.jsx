"use client";
import React, { useEffect, useRef, useState } from "react";
import { DashboardNavbar } from "../../../HomeComponents";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import BottomNavBar from "../_components/BottomNavBar";
import { useTranslations } from "use-intl";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import {
  TradeSelectFirst,
  TradeSelectSecond,
  TradeSelectThird,
} from "../../../components/index/data";
const Markets = () => {
  const t = useTranslations();
  const container = useRef();

  useEffect(() => {
    // Check if the TradingView script is already appended
    if (!document.getElementById("tradingview-widget-script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.id = "tradingview-widget-script"; // Set a unique ID for the script

      // Configuration for the TradingView chart
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
        details: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
      });

      // Append the script to the container
      container.current.appendChild(script);
    }
  }, []);

  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");
  const handleFirstSelectChange = (event) => {
    const { value } = event.target;
    setFirstSelect(value);
    setSecondSelect("");
  };
  return (
    <>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("Dashboard.markets")} />
        <div className="trade">
          <div className="trade__col__2">
            <div
              className="tradingview-widget-container"
              ref={container}
              style={{ height: "calc(100vh - 64px)", width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
      <BottomNavBar active="markets" />
    </>
  );
};

export default Markets;
