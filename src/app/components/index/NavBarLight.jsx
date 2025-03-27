"use client";
import { project_name } from "../../../../env";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FlagIcon } from "react-flag-kit";
import { countryList, sidebarLinks } from "./data";
import "./styles/navbar.css";
import Image from "next/image";
import logo from "../../../../public/img/logo.png";
import { useSession } from "next-auth/react";

const NavBarLight = () => {
  const { status, data: session } = useSession();
  const [countryShow, setCountryShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState("US");

  // const handleCountryChange = (countryCode) => {
  //   const languageCode = countryCode.toLowerCase();
  //   if (i18n) {
  //     i18n.changeLanguage(languageCode); // Change the language
  //   }
  // };

  // Function to handle scroll event
  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
    if (fadeOut) {
      // Scroll to the top if sidebar is faded out
      event.target.scrollTop = 0;
    }
  };

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
        <Link href="contact" className="md-links">
          Contact Us
        </Link>
        {status === "unauthenticated" ? (
          <Link href="signin" className="md-links">
            Login
          </Link>
        ) : (
          <Link href="users/dashboard" className="md-links">
            {session?.user?.name}
          </Link>
        )}

        <Link href="signup" className="md-links">
          Sign Up
        </Link>
        {theme === "dark" ? (
          <BedtimeIcon className="icon__bed" onClick={toggleTheme} />
        ) : (
          <LightModeIcon className="icon__bed" onClick={toggleTheme} />
        )}
        <div
          className="icon__"
          onClick={() => {
            setCountryShow(!countryShow);
          }}
        >
          <FlagIcon code="US" className="icon__country" /> <span>EN</span>
        </div>
        {
          <div className="country__list">
            <div className="country__wrap">
              {countryList.map((country) => (
                <div className="icon__country__list" key={country.id}>
                  <FlagIcon code={country.code} className="icon__country__" />{" "}
                  <span>{country.code}</span>
                </div>
              ))}
            </div>
          </div>
        }
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
                <Link href={`${link.link}`} className="sidebar__link">
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
export default NavBarLight;
