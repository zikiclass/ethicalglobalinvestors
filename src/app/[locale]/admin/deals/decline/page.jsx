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
const DeclineDepositContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const router = useRouter();

  const handleApprove = async (event) => {
    event.preventDefault();
    try {
      const approve_ = await axios.put("/api/users/deposit/uniquedeposit", {
        id,
        action: "decline",
      });
      if (approve_.data.message === "success") {
        toast.success("Transaction declined successfully");
        router.push(`/admin/deals?userId=${userId}`);
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
    router.push("/admin/deals");
    return null;
  }

  return (
    <Layout pageTitle="Decline Deposit">
      <div className={styles.wrapper}>
        <Link href={`/admin/deals?userId=${userId}`} className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        <div className={styles.ctaWrap}>
          <p>Do you wish to decline this deposit?</p>
          <div className={styles.btnWrap}>
            <button
              className={styles.btnNo}
              onClick={() => router.push(`/admin/deals?userId=${userId}`)}
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
const DeclineDeposit = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeclineDepositContent />
    </Suspense>
  );
};

export default DeclineDeposit;
