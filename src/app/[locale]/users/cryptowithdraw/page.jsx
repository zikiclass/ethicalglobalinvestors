"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import Button from "../../../components/Button";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import fetchUser from "../_components/FetchUser";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslations } from "next-intl";
const CryptoWithdraw = () => {
  const t = useTranslations("Withdrawal");
  const { data } = fetchUser();
  const router = useRouter();
  const [fromAccount, setFromAccount] = useState("balance");
  const [crypto, setCrypto] = useState("Bitcoin BTC");
  const [amount, setAmount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [OTP, setOTP] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/withdrawals", {
        type: "crypto",
        id: data.id,
        fromAccount,
        crypto,
        amount,
        wallet,
        OTP,
        userOtp: data.otp_code,
      });

      if (response.data.message === "Success") {
        Swal.fire({
          icon: "success",
          text: t("success_message"),
          timer: 1500,
        });
        toast.success(t("success_message"));
        router.push(`withdrawal_list`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";

      if (errorMessage === "otp") {
        toast.error(t("error_message"));
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const formatNumber = (number) => {
    // Check if the number is a valid number or convert it to a string
    const parts = parseFloat(number).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  return (
    <>
      <div>
        <DashboardNavbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          <DashboardPageNavigator text={t("cryptowithdraw")} />
          <div className="dashboard_">
            <Toaster position="bottom-left" />
            <span className="withdraw__heading">{t("withdrawcrypto")}</span>
            <div className="withdrawal">
              <form action="" onSubmit={handleSubmit}>
                <div className="withdraw_form">
                  <div className="col_1" style={{ width: "100%" }}>
                    <div className="input__form">
                      <label>{t("to")}</label>
                      <select
                        name="from__acc"
                        className="select__box"
                        onChange={(e) => setFromAccount(e.target.value)}
                      >
                        <option value="balance" selected="">
                          Trading Balance (
                          {data &&
                          data.transactions &&
                          data.transactions.length > 0
                            ? data.currency +
                              formatNumber(data.transactions[0]?.profit)
                            : ""}
                          )
                        </option>
                        <option value="btc">
                          Bitcoin Mining (
                          {data &&
                          data.transactions &&
                          data.transactions.length > 0
                            ? data.currency +
                              formatNumber(data.transactions[0]?.btc)
                            : ""}{" "}
                          BTC)
                        </option>
                        <option value="eth">
                          Ethereum Mining (
                          {data &&
                          data.transactions &&
                          data.transactions.length > 0
                            ? data.currency +
                              formatNumber(data.transactions[0]?.eth)
                            : ""}{" "}
                          ETH)
                        </option>
                        <option value="atom">
                          Cosmos Mining (
                          {data &&
                          data.transactions &&
                          data.transactions.length > 0
                            ? data.currency +
                              formatNumber(data.transactions[0]?.atom)
                            : ""}{" "}
                          ATOM)
                        </option>
                        <option value="doge">
                          Dogecoin Mining (
                          {data &&
                          data.transactions &&
                          data.transactions.length > 0
                            ? data.currency +
                              formatNumber(data.transactions[0]?.doge)
                            : ""}{" "}
                          DOGE)
                        </option>
                        <option value="bnb">
                          Binance Coin Mining (
                          {data &&
                          data.transactions &&
                          data.transactions.length > 0
                            ? data.currency +
                              formatNumber(data.transactions[0]?.bnb)
                            : ""}{" "}
                          BNB)
                        </option>
                        <option value="referral">
                          Referral Balance (
                          {data &&
                          data.transactions &&
                          data.transactions.length > 0
                            ? data.currency +
                              formatNumber(data.transactions[0]?.referral)
                            : ""}{" "}
                          )
                        </option>
                      </select>
                    </div>
                    <div className="input__form">
                      <label>Crypto Currency</label>
                      <select
                        name="crypto_currency"
                        className="select__box"
                        onChange={(e) => setCrypto(e.target.value)}
                      >
                        <option value="Bitcoin BTC" selected="">
                          Bitcoin BTC
                        </option>
                        <option value="Tether USDT">Tether USDT</option>
                        <option value="Ethereum ETH">Ethereum ETH</option>
                      </select>
                    </div>
                    <div className="input__form">
                      <label>Amount</label>
                      <div className="input__usd">
                        <span>USD</span>
                        <input
                          type="number"
                          name="amount"
                          style={{ width: "100%" }}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input__form">
                      <label>{t("wallet")}</label>
                      <input
                        type="text"
                        name="wallet_address"
                        onChange={(e) => setWallet(e.target.value)}
                      />
                    </div>
                    <div className="input__form">
                      <label>{t("otpcode")}</label>
                      <input
                        type="text"
                        name="otp_code"
                        onChange={(e) => setOTP(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <Button title={t("submit")} />
              </form>
            </div>
          </div>
        </div>
        <BottomNavBar active="dashboard" />
      </div>
    </>
  );
};

export default CryptoWithdraw;
