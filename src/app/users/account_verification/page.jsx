"use client";
import React from "react";
import "../_components/styles/user.css";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import camera from "../../../../public/img/camera.png";
import Image from "next/image";
import { DashboardNavbar } from "../../HomeComponents";
import Link from "next/link";
import BottomNavBar from "../_components/BottomNavBar";
import fetchUser from "../_components/FetchUser";
const AccountVerification = () => {
  const { data } = fetchUser();
  const profile1 = [
    {
      id: 1,
      icon: <EmailIcon style={{ fontSize: 30 }} />,
      color: "#b548c6",
      title: "Email Verification",
      href: "email_verification",
      span:
        data?.emailVerify === "yes"
          ? "Verified"
          : data?.emailVerify === "pend"
          ? "Pending Verification"
          : data?.emailVerify === "rej"
          ? "Rejected"
          : "Not Started",
    },
    {
      id: 2,
      icon: <PersonIcon style={{ fontSize: 30 }} />,
      color: "#e1545d",
      title: "Identity Verification",
      href: "identity_verification",
      span:
        data?.idVerify === "yes"
          ? "Verified"
          : data?.idVerify === "pend"
          ? "Pending Verification"
          : data?.idVerify === "rej"
          ? "Rejected"
          : "Not Started",
    },
    {
      id: 3,
      icon: <HomeIcon style={{ fontSize: 30 }} />,
      color: "#525297",
      title: "Address Verification",
      href: "address_verification",
      span:
        data?.addressVerify === "yes"
          ? "Verified"
          : data?.addressVerify === "pend"
          ? "Pending Verification"
          : data?.addressVerify === "rej"
          ? "Rejected"
          : "Not Started",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <div className="container">
        <div className="profile_">
          <div className="profile__col">
            <div className="profile__pic__wrap">
              <Image src={camera} className="profile__pic" alt="profile pic" />
              <span>{data?.first_name + " " + data?.last_name}</span>
              <small style={{ textTransform: "uppercase", fontSize: "16px" }}>
                verifications
              </small>
            </div>
            <div className="profile__listings">
              {profile1.map((profile) => (
                <Link
                  href={
                    profile.span === "Verified" ||
                    profile.span === "Pending Verification"
                      ? "#"
                      : profile.href
                  }
                  className="profile_list"
                  key={profile.id}
                >
                  <div
                    className="list__icon"
                    style={{
                      backgroundColor: `${profile.color}`,
                    }}
                  >
                    {profile.icon}
                  </div>
                  <span>
                    {profile.title}
                    <small className="sm__prof">
                      {" "}
                      {profile.span === "Verified" ? (
                        <span style={{ color: "green" }}>Verified</span>
                      ) : profile.span === "Pending Verification" ? (
                        <span style={{ color: "orange" }}>
                          Pending Verification
                        </span>
                      ) : profile.span === "Rejected" ? (
                        <span style={{ color: "red" }}>Rejected</span>
                      ) : (
                        <span>Not Started</span>
                      )}
                    </small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="profile" />
    </>
  );
};
export default AccountVerification;
