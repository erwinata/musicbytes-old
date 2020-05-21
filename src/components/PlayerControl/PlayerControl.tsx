import React from "react";
import "./PlayerControl.scss";
import {
  ButtonLike,
  ButtonNext,
  ButtonPlay,
  ButtonPrev,
  ButtonRepeat,
  ButtonShuffle,
  ButtonVideo,
} from "components/Buttons/Buttons";
import PlayerProgress from "components/PlayerControl/PlayerProgress";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import {
  togglePlaying,
  seekTo,
  nextSong,
  prevSong,
  toggleShuffle,
  toggleRepeat,
} from "redux/actions/player";
import { PlayState } from "types/PlayState";

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
      <PlayerTitle songPlaying={songs!.playing} />
      <PlayerButtonList
        playState={playerState.playState}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
        prevSong={prevSong}
        toggleShuffle={toggleShuffle}
        toggleRepeat={toggleRepeat}
        setting={setting}
      />
      <PlayerProgress time={time} seekTo={seekTo} />
    </div>
  );
};

interface PlayerTitleProps {
  songPlaying: Song | null;
}
const PlayerTitle: React.FC<PlayerTitleProps> = ({
  songPlaying,
}: PlayerTitleProps) => {
  return (
    <div className="PlayerTitle">
      <h1>{songPlaying?.title}</h1>
      <h2>{songPlaying?.channel}</h2>
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
  togglePlaying: () => any;
  nextSong: () => any;
  prevSong: () => any;
  toggleShuffle: () => any;
  toggleRepeat: () => any;
}
const PlayerButtonList: React.FC<PlayerButtonListProps> = ({
  playState,
  setting,
  togglePlaying,
  nextSong,
  prevSong,
  toggleShuffle,
  toggleRepeat,
}) => {
  const handleClickPlay = () => {
    togglePlaying();
  };

  const handleClickNext = () => {
    nextSong();
  };

  const handleClickPrev = () => {
    prevSong();
  };

  const handleClickShuffle = () => {
    toggleShuffle();
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
          toggleRepeat();
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
