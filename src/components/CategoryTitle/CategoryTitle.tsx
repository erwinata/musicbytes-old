import React from "react";
import "./CategoryTitle.scss";

export const CategoryTitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="CategoryTitle">
      <h1>{text}</h1>
    </div>
  );
};
