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

type Props = PassingProps & DispatchProps;

interface PassingProps {
  song?: Song;
  playlist?: Playlist;
  index: number;
  // optionList: OptionItemData[];
}
interface DispatchProps {
  viewPlaylist: (playlist: Playlist) => any;
}

const SongGridItem: React.FC<Props> = ({
  song,
  playlist,
  index,
  viewPlaylist,
}) => {
  const isSong = song !== undefined;

  const handleClick = () => {
    if (isSong) {
      console.log("SONG");
    } else {
      viewPlaylist(playlist!);
    }
  };

  return (
    <div className="SongGridItem" onClick={() => handleClick()}>
      <img
        src={
          isSong
            ? song!.thumbnails!.default
            : playlist!.songs[0].thumbnails!.default
        }
        alt="Thumbnail Image"
      />
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
