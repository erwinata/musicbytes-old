import React from "react";
import "./CategorySubtitle.scss";

export const CategorySubtitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="CategorySubtitle">
      <h2>{text}</h2>
    </div>
  );
};
