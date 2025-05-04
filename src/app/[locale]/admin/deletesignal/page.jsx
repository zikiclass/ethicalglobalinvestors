"use client";
import React, { Suspense, useState } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";

const DeleteSignal = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deleteUser = await axios.delete("/api/signals", {
        params: { id },
      });
      if (deleteUser.data.message === "success") {
        toast.success("Signal deleted successfully");
        router.push("/admin/trades");
      } else {
        toast.error("An error occured");
      }
    } catch (error) {
      toast.error("An error occured");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Link href="/admin/trades" className={styles.btnBack}>
        <ReplyIcon />
        Back
      </Link>

      <Toaster position="bottom-left" />
      <div className={styles.ctaWrap}>
        <p>Do you wish to delete this signal?</p>
        <div className={styles.btnWrap}>
          <button
            className={styles.btnNo}
            onClick={() => router.push("/admin/trades")}
          >
            No
          </button>
          <button className={styles.btnDelete} onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteSignalAdmin = () => {
  return (
    <Layout pageTitle="Delete Signal">
      <Suspense fallback={<div>Loading...</div>}>
        <DeleteSignal />
      </Suspense>
    </Layout>
  );
};

export default DeleteSignalAdmin;
