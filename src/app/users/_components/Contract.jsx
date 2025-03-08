"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "./styles/user.css"; // Import your CSS styles

const Contract = ({ data }) => {
  const formatNumber = (number) => {
    // Check if the number is a valid number or convert it to a string
    const parts = parseFloat(number).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  useEffect(() => {
    const appendTradingViewScript = (symbol, containerClass) => {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: "100%", // Set width to 100%
        height: 220,
        locale: "en",
        dateRange: "12M",
        colorTheme: "light",
        isTransparent: false,
        autosize: false,
        largeChartUrl: "",
      });
      const container = document.querySelector(containerClass);
      container && container.appendChild(script);
      return () => {
        const scriptElement = document.querySelector(
          `${containerClass} > script[src="${script.src}"]`
        );
        scriptElement && scriptElement.parentNode.removeChild(scriptElement);
      };
    };

    const cleanup1 = appendTradingViewScript(
      "BITSTAMP:BTCUSD",
      ".trading_view_1"
    );
    const cleanup2 = appendTradingViewScript(
      "COINBASE:ETHUSD",
      ".trading_view_2"
    );

    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return (
    <div className="min_flex">
      <div className="min_flex_top">
        <span>
          $
          {data && data.transactions && data.transactions.length > 0
            ? formatNumber(data.transactions[0]?.profit)
            : ""}
        </span>
      </div>
      {/* <div className="min_flex_buttons">
        <Link href="/" id="link__button__min">
          buy contract
        </Link>
        <Link href="/" id="link__button__min">
          my contracts
        </Link>
      </div> */}
      <div className="trading_view_1" style={{ marginBottom: "0.6rem" }}></div>
      <div className="trading_view_2"></div>
    </div>
  );
};

export default Contract;
