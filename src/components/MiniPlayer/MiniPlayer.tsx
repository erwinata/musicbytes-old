import React from "react";
import "./MiniPlayer.scss";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { showPlayer } from "redux/actions/player";
import { showToast } from "redux/actions/app";
import { ButtonNext, ButtonPlay } from "components/Buttons/Buttons";
import { PlayState } from "types/PlayState";

type Props = DispatchProps;

interface DispatchProps {
  showPlayer: (show: boolean) => any;
  showToast: (text: string) => any;
}

const MiniPlayer: React.FC<Props> = ({ showPlayer, showToast }) => {
  const history = useHistory();

  return (
    <div
      className="MiniPlayer"
      onClick={(e) => {
        showPlayer(true);
        showToast("Player showing");
      }}
    >
      <img src="/res/sample-album.png" alt="Thumbnail Image" />
      <div className="info">
        <h1>Siapkah kau tuk jatuh cinta</h1>
        <h2>Hivi!</h2>
      </div>
      <div className="control">
        <div className="buttonPlayContainer">
          <ButtonPlay playState={PlayState.PLAYING} />
        </div>
        <ButtonNext />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songs: state.player.songs,
    time: state.player.time,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  showPlayer: bindActionCreators(showPlayer, dispatch),
  showToast: bindActionCreators(showToast, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
