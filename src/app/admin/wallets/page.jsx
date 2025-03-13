"use client";
import React, { Suspense, useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const WalletAddress = () => {
  const [btc, setBTC] = useState("");
  const [eth, setETH] = useState("");
  const [usdttrc, setUsdtTrc] = useState("");
  const [solana, setSolana] = useState("");
  const [trx, setTrx] = useState("");
  const router = useRouter();
  // Fetch wallet data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/wallets`);

        if (response.data.wallets) {
          // Map wallet addresses to corresponding state variables
          const wallets = response.data.wallets;
          wallets.forEach((wallet) => {
            if (wallet.wallet_address === "BTC Bitcoin") setBTC(wallet.wallet);
            if (wallet.wallet_address === "ETH Ethereum") setETH(wallet.wallet);
            if (wallet.wallet_address === "USDT (TRC20)")
              setUsdtTrc(wallet.wallet);
            if (wallet.wallet_address === "Solana") setSolana(wallet.wallet);
            if (wallet.wallet_address === "TRX (Tron)") setTrx(wallet.wallet);
          });
        } else {
          toast.error("Wallet data not found");
        }
      } catch (error) {
        toast.error("Error fetching wallet data");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("/api/users/wallets", {
        btc,
        eth,
        usdttrc,
        solana,
        trx,
      });

      if (response.data.message === "Wallets updated successfully") {
        router.push(`/admin/dashboard`);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Wallets updated successfully",
          timer: 1500,
        });
        toast.success("Wallets updated successfully");
      } else {
        toast.error("An error occurred while updating wallets");
      }
    } catch (error) {
      toast.error("An error occurred while updating wallets");
      console.error(error);
    }
  };

  return (
    <Layout pageTitle="Wallets">
      <div className={styles.wrapper}>
        <Toaster position="bottom-left" />
        <form action="" className={styles.fund} onSubmit={handleUpdate}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.input}>
                <label>BTC Bitcoin</label>
                <input
                  type="text"
                  name="btc"
                  value={btc}
                  onChange={(e) => setBTC(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <label>ETH Ethereum</label>
                <input
                  type="text"
                  name="eth"
                  value={eth}
                  onChange={(e) => setETH(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <label>USDT (TRC20)</label>
                <input
                  type="text"
                  name="usdttrc"
                  value={usdttrc}
                  onChange={(e) => setUsdtTrc(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <label>Solana</label>
                <input
                  type="text"
                  name="usdterc"
                  value={solana}
                  onChange={(e) => setSolana(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <label>TRX (Tron)</label>
                <input
                  type="text"
                  name="trx"
                  value={trx}
                  onChange={(e) => setTrx(e.target.value)}
                />
              </div>
            </div>
          </div>

          <input type="submit" value="Update" className={styles.btnSubmit} />
        </form>
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const Wallets = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <WalletAddress />
    </Suspense>
  );
};

export default Wallets;
