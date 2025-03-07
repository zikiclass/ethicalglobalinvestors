import React, { useState, useEffect } from "react";

import NotesIcon from "@mui/icons-material/Notes";
import CloseIcon from "@mui/icons-material/Close";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DraftsIcon from "@mui/icons-material/Drafts";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import human from "../../../../public/img/TW2.jpeg";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { project_name } from "../../../../env";
import fetchAdmin from "../../users/_components/FetchAdmin";
const NavBar = ({ onClick, setIcon }) => {
  const { admin, status } = fetchAdmin();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/signin_");
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <div className="ad__navbar">
      <div className="navbar__col__1">
        <div onClick={onClick} href="/" className="s_ic_">
          {setIcon ? <NotesIcon /> : <CloseIcon />}
        </div>
        <div className="search">
          <input
            className="searchInput"
            type="text"
            name="search"
            placeholder={`Search ${project_name}`}
          />
          <LocationSearchingIcon style={{ fontSize: "15px" }} />
        </div>
      </div>

      <div className="navbar__col__1">
        <div className="shortcuts">
          <Link href="/api/auth/signout" style={{ color: "#fff" }}>
            <PowerSettingsNewIcon
              className="icon__bed"
              onClick={handleSignOut}
              style={{ cursor: "pointer", color: "white" }}
            />{" "}
            Sign Out
          </Link>

          {/* <DashboardIcon className="s_ic hide" />
          <NotificationsIcon className="s_ic" />
          <DraftsIcon className="s_ic hide" />
          <SettingsIcon className="s_ic" /> */}
        </div>
        <div className="user">
          <div className="user__">
            <span className="name">{admin?.admin.firstname || ""}</span>
            <span className="username">@{admin?.admin.lastname || ""}</span>
          </div>
          <div>
            <Image src={human} alt="user" className="userImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
