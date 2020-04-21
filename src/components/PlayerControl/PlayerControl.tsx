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
import { togglePlaying, seekTo } from "redux/actions/player";
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
}

const PlayerControl: React.FC<Props> = ({
  playState,
  songPlaying,
  shuffle,
  repeat,
  timeCurrent,
  timeTotal,
  togglePlaying,
  seekTo,
}: Props) => {
  return (
    <div className="PlayerControl">
      <PlayerTopButtonList />
      <PlayerTitle songPlaying={songPlaying} />
      <PlayerButtonList playState={playState} togglePlaying={togglePlaying} />
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
  togglePlaying: () => any;
}
const PlayerButtonList: React.FC<PlayerButtonListProps> = ({
  playState: PlayState,
  togglePlaying,
}) => {
  const handleClickPlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    togglePlaying();
    console.log("asdaad");
  };

  return (
    <div className="PlayerButtonList">
      <ButtonShuffle />
      <ButtonPrev />
      <ButtonPlay onClick={handleClickPlay} />
      <ButtonNext />
      <ButtonRepeat />
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
  seekTo: bindActionCreators(seekTo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControl);
