import React from "react";
import "./PlayerProgress.scss";
import {
  ToMinutes,
  ToSeconds,
  DurationToPercentage,
  PercentageToDuration
} from "helpers/duration";

interface TimeProps {
  timeCurrent: number;
  timeTotal: number;
  seekTo?: (to: number) => any;
}

const PlayerProgress: React.FC<TimeProps> = ({
  timeCurrent,
  timeTotal,
  seekTo
}) => {
  return (
    <div className="PlayerProgress">
      <PlayerTime timeCurrent={timeCurrent} timeTotal={timeTotal} />
      <PlayerProgressBar
        timeCurrent={timeCurrent}
        timeTotal={timeTotal}
        seekTo={seekTo}
      />
    </div>
  );
};

const PlayerTime: React.FC<TimeProps> = ({ timeCurrent, timeTotal }) => {
  return (
    <div className="PlayerTime">
      <span className="current">
        {ToMinutes(timeCurrent) + ":" + ToSeconds(timeCurrent)}
      </span>
      <span className="total">
        {ToMinutes(timeTotal) + ":" + ToSeconds(timeTotal)}
      </span>
    </div>
  );
};

const PlayerProgressBar: React.FC<TimeProps> = ({
  timeCurrent,
  timeTotal,
  seekTo
}) => {
  var percentage = DurationToPercentage(timeCurrent, timeTotal);

  const handleOnClick = (event: any) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.pageX - currentTargetRect.left;

    var percentage = (offsetX / currentTargetRect.right) * 100;
    var newTimeCurrent = PercentageToDuration(percentage, timeTotal);
    console.log("%" + newTimeCurrent);
    seekTo!(newTimeCurrent);
  };

  return (
    <div className="PlayerProgressBar" onClick={handleOnClick}>
      <div className="pointer" style={{ left: `${percentage}%` }}></div>
      <div className="current" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default PlayerProgress;
