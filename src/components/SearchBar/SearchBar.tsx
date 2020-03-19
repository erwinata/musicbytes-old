import React from "react";
import "./SearchBar.scss";

export const SearchBar = () => {
  return (
    <div className="SearchBar">
      <img src="/res/search.svg" alt="Search" />
      <input type="text" />
    </div>
  );
};
