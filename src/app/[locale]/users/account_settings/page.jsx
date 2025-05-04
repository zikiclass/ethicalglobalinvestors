"use client";
import React from "react";
import "../_components/styles/user.css";

import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { DashboardNavbar } from "../../../HomeComponents";
import Link from "next/link";
import BottomNavBar from "../_components/BottomNavBar";
import { useTranslations } from "next-intl";
const AccountSettings = () => {
  const t = useTranslations("Profile");
  const profile1 = [
    {
      id: 1,
      icon: <PersonIcon style={{ fontSize: 30 }} />,
      color: "#32a7e2",
      nameKey: "myprofile",
      href: "myprofile",
    },
    {
      id: 2,
      icon: <NotificationsIcon style={{ fontSize: 30 }} />,
      color: "#e1545d",
      nameKey: "notifications",
      href: "notifications",
    },
    {
      id: 3,
      icon: <HomeIcon style={{ fontSize: 30 }} />,
      color: "#23af7d",
      nameKey: "updateaddress",
      href: "update_address",
    },
    {
      id: 4,
      icon: <VerifiedUserIcon style={{ fontSize: 30 }} />,
      color: "#525297",
      nameKey: "accountverification",
      href: "account_verification",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <div className="container">
        <div className="profile_">
          <div className="profile__col">
            <div className="profile__listings">
              {profile1.map((profile) => (
                <Link
                  href={profile.href}
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
                  <span>{t(`${profile.nameKey}`)}</span>
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
export default AccountSettings;
