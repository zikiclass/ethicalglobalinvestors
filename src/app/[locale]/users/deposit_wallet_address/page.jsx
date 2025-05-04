"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import ButtonTransparent from "../../../components/ButtonTransparent";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslations } from "next-intl";

const DepositWalletAddress = () => {
  const t = useTranslations("Deposit");
  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <DepositWalletAddressContent />
    </Suspense>
  );
};

const DepositWalletAddressContent = () => {
  const t = useTranslations("Deposit");
  const [wallets, setWallets] = useState("");
  const [copied, setCopied] = useState(false); // State to manage toast message
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const paymethod = searchParams.get("paymethod");

  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer);
        } else {
          localStorage.setItem("timeLeft", prevTimeLeft - 1);
        }
        return prevTimeLeft > 0 ? prevTimeLeft - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/users/wallets?paymentmethod=${paymethod}&amount=${amount}`
        );

        if (response.data.wallets) {
          setWallets(response.data.wallets);
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    };
    fetchData();
  }, [paymethod]);

  const initialTimeLeft =
    typeof window !== "undefined"
      ? localStorage.getItem("timeLeft") || 3600
      : 3600;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const showDepositList = (e) => {
    e.preventDefault();
    router.push(`deposit_list`);
  };

  // ✅ Copy Wallet Address Function
  const copyToClipboard = () => {
    if (wallets.wallet) {
      navigator.clipboard
        .writeText(wallets.wallet)
        .then(() => {
          setCopied(true);
          Swal.fire({
            icon: "success",
            text: wallets.wallet + " copied!",
            timer: 2000,
          });

          // Hide toast after 2 seconds
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
          Swal.fire({
            icon: "error",
            text: "Failed to copy the wallet address.",
            timer: 2000,
          });
        });
    }
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("title")} />
        <div className="dashboard_">
          {minutes <= 0 ? (
            <p>{t("invalidlink")}</p>
          ) : (
            <div className="deposit">
              <form action="#" className="deposit__form__">
                {paymethod !== "BANK" ? (
                  <>
                    <p style={{ textTransform: "uppercase" }}>
                      {t("send")}{" "}
                      {Number(amount).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}{" "}
                      {t("worth")} {paymethod}
                    </p>
                    <p style={{ textAlign: "center" }}>{t("paragraph1")}</p>
                    <div className="input__deposit__">
                      {/* ✅ Copy Icon Now Works */}
                      <ContentCopyIcon
                        id="icon"
                        onClick={copyToClipboard}
                        style={{ cursor: "pointer" }}
                      />
                      <input
                        type="text"
                        value={wallets.wallet}
                        placeholder={t("wallet")}
                        readOnly
                      />
                    </div>

                    {/* ✅ Toast Notification */}
                    {copied && <div className="toast">Copied!</div>}
                  </>
                ) : (
                  <>
                    <p style={{ textTransform: "uppercase" }}>
                      {t("send")}{" "}
                      {Number(amount).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}{" "}
                      {t("paragraph2")}
                    </p>
                    <p style={{ textAlign: "center" }}>{t("paragraph3")}</p>
                  </>
                )}

                <span className="span__dep">
                  {minutes < 10 ? "0" + minutes : minutes}:
                  {seconds < 10 ? "0" + seconds : seconds}
                </span>
                <span className="span__dep" style={{ marginBottom: "1rem" }}>
                  {t("awaiting")}
                </span>

                <ButtonTransparent
                  title={t("wait")}
                  onClick={showDepositList}
                />
              </form>
            </div>
          )}
        </div>
      </div>
      <BottomNavBar active="dashboard" />

      {/* ✅ Add Toast Styles */}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 14px;
          animation: fadeInOut 2s;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DepositWalletAddress;
