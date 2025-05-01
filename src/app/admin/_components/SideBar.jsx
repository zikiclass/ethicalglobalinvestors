"use client";

import Logo from "../../../../public/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AdjustIcon from "@mui/icons-material/Adjust";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { project_name, project_link } from "../../../../env";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
const SideBar = ({ toggle }) => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");

  const handleLink = (data, nav) => {
    setActiveLink(data);
    localStorage.setItem("activeLink", data);
    router.push(nav);
  };
  const handleLink2 = (data) => {
    setActiveLink(data);
    localStorage.setItem("activeLink", data);
  };

  useEffect(() => {
    setActiveLink(localStorage.getItem("activeLink"));
  }, []);
  const linkLists = [
    {
      title: "dashboard",
      icon: <DashboardIcon />,
      subLink: [],
      href: "/admin/dashboard",
    },
    {
      title: "accounts",
      icon: <PersonIcon />,
      sub: "accounts",
      subLink: [
        { title: "users", href: "/admin/users" },
        { title: "admin", href: "/admin/admin_" },
      ],
    },

    // { title: "traders", icon: <Diversity2Icon />, href: "traders" },

    {
      title: "Wallets",
      icon: <AccountBalanceWalletIcon />,
      href: "/admin/wallets",
    },
    { title: "Whatsapp", icon: <SettingsIcon />, href: "/admin/whatsapp" },

    { title: "logout", icon: <ExitToAppIcon />, href: "/api/auth/signout" },
  ];

  return (
    <div className={`${styles.ad__sidebar} ${toggle ? "" : styles.hide}`}>
      <div className={styles.sidebar__top}>
        <Link href="dashboard">
          <Image src={Logo} alt="Logo" className={styles.ad_logo} />
        </Link>
        <div className={styles.sidebar__top__bottom}>
          <div>
            <span>{project_name}</span>
            <small>{project_link}</small>
          </div>
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <ul className={styles.sidebar__links}>
          {linkLists.map((linkList, lis) => (
            <li
              key={lis}
              onClick={() => {
                linkList.href
                  ? handleLink(`${linkList.title}`, `${linkList.href}`)
                  : handleLink2(`${linkList.title}`);
              }}
            >
              <div
                className={`${styles.link} ${
                  activeLink === `${linkList.title}` && styles.active
                }`}
              >
                <div className="ad__link__main">
                  {linkList.icon} <span>{linkList.title}</span>
                </div>

                {linkList.sub &&
                  (activeLink === linkList.title ? (
                    <ArrowDropDownIcon className="arrow" />
                  ) : (
                    <PlayArrowIcon
                      style={{ fontSize: "13px" }}
                      className="arrow"
                    />
                  ))}
              </div>
              {linkList.sub && (
                <ul
                  className={`${
                    activeLink === `${linkList.title}` && styles.reveal
                  }`}
                >
                  {linkList.subLink.map((sublink) => (
                    <li key={sublink.title}>
                      <Link href={sublink.href} className="sublink">
                        <AdjustIcon
                          style={{ fontSize: "14px" }}
                          className="hideSublink"
                        />
                        <span className={styles.sublinkSpan}>
                          {sublink.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
