import React from "react";
import "./Header.scss";
import { res_logo } from "res";

export const Header = () => {
  return (
    <div className="Header">
      <img src={res_logo} alt="Logo" />
    </div>
  );
};
