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
const Trades = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("/api/signals");
        if (response.data.message === "success") {
          setSignals(response.data.signals);
          setLoading(false);
        } else {
          setError("Unable to fetch signals");
          toast.error("Unable to fetch signals");
        }
      } catch (error) {
        setError("Unable to fetch signals");
        toast.error("Unable to fetch signals");
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <Layout pageTitle="Trades">
      <div className={styles.wrapper}>
        <Link href="/admin/newsignal" className={styles.btnTop}>
          <PersonAddIcon />
          New Signals
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
          signals && (
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>BUY/SELL</th>
                  <th>Amount</th>
                  <th>Leverage</th>
                  <th>Profit</th>
                  <th>Loss</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {signals.map((adm, index) => (
                  <tr key={index} className={styles.tr}>
                    <td>{adm.action}</td>
                    <td>{adm.amount}</td>
                    <td>{adm.leverage}</td>
                    <td>{adm.profit}</td>
                    <td>{adm.loss}</td>
                    <td className={styles.actions_}>
                      <Link
                        className={styles.cta_}
                        href={`deletesignal?id=${adm.id}`}
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
export default Trades;
