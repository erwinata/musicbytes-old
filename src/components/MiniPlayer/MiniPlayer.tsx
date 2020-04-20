import React from "react";
import "./MiniPlayer.scss";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { showPlayer } from "redux/actions/player";

type Props = DispatchProps;

interface DispatchProps {
  showPlayer: (show: boolean) => any;
}

const MiniPlayer: React.FC<Props> = ({ showPlayer }) => {
  const history = useHistory();

  return (
    <div
      className="MiniPlayer"
      onClick={e => {
        showPlayer(true);
      }}
    >
      <img src="/res/sample-album.png" alt="Thumbnail Image" />
      <div className="info">
        <h1>Siapkah kau tuk jatuh cinta</h1>
        <h2>Hivi!</h2>
      </div>
      <div className="control">
        <div className="buttonPlayContainer">
          <img src="/res/play.svg" className="buttonPlay" alt="Play" />
        </div>
        <img src="/res/next.svg" className="buttonNext" alt="Next" />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songPlaying: state.player.songPlaying,
    songs: state.player.songs,
    timeCurrent: state.player.timeCurrent,
    timeTotal: state.player.timeTotal
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({ showPlayer: bindActionCreators(showPlayer, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
