import React, { useState, Dispatch, SetStateAction } from "react";
import "./Tooltip.scss";
import { StateSongListItem } from "components/SongList/SongListItem";
import { AppActions } from "types/actions";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { Song } from "types/Song";
import { addToNowPlaying } from "redux/actions/player";
import { bindActionCreators } from "redux";

type Props = PassingProps & StateProps;
interface StateProps {
  songPlaying: Song | null;
  songs: Song[];
}
interface PassingProps {
  dismissTooltip: () => any;
  clickTooltipItem: (index: number) => any;
}

interface TooltipDataType {
  index: number;
  label: string;
}

const tooltipList: TooltipDataType[] = [
  {
    index: 1,
    label: "Add to Now Playing"
  },
  {
    index: 2,
    label: "Add to Playlist"
  },
  {
    index: 3,
    label: "Like Songs"
  }
];

const Tooltip: React.FC<Props> = ({
  dismissTooltip,
  clickTooltipItem,
  songPlaying,
  songs
}) => {
  return (
    <div className="Tooltip">
      {tooltipList.map(tooltipItem => {
        if (tooltipItem.index == 1 && songs.length == 0) {
          return null;
        }
        return (
          <TooltipItem
            index={tooltipItem.index}
            label={tooltipItem.label}
            dismissTooltip={dismissTooltip}
            clickTooltipItem={clickTooltipItem}
            key={tooltipItem.index}
          />
        );
      })}
    </div>
  );
};

interface TooltipItemProps {
  index: number;
  label: string;
  dismissTooltip: () => any;
  clickTooltipItem: (index: number) => any;
}
const TooltipItem: React.FC<TooltipItemProps> = ({
  index,
  label,
  dismissTooltip,
  clickTooltipItem
}) => {
  return (
    <div
      className="TooltipItem"
      onClick={e => {
        clickTooltipItem(index);
        dismissTooltip();
      }}
    >
      {label}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songPlaying: state.player.songPlaying,
    songs: state.player.songs
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({
  // addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Tooltip);
