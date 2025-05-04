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
import Image from "next/image";

// Component to handle the fetching and displaying of the transactions
const Verification = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/singleuser?id=${userId}`);

        setUsers(response.data.user);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <Layout pageTitle="ID Verifications">
      <Toaster position="bottom-left" />
      <div className={styles.wrapper}>
        <Link href="users" className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Link
          href={`verification?userId=${userId}`}
          className={styles.btnTopActive}
        >
          <MonetizationOnIcon />
          ID Verification
        </Link>
        <Link
          href={`address_verification?userId=${userId}`}
          className={styles.btnTop}
        >
          <IndeterminateCheckBoxIcon />
          Address Verification
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
                  <th>ID Front</th>
                  <th>ID Back</th>

                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className={styles.tbody}>
                <tr className={styles.tr}>
                  <td>
                    <center>
                      <Image
                        width={100}
                        height={100}
                        alt="ID Front"
                        src={users.idFront || ""}
                      />
                    </center>
                  </td>
                  <td>
                    <center>
                      <Image
                        width={100}
                        height={100}
                        alt="ID Back"
                        src={users.idBack || ""}
                      />
                    </center>
                  </td>

                  <td>
                    {users.idVerify === "pend" ? (
                      <span className={styles.danger}>Pending</span>
                    ) : users.idVerify === "rej" ? (
                      <span className={styles.decline}>Declined</span>
                    ) : users.idVerify === "no" ? (
                      <span className={styles.danger}>Not Started</span>
                    ) : (
                      <span className={styles.success}>Approved</span>
                    )}
                  </td>
                  <td className={styles.actions}>
                    <Link
                      className={styles.cta_}
                      href={`verification/approveId?userId=${users.id}`}
                    >
                      <DoneAllIcon />
                      <span>Approve</span>
                    </Link>
                    <Link
                      className={styles.cta_}
                      href={`verification/declineId?userId=${users.id}`}
                    >
                      <CancelIcon />
                      <span>Decline</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const VerificationView = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Verification />
    </Suspense>
  );
};

export default VerificationView;
