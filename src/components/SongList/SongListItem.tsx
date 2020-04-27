import React, { useState, useEffect } from "react";
import "./SongListItem.scss";
import { Song } from "types/Song";
import { useHistory } from "react-router";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { playSong, addToNowPlaying, removeSong } from "redux/actions/player";
import Tooltip from "components/Tooltip/Tooltip";
import { ButtonLike, ButtonOption } from "components/Buttons/Buttons";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  song: Song;
  resetPlaylist: boolean;
}
interface StateProps {
  songPlaying: Song | null;
}
interface DispatchProps {
  playSong: (song: Song, resetPlaylist: boolean) => any;
  addToNowPlaying: (song: Song) => any;
  removeSong: (song: Song) => any;
}

export interface StateSongListItem {
  tooltipShown: boolean;
  song: Song;
  active: boolean;
}

const SongListItem: React.FC<Props> = ({
  song,
  resetPlaylist,
  songPlaying,
  playSong,
  addToNowPlaying,
  removeSong,
}) => {
  const clickSongListItem = () => {
    playSong(song, resetPlaylist);
  };

  const clickButtonOption = () => {
    // setState({
    //   ...state,
    //   tooltipShown: true,
    // });
    removeSong(song);
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
    active: false,
  });

  useEffect(() => {
    if (songPlaying !== null) {
      setState({
        ...state,
        active: songPlaying.id == state.song.id,
      });
    } else {
      setState({
        ...state,
        active: false,
      });
    }
  }, [songPlaying]);

  const classActive = state.active ? "active" : "";

  return (
    <div className={`SongListItem ${classActive}`}>
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

const mapStateToProps = (state: AppState) => {
  return {
    songPlaying: state.player.songPlaying,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  playSong: bindActionCreators(playSong, dispatch),
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
  removeSong: bindActionCreators(removeSong, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongListItem);
