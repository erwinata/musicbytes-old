import React, { useEffect, useState } from "react";
import "./PlaylistViewHeader.scss";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ButtonCapsuleText, ButtonClose } from "components/Buttons/Buttons";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import { viewPlaylist } from "redux/actions/app";
import { playPlaylist } from "redux/actions/player";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  playlistViewing?: Playlist;
}
interface StateProps {
  playlists: Playlist[];
  collection: Song[];
}
interface DispatchProps {
  playPlaylist: (playlist: Playlist) => any;
  viewPlaylist: (playlist: Playlist) => any;
}

const PlaylistViewHeader: React.FC<Props> = ({
  playlistViewing,
  collection,
  playPlaylist,
  viewPlaylist,
}) => {
  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  // useEffect(() => {
  //   if (playlistViewing !== undefined) {
  //     setPlaylist(state.library.playlists[state.app.playlistIndexViewing!]);
  //   }
  // }, [playlistViewing]);

  const handleClickPlayNow = () => {
    playPlaylist(playlistViewing!);
  };
  const handleClickClose = () => {
    viewPlaylist(undefined!);
  };

  return (
    <div className="PlaylistViewHeader">
      <ButtonClose onClick={handleClickClose} />
      <img
        src={playlistViewing?.songs[0].thumbnails!.default}
        alt="Thumbnail image"
      />
      <h1>{playlistViewing?.title}</h1>
      <h2>{playlistViewing?.songs.length} songs</h2>
      <ButtonCapsuleText text={"Play Now"} onClick={handleClickPlayNow} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playlists: state.library.playlists,
    collection: state.library.collection,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  playPlaylist: bindActionCreators(playPlaylist, dispatch),
  viewPlaylist: bindActionCreators(viewPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistViewHeader);
