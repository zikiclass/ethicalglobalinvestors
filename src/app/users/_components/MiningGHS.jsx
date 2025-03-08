"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import "./styles/user.css";
import fetchUser from "../_components/FetchUser";
import Bitcoin from "../../../../public/img/pair-icon-btcusd.img.svg";
import Ethereum from "../../../../public/img/pair-icon-ethusd.img.svg";
import Binance from "../../../../public/img/pair-icon-bnbusd.img.svg";
import Cosmos from "../../../../public/img/pair-icon-atomusd.img.svg";
import Dodge from "../../../../public/img/pair-icon-dogeusd.img.svg";

const MiningGHS = () => {
  const { data } = fetchUser();
  const [cryptoRates, setCryptoRates] = useState(null);
  const [currencyRates, setCurrencyRates] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Fetch crypto prices in USD
        const cryptoResponse = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,cosmos&vs_currencies=usd"
        );

        // Fetch currency conversion rates (USD as base)
        const currencyResponse = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );

        setCryptoRates({
          btc: cryptoResponse.data.bitcoin.usd,
          eth: cryptoResponse.data.ethereum.usd,
          doge: cryptoResponse.data.dogecoin.usd,
          atom: cryptoResponse.data.cosmos.usd,
        });

        setCurrencyRates(currencyResponse.data.rates);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  const formatNumber = (number, decimals = 2, useCommas = true) => {
    const formatted = parseFloat(number).toFixed(decimals);
    return useCommas
      ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : formatted;
  };

  const getTransactionValue = (key) => {
    return data?.transactions?.length > 0
      ? parseFloat(data.transactions[0]?.[key]) || 0
      : 0;
  };

  if (!cryptoRates || !currencyRates) return <p>Loading rates...</p>;

  // Get user's currency (default to USD if not found)
  const userCurrency = data?.currency || "USD";
  const currencyRate = currencyRates[userCurrency] || 1; // Default to 1 for USD

  // Function to convert user's currency to USD
  const convertToUSD = (amount) => amount / currencyRate;

  const min_ghs = [
    {
      id: 1,
      svg: Bitcoin,
      symbol: "BTC",
      dollar_amt: getTransactionValue("btc"),
      crypto_amt: convertToUSD(getTransactionValue("btc")) / cryptoRates.btc, // Convert user currency to USD, then to BTC
      ghs: "GH/s",
    },
    {
      id: 2,
      svg: Ethereum,
      symbol: "ETH",
      dollar_amt: getTransactionValue("eth"),
      crypto_amt: convertToUSD(getTransactionValue("eth")) / cryptoRates.eth, // Convert user currency to USD, then to ETH
      ghs: "GH/s",
    },
    {
      id: 3,
      svg: Binance,
      symbol: "BNB",
      dollar_amt: getTransactionValue("bnb"),
      crypto_amt: convertToUSD(getTransactionValue("bnb")), // No conversion needed for BNB
      ghs: "0 GH/s",
    },
    {
      id: 4,
      svg: Dodge,
      symbol: "DOGE",
      dollar_amt: getTransactionValue("doge"),
      crypto_amt: convertToUSD(getTransactionValue("doge")) / cryptoRates.doge, // Convert user currency to USD, then to DOGE
      ghs: "GH/s",
    },
    {
      id: 5,
      svg: Cosmos,
      symbol: "ATOM",
      dollar_amt: getTransactionValue("atom"),
      crypto_amt: convertToUSD(getTransactionValue("atom")) / cryptoRates.atom, // Convert user currency to USD, then to ATOM
      ghs: "GH/s",
    },
  ];

  return (
    <div className="categories">
      <div className="favorites">
        {min_ghs.map((min_gh) => (
          <div className="favorite" key={min_gh.id}>
            <Image src={min_gh.svg} alt={min_gh.ghs} className="fav__img" />
            <div className="fav__content" style={{ color: "#777" }}>
              <span style={{ fontSize: "1rem" }}>
                {formatNumber(min_gh.crypto_amt, 6, false)}
                {min_gh.symbol}
              </span>
              <span style={{ fontSize: "15px" }}>
                {userCurrency + " " + formatNumber(min_gh.dollar_amt, 2)}
              </span>
            </div>
            <span
              style={{
                color: "#777",
                fontSize: "13px",
                width: "100%",
                textAlign: "right",
              }}
            >
              {min_gh.ghs}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiningGHS;
