import React from "react";
import "./Buttons.scss";

export const ButtonVideo = () => {
  return (
    <div className="ButtonVideo">
      <img src="/res/video.svg" alt="Video" />
    </div>
  );
};
export const ButtonLike = () => {
  return (
    <div className="ButtonLike">
      <img src="/res/like.svg" alt="Like" />
    </div>
  );
};
export const ButtonOption: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="ButtonOption" onClick={onClick}>
      <img src="/res/option.svg" alt="Option" />
    </div>
  );
};

export const ButtonPlay: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="ButtonPlay" onClick={onClick}>
      <img src="/res/play.svg" alt="Play" />
    </div>
  );
};
export const ButtonPrev: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="ButtonPrev" onClick={onClick}>
      <img src="/res/prev.svg" alt="Prev" />
    </div>
  );
};
export const ButtonNext: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="ButtonNext" onClick={onClick}>
      <img src="/res/next.svg" alt="Next" />
    </div>
  );
};

export const ButtonShuffle: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="ButtonShuffle" onClick={onClick}>
      <img src="/res/shuffle.svg" alt="Shuffle" />
    </div>
  );
};

export const ButtonRepeat: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="ButtonRepeat" onClick={onClick}>
      <img src="/res/repeat.svg" alt="Repeat" />
    </div>
  );
};

export const ButtonSave = () => {
  return (
    <div className="ButtonSave">
      <img src="/res/save.svg" alt="Save Playlist" />
    </div>
  );
};
