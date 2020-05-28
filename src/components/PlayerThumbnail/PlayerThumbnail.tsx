import React, { useEffect, useState } from "react";
import "./PlayerThumbnail.scss";
import YouTube, { Options } from "react-youtube";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { AllActions } from "redux/types/app";
import {
  togglePlaying,
  seekDone,
  autoNextSong,
  setVideoIsRunning,
} from "redux/actions/player";
import { PlayState } from "types/PlayState";

type Props = StateProps & DispatchProps;

interface StateProps {
  songs?: { list: Song[]; playing: Song };
  playerState: {
    playState: PlayState;
    videoIsRunning: boolean;
  };
  time: {
    seeking: boolean;
    current: number;
  };
}
interface DispatchProps {
  autoNextSong: () => any;
  togglePlaying: (state?: PlayState) => any;
  setVideoIsRunning: (videoIsRunning?: boolean) => any;
  seekDone: () => any;
}

interface IPlayerThumbnail {
  youtubePlayer: any;
  ready: boolean;
}
const PlayerThumbnail: React.FC<Props> = ({
  songs,
  playerState,
  time,
  togglePlaying,
  setVideoIsRunning,
  seekDone,
  autoNextSong,
}: Props) => {
  const [state, setState] = useState<IPlayerThumbnail>({
    youtubePlayer: null,
    ready: false,
  });

  const opts: Options = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      fs: 0,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
    },
  };

  const handleOnReady = (event: any) => {
    setState({
      youtubePlayer: event.target,
      ready: true,
    });
    togglePlaying(PlayState.PLAYING);
  };

  const handleOnStateChange = (event: any) => {
    console.log(event);
    switch (event.data) {
      case 0:
        autoNextSong();
        break;
      case 1:
        console.log("123123");
        setVideoIsRunning(true);
        break;
      case 2:
        setVideoIsRunning(false);
        break;
    }
  };

  useEffect(() => {
    // console.log("FX " + playing + " " + ready);
    if (state.ready) {
      if (playerState.playState == PlayState.PLAYING) {
        state.youtubePlayer.playVideo();
        console.log(state.youtubePlayer.getCurrentTime());
      } else if (playerState.playState == PlayState.PAUSED) {
        state.youtubePlayer.pauseVideo();
      }
    }
  }, [playerState.playState]);

  useEffect(() => {
    if (state.ready && time.seeking) {
      state.youtubePlayer.seekTo(time.current, true);
      seekDone();
    }
  }, [time]);

  return (
    <div className="PlayerThumbnail">
      {songs ? (
        <YouTube
          videoId={songs.playing!.id}
          opts={opts}
          onReady={handleOnReady}
          onStateChange={handleOnStateChange}
        />
      ) : null}
      {/* <div className="image" style={thumbnailImageBackground}></div> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songs: state.player.songs,
    playerState: state.player.playerState,
    time: state.player.time,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  autoNextSong: bindActionCreators(autoNextSong, dispatch),
  togglePlaying: bindActionCreators(togglePlaying, dispatch),
  setVideoIsRunning: bindActionCreators(setVideoIsRunning, dispatch),
  seekDone: bindActionCreators(seekDone, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerThumbnail);
