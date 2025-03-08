"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import { DashboardNavbar } from "../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DashboardPageNavigator from "../../components/DashboardPageNavigator";
import ButtonTransparent from "../../components/ButtonTransparent";
import Swal from "sweetalert2";
import axios from "axios";

const DepositWalletAddress = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DepositWalletAddressContent />
    </Suspense>
  );
};

const DepositWalletAddressContent = () => {
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
          `/api/users/wallets?paymentmethod=${paymethod}`
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
      setCopied(true);
      Swal.fire({
        icon: "success",
        text: wallets.wallet + " copied!",
        timer: 2000,
      });
      // Hide toast after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text="Deposit" />
        <div className="dashboard_">
          {minutes <= 0 ? (
            <p>Invalid or Expired Payment Link</p>
          ) : (
            <div className="deposit">
              <form action="#" className="deposit__form__">
                <p style={{ textTransform: "uppercase" }}>
                  SEND{" "}
                  {Number(amount).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
                  WORTH OF {paymethod}
                </p>
                <p style={{ textAlign: "center" }}>
                  TO THE WALLET ADDRESS BELOW OR SCAN THE QR CODE WITH YOUR
                  WALLET APP
                </p>
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
                    placeholder="Wallet Address"
                    readOnly
                  />
                </div>

                {/* ✅ Toast Notification */}
                {copied && <div className="toast">Copied!</div>}

                <span className="span__dep">
                  {minutes < 10 ? "0" + minutes : minutes}:
                  {seconds < 10 ? "0" + seconds : seconds}
                </span>
                <span className="span__dep" style={{ marginBottom: "1rem" }}>
                  Awaiting Payment
                </span>

                <ButtonTransparent
                  title="wait for confirmation"
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
