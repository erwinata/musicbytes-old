import { ButtonSave } from "components/Buttons/Buttons";
import SongList from "components/SongList/SongList";
import { sortBy } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setPopupMenu } from "redux/actions/app";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { OptionActionType } from "types/Option";
import { Playlist } from "types/Playlist";
import { PopupMenuType } from "types/PopupMenuType";
import { Repeat } from "types/Repeat";
import { Song } from "types/Song";
import "./PlayerPlaylist.scss";

type Props = PassingProps & StateProps & DispatchProps;
interface PassingProps {}
interface StateProps {
  songs?: { list: Song[]; playing: Song };
  playlist?: Playlist;
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
    OptionActionType.REMOVE_FROM_NOW_PLAYING,
  ];

  const handleClickButtonSave = () => {
    setPopupMenu(PopupMenuType.PLAYLIST_SAVING);
  };

  return (
    <div className="PlayerPlaylist">
      <PlayerPlaylistHeader
        onClick={handleClickButtonSave}
        songs={songs ? songs.list : []}
        playlist={playlist}
      />
      <SongList
        songs={songs ? songs.list : []}
        optionList={optionList}
        resetPlaylist={false}
        textNodata="Try to play songs :)"
      />
    </div>
  );
};

const PlayerPlaylistHeader: React.FC<{
  onClick: any;
  songs: Song[];
  playlist?: Playlist;
}> = ({ onClick, songs, playlist }) => {
  const [playlistChanged, setPlaylistChanged] = useState(false);

  useEffect(() => {
    var playerSongs = sortBy(songs, ["id"]);
    var playlistSongs = sortBy(playlist?.songs, ["id"]);

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
      {songs.length > 0 ? <ButtonSave onClick={onClick} /> : null}
      <h1>
        {songs.length > 0
          ? playlist
            ? playlist.title
            : "Untitled Playlist"
          : ""}
        {songs.length > 0 ? (
          playlistChanged ? (
            <span className="new"></span>
          ) : null
        ) : null}
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
