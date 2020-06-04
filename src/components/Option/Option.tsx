import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import "./Option.scss";
import { StateSongListItem } from "components/SongList/SongListItem";
import { AllActions } from "redux/types/app";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { Song } from "types/Song";
import { addToNowPlaying, removeFromNowPlaying } from "redux/actions/player";
import { bindActionCreators } from "redux";
import { OptionAction, OptionActionType } from "types/Option";
import { useSpring, animated, config } from "react-spring";
import { setPopupMenu, setOption, setOverlay } from "redux/actions/app";
import { likeSong, removeFromPlaylist } from "redux/actions/library";
import { findIndex } from "lodash";
import { PopupMenuType } from "types/PopupMenuType";
import { useMeasure } from "react-use";
import { XY } from "types/XY";
import { Corner } from "types/Corner";
import { Playlist } from "types/Playlist";

type Props = PassingProps & StateProps & DispatchProps;
interface PassingProps {
  // dismissOption: () => any;
  // optionList: OptionActionType[];
  // optionState: any;
}
interface StateProps {
  optionState: {
    show: boolean;
    item?: any;
    optionList?: OptionActionType[];
    position?: XY;
  };
  popupState: {
    menuState: PopupMenuType;
  };
  songs?: { list: Song[]; playing: Song };
  collection: Song[];
  playlistViewing?: Playlist;
}
interface DispatchProps {
  setOverlay: (
    show: boolean,
    dismissOption?: () => any,
    transparent?: boolean
  ) => any;
  setOption: (
    show: boolean,
    item?: any,
    optionList?: OptionActionType[],
    position?: XY
  ) => any;

  addToNowPlaying: (song: Song) => any;
  setPopupMenu: (menuState: PopupMenuType, songAdding: Song) => any;
  likeSong: (song: Song) => any;
  removeFromNowPlaying: (song: Song) => any;
  removeFromPlaylist: (playlist: Playlist, song: Song) => any;
}

const Option: React.FC<Props> = ({
  optionState,
  popupState,
  songs,
  collection,
  playlistViewing,
  setOverlay,
  setOption,
  addToNowPlaying,
  setPopupMenu,
  likeSong,
  removeFromNowPlaying,
  removeFromPlaylist,
}) => {
  const optionActions: OptionAction[] = [
    {
      type: OptionActionType.ADD_TO_NOW_PLAYING,
      label: "Add to Now Playing",
      action: (item: Song) => {
        addToNowPlaying(item);
      },
    },
    {
      type: OptionActionType.ADD_TO_PLAYLIST,
      label: "Add to Playlist",
      action: (item: Song) => {
        setPopupMenu(PopupMenuType.ADDING_SONG_TO_PLAYLIST, item);
      },
    },
    {
      type: OptionActionType.LIKE_SONG,
      label: "Like Song",
      action: (item: Song) => {
        likeSong(item);
      },
    },
    {
      type: OptionActionType.REMOVE_FROM_NOW_PLAYING,
      label: "Remove Song",
      action: (item: Song) => {
        removeFromNowPlaying(item);
      },
    },
    {
      type: OptionActionType.REMOVE_FROM_PLAYLIST,
      label: "Remove Song from Playlist",
      action: (item: Song) => {
        removeFromPlaylist(playlistViewing!, item);
      },
    },
  ];

  const [optionStyleState, setOptionStyleState] = useState({
    position: {
      top: -1000,
      left: -1000,
    },
    flip: {
      horizontal: false,
      vertical: false,
    },
    borderRadius: "0px 0px 0px 0px",
  });
  const [contentHeight, setContentHeight] = useState(0);
  const [ref, { width, height }] = useMeasure();

  const dismissOption = () => {
    setOption(false);
  };

  useEffect(() => {
    setContentHeight(height + 0);
  }, [height]);

  useEffect(() => {
    if (popupState.menuState === PopupMenuType.NONE) {
      setOverlay(optionState.show, dismissOption, true);
    }
  }, [optionState.show]);

  useEffect(() => {
    var top = -1000;
    var left = -1000;
    var flipVertical = false;
    var flipHorizontal = false;
    var borderRadius = "10px 10px 10px 10px";

    if (optionState.show) {
      console.log("---------------");

      if (optionState.position?.y) {
        top = optionState.position!.y;
      }

      if (optionState.position?.x) {
        left = optionState.position!.x;
      }

      if (optionState.position!.y > window.innerHeight * 0.65) {
        flipVertical = true;
      }
      if (optionState.position!.x > window.innerWidth * 0.65) {
        flipHorizontal = true;
      }
    }
    setOptionStyleState({
      position: { top: top, left: left },
      flip: {
        horizontal: flipHorizontal,
        vertical: flipVertical,
      },
      borderRadius: borderRadius,
    });
  }, [optionState.position]);

  const style = {
    container: useSpring({
      to: {
        opacity: optionState.show ? 1 : 0,
        borderRadius: optionStyleState.borderRadius,
        transform: optionState.show ? "scale(1,1)" : "scale(0.9,0.975)",
      },
      config: config.stiff,
    }),
    option: {
      left: optionStyleState.flip.horizontal
        ? optionStyleState.position.left - width
        : optionStyleState.position.left,
      top: optionStyleState.flip.vertical
        ? optionStyleState.position.top - height - 20
        : optionStyleState.position.top,
    },
    width: {
      width: optionState.show ? "auto" : "50vw",
    },
  };

  return (
    <div className="Option" style={style.option}>
      <animated.div className="container" style={style.container}>
        <div ref={ref} style={style.width}>
          {optionState.optionList?.map((optionListItem, index) => {
            if (
              optionListItem == OptionActionType.ADD_TO_NOW_PLAYING &&
              songs?.list.length == 0
            ) {
              return null;
            }
            var optionItemDataIndex = findIndex(
              optionActions,
              (el) => el.type == optionListItem
            );
            var optionItemData = optionActions[optionItemDataIndex];

            if (optionListItem == OptionActionType.LIKE_SONG) {
              var songIndexIsExist = findIndex(
                collection,
                (el) => el.id == optionState.item.id
              );
              if (songIndexIsExist > -1) {
                optionItemData.label = "Unlike Song";
              }
            }

            return (
              <OptionItem
                index={index}
                label={optionItemData.label}
                dismissOption={dismissOption}
                clickOptionItem={optionItemData.action}
                songSelected={optionState.item}
                key={index}
              />
            );
          })}
        </div>
      </animated.div>
    </div>
  );
};

interface OptionItemProps {
  index: number;
  label: string;
  dismissOption: () => any;
  clickOptionItem: (song: Song) => any;
  songSelected: Song;
}
const OptionItem: React.FC<OptionItemProps> = ({
  index,
  label,
  dismissOption,
  clickOptionItem,
  songSelected,
}) => {
  return (
    <div
      className="OptionItem"
      onClick={() => {
        clickOptionItem(songSelected);
        dismissOption();
      }}
    >
      {label}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    optionState: state.app.optionState,
    popupState: state.app.popupState,
    songs: state.player.songs,
    collection: state.library.collection,
    playlistViewing: state.app.playlistViewing,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  setOption: bindActionCreators(setOption, dispatch),
  setOverlay: bindActionCreators(setOverlay, dispatch),
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
  setPopupMenu: bindActionCreators(setPopupMenu, dispatch),
  likeSong: bindActionCreators(likeSong, dispatch),
  removeFromNowPlaying: bindActionCreators(removeFromNowPlaying, dispatch),
  removeFromPlaylist: bindActionCreators(removeFromPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Option);
