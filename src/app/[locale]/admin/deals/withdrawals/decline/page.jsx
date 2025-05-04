"use client";
import React, { Suspense, useState, useEffect } from "react";
import Layout from "../../../Layout";
import styles from "../../../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// Component to handle data fetching for the withdrawal details
const DeclineWithdrawalContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "EEEE dd, MMMM yyyy hh:mm:ss a");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/users/withdrawals/uniquewithdraw?id=${id}&mode=single`
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching withdrawal data");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleApprove = async (event) => {
    event.preventDefault();
    try {
      const approve_ = await axios.put(
        "/api/users/withdrawals/uniquewithdraw",
        {
          id,
          action: "decline",
        }
      );
      if (approve_.data.message === "success") {
        toast.success("Transaction declined successfully");
        router.push(`../withdrawals?userId=${userId}`);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <Layout pageTitle="Decline Withdrawal">
      <div className={styles.wrapper}>
        <Link
          href={`../withdrawals?userId=${userId}`}
          className={styles.btnBack}
        >
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className={styles.ctaWrap}>
            {users.length > 0 &&
              users.map((user, index) => (
                <div key={index}>
                  <h2
                    style={{
                      textTransform: "capitalize",
                      textAlign: "center",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                    }}
                  >
                    {user.method} payment
                  </h2>
                  <span>
                    <b>Amount: </b>
                    {user.amount}
                    <br />
                    {user.method === "bank" ? (
                      <span>
                        <b>Account Number: </b>
                        {user.account_number}
                        <br />
                        <b>Account Name: </b>
                        {user.account_name}
                        <br />
                        <b>Bank Name: </b>
                        {user.bank_name}
                      </span>
                    ) : user.method === "crypto" ? (
                      <span>
                        <b>Crypto: </b>
                        {user.crypto}
                        <br />
                        <b>Wallet Address: </b>
                        {user.wallet_address}
                      </span>
                    ) : user.method === "paypal" ? (
                      <span>
                        <b>PayPal Email: </b>
                        {user.paypal_email}
                      </span>
                    ) : (
                      user.method === "cashtag" && (
                        <span>
                          <b>Cash Tag: </b>
                          {user.cash_tag}
                        </span>
                      )
                    )}
                    <br />
                    <b>Date: </b>
                    {formatDate(user.date)}
                  </span>
                </div>
              ))}
            <p>Do you wish to decline this withdrawal?</p>
            <div className={styles.btnWrap}>
              <button
                className={styles.btnNo}
                onClick={() => router.push(`../withdrawals?userId=${userId}`)}
              >
                No
              </button>
              <button className={styles.btnDecline} onClick={handleApprove}>
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const DeclineWithdrawal = () => {
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
      <DeclineWithdrawalContent />
    </Suspense>
  );
};

export default DeclineWithdrawal;
