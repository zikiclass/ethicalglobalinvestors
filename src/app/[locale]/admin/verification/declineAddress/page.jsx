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
const DeclineAddressVerificationContent = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const router = useRouter();

  const handleApprove = async (event) => {
    event.preventDefault();
    try {
      const approve_ = await axios.put("/api/users/verification", {
        userId,
        action: "declineAddress",
      });
      if (approve_.data.message === "success") {
        toast.success("Address verification declined successfully");
        router.push(`../address_verification?userId=${userId}`);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // Validate if parameters are missing
  if (!userId) {
    toast.error("Missing parameters");
    router.push(`../address_verification?userId=${userId}`);
    return null;
  }

  return (
    <Layout pageTitle="Decline Address Verification">
      <div className={styles.wrapper}>
        <Link
          href={`../address_verification?userId=${userId}`}
          className={styles.btnBack}
        >
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        <div className={styles.ctaWrap}>
          <p>Do you wish to decline this deposit?</p>
          <div className={styles.btnWrap}>
            <button
              className={styles.btnNo}
              onClick={() =>
                router.push(`../address_verification?userId=${userId}`)
              }
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
const DeclineAddressVerification = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeclineAddressVerificationContent />
    </Suspense>
  );
};

export default DeclineAddressVerification;
