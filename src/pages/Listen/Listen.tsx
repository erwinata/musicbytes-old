import React from "react";
import { Header } from "components/Header/Header";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import { SongGrid } from "components/SongGrid/SongGrid";
import { Navbar } from "components/Navbar/Navbar";

export const Listen = () => {
  return (
    <div className="Listen">
      <Header />

      <CategoryTitle />
      <SongGrid />

      <CategoryTitle />
      <SongGrid />

      {/* <CategoryTitle />
      <SongGrid /> */}
    </div>
  );
};
