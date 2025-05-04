"use client";
import React from "react";
import { DashboardNavbar } from "../../../HomeComponents";
import Contract from "../_components/Contract";
import "../dashboard/styles/dashboard.css";
import BottomNavBar from "../_components/BottomNavBar";
import MiningGHS from "../_components/MiningGHS";
import fetchUser from "../_components/FetchUser";

const Mining = () => {
  const { data } = fetchUser();

  return (
    <>
      <div>
        <DashboardNavbar />
        <div className="container" style={{ marginTop: "7rem" }}>
          <div className="dashboard">
            {data && <Contract data={data} />}
            <MiningGHS />
          </div>
        </div>
        <BottomNavBar active="mining" />
      </div>
    </>
  );
};
export default Mining;
