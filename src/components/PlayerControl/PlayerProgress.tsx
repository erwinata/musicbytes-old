import React from "react";
import "./PlayerProgress.scss";
import {
  ToMinutes,
  ToSeconds,
  DurationToPercentage,
  PercentageToDuration,
} from "helpers/duration";

interface TimeProps {
  time: {
    current: number;
    total: number;
  };
  seekTo?: (to: number) => any;
}

const PlayerProgress: React.FC<TimeProps> = ({ time, seekTo }) => {
  return (
    <div className="PlayerProgress">
      <PlayerTime time={time} />
      <PlayerProgressBar time={time} seekTo={seekTo} />
    </div>
  );
};

const PlayerTime: React.FC<TimeProps> = ({ time }) => {
  return (
    <div className="PlayerTime">
      <span className="current">
        {ToMinutes(time.current) + ":" + ToSeconds(time.current)}
      </span>
      <span className="total">
        {ToMinutes(time.total) + ":" + ToSeconds(time.total)}
      </span>
    </div>
  );
};

const PlayerProgressBar: React.FC<TimeProps> = ({ time, seekTo }) => {
  var percentage = DurationToPercentage(time.current, time.total);

  const handleOnClick = (event: any) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.pageX - currentTargetRect.left;

    var percentage = (offsetX / currentTargetRect.right) * 100;
    var newTimeCurrent = PercentageToDuration(percentage, time.total);
    console.log("%" + newTimeCurrent);
    seekTo!(newTimeCurrent);
  };

  return (
    <div className="PlayerProgressBar" onClick={handleOnClick}>
      <div
        className="pointer"
        style={{ left: `calc(${percentage}% - 8px)` }}
      ></div>
      <div className="current" style={{ width: `${percentage}%` }}></div>
      <div className="total"></div>
    </div>
  );
};

export default PlayerProgress;
