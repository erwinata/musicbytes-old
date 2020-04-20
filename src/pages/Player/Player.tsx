import React, { useEffect, useState } from "react";
import { Navbar } from "components/Navbar/Navbar";
import PlayerThumbnail from "components/PlayerThumbnail/PlayerThumbnail";
import PlayerControl from "components/PlayerControl/PlayerControl";
import PlayerPlaylist from "components/PlayerPlaylist/PlayerPlaylist";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Song } from "types/Song";
import { Repeat } from "types/Repeat";
import { durationIncrement, togglePlaying } from "redux/actions/player";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { PlayState } from "types/PlayState";
import "./Player.scss";

type Props = StateProps & DispatchProps;
interface StateProps {
  songs: Song[];
  songPlaying: Song | null;
  playState: PlayState;
  shuffle: boolean;
  repeat: Repeat;
  timeCurrent: number;
  timeTotal: number;
}
interface DispatchProps {
  durationIncrement: () => any;
}

interface StatePlayer {
  durationInterval: any;
}
const Player: React.FC<Props> = ({
  songs,
  songPlaying,
  playState,
  shuffle,
  repeat,
  timeCurrent,
  timeTotal,
  durationIncrement
}: Props) => {
  const [state, setState] = useState<StatePlayer>({
    durationInterval: undefined
  });

  useEffect(() => {
    if (playState == PlayState.PLAYING) {
      var interval = setInterval(durationIncrement, 1000);
      setState({
        ...state,
        durationInterval: interval
      });
    } else {
      clearInterval(state.durationInterval);
    }
  }, [playState]);

  return (
    <div className="Player">
      <PlayerThumbnail />
      <PlayerControl />
      <PlayerPlaylist />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songPlaying: state.player.songPlaying,
    songs: state.player.songs,
    playState: state.player.playState,
    shuffle: state.player.shuffle,
    repeat: state.player.repeat,
    timeCurrent: state.player.timeCurrent,
    timeTotal: state.player.timeTotal
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({
  durationIncrement: bindActionCreators(durationIncrement, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
