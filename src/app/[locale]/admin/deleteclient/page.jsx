"use client";
import React, { Suspense } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Component to handle the user deletion logic
const DeleteClientContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const router = useRouter();

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deleteUser = await axios.delete("/api/users/email", {
        params: { id },
      });
      if (deleteUser.data.message === "success") {
        toast.success("Records deleted successfully");

        router.push("users");
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <Layout pageTitle="Delete Client">
      <div className={styles.wrapper}>
        <Link href="users" className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />
        <div className={styles.ctaWrap}>
          <p>Do you wish to delete this user details?</p>
          <div className={styles.btnWrap}>
            <button
              className={styles.btnNo}
              onClick={() => router.push("users")}
            >
              No
            </button>
            <button className={styles.btnDelete} onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const DeleteClient = () => {
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
      <DeleteClientContent />
    </Suspense>
  );
};

export default DeleteClient;
