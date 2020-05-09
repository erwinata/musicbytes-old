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
import Option from "components/Option/Option";
import { ButtonLike, ButtonOption } from "components/Buttons/Buttons";
import { OptionItemData } from "types/Option";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  index: number;
  song: Song;
  resetPlaylist: boolean;
  setOptionState: any;
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
  song: Song;
  active: boolean;
}

const SongListItem: React.FC<Props> = ({
  index,
  song,
  resetPlaylist,
  setOptionState,
  songPlaying,
  playSong,
  addToNowPlaying,
  removeSong,
}) => {
  const clickSongListItem = () => {
    playSong(song, resetPlaylist);
  };

  const clickButtonOption = () => {
    setOptionState({
      index: index,
    });
    // removeSong(song);
  };

  const [state, setState] = useState<StateSongListItem>({
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
