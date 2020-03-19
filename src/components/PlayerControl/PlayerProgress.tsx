import React from "react";
import "./PlayerProgress.scss";

export const PlayerProgress = () => {
  return (
    <div className="PlayerProgress">
      <PlayerTime />
      <PlayerProgressBar />
    </div>
  );
};

export const PlayerTime = () => {
  return (
    <div className="PlayerTime">
      <span className="current">0:30</span>
      <span className="total">3:30</span>
    </div>
  );
};

export const PlayerProgressBar = () => {
  var currentTime = {
    width: "100px"
  };

  return (
    <div className="PlayerProgressBar">
      <div className="pointer"></div>
      <div className="current" style={currentTime}></div>
    </div>
  );
};
