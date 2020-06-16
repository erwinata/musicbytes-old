import {
  ButtonNext,
  ButtonPlay,
  ButtonPrev,
  ButtonRepeat,
  ButtonShuffle,
  ButtonVideo,
} from "components/Buttons/Buttons";
import PlayerProgress from "components/PlayerControl/PlayerProgress";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  nextSong,
  prevSong,
  seekTo,
  togglePlaying,
  toggleRepeat,
  toggleShuffle,
} from "redux/actions/player";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import { PlayState } from "types/PlayState";
import { Repeat } from "types/Repeat";
import { Song } from "types/Song";
import "./PlayerControl.scss";

type Props = StateProps & DispatchProps;
interface StateProps {
  playerState: {
    playState: PlayState;
    videoIsRunning: boolean;
  };
  songs?: {
    list: Song[];
    playing: Song;
  };
  setting: {
    shuffle: boolean;
    repeat: Repeat;
  };
  time: {
    current: number;
    total: number;
  };
}
interface DispatchProps {
  togglePlaying: () => any;
  seekTo: (to: number) => any;
  nextSong: () => any;
  prevSong: () => any;
  toggleShuffle: () => any;
  toggleRepeat: () => any;
}

const PlayerControl: React.FC<Props> = ({
  playerState,
  songs,
  setting,
  time,
  togglePlaying,
  nextSong,
  prevSong,
  toggleShuffle,
  toggleRepeat,
  seekTo,
}: Props) => {
  return (
    <div className="PlayerControl">
      <PlayerTopButtonList />
      <PlayerTitle songPlaying={songs?.playing} />
      <PlayerButtonList
        playState={playerState.playState}
        setting={setting}
        songs={songs ? songs.list : []}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
        prevSong={prevSong}
        toggleShuffle={toggleShuffle}
        toggleRepeat={toggleRepeat}
      />
      <PlayerProgress time={time} seekTo={seekTo} />
    </div>
  );
};

interface PlayerTitleProps {
  songPlaying?: Song;
}
const PlayerTitle: React.FC<PlayerTitleProps> = ({
  songPlaying,
}: PlayerTitleProps) => {
  return (
    <div className="PlayerTitle">
      {songPlaying ? (
        <>
          <h1>{songPlaying?.title}</h1>
          <h2>{songPlaying?.channel}</h2>
        </>
      ) : (
        <>
          <h1> </h1>
          <h2> </h2>
        </>
      )}
    </div>
  );
};

const PlayerTopButtonList = () => {
  return (
    <div className="PlayerTopButtonList">
      <ButtonVideo />
      {/* <ButtonLike like={true} /> */}
    </div>
  );
};

interface PlayerButtonListProps {
  playState: PlayState;
  setting: {
    repeat: Repeat;
    shuffle: boolean;
  };
  songs: Song[];
  togglePlaying: () => any;
  nextSong: () => any;
  prevSong: () => any;
  toggleShuffle: () => any;
  toggleRepeat: () => any;
}
const PlayerButtonList: React.FC<PlayerButtonListProps> = ({
  playState,
  setting,
  songs,
  togglePlaying,
  nextSong,
  prevSong,
  toggleShuffle,
  toggleRepeat,
}) => {
  const handleClickPlay = () => {
    if (songs.length > 0) togglePlaying();
  };

  const handleClickNext = () => {
    if (songs.length > 0) nextSong();
  };

  const handleClickPrev = () => {
    if (songs.length > 0) prevSong();
  };

  const handleClickShuffle = () => {
    if (songs.length > 0) toggleShuffle();
  };

  const handleClickRepeat = () => {
    if (songs.length > 0) toggleRepeat();
  };

  return (
    <div className="PlayerButtonList">
      <ButtonShuffle
        onClick={() => {
          handleClickShuffle();
        }}
        shuffle={setting.shuffle}
      />
      <ButtonPrev
        onClick={() => {
          handleClickPrev();
        }}
      />
      <ButtonPlay
        onClick={() => {
          handleClickPlay();
        }}
        playState={playState}
      />
      <ButtonNext
        onClick={() => {
          handleClickNext();
        }}
      />
      <ButtonRepeat
        onClick={() => {
          handleClickRepeat();
        }}
        repeat={setting.repeat}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playerState: state.player.playerState,
    songs: state.player.songs,
    setting: state.player.setting,
    time: state.player.time,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  togglePlaying: bindActionCreators(togglePlaying, dispatch),
  nextSong: bindActionCreators(nextSong, dispatch),
  prevSong: bindActionCreators(prevSong, dispatch),
  toggleShuffle: bindActionCreators(toggleShuffle, dispatch),
  toggleRepeat: bindActionCreators(toggleRepeat, dispatch),
  seekTo: bindActionCreators(seekTo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControl);
