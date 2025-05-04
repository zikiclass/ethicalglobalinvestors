"use client";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { format, parseISO } from "date-fns";
const Admin_ = () => {
  const [admins, setAdmins] = useState([]);
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
    <Layout pageTitle="Administrators">
      <div className={styles.wrapper}>
        <Link href="admin_/add/" className={styles.btnTop}>
          <PersonAddIcon />
          Add New Admin
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
          admins && (
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Admin</th>
                  <th>Email</th>
                  <th>Last Login</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {admins.map((adm, index) => (
                  <tr key={index} className={styles.tr}>
                    <td>{adm.firstname + " " + adm.lastname}</td>
                    <td>{adm.email}</td>
                    <td>{formatDate(adm.lastLogin)}</td>

                    <td className={styles.actions_}>
                      <Link
                        className={styles.cta_}
                        href={`deleteadmin?id=${adm.id}`}
                      >
                        <DeleteIcon />
                        <span>Delete</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </Layout>
  );
};
export default Admin_;
