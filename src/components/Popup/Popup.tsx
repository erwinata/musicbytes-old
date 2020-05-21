import React, { useState, useEffect } from "react";
import "./Popup.scss";
import PlaylistList from "components/PlaylistList/PlaylistList";
import PlaylistOption from "components/PlaylistOption/PlaylistOption";
import PlaylistNaming from "components/PlaylistNaming/PlaylistNaming";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { connect } from "react-redux";
import { Song } from "types/Song";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { showToast, setPopupMenu } from "redux/actions/app";
import {
  addToPlaylist,
  newPlaylist,
  savePlaylist,
} from "redux/actions/library";
import { ToastType } from "types/ToastType";
import { PopupMenuType } from "types/PopupMenuType";
import { Playlist } from "types/Playlist";
import { concat } from "lodash";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  popupState: {
    menuState: PopupMenuType;
    songAdding?: Song;
  };
  songs?: { list: Song[]; playing: Song };
  playlist?: {
    index: number;
    data: Playlist;
  };
  // playlistPlaying?: Playlist;
}
interface DispatchProps {
  setPopupMenu: (menuState: PopupMenuType, songAdding?: Song) => any;
  addToPlaylist: (
    songs: Song[],
    playlistIndex: number,
    isMergeTo?: boolean
  ) => any;
  newPlaylist: (title: string, songs: Song[]) => any;

  savePlaylist: (songs: Song[], playlistIndex: number) => any;
}

const Popup: React.FC<Props> = ({
  popupState,
  songs,
  playlist,
  // playlistPlaying,
  setPopupMenu,
  addToPlaylist,
  newPlaylist,
  savePlaylist,
}) => {
  // console.log(popupState);

  const [popupHeaderText, setPopupHeaderText] = useState("");

  const [contentHeight, setContentHeight] = useState(500);
  const [ref, { height }] = useMeasure();

  const playlistOptionListDefault = [
    {
      icon: "save",
      label: "Save Playlist",
      action: () => {
        savePlaylist(songs!.list, playlist!.index);
        setPopupMenu(PopupMenuType.NONE);
      },
    },
    {
      icon: "edit",
      label: "Save as New Playlist",
      action: () => {
        setPopupMenu(PopupMenuType.PLAYLIST_SAVING_SAVE_NEW);
      },
    },
    {
      icon: "merge",
      label: "Merge to Playlist",
      action: () => {
        setPopupMenu(PopupMenuType.PLAYLIST_SAVING_MERGE);
        // mergeToPlaylist(songs!.list, playlist!.index);
      },
    },
  ];

  const [playlistOptionList, setPlaylistOptionList] = useState(
    playlistOptionListDefault
  );

  const closePopup = () => {
    setPopupMenu(PopupMenuType.NONE);
    setPopupHeaderText("");
  };

  useEffect(() => {
    switch (popupState.menuState) {
      case PopupMenuType.ADDING_SONG_TO_PLAYLIST:
        setPopupHeaderText("Add Song to Playlist");
        break;
      case PopupMenuType.PLAYLIST_SAVING:
        setPopupHeaderText("Save Playlist");
        if (playlist !== undefined) {
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
    }
  }, [popupState]);

  useEffect(() => {
    console.log("HEI");
    console.log(height);
    setContentHeight(height);
  }, [height]);

  // useEffect(() => {
  //   console.log("HEIasd");
  //   console.log(height);
  //   // setContentHeight(height);
  // }, [height]);

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
  };

  const handle = {
    clickPlaylist: (playlistIndex: number) => {
      if (popupState.menuState === PopupMenuType.ADDING_SONG_TO_PLAYLIST) {
        addToPlaylist([popupState.songAdding!], playlistIndex);
      } else if (popupState.menuState === PopupMenuType.PLAYLIST_SAVING_MERGE) {
        addToPlaylist(songs!.list, playlistIndex, true);
      }

      closePopup();
    },

    clickNewPlaylist: () => {
      setPopupMenu(PopupMenuType.ADDING_SONG_NEW_PLAYLIST);
    },

    clickSaveNewPlaylist: (title: string) => {
      var songsToBeSaved: Song[] = [];
      if (popupState.menuState === PopupMenuType.ADDING_SONG_NEW_PLAYLIST)
        songsToBeSaved = [popupState.songAdding!];
      else if (popupState.menuState === PopupMenuType.PLAYLIST_SAVING_SAVE_NEW)
        songsToBeSaved = songs!.list;

      newPlaylist(title, songsToBeSaved);

      closePopup();
    },
  };

  return (
    <div className="Popup" style={style.popup}>
      <animated.div
        className="BlackOverlay"
        style={style.overlay}
        onClick={closePopup}
      ></animated.div>
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
        </div>
      </animated.div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    popupState: state.app.popupState,
    songs: state.player.songs,
    playlist: state.player.playlist,
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
  addToPlaylist: bindActionCreators(addToPlaylist, dispatch),
  newPlaylist: bindActionCreators(newPlaylist, dispatch),

  savePlaylist: bindActionCreators(savePlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
