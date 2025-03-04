"use client";

import React, { useState, useEffect } from "react";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import { DashboardNavbar } from "../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import DashboardPageNavigator from "../../components/DashboardPageNavigator";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSession } from "next-auth/react";
function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return { month, day, year };
}

const Month = ({ dateString }) => {
  const { month } = formatDate(dateString);

  return <span>{month}</span>;
};
const Day = ({ dateString }) => {
  const { day } = formatDate(dateString);

  return <span>{day}</span>;
};
const Year = ({ dateString }) => {
  const { year } = formatDate(dateString);

  return <span>{year}</span>;
};
const DepositList = () => {
  const { status, data: session } = useSession();
  const [data, setData] = useState(null);
  const [showPendingMsg, setShowPendingMsg] = useState(true);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (status === "loading" || !session?.user?.email) return; // Do nothing while session is loading or no email available

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/users", {
          email: session.user.email,
        });
        setData(response.data);

        try {
          const response_ = await axios.get(
            `/api/users/deposit?id=${response.data.id}`
          );
          if (response_) {
            setLists(response_.data.data);
          } else console.log(response_.message);
        } catch (error) {
          console.log(error);
        }

        // const responseAdmin = await axios.get("/api/admin");
        // setAdmin(responseAdmin.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [session, status]);

  const formatNumber = (number) => {
    // Check if the number is a valid number or convert it to a string
    const parts = parseFloat(number).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  if (!data) return null;
  return (
    <>
      <div>
        <DashboardNavbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          <DashboardPageNavigator text="Deposit" />
          <div className="dashboard_">
            {showPendingMsg && (
              <div className="deposit_pending">
                <p>
                  Deposits will be pending until there are sufficent
                  confirmations on the blockchain.
                </p>
                <CloseIcon
                  className="deposit_pending_icon"
                  onClick={() => setShowPendingMsg(false)}
                />
              </div>
            )}

            {lists &&
              lists.map((list, index) => (
                <div className="deposit_list" key={index}>
                  <div className="date">
                    <Month dateString={list.date_deposited} />
                    <Day dateString={list.date_deposited} />
                    <Year dateString={list.date_deposited} />
                  </div>
                  <div className="deposit_list_details">
                    <span>{data.currency + formatNumber(list.amount)}</span>
                    <span>
                      {list.account_}
                      <br />({list.status})
                    </span>
                  </div>
                  <div className="crypto_equiv">{list.dep_method}</div>
                </div>
              ))}
          </div>
        </div>
        <BottomNavBar active="dashboard" />
      </div>
    </>
  );
};

export default DepositList;
