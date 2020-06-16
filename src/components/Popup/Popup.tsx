import PlaylistList from "components/PlaylistList/PlaylistList";
import PlaylistNaming from "components/PlaylistNaming/PlaylistNaming";
import PlaylistOption from "components/PlaylistOption/PlaylistOption";
import PopupDialog from "components/PopupDialog/PopupDialog";
import { concat } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setOverlay, setPopupMenu, viewPlaylist } from "redux/actions/app";
import {
  addToPlaylist,
  deletePlaylist,
  newPlaylist,
  savePlaylist,
} from "redux/actions/library";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { res_edit, res_merge, res_save } from "res";
import { Playlist } from "types/Playlist";
import { PopupMenuType } from "types/PopupMenuType";
import { Song } from "types/Song";
import "./Popup.scss";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  popupState: {
    menuState: PopupMenuType;
    songAdding?: Song;
  };
  songs?: { list: Song[]; playing: Song };
  // playlist?: Playlist;
  playlistPlaying?: Playlist;
  playlistViewing?: Playlist;
}
interface DispatchProps {
  setPopupMenu: (menuState: PopupMenuType, songAdding?: Song) => any;
  setOverlay: (
    show: boolean,
    dismissAction?: () => any,
    transparent?: boolean
  ) => any;
  addToPlaylist: (
    playlist: Playlist,
    songs: Song[],
    isMergeTo?: boolean
  ) => any;
  newPlaylist: (title: string, songs: Song[], isMergeTo?: boolean) => any;

  savePlaylist: (playlist: Playlist, songs: Song[]) => any;
  deletePlaylist: (playlist: Playlist) => any;
  viewPlaylist: (playlist: Playlist) => any;
}

const Popup: React.FC<Props> = ({
  popupState,
  songs,
  playlistPlaying,
  playlistViewing,
  setPopupMenu,
  setOverlay,
  addToPlaylist,
  newPlaylist,
  savePlaylist,
  deletePlaylist,
  viewPlaylist,
}) => {
  // console.log(popupState);

  const [popupHeaderText, setPopupHeaderText] = useState("");

  const [contentHeight, setContentHeight] = useState(500);
  const [ref, { height }] = useMeasure();

  const playlistOptionListDefault = [
    {
      icon: res_save,
      label: "Save Playlist",
      action: () => {
        savePlaylist(playlistPlaying!, songs!.list);
        setPopupMenu(PopupMenuType.NONE);
      },
    },
    {
      icon: res_edit,
      label: "Save as New Playlist",
      action: () => {
        setPopupMenu(PopupMenuType.PLAYLIST_SAVING_SAVE_NEW);
      },
    },
    {
      icon: res_merge,
      label: "Merge to Playlist",
      action: () => {
        setPopupMenu(PopupMenuType.PLAYLIST_SAVING_MERGE);
        // mergeToPlaylist(songs!.list, playlist!.index);
      },
    },
  ];

  const [popupDialogState, setPopupDialogState] = useState<{
    show: boolean;
    text: string;
    actionConfirm: any;
    actionCancel: any;
  }>({
    show: false,
    text: "",
    actionConfirm: undefined,
    actionCancel: undefined,
  });

  const [playlistOptionList, setPlaylistOptionList] = useState(
    playlistOptionListDefault
  );

  const closePopup = () => {
    setPopupMenu(PopupMenuType.NONE);
    setPopupHeaderText("");

    setPopupDialogState({
      show: false,
      text: "",
      actionConfirm: undefined,
      actionCancel: undefined,
    });
  };

  useEffect(() => {
    setOverlay(popupState.menuState !== PopupMenuType.NONE, closePopup, false);

    switch (popupState.menuState) {
      case PopupMenuType.ADDING_SONG_TO_PLAYLIST:
        setPopupHeaderText("Add Song to Playlist");
        break;
      case PopupMenuType.PLAYLIST_SAVING:
        setPopupHeaderText("Save Playlist");
        if (playlistPlaying !== undefined) {
          setPlaylistOptionList(
            concat(
              playlistOptionListDefault.slice(0, 1),
              playlistOptionListDefault.slice(2, 3)
            )
          );
        } else {
          setPlaylistOptionList(
            playlistOptionListDefault.slice(1, playlistOptionListDefault.length)
          );
        }
        break;
      case PopupMenuType.PLAYLIST_SAVING_MERGE:
        setPopupHeaderText("Merge to Playlist");
        break;
      case PopupMenuType.PLAYLIST_DELETE_CONFIRMATION:
        setPopupHeaderText("Delete Playlist");
        setPopupDialogState({
          show: true,
          text: "Are you sure to delete this playlist permanently",
          actionConfirm: () => {
            deletePlaylist(playlistViewing!);
            viewPlaylist(undefined!);
            closePopup();
          },
          actionCancel: () => {
            closePopup();
          },
        });
        break;
    }
  }, [popupState]);

  useEffect(() => {
    setContentHeight(height);
  }, [height]);

  const style = {
    popup: {
      top: popupState.menuState !== PopupMenuType.NONE ? "0vh" : "100vh",
    },
    overlay: useSpring({
      opacity: popupState.menuState !== PopupMenuType.NONE ? 1 : 0,
    }),
    content: useSpring({
      height: `${contentHeight + 75}px`,
      display: popupState.menuState !== PopupMenuType.NONE ? "block" : "none",
    }),
    playlistOption: useSpring({
      display:
        popupState.menuState == PopupMenuType.PLAYLIST_SAVING
          ? "block"
          : "none",
    }),
    playlistList: {
      display:
        popupState.menuState == PopupMenuType.ADDING_SONG_TO_PLAYLIST ||
        popupState.menuState == PopupMenuType.PLAYLIST_SAVING_MERGE
          ? "block"
          : "none",
    },
    playlistNaming: {
      display:
        popupState.menuState == PopupMenuType.ADDING_SONG_NEW_PLAYLIST ||
        popupState.menuState == PopupMenuType.PLAYLIST_SAVING_SAVE_NEW
          ? "block"
          : "none",
    },
    popupDialog: {
      display:
        popupState.menuState == PopupMenuType.PLAYLIST_DELETE_CONFIRMATION
          ? "block"
          : "none",
    },
  };

  const handle = {
    clickPlaylist: (playlist: Playlist) => {
      if (popupState.menuState === PopupMenuType.ADDING_SONG_TO_PLAYLIST) {
        addToPlaylist(playlist, [popupState.songAdding!]);
      } else if (popupState.menuState === PopupMenuType.PLAYLIST_SAVING_MERGE) {
        addToPlaylist(playlist, songs!.list, true);
      }

      closePopup();
    },

    clickNewPlaylist: () => {
      setPopupMenu(PopupMenuType.ADDING_SONG_NEW_PLAYLIST);
    },

    clickSaveNewPlaylist: (title: string) => {
      var songsToBeSaved: Song[] = [];
      if (popupState.menuState === PopupMenuType.ADDING_SONG_NEW_PLAYLIST) {
        newPlaylist(title, [popupState.songAdding!]);
      } else if (
        popupState.menuState === PopupMenuType.PLAYLIST_SAVING_SAVE_NEW
      ) {
        newPlaylist(title, songs!.list, true);
      }

      closePopup();
    },
  };

  return (
    <div className="Popup" style={style.popup}>
      <animated.div className="container" style={style.content}>
        <h1>{popupHeaderText}</h1>
        <div className="content" ref={ref}>
          <PlaylistOption
            playlistOptionStyle={style.playlistOption}
            playlistOptionList={playlistOptionList}
          />
          <PlaylistList
            playlistListStyle={style.playlistList}
            onClickPlaylist={handle.clickPlaylist}
            onClickNewPlaylist={handle.clickNewPlaylist}
            popupMenuState={popupState.menuState}
          />
          <PlaylistNaming
            playlistNamingStyle={style.playlistNaming}
            saveNewPlaylist={handle.clickSaveNewPlaylist}
          />
          <PopupDialog
            show={popupDialogState.show}
            text={popupDialogState.text}
            actionCancel={popupDialogState.actionCancel}
            actionConfirm={popupDialogState.actionConfirm}
          />
        </div>
      </animated.div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    popupState: state.app.popupState,
    songs: state.player.songs,
    playlistPlayer: state.player.playlist,
    playlistViewing: state.app.playlistViewing,
    // playlistPlaying: state.library.playlists.slice(
    //   state.player.playlistIndexPlaying,
    //   1
    // )[0],
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  setPopupMenu: bindActionCreators(setPopupMenu, dispatch),
  setOverlay: bindActionCreators(setOverlay, dispatch),
  addToPlaylist: bindActionCreators(addToPlaylist, dispatch),
  newPlaylist: bindActionCreators(newPlaylist, dispatch),

  savePlaylist: bindActionCreators(savePlaylist, dispatch),
  deletePlaylist: bindActionCreators(deletePlaylist, dispatch),
  viewPlaylist: bindActionCreators(viewPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
