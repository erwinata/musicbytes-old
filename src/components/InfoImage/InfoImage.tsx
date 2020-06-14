import React, { useState, useEffect, useLayoutEffect } from "react";
import "./InfoImage.scss";
import { useSpring, animated, config } from "react-spring";
import { res_info_nodata, res_info_discover, res_info_library } from "res";
import { InfoImageType } from "types/InfoImage";

export const InfoImage: React.FC<{
  show: boolean;
  type: InfoImageType;
  text?: string;
}> = ({ show, type, text }) => {
  const style = useSpring({
    opacity: show ? 1 : 0,
    transform: show
      ? "translate(-50%,0) scale(1, 1)"
      : "translate(-50%,0) scale(0.5, 0.5)",
    // config: config.stiff,
  });

  let res = res_info_nodata;
  switch (type) {
    case InfoImageType.NODATA:
      res = res_info_nodata;
      break;
    case InfoImageType.DISCOVER:
      res = res_info_discover;
      break;
    case InfoImageType.LIBRARY:
      res = res_info_library;
      break;
  }

  return (
    <div className="InfoImage" style={{ display: show ? "block" : "none" }}>
      <animated.div className="containerStyle" style={style}>
        <img src={res} alt="Info" />
        {text ? <div className="text">{text}</div> : null}
      </animated.div>
    </div>
  );
};
