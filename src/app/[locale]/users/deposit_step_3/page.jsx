"use client";
import CircularProgress from "@mui/joy/CircularProgress";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Button from "../../../components/Button";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import axios from "axios";
import fetchUser from "../_components/FetchUser";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
const DepositStep3 = () => {
  const t = useTranslations("Deposit");
  return (
    <>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <DepositStep3Content />
      </Suspense>
    </>
  );
};

const DepositStep3Content = () => {
  const t = useTranslations("Deposit");
  const { data } = fetchUser();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const depAccount = searchParams.get("depAccount");
  const amountUSD = parseFloat(searchParams.get("amount"));
  const [buttonClicked, setButtonClicked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("BTC Bitcoin");
  const router = useRouter();
  const [cryptoEquivalent, setCryptoEquivalent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchExchangeRate = async (cryptoId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`
      );
      const data = await response.json();
      const exchangeRate = data[cryptoId]?.usd;
      if (!isNaN(exchangeRate)) {
        const cryptoEquivalentAmount = amountUSD / exchangeRate;
        setCryptoEquivalent(cryptoEquivalentAmount.toFixed(8));
      } else {
        console.error("Invalid exchange rate:", exchangeRate);
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 2000);
    try {
      const response = await axios.post("/api/users/deposit", {
        userId: data.id,
        amount,
        account_: depAccount,
        dep_method: paymentMethod,
      });
      if (response) {
        router.push(
          `deposit_wallet_address?amount=${amount}&paymethod=${paymentMethod}&depAccount=${depAccount}`
        );
      } else {
        toast.error("Error making deposit");
      }
    } catch (error) {
      toast.error("Error making deposit");
    }
  };

  useEffect(() => {
    if (amountUSD) {
      fetchExchangeRate("bitcoin"); // default to BTC
    }
  }, [amountUSD]);

  useEffect(() => {
    if (paymentMethod) {
      const cryptoMap = {
        "BTC Bitcoin": "bitcoin",
        "ETH Ethereum": "ethereum",
        "USDT (TRC20)": "tether",
        Solana: "solana",
        "TRX (Tron)": "tron",
      };
      const selectedCrypto = cryptoMap[paymentMethod];
      if (selectedCrypto) {
        setLoading(true);
        fetchExchangeRate(selectedCrypto);
      }
    }
  }, [paymentMethod, amountUSD]);

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("title")} />
        <div className="dashboard_">
          <div className="deposit">
            <Toaster position="bottom-left" />
            <h2>
              {t("pay")}{" "}
              {Number(amount).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <p style={{ marginTop: "-20px" }}>{t("sendcrypto")}</p>
            <div className="deposit__form">
              {paymentMethod !== "BANK" ? (
                <center>
                  <label>
                    {loading
                      ? "Loading..."
                      : cryptoEquivalent !== null && !isNaN(cryptoEquivalent)
                      ? parseFloat(cryptoEquivalent).toFixed(8)
                      : "N/A"}{" "}
                    {paymentMethod.split(" ")[0]}
                  </label>
                </center>
              ) : (
                <center>
                  <label>
                    {Number(amount).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </label>
                </center>
              )}

              <form action="#" onSubmit={handleProceed}>
                <div className="input__deposit">
                  <label>{t("paymentmethod")}</label>
                  <select
                    className="select__deposit"
                    name="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                  >
                    <option value="BTC Bitcoin">BTC Bitcoin</option>
                    <option value="ETH Ethereum">ETH Ethereum</option>
                    <option value="USDT (TRC20)">USDT Usdt(trc20)</option>
                    <option value="Solana">Solana</option>
                    <option value="TRX (Tron)">TRX Trx(tron)</option>
                    <option value="BANK">Bank Transfer</option>
                  </select>
                </div>
                {!buttonClicked ? (
                  <Button title={t("proceed")} />
                ) : (
                  <center style={{ padding: "0px" }}>
                    <CircularProgress thickness={4} />
                  </center>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="dashboard" />
    </div>
  );
};

export default DepositStep3;
