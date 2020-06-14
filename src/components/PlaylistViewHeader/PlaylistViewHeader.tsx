import React, { useEffect, useState } from "react";
import "./PlaylistViewHeader.scss";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  ButtonCapsuleText,
  ButtonClose,
  ButtonDelete,
  ButtonBack,
} from "components/Buttons/Buttons";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import { viewPlaylist, setPopupMenu } from "redux/actions/app";
import { playPlaylist } from "redux/actions/player";
import { res_delete, res_play_white } from "res";
import { deletePlaylist } from "redux/actions/library";
import { PopupMenuType } from "types/PopupMenuType";

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
  deletePlaylist: (playlist: Playlist) => any;
  setPopupMenu: (menuState: PopupMenuType) => any;
}

const PlaylistViewHeader: React.FC<Props> = ({
  playlistViewing,
  collection,
  playPlaylist,
  viewPlaylist,
  deletePlaylist,
  setPopupMenu,
}) => {
  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  // useEffect(() => {
  //   if (playlistViewing !== undefined) {
  //     setPlaylist(state.library.playlists[state.app.playlistIndexViewing!]);
  //   }
  // }, [playlistViewing]);

  const clickPlayNow = () => {
    playPlaylist(playlistViewing!);
  };
  const clickClose = () => {
    viewPlaylist(undefined!);
  };
  const clickDelete = async () => {
    setPopupMenu(PopupMenuType.PLAYLIST_DELETE_CONFIRMATION);
  };

  return (
    <div className="PlaylistViewHeader">
      <div className="buttonContainer">
        <ButtonBack onClick={clickClose} />
      </div>
      <img
        src={playlistViewing?.songs[0].thumbnails!.high}
        alt="Thumbnail image"
      />
      <h1>{playlistViewing?.title}</h1>
      <h2>{playlistViewing?.songs.length} songs</h2>
      <button className="fill uppercase large" onClick={clickPlayNow}>
        <img src={res_play_white} alt="Play" /> Play now
      </button>
      <button className="sub uppercase" onClick={clickDelete}>
        <img src={res_delete} alt="Delete" /> Delete Playlist
      </button>
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
  deletePlaylist: bindActionCreators(deletePlaylist, dispatch),
  setPopupMenu: bindActionCreators(setPopupMenu, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistViewHeader);
