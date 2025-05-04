"use client";
import React, { useState } from "react";
import { DashboardNavbar } from "../../HomeComponents";
import "../dashboard/styles/dashboard.css";
import "../_components/styles/user.css";
import BottomNavBar from "../_components/BottomNavBar";
import DashboardPageNavigator from "../../components/DashboardPageNavigator";
import Link from "next/link";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";
const UploadProof = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    // Check if a file was selected
    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance
      reader.onload = () => {
        setSelectedImage(reader.result); // Set the selected image to state
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (router) {
      router.push(`/users/deposit_step_2?amount=${amount}`);
    }
  };
  return (
    <>
      <div>
        <DashboardNavbar />
        <div className="container" style={{ marginTop: "3rem" }}>
          <DashboardPageNavigator text="Deposit" />
          <div className="dashboard_">
            <div className="deposit">
              <h4 style={{ marginBottom: "1rem" }}>Upload Payment Proof</h4>

              <div className="deposit__form">
                <form action="#">
                  <div className="input__form__">
                    <input
                      type="file"
                      name="file__upload"
                      onChange={handleImageChange}
                      style={{ width: "80%" }}
                    />
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{ width: "100%", marginTop: "1rem" }}
                      />
                    )}
                  </div>
                  <Button title="Submit" />
                </form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#6648fe",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <Link href="/users/deposit_list">My Deposits</Link>
                  <Link href="/users/dashboard">My Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavBar active="dashboard" />
      </div>
    </>
  );
};

export default UploadProof;
