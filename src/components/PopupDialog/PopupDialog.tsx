import React from "react";
import { connect } from "react-redux";
import { animated } from "react-spring";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import "./PopupDialog.scss";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  show: boolean;
  text: string;
  actionConfirm: any;
  actionCancel: any;
}
interface StateProps {
  // songAdding?: Song;
}
interface DispatchProps {
  // playPlaylist: (playlist: Playlist) => any;
}
const PopupDialog: React.FC<Props> = ({
  show,
  text,
  actionConfirm,
  actionCancel,
}) => {
  if (!show) return null;
  return (
    <animated.div className="PopupDialog">
      <h2>{text}</h2>
      <button className="large" onClick={actionConfirm}>
        OK
      </button>
      <button className="sub uppercase" onClick={actionCancel}>
        Cancel
      </button>
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    // songAdding: state.app.songAdding,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  // playPlaylist: bindActionCreators(playPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupDialog);
