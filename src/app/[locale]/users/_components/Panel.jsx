import React from "react";
import "./styles/user.css";
const PanelPlain = ({ title, text, onClick }) => {
  return (
    <>
      <div className="panel" onClick={onClick}>
        <span>{title}</span>
        <p>{text}</p>
      </div>
    </>
  );
};

export default PanelPlain;
