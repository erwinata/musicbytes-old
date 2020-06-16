import { ButtonLike, ButtonOption } from "components/Buttons/Buttons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { likeSong } from "redux/actions/library";
import { addToNowPlaying, playSong, removeSong } from "redux/actions/player";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import { Song } from "types/Song";
import "./SongListItem.scss";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  index: number;
  song: Song;
  resetPlaylist: boolean;
  clickButtonOption: (index: number, song: Song, e: any) => any;
  like: boolean;
}
interface StateProps {
  songs?: {
    list: Song[];
    playing: Song;
  };
}
interface DispatchProps {
  playSong: (song: Song, resetPlaylist: boolean) => any;
  addToNowPlaying: (song: Song) => any;
  removeSong: (song: Song) => any;
  likeSong: (song: Song) => any;
}

export interface StateSongListItem {
  song: Song;
  active: boolean;
}

const SongListItem: React.FC<Props> = ({
  index,
  song,
  resetPlaylist,
  clickButtonOption,
  like,
  songs,
  playSong,
  addToNowPlaying,
  removeSong,
  likeSong,
}) => {
  const [state, setState] = useState<StateSongListItem>({
    song: song,
    active: false,
  });

  useEffect(() => {
    if (songs?.playing) {
      setState({
        ...state,
        active: songs.playing.id == state.song.id,
      });
    } else {
      setState({
        ...state,
        active: false,
      });
    }
  }, [songs?.playing]);

  const classActive = state.active ? "active" : "";

  const clickSongListItem = () => {
    playSong(song, resetPlaylist);
  };

  const clickButtonLike = () => {
    likeSong(song);
  };

  return (
    <div className={`SongListItem ${classActive}`}>
      <div className="song" onClick={clickSongListItem}>
        <div
          className="image"
          style={{ backgroundImage: `url('${song.thumbnails?.default}')` }}
        />
        <div className="info">
          <h1>{song.title}</h1>
          <h2>{song.channel}</h2>
        </div>
      </div>
      <div className="option">
        <ButtonLike like={like} onClick={clickButtonLike} />
        <ButtonOption
          onClick={(e: any) => {
            clickButtonOption(index, song, e);
          }}
        />
      </div>
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
  playSong: bindActionCreators(playSong, dispatch),
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
  removeSong: bindActionCreators(removeSong, dispatch),
  likeSong: bindActionCreators(likeSong, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongListItem);
