import React from "react";
import "./Tooltip.scss";

interface TooltipDataType {
  index: number;
  label: string;
}

const tooltipList: TooltipDataType[] = [
  {
    index: 1,
    label: "Add to Now Playing"
  },
  {
    index: 2,
    label: "Add to Playlist"
  },
  {
    index: 3,
    label: "Like Songs"
  }
];

export const Tooltip = () => {
  return (
    <div className="Tooltip">
      {tooltipList.map(tooltipItem => {
        return (
          <TooltipItem index={tooltipItem.index} label={tooltipItem.label} />
        );
      })}
    </div>
  );
};

const TooltipItem: React.FC<TooltipDataType> = ({ index, label }) => {
  return <div className="TooltipItem">{label}</div>;
};
