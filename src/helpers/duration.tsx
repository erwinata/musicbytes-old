export const ToMinutes = (duration: number) => {
  var result = "";
  var minutes = Math.floor(duration / 60);
  return (result += minutes);
};

export const ToSeconds = (duration: number) => {
  var result = "";
  var seconds = Math.round(duration % 60);
  if (seconds < 10) {
    result += "0";
  }
  return (result += seconds);
};

export const DurationToPercentage = (current: number, total: number) => {
  if (current == 0) {
    return 0;
  }
  return (current / total) * 100;
};

export const PercentageToDuration = (percentage: number, total: number) => {
  return (percentage / 100) * total;
};