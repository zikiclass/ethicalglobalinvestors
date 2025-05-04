"use client";
import React, { Suspense } from "react";
import Layout from "../../Layout";
import styles from "../../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";

// Component that uses the search parameters (wrapped in Suspense)
const ApproveDepositContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const router = useRouter();

  const handleApprove = async (event) => {
    event.preventDefault();
    try {
      const approve_ = await axios.put("/api/users/deposit/uniquedeposit", {
        id,
        action: "approve",
      });
      if (approve_.data.message === "success") {
        toast.success("Transaction approved successfully");
        router.push(`../deals?userId=${userId}`);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // Validate if parameters are missing
  if (!id || !userId) {
    toast.error("Missing parameters");
    router.push("../deals");
    return null;
  }

  return (
    <Layout pageTitle="Approve Deposit">
      <div className={styles.wrapper}>
        <Link href={`../deals?userId=${userId}`} className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        <div className={styles.ctaWrap}>
          <p>Do you wish to approve this deposit?</p>
          <div className={styles.btnWrap}>
            <button
              className={styles.btnNo}
              onClick={() => router.push(`../deals?userId=${userId}`)}
            >
              No
            </button>
            <button className={styles.btnDecline} onClick={handleApprove}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const ApproveDeposit = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApproveDepositContent />
    </Suspense>
  );
};

export default ApproveDeposit;
