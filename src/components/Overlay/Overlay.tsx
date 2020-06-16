import React from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setOverlay } from "redux/actions/app";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import "./Overlay.scss";

type Props = PassingProps & StateProps & DispatchProps;
interface PassingProps {}
interface StateProps {
  show: boolean;
  dismissAction?: () => any;
  transparent?: boolean;
}
interface DispatchProps {
  setOverlay: (
    show: boolean,
    dismissAction?: () => any,
    transparent?: boolean
  ) => any;
}

const Overlay: React.FC<Props> = ({
  show,
  dismissAction,
  transparent,
  setOverlay,
}) => {
  const overlayStyle = useSpring({
    to: {
      opacity: show ? 1 : 0,
    },
  });

  return (
    <div
      className="Overlay"
      style={{ top: show ? "0vh" : "100vh" }}
      onClick={() => {
        dismissAction!();
        setOverlay(false);
      }}
    >
      <animated.div
        style={overlayStyle}
        className={`background ${transparent ? "transparent" : ""}`}
      ></animated.div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    show: state.app.overlayState.show,
    dismissAction: state.app.overlayState.dismissAction,
    transparent: state.app.overlayState.transparent,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  setOverlay: bindActionCreators(setOverlay, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
