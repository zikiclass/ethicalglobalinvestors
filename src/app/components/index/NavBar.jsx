"use client";
import { project_name } from "../../../../env";
import logo from "../../../../public/img/logo.png";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FlagIcon } from "react-flag-kit";
import { countryList, sidebarLinks } from "./data";
import { useSession } from "next-auth/react";
import "./styles/navbar.css";
import fetchUser from "../../users/_components/FetchUser";

const NavBar = () => {
  const { status, data: session } = useSession();
  const { data } = fetchUser();
  const [fadeOut, setFadeOut] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [countryShow, setCountryShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);

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
    <div className={scrolled ? "scrolled" : "navbar"}>
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
        {!data ? (
          <Link href="signin" className="md-links">
            Log In
          </Link>
        ) : (
          <Link href="users/dashboard" className="md-links">
            {data?.first_name}
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
        className={
          fadeOut ? "sidebar__container fadeOut" : "sidebar__container"
        }
        onClick={() => {
          setFadeOut(!fadeOut);
        }}
      >
        <div
          className={fadeOut ? "sidebar fadeOut" : "sidebar"}
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
export default NavBar;
