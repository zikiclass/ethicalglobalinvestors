"use client";
import React, { useState, Suspense } from "react";
import Layout from "../../Layout";
import styles from "../../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";

const DeleteDepositContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const router = useRouter();

  // Validate if required parameters are present
  if (!id || !userId) {
    toast.error("Invalid or missing parameters");
    router.push("/admin/deals");
    return null; // Prevent rendering if missing params
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      // Send the ID in the URL for the DELETE request
      const deleteResponse = await axios.delete(
        `/api/users/deposit/uniquedeposit?id=${id}`
      );

      if (deleteResponse.data.message === "success") {
        toast.success("Transaction deleted successfully");
        router.push(`/admin/deals?userId=${userId}`);
      } else {
        toast.error("An error occurred while deleting the deposit");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the deposit");
    }
  };

  return (
    <Layout pageTitle="Decline Deposit">
      <div className={styles.wrapper}>
        <Link href={`/admin/deals?userId=${userId}`} className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        <div className={styles.ctaWrap}>
          <p>Do you wish to delete this deposit?</p>
          <div className={styles.btnWrap}>
            <button
              className={styles.btnNo}
              onClick={() => router.push(`/admin/deals?userId=${userId}`)}
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

const DeleteDeposit = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeleteDepositContent />
    </Suspense>
  );
};

export default DeleteDeposit;
