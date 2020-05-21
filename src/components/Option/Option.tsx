import React, { useState, Dispatch, SetStateAction } from "react";
import "./Option.scss";
import { StateSongListItem } from "components/SongList/SongListItem";
import { AllActions } from "redux/types/app";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { Song } from "types/Song";
import { addToNowPlaying } from "redux/actions/player";
import { bindActionCreators } from "redux";
import { OptionAction, OptionActionType } from "types/Option";
import { useSpring, animated, config } from "react-spring";
import { setPopupMenu } from "redux/actions/app";
import { likeSong } from "redux/actions/library";
import { findIndex } from "lodash";
import { PopupMenuType } from "types/PopupMenuType";

type Props = PassingProps & StateProps & DispatchProps;
interface PassingProps {
  dismissOption: () => any;
  optionList: OptionActionType[];
  optionState: any;
}
interface StateProps {
  songs?: { list: Song[]; playing: Song };
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
  setPopupMenu: (menuState: PopupMenuType, songAdding: Song) => any;
  likeSong: (song: Song) => any;
}

const Option: React.FC<Props> = ({
  dismissOption,
  optionList,
  optionState,
  songs,
  addToNowPlaying,
  setPopupMenu,
  likeSong,
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
      label: "Like Songs",
      action: (item: Song) => {
        likeSong(item);
      },
    },
  ];

  const optionStyle = useSpring({
    to: {
      opacity: optionState.index == -1 ? 0 : 1,
      height: optionState.index == -1 ? 0 : "auto",
      top: optionState.index == -1 ? 0 : optionState.index * 50,
      width: optionState.index == -1 ? 0 : "auto",
    },
    config: config.stiff,
  });

  return (
    <animated.div className="Option" style={optionStyle}>
      {optionList.map((optionListItem, index) => {
        if (
          optionListItem == OptionActionType.ADD_TO_NOW_PLAYING &&
          songs!.list.length == 0
        ) {
          return null;
        }
        var optionItemDataIndex = findIndex(
          optionActions,
          (el) => el.type == optionListItem
        );
        var optionItemData = optionActions[optionItemDataIndex];
        return (
          <OptionItem
            index={index}
            label={optionItemData.label}
            dismissOption={dismissOption}
            clickOptionItem={optionItemData.action}
            songSelected={optionState.song}
            key={index}
          />
        );
      })}
    </animated.div>
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
    songs: state.player.songs,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
  setPopupMenu: bindActionCreators(setPopupMenu, dispatch),
  likeSong: bindActionCreators(likeSong, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Option);
