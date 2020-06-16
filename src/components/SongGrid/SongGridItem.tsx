import React from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { viewPlaylist } from "redux/actions/app";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { res_like_active } from "res";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import "./SongGridItem.scss";

type Props = PassingProps & DispatchProps;

interface PassingProps {
  song?: Song;
  playlist?: Playlist;
  index: number;
  like?: boolean;
  clickSong?: (index: number, e: any) => any;
}
interface DispatchProps {
  viewPlaylist: (playlist: Playlist) => any;
}

const SongGridItem: React.FC<Props> = ({
  song,
  playlist,
  index,
  like,
  clickSong,
  viewPlaylist,
}) => {
  const isSong = song !== undefined;

  const handleClick = (e: any) => {
    if (isSong) {
      clickSong!(index, e);
    } else {
      viewPlaylist(playlist!);
    }
  };

  const style = useSpring({
    to: {
      transform: "translate(0px,0px)",
      opacity: 1,
    },
    from: {
      transform: "translate(0px,50px)",
      opacity: 0.5,
    },
  });

  return (
    <animated.div
      className={`SongGridItem ${!isSong ? "playlist" : ""}`}
      onClick={(e: any) => handleClick(e)}
      // style={style}
    >
      <div
        className="image"
        style={{
          backgroundImage: `url('${
            isSong
              ? song?.thumbnails?.medium
              : playlist?.songs[0].thumbnails?.medium
          }')`,
        }}
      >
        {!isSong ? <span>Playlist</span> : null}
        {like ? <img src={res_like_active} /> : null}
      </div>
      <h1>{isSong ? song!.title : playlist!.title}</h1>
      <h2>{isSong ? song!.channel : playlist!.songs.length + " songs"}</h2>
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    // playlists: state.library.playlists,
    // collection: state.library.collection,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  viewPlaylist: bindActionCreators(viewPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongGridItem);
