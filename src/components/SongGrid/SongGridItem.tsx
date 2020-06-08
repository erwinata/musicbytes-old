import React from "react";
import "./SongGridItem.scss";
import { Song } from "types/Song";
import { Playlist } from "types/Playlist";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppActionTypes } from "redux/types/app";
import { viewPlaylist } from "redux/actions/app";
import { res_like_active } from "res";

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

  return (
    <div
      className={`SongGridItem ${!isSong ? "playlist" : ""}`}
      onClick={(e) => handleClick(e)}
    >
      <div
        className="image"
        style={{
          backgroundImage: `url('${
            isSong
              ? song?.thumbnails?.high
              : playlist?.songs[0].thumbnails?.high
          }')`,
        }}
      >
        {!isSong ? <span>Playlist</span> : null}
        {like ? <img src={res_like_active} /> : null}
      </div>
      <h1>{isSong ? song!.title : playlist!.title}</h1>
      <h2>{isSong ? song!.channel : playlist!.songs.length + " songs"}</h2>
    </div>
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
