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
import { useTranslations } from "next-intl";
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
import { usePathname, useRouter } from "next/navigation";
import fetchUser from "../../[locale]/users/_components/FetchUser";
const NavBarLight = () => {
  const { status, data: session } = useSession();
  const { data } = fetchUser();
  const [countryShow, setCountryShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const t = useTranslations();

  // Get locale from the first part of the path: "/fr/contact" -> "fr"
  const locale = pathname.split("/")[1] || "en";
  const sidebarLinks = [
    { id: 1, icon: HomeIcon, nameKey: "home", link: "" },
    { id: 2, icon: PersonOutlinedIcon, nameKey: "signin", link: "signin" },
    { id: 3, icon: PersonAddIcon, nameKey: "signup", link: "signup" },
    { id: 4, icon: MailOutlinedIcon, nameKey: "contact", link: "contact" },
    { id: 5, icon: LockOpenOutlinedIcon, nameKey: "cookie", link: "cookie" },
    { id: 6, icon: LockOpenOutlinedIcon, nameKey: "privacy", link: "privacy" },
    { id: 7, icon: DnsIcon, nameKey: "cryptomining", link: "cryptomining" },
    {
      id: 8,
      icon: CopyrightIcon,
      nameKey: "bitcoinmining",
      link: "bitcoinmining",
    },
    // {
    //   id: 9,
    //   icon: CopyrightIcon,
    //   nameKey: "dogecoinmining",
    //   link: "dogecoinmining",
    // },
    // {
    //   id: 10,
    //   icon: ContentCopyIcon,
    //   nameKey: "copytrading",
    //   link: "copytrading",
    // },
    // {
    //   id: 11,
    //   icon: CopyrightIcon,
    //   nameKey: "cryptotrading",
    //   link: "cryptotrading",
    // },
    // { id: 12, icon: FolderOpenIcon, nameKey: "terms", link: "terms" },
    // {
    //   id: 13,
    //   icon: WysiwygIcon,
    //   nameKey: "forextrading",
    //   link: "forextrading",
    // },
    // {
    //   id: 14,
    //   icon: InsertChartOutlinedIcon,
    //   nameKey: "stockstrading",
    //   link: "stockstrading",
    // },
    // {
    //   id: 15,
    //   icon: DonutLargeOutlinedIcon,
    //   nameKey: "optionstrading",
    //   link: "optionstrading",
    // },
    // { id: 16, icon: PeopleIcon, nameKey: "leverage", link: "leverage" },
    // {
    //   id: 17,
    //   icon: PeopleIcon,
    //   nameKey: "responsibletrading",
    //   link: "responsibletrading",
    // },
    // {
    //   id: 18,
    //   icon: FolderOpenIcon,
    //   nameKey: "generalrisk",
    //   link: "generalrisk",
    // },
    { id: 19, icon: PeopleIcon, nameKey: "about", link: "about" },
  ];
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
  const handleLocaleChange = (newLocale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname);
  };

  const [selectedCountry, setSelectedCountry] = useState(locale.toUpperCase());
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
        <Link href={`/${locale || "en"}/contact`} className="md-links">
          {t("HomePage.contact")}
        </Link>
        {status === "unauthenticated" ? (
          <Link href={`/${locale}/signin`} className="md-links">
            {t("HomePage.login")}
          </Link>
        ) : (
          <Link href={`/${locale}/users/dashboard`} className="md-links">
            {data?.first_name}
          </Link>
        )}

        <Link href={`/${locale}/signup`} className="md-links">
          {t("HomePage.signup")}
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
          <FlagIcon
            code={selectedCountry === "EN" ? "GB" : selectedCountry}
            className="icon__country"
          />{" "}
          <span>{selectedCountry}</span>
        </div>
        {
          <div className="country__list">
            <div className="country__wrap">
              {countryList.map((country) => (
                <div
                  className="icon__country__list"
                  key={country.id}
                  onClick={() => {
                    setSelectedCountry(country.code);
                    handleLocaleChange(country.lang.toLowerCase());
                  }}
                >
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
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const href = `/${locale}${link.link ? `/${link.link}` : ""}`;

              return (
                <li key={link.id}>
                  <Link href={href} className="sidebar__link">
                    {Icon && <Icon className="sidebar__links__icon" />}
                    <span>{t(`HomePage.${link.nameKey}`)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBarLight;
