import React, { useState } from "react";
import "./SongListItem.scss";
import { Song } from "types/Song";
import { useHistory } from "react-router";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { playSong, addToNowPlaying } from "redux/actions/player";
import Tooltip from "components/Tooltip/Tooltip";
import { ButtonLike, ButtonOption } from "components/Buttons/Buttons";

type Props = PassingProps & DispatchProps;

interface PassingProps {
  song: Song;
}
interface DispatchProps {
  startPlaySong: (song: Song) => any;
  addToNowPlaying: (song: Song) => any;
}

export interface StateSongListItem {
  tooltipShown: boolean;
  song: Song;
}

const SongListItem: React.FC<Props> = ({
  song,
  startPlaySong,
  addToNowPlaying,
}) => {
  const clickSongListItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    startPlaySong(song);
  };

  const clickButtonOption = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setState({
      ...state,
      tooltipShown: true,
    });
  };

  const dismissTooltip = () => {
    setState({
      ...state,
      tooltipShown: false,
    });
  };

  const clickTooltipItem = (index: number) => {
    switch (index) {
      case 1:
        console.log("CLIKTULTIP");
        addToNowPlaying(state.song);
        break;
    }
  };

  const [state, setState] = useState<StateSongListItem>({
    tooltipShown: false,
    song: song,
  });

  return (
    <div className="SongListItem">
      {state.tooltipShown ? (
        <Tooltip
          dismissTooltip={dismissTooltip}
          clickTooltipItem={clickTooltipItem}
        />
      ) : (
        ""
      )}

      <div className="song" onClick={clickSongListItem}>
        <img src={song.thumbnails?.default} alt="Thumbnail Image" />
        <div className="info">
          <h1>{song.title}</h1>
          <h2>{song.channel}</h2>
        </div>
      </div>
      <div className="option">
        <ButtonLike />
        <ButtonOption onClick={clickButtonOption} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  startPlaySong: bindActionCreators(playSong, dispatch),
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(null, mapDispatchToProps)(SongListItem);
