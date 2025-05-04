"use client";
import React, { Suspense, useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import delay from "delay";

// Component to handle the user and transaction data fetching
const FundAccountContent = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [users, setUsers] = useState([]);
  const [id, setId] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const [profit, setProfit] = useState(null);
  const [referral, setReferral] = useState(null);
  const [btc, setBTC] = useState(null);
  const [eth, setETH] = useState(null);
  const [bnb, setBNB] = useState(null);
  const [doge, setDOGE] = useState(null);
  const [atom, setATOM] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/singleuser?id=${userId}`);
        console.log("API Response:", response.data);
        if (response.data.user) {
          setUsers(response.data.user);
          setTransaction(response.data.user.transactions[0]);
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        toast.error("User not found");
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (transaction) {
      setDeposit(transaction.deposit);
      setProfit(transaction.profit);
      setReferral(transaction.referral);
      setBTC(transaction.btc);
      setETH(transaction.eth);
      setBNB(transaction.bnb);
      setDOGE(transaction.doge);
      setATOM(transaction.atom);
      setId(transaction.id);
    }
  }, [transaction]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updateTrans = await axios.put("/api/users/singleuser", {
        id,
        deposit,
        profit,
        referral,
        btc,
        eth,
        bnb,
        doge,
        atom,
      });
      if (updateTrans.data.message === "success") {
        toast.success("Records updated successfully");
        delay(2000);
        router.push("users");
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred", error);
    }
  };

  return (
    <Layout pageTitle="Fund Account">
      <div className={styles.wrapper}>
        <Link href="/admin/users" className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        {users && transaction ? (
          <form action="" className={styles.fund} onSubmit={handleUpdate}>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.input}>
                  <label>Deposit ($)</label>
                  <input
                    type="number"
                    name="deposit"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>Profit ($)</label>
                  <input
                    type="number"
                    name="profit"
                    value={profit}
                    onChange={(e) => setProfit(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>Referral ($)</label>
                  <input
                    type="number"
                    name="referral"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                  />
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    fontStyle: "italic",
                    color: "#fff!important",
                    marginBottom: "0px",
                  }}
                >
                  User: {users.first_name + " " + users.last_name}
                  <br />
                  Email: {users.email}
                  <br />
                  Current Deposit: ${transaction.deposit}
                  <br />
                  Current Profit: ${transaction.profit}
                  <br />
                  Current Referral Balance: ${transaction.referral}
                  <br />
                </p>
              </div>
              <div className={styles.col}>
                <div className={styles.input}>
                  <label>BTC ($)</label>
                  <input
                    type="number"
                    name="btc"
                    value={btc}
                    onChange={(e) => setBTC(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>ETH ($)</label>
                  <input
                    type="number"
                    name="eth"
                    value={eth}
                    onChange={(e) => setETH(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>BNB ($)</label>
                  <input
                    type="number"
                    name="bnb"
                    value={bnb}
                    onChange={(e) => setBNB(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>DOGE ($)</label>
                  <input
                    type="number"
                    name="doge"
                    value={doge}
                    onChange={(e) => setDOGE(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label>ATOM ($)</label>
                  <input
                    type="number"
                    name="atom"
                    value={atom}
                    onChange={(e) => setATOM(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <input type="submit" value="Fund" className={styles.btnSubmit} />
          </form>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const FundAccount = () => {
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
      <FundAccountContent />
    </Suspense>
  );
};

export default FundAccount;
