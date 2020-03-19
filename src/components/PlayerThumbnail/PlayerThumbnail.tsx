import React from "react";
import "./PlayerThumbnail.scss";
import YouTube, { Options } from "react-youtube";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { AppState } from "store/configureStore";
import { Song } from "types/Song";

type Props = StateProps;

interface StateProps {
  song: Song | null;
}

const PlayerThumbnail: React.FC<Props> = ({ song }: Props) => {
  var thumbnailImageBackground = {
    backgroundImage: "url(/res/sample-album.png)"
  };

  const opts: Options = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const _onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    console.log("aaa");
  };

  return (
    <div className="PlayerThumbnail">
      {song != null ? (
        <YouTube videoId={song?.id} opts={opts} onReady={_onReady} />
      ) : (
        ""
      )}
      {/* <div className="image" style={thumbnailImageBackground}></div> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    song: state.player.songPlaying
  };
};

export default connect(mapStateToProps)(PlayerThumbnail);
