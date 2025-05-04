"use client";
import React, { Suspense, useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReplyIcon from "@mui/icons-material/Reply";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Box from "@mui/material/Box";
import { format, parseISO } from "date-fns";

// Component to handle the fetching and displaying of the transactions
const DealsContent = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/users/deposit/uniquedeposit?id=${userId}`
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "EEEE dd, MMMM yyyy hh:mm:ss a");
  };

  return (
    <Layout pageTitle="Transactions">
      <Toaster position="bottom-left" />
      <div className={styles.wrapper}>
        <Link href="users" className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Link href={`deals?userId=${userId}`} className={styles.btnTopActive}>
          <MonetizationOnIcon />
          Deposits
        </Link>
        <Link
          href={`deals/withdrawals?userId=${userId}`}
          className={styles.btnTop}
        >
          <IndeterminateCheckBoxIcon />
          Withdrawals
        </Link>

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
          <>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {users.length > 0 ? (
                <tbody className={styles.tbody}>
                  {users.map((user, index) => (
                    <tr key={index} className={styles.tr}>
                      <td>{formatDate(user.date_deposited)}</td>
                      <td>{user.amount}</td>
                      <td>{user.dep_method}</td>
                      <td>{user.account_}</td>
                      <td>
                        {user.status === "Pending" ? (
                          <span className={styles.danger}>Pending</span>
                        ) : user.status === "Declined" ? (
                          <span className={styles.decline}>Declined</span>
                        ) : (
                          <span className={styles.success}>Approved</span>
                        )}
                      </td>
                      <td className={styles.actions}>
                        <Link
                          className={styles.cta_}
                          href={`deals/approve?id=${user.id}&userId=${user.userId}`}
                        >
                          <DoneAllIcon />
                          <span>Approve</span>
                        </Link>
                        <Link
                          className={styles.cta_}
                          href={`deals/decline?id=${user.id}&userId=${user.userId}`}
                        >
                          <CancelIcon />
                          <span>Decline</span>
                        </Link>

                        <Link
                          className={styles.cta_}
                          href={`deals/delete?id=${user.id}&userId=${user.userId}`}
                        >
                          <DeleteForeverIcon />
                          <span>Delete</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className={styles.notransaction}>
                  {" "}
                  &lt; No Deposits &gt;{" "}
                </div>
              )}
            </table>
          </>
        )}
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const Deals = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DealsContent />
    </Suspense>
  );
};

export default Deals;
