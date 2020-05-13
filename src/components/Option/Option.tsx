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
import { OptionItemData } from "types/Option";
import { useSpring, animated, config } from "react-spring";

type Props = PassingProps & StateProps;
interface StateProps {
  songPlaying: Song | null;
  songs: Song[];
}
interface PassingProps {
  dismissOption: () => any;
  clickOptionItem: (index: number) => any;
  optionList: OptionItemData[];
  optionState: any;
}

// interface TooltipDataType {
//   index: number;
//   label: string;
// }

// const tooltipList: TooltipDataType[] = [
//   {
//     index: 1,
//     label: "Add to Now Playing",
//   },
//   {
//     index: 2,
//     label: "Add to Playlist",
//   },
//   {
//     index: 3,
//     label: "Like Songs",
//   },
// ];

const Option: React.FC<Props> = ({
  dismissOption,
  clickOptionItem,
  optionList,
  optionState,
  songPlaying,
  songs,
}) => {
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
      {optionList.map((optionItem) => {
        if (optionItem.index == 1 && songs.length == 0) {
          return null;
        }
        return (
          <OptionItem
            index={optionItem.index}
            label={optionItem.label}
            dismissOption={dismissOption}
            clickOptionItem={clickOptionItem}
            key={optionItem.index}
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
  clickOptionItem: (index: number) => any;
}
const OptionItem: React.FC<OptionItemProps> = ({
  index,
  label,
  dismissOption,
  clickOptionItem,
}) => {
  return (
    <div
      className="OptionItem"
      onClick={() => {
        clickOptionItem(index);
        dismissOption();
      }}
    >
      {label}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songPlaying: state.player.songPlaying,
    songs: state.player.songs,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  // addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Option);
