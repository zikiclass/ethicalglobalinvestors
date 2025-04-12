"use client";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "./users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PaymentsIcon from "@mui/icons-material/Payments";
import PreviewIcon from "@mui/icons-material/Preview";
import SellIcon from "@mui/icons-material/Sell";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/email", {
          params: { page: currentPage, limit: itemsPerPage, email },
        });
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage, email]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <Layout pageTitle="Users">
      <div className={styles.searchContainer}>
        <input
          type="email"
          placeholder="Search by email"
          className={styles.searchInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Toaster position="bottom-left" />
      <div className={styles.wrapper}>
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
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.hide}>ID</th>
                  <th className={styles.hide}>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Account</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {users.map((user, index) => (
                  <tr key={index} className={styles.tr}>
                    <td className={styles.hide}>{user.id}</td>
                    <td className={styles.hide}>{user.first_name}</td>
                    <td style={{ textAlign: "left" }}>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      {user.transactions.map((transaction, idx) => (
                        <div
                          style={{
                            gap: "5px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            key={idx}
                            style={{
                              color: "green",
                              backgroundColor: "white",
                              padding: "0px 7px",
                              borderTopRightRadius: "7px",
                              borderBottomLeftRadius: "7px",
                            }}
                          >
                            Deposit: <b>${transaction.deposit}</b>
                          </div>

                          <div
                            style={{
                              color: "green",
                              backgroundColor: "white",
                              padding: "0px 7px",
                              borderTopRightRadius: "7px",
                              borderBottomLeftRadius: "7px",
                            }}
                          >
                            Profit: <b>${transaction.profit}</b>
                          </div>
                          <div
                            style={{
                              color: "green",
                              backgroundColor: "white",
                              padding: "0px 7px",
                              borderTopRightRadius: "7px",
                              borderBottomLeftRadius: "7px",
                            }}
                          >
                            Referral: <b>${transaction.referral}</b>
                          </div>
                        </div>
                      ))}
                    </td>

                    <td className={styles.actions}>
                      <Link
                        className={styles.cta_}
                        href={`fundaccount?userId=${user.id}`}
                      >
                        <LocalAtmIcon />
                        <span>Fund</span>
                      </Link>
                      <Link
                        className={styles.cta_}
                        href={`deals?userId=${user.id}`}
                      >
                        <PaymentsIcon />
                        <span>Transactions</span>
                      </Link>
                      <Link
                        className={styles.cta_}
                        href={`viewclient?userId=${user.id}`}
                      >
                        <PreviewIcon />
                        <span>View</span>
                      </Link>
                      <Link
                        className={styles.cta_}
                        href={`verification?userId=${user.id}`}
                      >
                        <PlaylistAddCheckCircleIcon />
                        <span>Verification</span>
                      </Link>
                      <Link
                        className={styles.cta_}
                        href={`trades?userId=${user.id}`}
                      >
                        <CurrencyExchangeIcon />
                        <span>Trades</span>
                      </Link>
                      {/* <Link className={styles.cta_} href="">
                        <LockOpenIcon />
                        <span>Login</span>
                      </Link> */}
                      <Link
                        className={styles.cta_}
                        href={`deleteclient?userId=${user.id}`}
                      >
                        <DeleteIcon />
                        <span>Delete</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <KeyboardArrowLeftIcon />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <KeyboardArrowRightIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Users;
