import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Loading.scss";
import { useSpring, animated, config } from "react-spring";
import { LoadingType } from "types/LoadingType";
import BarLoader from "react-spinners/BarLoader";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import FadeLoader from "react-spinners/FadeLoader";
import MoonLoader from "react-spinners/MoonLoader";
import PulseLoader from "react-spinners/PulseLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import SyncLoader from "react-spinners/SyncLoader";
import { useMeasure } from "react-use";

export const Loading: React.FC<{
  show: boolean;
  type?: LoadingType;
  text?: string;
  color?: string;
}> = ({ show, type, text, color }) => {
  if (type === undefined) {
    type = LoadingType.Pulse;
  }
  if (color === undefined) {
    color = "rgb(58, 89, 140)";
  }

  const [animationEnd, setAnimationEnd] = useState(false);
  const [ref, { height }] = useMeasure();

  const style = {
    wrapper: {
      display: animationEnd ? "none" : "block",
      height: show ? height : 0,
    },
    container: useSpring({
      opacity: show ? 1 : 0,
      transform: show
        ? "translate(-50%,0) scale(1, 1)"
        : "translate(-50%,0) scale(1.5, 1.5)",
      // config: config.stiff,
      onRest: () => {
        setAnimationEnd(true);
      },
    }),
  };

  return (
    <div className="Loading" style={style.wrapper}>
      <animated.div
        className="containerStyle"
        style={style.container}
        ref={ref}
      >
        <LoadingObject type={type} color={color} />
        {text ? <div className="text">{text}</div> : null}
      </animated.div>
    </div>
  );
};

const LoadingObject: React.FC<{ type: LoadingType; color: string }> = ({
  type,
  color,
}) => {
  let loader;
  switch (type) {
    case LoadingType.Bar:
      loader = <BarLoader color={color} />;
      break;
    case LoadingType.Beat:
      loader = <BeatLoader color={color} />;
      break;
    case LoadingType.Clip:
      loader = <ClipLoader color={color} />;
      break;
    case LoadingType.Fade:
      loader = <FadeLoader color={color} />;
      break;
    case LoadingType.Moon:
      loader = <MoonLoader color={color} />;
      break;
    case LoadingType.Pulse:
      loader = <PulseLoader color={color} />;
      break;
    case LoadingType.Scale:
      loader = <ScaleLoader color={color} />;
      break;
    case LoadingType.Sync:
      loader = <SyncLoader color={color} />;
      break;
  }

  return <div className="LoadingObject">{loader}</div>;
};
