"use client";
import Image from "next/image";
import { useTranslations } from "next-intl"; // Use the next-intl hook to fetch translations
import "./styles/cryptocurrencies.css";
import Bitcoin from "../../../../public/img/pair-icon-btcusd.img.svg";
import Ethereum from "../../../../public/img/pair-icon-ethusd.img.svg";
import Binance from "../../../../public/img/pair-icon-bnbusd.img.svg";
import Cosmos from "../../../../public/img/pair-icon-atomusd.img.svg";
import { Bounce, Fade } from "react-awesome-reveal";

const Cryptocurrencies = () => {
  const t = useTranslations("Cryptocurrencies"); // Fetch translations for this component
  const cryptos = [
    { id: 1, img: Bitcoin, name: "Bitcoin" },
    { id: 2, img: Ethereum, name: "Ethereum" },
    { id: 3, img: Binance, name: "Binance Coin" },
    { id: 4, img: Cosmos, name: "Cosmos" },
  ];

  return (
    <>
      <div className="crypto__container">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <h3>{t("title")}</h3>
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </Fade>
          <div className="crypto__miners">
            {cryptos.map((crypto) => (
              <div className="crypto__miner" key={crypto.id}>
                <Bounce triggerOnce>
                  <Image src={crypto.img} alt={crypto.name} />
                  <span>{crypto.name}</span>
                </Bounce>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cryptocurrencies;
