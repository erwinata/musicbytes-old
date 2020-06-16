import { ButtonNext, ButtonPlay } from "components/Buttons/Buttons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { showToast } from "redux/actions/app";
import { nextSong, showPlayer, togglePlaying } from "redux/actions/player";
import { AppState } from "redux/store/configureStore";
import { AllActions } from "redux/types/app";
import { PlayState } from "types/PlayState";
import { Song } from "types/Song";
import "./MiniPlayer.scss";

type Props = StateProps & DispatchProps;

interface StateProps {
  songs?: {
    list: Song[];
    playing: Song;
  };
  time: {
    current: number;
    total: number;
    seeking: boolean;
  };
  playState: PlayState;
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
}
interface DispatchProps {
  showPlayer: (show: boolean) => any;
  togglePlaying: (state?: PlayState) => any;
  nextSong: () => any;
  showToast: (text: string) => any;
}

const MiniPlayer: React.FC<Props> = ({
  songs,
  time,
  playState,
  deviceInfo,
  showPlayer,
  togglePlaying,
  nextSong,
  showToast,
}) => {
  const [infoRef, infoMeasure] = useMeasure();
  const [titleRef, titleMeasure] = useMeasure();

  const [titleOffset, setTitleOffset] = useState(0);
  const [titleStyleState, setTitleStyleState] = useState({
    reset: false,
    reverse: false,
  });

  const style = {
    title: useSpring({
      to: { left: !titleStyleState.reverse ? -titleOffset : 0 },
      config: { duration: Math.abs(titleOffset - titleMeasure.left) * 100 },
      from: { left: 0 },
      reset: titleStyleState.reset,
      onStart: () => {
        setTitleStyleState({ reset: false, reverse: false });
      },
      onRest: () => {
        setTimeout(() => {
          setTitleStyleState({
            ...titleStyleState,
            reverse: !titleStyleState.reverse,
          });
        }, 1500);
      },
    }),
  };

  useEffect(() => {
    if (titleMeasure.width > infoMeasure.width) {
      setTitleOffset(titleMeasure.width - infoMeasure.width);
    } else {
      setTitleOffset(0);
    }
  }, [titleMeasure.width]);

  useEffect(() => {
    setTitleStyleState({ reset: true, reverse: false });
  }, [songs?.playing]);

  if (!songs || deviceInfo.isLandscape) return null;
  else {
    if (songs!.list.length <= 0) return null;
  }
  return (
    <div className="MiniPlayer">
      <img
        src={songs!.playing.thumbnails?.default}
        className={
          playState !== PlayState.PAUSED && playState !== PlayState.ENDED
            ? "rotate"
            : ""
        }
        alt="Thumbnail Image"
        onClick={() => {
          showPlayer(true);
        }}
      />
      <div
        className="info"
        ref={infoRef}
        onClick={() => {
          showPlayer(true);
        }}
      >
        <animated.h1 ref={titleRef} style={style.title}>
          {songs!.playing.title}
        </animated.h1>
        <h2>{songs!.playing.channel}</h2>
      </div>
      <div className="control">
        <div className="buttonPlayContainer">
          <ButtonPlay
            playState={playState}
            onClick={() => {
              togglePlaying();
            }}
          />
        </div>
        <ButtonNext
          onClick={() => {
            nextSong();
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    songs: state.player.songs,
    time: state.player.time,
    playState: state.player.playerState.playState,
    deviceInfo: state.app.deviceInfo,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  showPlayer: bindActionCreators(showPlayer, dispatch),
  togglePlaying: bindActionCreators(togglePlaying, dispatch),
  nextSong: bindActionCreators(nextSong, dispatch),
  showToast: bindActionCreators(showToast, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
