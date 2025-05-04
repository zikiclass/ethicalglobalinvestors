"use client";
import React, { useState } from "react";
import { DashboardNavbar } from "../../HomeComponents";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import BottomNavBar from "../_components/BottomNavBar";
import DashboardPageNavigator from "../../components/DashboardPageNavigator";
import Link from "next/link";
import Button from "../../components/Button";
import { tradersList } from "../../components/index/data";
import Image from "next/image";
import Swal from "sweetalert2";
const Traders = () => {
  const handleClick = () => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Insufficient funds! please make deposit to be able to copy this trader.",
    });
  };
  return (
    <>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text="Traders" />
        <div className="dashboard__">
          {/* <input type="text" placeholder="Search" className="searchTraders" />
           */}
          <div className="dashboard_">
            {tradersList.map((trader) => (
              <div className="trader" key={trader.id}>
                <Image
                  className="trader__img"
                  src={trader.img}
                  alt={trader.name}
                />
                <div className="details">
                  <p>{trader.name}</p>
                  <span>{trader.winrate}% Win Rate</span>
                  <span>{trader.profitshare}% Profit Share</span>
                </div>
                <div className="btn__copy">
                  <Button title="COPY" onClick={handleClick} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar active="dashboard" />
    </>
  );
};

export default Traders;
