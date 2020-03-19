import React from "react";
import "./PlayerControl.scss";
import {
  ButtonLike,
  ButtonNext,
  ButtonPlay,
  ButtonPrev,
  ButtonRepeat,
  ButtonShuffle,
  ButtonVideo
} from "components/Buttons/Buttons";
import { PlayerProgress } from "components/PlayerControl/PlayerProgress";

export const PlayerControl = () => {
  return (
    <div className="PlayerControl">
      <PlayerTopButtonList />
      <PlayerTitle />
      <PlayerButtonList />
      <PlayerProgress />
    </div>
  );
};

const PlayerTitle = () => {
  return (
    <div className="PlayerTitle">
      <h1>That's What I Like</h1>
      <h2>Bruno Mars</h2>
    </div>
  );
};

const PlayerTopButtonList = () => {
  return (
    <div className="PlayerTopButtonList">
      <ButtonVideo />
      <ButtonLike />
    </div>
  );
};

const PlayerButtonList = () => {
  return (
    <div className="PlayerButtonList">
      <ButtonShuffle />
      <ButtonPrev />
      <ButtonPlay />
      <ButtonNext />
      <ButtonRepeat />
    </div>
  );
};
