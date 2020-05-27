import React, { Dispatch, useEffect, useState } from "react";
import "./PlayerPlaylist.scss";
import SongList from "components/SongList/SongList";
import { ButtonSave } from "components/Buttons/Buttons";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { OptionAction, OptionActionType } from "types/Option";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { bindActionCreators } from "redux";
import { setPopupMenu } from "redux/actions/app";
import { PopupMenuType } from "types/PopupMenuType";
import { Playlist } from "types/Playlist";
import { isEqual, sortBy } from "lodash";

type Props = PassingProps & StateProps & DispatchProps;
interface PassingProps {}
interface StateProps {
  songs?: { list: Song[]; playing: Song };
  playlist?: { index: number; data: Playlist };
  setting: {
    shuffle: boolean;
    repeat: Repeat;
  };
}
interface DispatchProps {
  setPopupMenu: (menuState: PopupMenuType, songAdding?: Song) => any;
}

const PlayerPlaylist: React.FC<Props> = ({
  songs,
  playlist,
  setting,
  setPopupMenu,
}: Props) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  const handleClickButtonSave = () => {
    setPopupMenu(PopupMenuType.PLAYLIST_SAVING);
  };

  return (
    <div className="PlayerPlaylist">
      <PlayerPlaylistHeader
        onClick={handleClickButtonSave}
        songs={songs!.list}
        playlist={playlist}
      />
      <SongList
        songs={songs!.list}
        optionList={optionList}
        resetPlaylist={false}
      />
    </div>
  );
};

const PlayerPlaylistHeader: React.FC<{
  onClick: any;
  songs: Song[];
  playlist?: { index: number; data: Playlist };
}> = ({ onClick, songs, playlist }) => {
  const [playlistChanged, setPlaylistChanged] = useState(false);

  useEffect(() => {
    var playerSongs = sortBy(songs, ["id"]);
    var playlistSongs = sortBy(playlist?.data.songs, ["id"]);

    if (playerSongs.length === playlistSongs.length) {
      setPlaylistChanged(false);

      for (var i = 0; i < playerSongs.length; i++) {
        if (playerSongs[i].id !== playlistSongs[i].id) {
          setPlaylistChanged(true);
          break;
        }
      }
    } else {
      setPlaylistChanged(true);
    }
  }, [songs, playlist]);

  return (
    <div className="PlayerPlaylistHeader">
      <ButtonSave onClick={onClick} />
      <h1>
        {playlist ? playlist.data.title : "Untitled Playlist"}
        {playlistChanged ? <span className="new"></span> : null}
      </h1>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songs: state.player.songs,
    playlist: state.player.playlist,
    setting: state.player.setting,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  setPopupMenu: bindActionCreators(setPopupMenu, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPlaylist);
