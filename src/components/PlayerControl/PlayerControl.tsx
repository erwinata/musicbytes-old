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
  playState: PlayState;
  songPlaying: Song | null;
  shuffle: boolean;
  repeat: Repeat;
  timeCurrent: number;
  timeTotal: number;
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
  playState,
  songPlaying,
  shuffle,
  repeat,
  timeCurrent,
  timeTotal,
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
      <PlayerTitle songPlaying={songPlaying} />
      <PlayerButtonList
        playState={playState}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
        prevSong={prevSong}
        toggleShuffle={toggleShuffle}
        toggleRepeat={toggleRepeat}
        shuffle={shuffle}
        repeat={repeat}
      />
      <PlayerProgress
        timeCurrent={timeCurrent}
        timeTotal={timeTotal}
        seekTo={seekTo}
      />
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
      <ButtonLike />
    </div>
  );
};

interface PlayerButtonListProps {
  playState: PlayState;
  repeat: Repeat;
  shuffle: boolean;
  togglePlaying: () => any;
  nextSong: () => any;
  prevSong: () => any;
  toggleShuffle: () => any;
  toggleRepeat: () => any;
}
const PlayerButtonList: React.FC<PlayerButtonListProps> = ({
  playState,
  repeat,
  shuffle,
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
        shuffle={shuffle}
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
        repeat={repeat}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playState: state.player.playState,
    songPlaying: state.player.songPlaying,
    shuffle: state.player.shuffle,
    repeat: state.player.repeat,
    timeCurrent: state.player.timeCurrent,
    timeTotal: state.player.timeTotal,
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
