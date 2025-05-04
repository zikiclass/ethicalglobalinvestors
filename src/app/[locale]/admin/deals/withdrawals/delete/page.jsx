"use client";
import React, { Suspense, useState, useEffect } from "react";
import Layout from "../../../Layout";
import styles from "../../../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
// Component to handle the withdrawal deletion logic
const DeleteWithdrawalContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const router = useRouter();

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const delete_ = await axios.delete(
        "/api/users/withdrawals/uniquewithdraw",
        {
          data: { id },
        }
      );
      if (delete_.data.message === "success") {
        toast.success("Transaction deleted successfully");

        router.push(`../withdrawals?userId=${userId}`);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <Layout pageTitle="Decline Deposit">
      <div className={styles.wrapper}>
        <Link
          href={`../withdrawals?userId=${userId}`}
          className={styles.btnBack}
        >
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        <div className={styles.ctaWrap}>
          <p>Do you wish to delete this withdrawal?</p>
          <div className={styles.btnWrap}>
            <button
              className={styles.btnNo}
              onClick={() => router.push(`../withdrawals?userId=${userId}`)}
            >
              No
            </button>
            <button className={styles.btnDecline} onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const DeleteWithdrawal = () => {
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
      <DeleteWithdrawalContent />
    </Suspense>
  );
};

export default DeleteWithdrawal;
