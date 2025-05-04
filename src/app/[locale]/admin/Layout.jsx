"use client";
import React, { useState, useEffect } from "react";
import "./_components/admin.css";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";
const Layout = ({ children, pageTitle }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="admin">
      <SideBar toggle={showNavbar} />
      <div className="ad__container">
        <NavBar onClick={handleClick} setIcon={showNavbar} />
        <h3 className="pageTitle">{pageTitle}</h3>
        {children}
      </div>
    </div>
  );
};
export default Layout;
