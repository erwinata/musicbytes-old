import PlayerControl from "components/PlayerControl/PlayerControl";
import PlayerPlaylist from "components/PlayerPlaylist/PlayerPlaylist";
import PlayerThumbnail from "components/PlayerThumbnail/PlayerThumbnail";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { addToNowPlaying, durationIncrement } from "redux/actions/player";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import { Playlist } from "types/Playlist";
import { PlayState } from "types/PlayState";
import { Repeat } from "types/Repeat";
import { Song } from "types/Song";
import "./Player.scss";

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
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
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
  deviceInfo,
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

  const style = {
    mobile: useSpring({
      top: showPlayer ? "0vh" : "100vh",
      // opacity: showPlayer ? 1 : 0,
    }),
    desktop: {
      top: "0vh",
      opacity: 1,
    },
  };

  return (
    <animated.div
      className={`Player ${deviceInfo.isLandscape ? "desktop" : ""}`}
      style={deviceInfo.isLandscape ? style.desktop : style.mobile}
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
    deviceInfo: state.app.deviceInfo,
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
