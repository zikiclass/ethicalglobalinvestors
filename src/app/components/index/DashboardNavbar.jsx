"use client";
import { project_name } from "../../../../env";
import BedtimeIcon from "@mui/icons-material/Bedtime";

import LightModeIcon from "@mui/icons-material/LightMode";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FlagIcon } from "react-flag-kit";
import { countryList } from "./data";
import "./styles/navbar.css";
import Image from "next/image";
import logo from "../../../../public/img/logo.png";
import { useSession } from "next-auth/react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { signOut } from "next-auth/react";
import fetchUser from "../../users/_components/FetchUser";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DnsIcon from "@mui/icons-material/Dns";
import CopyrightIcon from "@mui/icons-material/Copyright";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import PeopleIcon from "@mui/icons-material/People";
const DashboardNavbar = () => {
  const { status, data: session } = useSession();
  const [countryShow, setCountryShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { data } = fetchUser();
  // Function to handle scroll event
  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
    if (fadeOut) {
      // Scroll to the top if sidebar is faded out
      event.target.scrollTop = 0;
    }
  };

  const sidebarLinks = [
    { id: 1, icon: HomeIcon, name: "Home", link: "/" },
    { id: 2, icon: PersonOutlinedIcon, name: "Sign In", link: "signin" },
    { id: 3, icon: PersonAddIcon, name: "Sign Up", link: "signup" },
    { id: 4, icon: MailOutlinedIcon, name: "Contact Us", link: "contact" },
    {
      id: 5,
      icon: LockOpenOutlinedIcon,
      name: "Cookie Policy",
      link: "cookie",
    },
    {
      id: 6,
      icon: LockOpenOutlinedIcon,
      name: "Privacy Policy",
      link: "privacy",
    },
    { id: 7, icon: DnsIcon, name: "Crypto Mining", link: "cryptomining" },
    {
      id: 8,
      icon: CopyrightIcon,
      name: "Bitcoin Mining",
      link: "bitcoinmining",
    },
    {
      id: 9,
      icon: CopyrightIcon,
      name: "Dogecoin Mining",
      link: "dogecoinmining",
    },
    {
      id: 10,
      icon: ContentCopyIcon,
      name: "Copy Trading",
      link: "copytrading",
    },
    {
      id: 11,
      icon: CopyrightIcon,
      name: "Crypto Trading",
      link: "cryptotrading",
    },
    { id: 12, icon: FolderOpenIcon, name: "Terms of Service", link: "terms" },
    { id: 13, icon: WysiwygIcon, name: "Forex Trading", link: "forextrading" },
    {
      id: 14,
      icon: InsertChartOutlinedIcon,
      name: "Stocks Trading",
      link: "stockstrading",
    },
    {
      id: 15,
      icon: DonutLargeOutlinedIcon,
      name: "Options Trading",
      link: "optionstrading",
    },
    { id: 16, icon: PeopleIcon, name: "What is Leverage", link: "leverage" },
    {
      id: 17,
      icon: PeopleIcon,
      name: "Responsible Trading",
      link: "responsibletrading",
    },
    {
      id: 18,
      icon: FolderOpenIcon,
      name: "General Risk Disclosure",
      link: "generalrisk",
    },
    { id: 19, icon: PeopleIcon, name: "About Us", link: "about" },
  ];

  useEffect(() => {
    setFadeOut(true);
  }, []);

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/signin");
      // Optionally, handle any additional client-side cleanup or redirection
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };
  return (
    <div className="scrolled">
      <div className="navbar__logo__harmburger">
        <HamburgerMenuIcon
          style={{ cursor: "pointer" }}
          onClick={() => setFadeOut(!fadeOut)}
        />
        <Link href="/">
          <span>{project_name}</span>
        </Link>
      </div>
      <div className="navbar__links">
        {status === "unauthenticated" ? (
          <Link href="../signin" className="md-links">
            Log In
          </Link>
        ) : (
          <Link href="profile" className="md-links">
            {data?.first_name}
          </Link>
        )}

        {theme === "dark" ? (
          <LightModeIcon className="icon__bed" onClick={toggleTheme} />
        ) : (
          <BedtimeIcon className="icon__bed" onClick={toggleTheme} />
        )}
        <Link href="/api/auth/signout">
          <PowerSettingsNewIcon
            className="icon__bed"
            onClick={handleSignOut}
            style={{ cursor: "pointer" }}
          />
        </Link>

        {/* <div
          className="icon__"
          onClick={() => {
            setCountryShow(!countryShow);
          }}
        >
          <FlagIcon code="US" className="icon__country" /> <span>EN</span>
        </div> */}

        {/* <div className="country__list">
          <div className="country__wrap">
            {countryList.map((country) => (
              <div className="icon__country__list" key={country.id}>
                <FlagIcon code={country.code} className="icon__country__" />{" "}
                <span>{country.code}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div
        className={`sidebar__container ${fadeOut ? "fadeOut" : ""}`}
        onClick={() => {
          setFadeOut(!fadeOut);
        }}
      >
        <div
          className={`sidebar ${fadeOut ? "fadeOut" : ""}`}
          onScroll={handleScroll}
        >
          <div className="logo__wrap">
            <Image src={logo} alt="Logo" className="logo__sidebar" />
          </div>
          <ul className="sidebar__links">
            {sidebarLinks.map((link) => (
              <li key={link.id}>
                <Link href={`../${link.link}`} className="sidebar__link">
                  <link.icon className="sidebar__links__icon" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DashboardNavbar;
