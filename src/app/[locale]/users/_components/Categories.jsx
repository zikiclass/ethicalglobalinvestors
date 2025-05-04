"use client";
import React from "react";
import Link from "next/link";
import WatchLists from "./WatchLists";
import "./styles/user.css";
import { useTranslations } from "next-intl";
const Categories = () => {
  const t = useTranslations("Categories");
  return (
    <>
      <div className="categories">
        <ul>
          <li className="active">
            <Link href="#">{t("favorites")}</Link>
          </li>
          <li>
            <Link href="#">{t("gainers")}</Link>
          </li>
          <li>
            <Link href="#">{t("losers")}</Link>
          </li>
        </ul>
        <WatchLists />
      </div>
    </>
  );
};

export default Categories;
