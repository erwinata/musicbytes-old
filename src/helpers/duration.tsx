export const ConvertDurationToNumber = (durationRaw: string) => {
  durationRaw = durationRaw.replace("PT", "");

  let hour = 0;
  let minute = 0;
  let second = 0;

  let indexH = durationRaw.indexOf("H");
  let indexM = durationRaw.indexOf("M");
  let indexS = durationRaw.indexOf("S");

  if (indexH !== -1) {
    let durationRawSplit = durationRaw.split("H");
    hour = parseInt(durationRawSplit[0]);
    durationRaw = durationRawSplit[1];
  }
  if (indexM !== -1) {
    let durationRawSplit = durationRaw.split("M");
    minute = parseInt(durationRawSplit[0]);
    durationRaw = durationRawSplit[1];
  }
  if (indexS !== -1) {
    let durationRawSplit = durationRaw.split("S");
    second = parseInt(durationRawSplit[0]);
  }
  return hour * 3600 + minute * 60 + second;
};

export const ToMinutes = (duration: number) => {
  let result = "";
  let minutes = Math.floor(duration / 60);
  return (result += minutes);
};

export const ToSeconds = (duration: number) => {
  let result = "";
  let seconds = Math.round(duration % 60);
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
