import React from "react";
import { Header } from "components/Header/Header";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import { SongGrid } from "components/SongGrid/SongGrid";
import { Navbar } from "components/Navbar/Navbar";

export const Library = () => {
  return (
    <div className="Library">
      <Header />

      <h1>Library</h1>

      {/* <CategoryTitle />
      <SongGrid /> */}
    </div>
  );
};
