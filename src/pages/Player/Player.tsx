import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import PlayerThumbnail from "components/PlayerThumbnail/PlayerThumbnail";
import PlayerControl from "components/PlayerControl/PlayerControl";
import PlayerPlaylist from "components/PlayerPlaylist/PlayerPlaylist";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import {
  durationIncrement,
  togglePlaying,
  addToNowPlaying,
} from "redux/actions/player";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { PlayState } from "types/PlayState";
import { animated } from "react-spring";
import "./Player.scss";
import { Playlist } from "types/Playlist";

type Props = StateProps & DispatchProps;
interface StateProps {
  showPlayer: boolean;
  playerState: {
    playState: PlayState;
    videoIsRunning: boolean;
  };
  songs?: { list: Song[]; playing: Song };
  playlist?: Playlist;
  setting: {
    shuffle: boolean;
    repeat: Repeat;
  };
  time: {
    current: number;
    total: number;
  };
  isDesktop: boolean;
}
interface DispatchProps {
  durationIncrement: () => any;
  addToNowPlaying: (song: Song) => any;
}

interface StatePlayer {
  durationInterval: any;
}
const Player: React.FC<Props> = ({
  showPlayer,
  songs,
  playlist,
  playerState,
  setting,
  time,
  isDesktop,
  durationIncrement,
  addToNowPlaying,
}: Props) => {
  const [state, setState] = useState<StatePlayer>({
    durationInterval: undefined,
  });

  useEffect(() => {
    if (
      playerState.playState == PlayState.PLAYING &&
      playerState.videoIsRunning
    ) {
      if (!state.durationInterval) {
        var interval = setInterval(durationIncrement, 1000);
        setState({
          ...state,
          durationInterval: interval,
        });
      }
    } else {
      clearInterval(state.durationInterval);
      setState({
        ...state,
        durationInterval: undefined,
      });
    }
  }, [playerState]);

  // useEffect(() => {

  // 	if (playlist){
  // 		addToNowPlaying()
  // 	}

  // }, [playlist?.data.songs])

  const slide = useSpring({
    top: isDesktop ? "0vh" : showPlayer ? "0vh" : "100vh",
    opacity: isDesktop ? "0vh" : showPlayer ? "0vh" : "100vh",
  });

  return (
    <animated.div
      className={`Player ${isDesktop ? "desktop" : ""}`}
      style={slide}
    >
      <PlayerThumbnail />
      <PlayerControl />
      <PlayerPlaylist />
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    showPlayer: state.player.showPlayer,
    songs: state.player.songs,
    playlist: state.player.playlist,
    playerState: state.player.playerState,
    setting: state.player.setting,
    time: state.player.time,
    isDesktop: state.app.isDesktop,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  durationIncrement: bindActionCreators(durationIncrement, dispatch),
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
