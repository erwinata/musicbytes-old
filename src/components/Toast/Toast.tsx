import React, { useState, useEffect } from "react";
import "./Toast.scss";
import PlaylistList from "components/PlaylistList/PlaylistList";
import PlaylistNaming from "components/PlaylistNaming/PlaylistNaming";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { connect } from "react-redux";
import { Song } from "types/Song";
import { animated, useSpring, config } from "react-spring";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { addToPlaylist, newPlaylist } from "redux/actions/library";
import { ToastType } from "types/ToastType";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  // songAdding?: Song;
  toastState: {
    text: string;
    toastType: ToastType;
  };
  isDesktop: boolean;
}
interface DispatchProps {
  // addingToPlaylist: (song: Song) => any;
}

const Toast: React.FC<Props> = ({ toastState, isDesktop }) => {
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
      className={`Toast ${isDesktop ? "desktop" : ""}`}
      style={toastStyle}
    >
      <div ref={ref}>{textDisplay}</div>
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    toastState: state.app.toastState,
    isDesktop: state.app.isDesktop,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  // addingToPlaylist: bindActionCreators(addingToPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
