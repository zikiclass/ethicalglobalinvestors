"use client";
import React, { useEffect, useState } from "react";
import { DashboardNavbar } from "../../../HomeComponents";
import DepositInfo from "../_components/DepositInfo";
import "./styles/dashboard.css";
import BottomNavBar from "../_components/BottomNavBar";
import Categories from "../_components/Categories";
import useFetchUser from "../_components/FetchUser";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router = useRouter();
  const { data } = useFetchUser();
  useEffect(() => {
    if (data?.role === "admin") router.push("/admin/dashboard");
  }, [router, data]);
  if (!data) return null;
  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "7rem" }}>
        <div className="dashboard">
          {data && <DepositInfo data={data} />}

          <Categories />
        </div>
      </div>
      <BottomNavBar active="dashboard" />
    </div>
  );
};

export default Dashboard;
