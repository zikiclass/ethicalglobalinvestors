"use client";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Trades = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const handleChange = (index, field, value) => {
    const updatedSignals = [...signals];
    updatedSignals[index][field] = value;
    setSignals(updatedSignals);
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`/api/signals?id=${userId}`);
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

  const handleSetTrades = async (event, uId, profit, loss) => {
    event.preventDefault();
    try {
      const setTrade = await axios.put(
        `/api/signals?uId=${uId}&profit=${profit}&loss=${loss}`
      );
      if (setTrade) {
        toast.success("Trade set successfully");
        router.push("/admin/users");
      } else {
        toast.error("An error occured");
      }
    } catch (error) {
      toast.error("An error occured");
    }
  };

  return (
    <Layout pageTitle="Trades">
      <div className={styles.wrapper}>
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

                  <th>Profit</th>
                  <th>Loss</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {signals.map((adm, index) => (
                  <tr key={index} className={styles.tr}>
                    <td style={{ textTransform: "uppercase" }}>{adm.action}</td>

                    <td>
                      <input
                        type="text"
                        value={adm.profit}
                        style={{ textAlign: "center" }}
                        onChange={(e) =>
                          handleChange(index, "profit", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={adm.loss}
                        style={{ textAlign: "center" }}
                        onChange={(e) =>
                          handleChange(index, "loss", e.target.value)
                        }
                      />
                    </td>
                    <td>{adm.status}</td>
                    <td className={styles.actions_}>
                      {adm.status === "open" && (
                        <button
                          className={styles.cta_}
                          onClick={(event) =>
                            handleSetTrades(event, adm.id, adm.profit, adm.loss)
                          }
                        >
                          <CurrencyExchangeIcon />
                          <span>Set</span>
                        </button>
                      )}
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
