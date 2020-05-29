import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import "./ClickOverlay.scss";
import { AllActions } from "redux/types/app";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSpring, animated, config } from "react-spring";
import { setOverlay, setClickOverlay } from "redux/actions/app";

type Props = PassingProps & StateProps & DispatchProps;
interface PassingProps {}
interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setClickOverlay: (show: boolean) => any;
}

const ClickOverlay: React.FC<Props> = ({ show, setClickOverlay }) => {
  // const [timeout, setTimeout] = useState(0);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setClickOverlay(false);
      }, 500);
    }
  }, [show]);

  return (
    <div className="ClickOverlay" style={{ top: show ? "0vh" : "100vh" }}></div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    show: state.app.clickOverlayState.show,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  setClickOverlay: bindActionCreators(setClickOverlay, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClickOverlay);
