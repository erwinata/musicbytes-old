import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import PlayerThumbnail from "components/PlayerThumbnail/PlayerThumbnail";
import PlayerControl from "components/PlayerControl/PlayerControl";
import PlayerPlaylist from "components/PlayerPlaylist/PlayerPlaylist";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { durationIncrement, togglePlaying } from "redux/actions/player";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { PlayState } from "types/PlayState";
import { animated } from "react-spring";
import "./Player.scss";

type Props = StateProps & DispatchProps;
interface StateProps {
  showPlayer: boolean;
  songs: Song[];
  songPlaying: Song | null;
  playState: PlayState;
  shuffle: boolean;
  repeat: Repeat;
  timeCurrent: number;
  timeTotal: number;
}
interface DispatchProps {
  durationIncrement: () => any;
}

interface StatePlayer {
  durationInterval: any;
}
const Player: React.FC<Props> = ({
  showPlayer,
  songs,
  songPlaying,
  playState,
  shuffle,
  repeat,
  timeCurrent,
  timeTotal,
  durationIncrement,
}: Props) => {
  const [state, setState] = useState<StatePlayer>({
    durationInterval: undefined,
  });

  useEffect(() => {
    if (playState == PlayState.PLAYING) {
      var interval = setInterval(durationIncrement, 1000);
      setState({
        ...state,
        durationInterval: interval,
      });
    } else {
      clearInterval(state.durationInterval);
    }
  }, [playState]);

  const slide = useSpring({
    top: showPlayer ? "0vh" : "100vh",
    opacity: showPlayer ? 1 : 0,
  });

  return (
    <animated.div className="Player" style={slide}>
      <PlayerThumbnail />
      <PlayerControl />
      <PlayerPlaylist />
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    showPlayer: state.player.showPlayer,
    songPlaying: state.player.songPlaying,
    songs: state.player.songs,
    playState: state.player.playState,
    shuffle: state.player.shuffle,
    repeat: state.player.repeat,
    timeCurrent: state.player.timeCurrent,
    timeTotal: state.player.timeTotal,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  durationIncrement: bindActionCreators(durationIncrement, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
