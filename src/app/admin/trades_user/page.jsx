"use client";
import React, { Suspense, useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Component that handles fetching the user data and managing the state
const TradesUser = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [users, setUsers] = useState([]);
  const [otpCode, setOtpCode] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/singleuser?id=${userId}`);
        setUsers(response.data.user);
        setOtpCode(response.data.user.otp_code);
        setTransactions(response.data.user.transactions[0]);
      } catch (error) {
        toast.error("An error occurred");
      }
    };
    fetchData();
  }, [userId]);

  const formatNumber = (number) => {
    // Format number to currency style
    const parts = parseFloat(number).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/users/otp", {
        id: users.id,
        otpCode,
      });
      if (response.data.message === "success") {
        toast.success("OTP code updated successfully");
      } else {
        toast.error("Error updating OTP code");
      }
    } catch (error) {
      toast.error("Unable to update OTP Code for this client");
    }
  };

  return (
    <Layout
      pageTitle={`Client Profile for ${users.first_name} ${users.last_name}`}
    >
      <div className={styles.wrapper}>
        <Toaster position="bottom-left" />
        <div className={styles.container}>
          <Link href="/admin/users" className={styles.btnBack}>
            <ReplyIcon />
            Back
          </Link>
          {!users ? (
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
            <div className={styles.row}>
              <div className={styles.col}>
                <p>
                  <span>Fullname</span>
                  <span>{users.first_name + " " + users.last_name}</span>
                </p>
                <p>
                  <span>Account Type</span>
                  <span>{users.accounttype}</span>
                </p>
                <p>
                  <span>City</span>
                  <span>{users.city}</span>
                </p>
                <p>
                  <span>Currency</span>
                  <span>{users.currency}</span>
                </p>
                <p>
                  <span>Country</span>
                  <span>{users.country}</span>
                </p>
                <p>
                  <span>Email</span>
                  <span>{users.email}</span>
                </p>
              </div>
              <div className={styles.col}>
                <p>
                  <span>Mobile</span>
                  <span>{users.mobile}</span>
                </p>
                <p>
                  <span>Password</span>
                  <span>****</span>
                </p>
                <p>
                  <span>State</span>
                  <span>{users.state}</span>
                </p>
                <p>
                  <span>Postal Code</span>
                  <span>{users.postal_code}</span>
                </p>
                <p>
                  <span>Street Address</span>
                  <span>{users.street_address}</span>
                </p>
              </div>

              <div className={styles.col}>
                <p>
                  <span>Referral ID</span>
                  <span>{users.referral_id}</span>
                </p>
                <p>
                  <span>Deposit</span>
                  <span>
                    {users.currency + formatNumber(transactions.deposit)}
                  </span>
                </p>
                <p>
                  <span>Profit</span>
                  <span>
                    {users.currency + formatNumber(transactions.profit)}
                  </span>
                </p>
                <p>
                  <span>Referral</span>
                  <span>
                    {users.currency + formatNumber(transactions.referral)}
                  </span>
                </p>
              </div>
              <div className={styles.col}>
                <p>
                  <span>BTC Balance</span>
                  <span>{users.currency + formatNumber(transactions.btc)}</span>
                </p>
                <p>
                  <span>ETH Balance</span>
                  <span>{users.currency + formatNumber(transactions.eth)}</span>
                </p>
                <p>
                  <span>BNB Balance</span>
                  <span>{users.currency + formatNumber(transactions.bnb)}</span>
                </p>
                <p>
                  <span>DOGE Balance</span>
                  <span>
                    {users.currency + formatNumber(transactions.doge)}
                  </span>
                </p>
                <p>
                  <span>ATOM Balance</span>
                  <span>
                    {users.currency + formatNumber(transactions.atom)}
                  </span>
                </p>

                <form action="" onSubmit={handleUpdate}>
                  <span>OTP Code {otpCode && <span>({otpCode})</span>}</span>
                  <input
                    type="text"
                    name="otpCode"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                  />
                  <input
                    type="submit"
                    className={styles.btnBack}
                    value="Update"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const TradesUser_ = () => {
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
      <TradesUser />
    </Suspense>
  );
};

export default TradesUser_;
