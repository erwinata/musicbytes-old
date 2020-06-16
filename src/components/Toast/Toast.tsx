import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { animated, config, useSpring } from "react-spring";
import { useMeasure } from "react-use";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { ToastType } from "types/ToastType";
import "./Toast.scss";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  // songAdding?: Song;
  toastState: {
    text: string;
    toastType: ToastType;
  };
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
}
interface DispatchProps {
  // addingToPlaylist: (song: Song) => any;
}

const Toast: React.FC<Props> = ({ toastState, deviceInfo }) => {
  const [text, setText] = useState("");
  const [textDisplay, setTextDisplay] = useState("");
  const [timeoutDone, setTimeoutDone] = useState(false);
  const [type, setType] = useState(ToastType.NORMAL);

  const [contentHeight, setContentHeight] = useState(0);
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    if (toastState.text != text) {
      setText(toastState.text);
      setTextDisplay(toastState.text);
      setTimeoutDone(false);
      setTimeout(() => {
        setTimeoutDone(true);
        setText("");
      }, 1500);
    }
  }, [toastState]);

  useEffect(() => {
    // console.log(bounds.width + " . " + bounds.height);
    // var width = bounds.width;
    // var height = bounds.height;
    setContentHeight(height);
  }, [height]);

  const toastStyle = useSpring({
    to: {
      // width: `${contentWidthHeight.width + 50}px`,
      // height: `${contentHeight}px`,
      opacity: text !== "" ? 1 : 0,
      bottom: text !== "" ? "12vh" : "-5vh",
      // left: !newPlaylist ? "0vw" : "-80vw",
    },
    config: config.stiff,
    onRest: () => {
      if (timeoutDone) setTextDisplay("");
    },
  });

  return (
    <animated.div
      className={`Toast ${deviceInfo.isLandscape ? "desktop" : ""}`}
      style={toastStyle}
    >
      <div ref={ref}>{textDisplay}</div>
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    toastState: state.app.toastState,
    deviceInfo: state.app.deviceInfo,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  // addingToPlaylist: bindActionCreators(addingToPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
