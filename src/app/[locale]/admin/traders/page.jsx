"use client";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import axios from "axios";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import toast, { Toaster } from "react-hot-toast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { format, parseISO } from "date-fns";
const Traders = () => {
  const [admins, setAdmins] = useState([]);
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("/api/alladmin");
        if (response.data.message === "success") {
          setAdmins(response.data.admin_records);
          setLoading(false);
        } else {
          setError("Unable to fetch admin records");
          toast.error("Unable to fetch admin records");
        }
      } catch (error) {
        setError("Unable to fetch admin records");
        toast.error("Unable to fetch admin records");
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "EEEE dd, MMMM yyyy hh:mm:ss a");
  };
  return (
    <Layout pageTitle="Traders">
      <div className={styles.wrapper}>
        <Link href="/admin/admin_/add/" className={styles.btnTop}>
          <PersonAddIcon /> &nbsp; Add New Copy Trader
        </Link>
        <Toaster position="bottom-left" />
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
            {publicId && <CldImage src={publicId} width={270} height={160} />}
            <CldUploadWidget
              uploadPreset="ptpi8rvv"
              onUpload={(result, widget) => {
                if (result.event !== "success") return;
                setPublicId(result.info.public_id);
              }}
              options={{
                sources: ["local"],
                multiple: false,
                maxFiles: 10000,
              }}
            >
              {({ open }) => (
                <button className={styles.btnSubmit} onClick={() => open()}>
                  Upload
                </button>
              )}
            </CldUploadWidget>
          </>
        )}
      </div>
    </Layout>
  );
};
export default Traders;
