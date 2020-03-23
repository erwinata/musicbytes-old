import React, { useEffect, useState } from "react";
import "./PlayerThumbnail.scss";
import YouTube, { Options } from "react-youtube";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { AppActions } from "types/actions";
import { togglePlaying, seekDone } from "redux/actions/player";
import { PlayState } from "types/PlayState";

type Props = StateProps & DispatchProps;

interface StateProps {
  song: Song | null;
  playState: PlayState;
  seeking: boolean;
  timeCurrent: number;
}
interface DispatchProps {
  togglePlaying: (state?: PlayState) => any;
  seekDone: () => any;
}

interface IPlayerThumbnail {
  youtubePlayer: any;
  ready: boolean;
}
const PlayerThumbnail: React.FC<Props> = ({
  song,
  playState,
  seeking,
  timeCurrent,
  togglePlaying,
  seekDone
}: Props) => {
  const [state, setState] = useState<IPlayerThumbnail>({
    youtubePlayer: null,
    ready: false
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
      showinfo: 0
    }
  };

  const handleOnReady = (event: any) => {
    setState({
      youtubePlayer: event.target,
      ready: true
    });
    event.target.playVideo();
    togglePlaying();
  };

  const handleOnStateChange = (event: any) => {
    console.log(event);
    switch (event.data) {
      case 1:
        togglePlaying(PlayState.PLAYING);
        break;
      case 2:
        togglePlaying(PlayState.PAUSED);
        break;
    }
  };

  useEffect(() => {
    // console.log("FX " + playing + " " + ready);
    if (playState == PlayState.PLAYING && state.ready) {
      state.youtubePlayer.playVideo();
      console.log(state.youtubePlayer.getCurrentTime());
    } else if (playState == PlayState.PAUSED && state.ready) {
      state.youtubePlayer.pauseVideo();
    }

    if (state.ready && seeking) {
      state.youtubePlayer.seekTo(timeCurrent, true);
      seekDone();
    }
  }, [playState, seeking]);

  return (
    <div className="PlayerThumbnail">
      {song != null ? (
        <YouTube
          videoId={song?.id}
          opts={opts}
          onReady={handleOnReady}
          onStateChange={handleOnStateChange}
        />
      ) : (
        ""
      )}
      {/* <div className="image" style={thumbnailImageBackground}></div> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    song: state.player.songPlaying,
    playState: state.player.playState,
    seeking: state.player.seeking,
    timeCurrent: state.player.timeCurrent
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({
  togglePlaying: bindActionCreators(togglePlaying, dispatch),
  seekDone: bindActionCreators(seekDone, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerThumbnail);
