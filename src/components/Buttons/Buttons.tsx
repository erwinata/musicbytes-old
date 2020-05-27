import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Buttons.scss";
import { useSpring, animated, config } from "react-spring";
import { Repeat } from "types/Repeat";
import { PlayState } from "types/PlayState";
import {
  res_play,
  res_pause,
  res_video,
  res_like,
  res_like_active,
  res_prev,
  res_next,
  res_option,
  res_repeat,
  res_repeat_all,
  res_repeat_one,
  res_shuffle,
  res_shuffle_active,
  res_save,
  res_close,
} from "res";

export const ButtonCapsuleText: React.FC<{ text: string; onClick: any }> = ({
  text,
  onClick,
}) => {
  return (
    <div className="Button ButtonCapsuleText" onClick={onClick}>
      {text}
    </div>
  );
};

export const ButtonVideo = () => {
  return (
    <div className="Button ButtonVideo">
      <img src={res_video} alt="Video" />
    </div>
  );
};

export const ButtonLike: React.FC<{ like: boolean; onClick: any }> = ({
  like,
  onClick,
}) => {
  return (
    <div
      className="Button ButtonLike"
      onClick={() => {
        onClick();
      }}
    >
      {like ? (
        <img src={res_like_active} alt="Like" />
      ) : (
        <img src={res_like} alt="Like" />
      )}
    </div>
  );
};

export const ButtonOption: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="Button ButtonOption" onClick={onClick}>
      <img src={res_option} alt="Option" />
    </div>
  );
};

export const ButtonPlay: React.FC<{ onClick?: any; playState: PlayState }> = ({
  onClick,
  playState,
}) => {
  const [resetAnimation, setResetAnimation] = useState(false);

  const animation = useSpring({
    to: {
      opacity: 1,
      transform: "scale(1, 1)",
    },
    from: {
      opacity: 0.85,
      transform: "scale(1.25,1.25)",
    },
    reset: resetAnimation,
    config: config.stiff,
  });

  useLayoutEffect(() => {
    setResetAnimation(true);
    setTimeout(() => {
      setResetAnimation(false);
    }, 10);
  }, [playState]);

  return (
    <animated.div
      className="Button ButtonPlay"
      onClick={() => {
        if (onClick) onClick();
      }}
      style={animation}
    >
      {playState == PlayState.PLAYING ||
      playState == PlayState.BUFFERING ||
      playState == PlayState.CUED ? (
        <img src={res_pause} alt="Pause" />
      ) : (
        <img src={res_play} alt="Play" />
      )}
    </animated.div>
  );
};
export const ButtonPrev: React.FC<any> = ({ onClick }: any) => {
  const [resetAnimation, setResetAnimation] = useState(false);

  const animation = useSpring({
    to: {
      opacity: 1,
      transform: "scale(1, 1)",
    },
    from: {
      opacity: 0.5,
      transform: "scale(1.75,1.75)",
    },
    reset: resetAnimation,
    config: config.stiff,
  });

  return (
    <animated.div
      className="Button ButtonPrev"
      onClick={() => {
        onClick();
        setResetAnimation(true);
        setTimeout(() => {
          setResetAnimation(false);
        }, 10);
      }}
      style={animation}
    >
      <img src={res_prev} alt="Prev" />
    </animated.div>
  );
};
export const ButtonNext: React.FC<any> = ({ onClick }: any) => {
  const [resetAnimation, setResetAnimation] = useState(false);

  const animation = useSpring({
    to: {
      opacity: 1,
      transform: "scale(1, 1)",
    },
    from: {
      opacity: 0.5,
      transform: "scale(1.75,1.75)",
    },
    reset: resetAnimation,
    config: config.stiff,
  });

  return (
    <animated.div
      className="Button ButtonNext"
      onClick={() => {
        onClick();
        setResetAnimation(true);
        setTimeout(() => {
          setResetAnimation(false);
        }, 10);
      }}
      style={animation}
    >
      <img src={res_next} alt="Next" />
    </animated.div>
  );
};

export const ButtonShuffle: React.FC<{ onClick: any; shuffle: boolean }> = ({
  onClick,
  shuffle,
}) => {
  const [resetAnimation, setResetAnimation] = useState(false);

  const animation = useSpring({
    to: {
      opacity: 1,
      transform: "scale(1, 1)",
    },
    from: {
      opacity: 0.5,
      transform: "scale(2,2)",
    },
    reset: resetAnimation,
    config: config.stiff,
  });

  useLayoutEffect(() => {
    setResetAnimation(true);
    setTimeout(() => {
      setResetAnimation(false);
    }, 10);
  }, [shuffle]);

  return (
    <animated.div
      className="Button ButtonShuffle"
      onClick={() => {
        onClick();
      }}
      style={animation}
    >
      {shuffle ? (
        <img src={res_shuffle_active} alt="Shuffle" />
      ) : (
        <img src={res_shuffle} alt="Shuffle" />
      )}
    </animated.div>
  );
};

export const ButtonRepeat: React.FC<{ onClick: any; repeat: Repeat }> = ({
  onClick,
  repeat,
}) => {
  const [resetAnimation, setResetAnimation] = useState(false);

  const animation = useSpring({
    to: {
      opacity: 1,
      transform: "scale(1, 1)",
    },
    from: {
      opacity: 0.5,
      transform: "scale(1.75,1.75)",
    },
    reset: resetAnimation,
    config: config.stiff,
  });

  useLayoutEffect(() => {
    setResetAnimation(true);
    setTimeout(() => {
      setResetAnimation(false);
    }, 10);
  }, [repeat]);

  return (
    <animated.div
      className="Button ButtonShuffle"
      onClick={() => {
        onClick();
      }}
      style={animation}
    >
      {repeat == Repeat.REPEAT_ONE ? (
        <img src={res_repeat_one} alt="Repeat One" />
      ) : repeat == Repeat.REPEAT_ALL ? (
        <img src={res_repeat_all} alt="Repeat All" />
      ) : (
        <img src={res_repeat} alt="No Repeat" />
      )}
    </animated.div>
  );
};

export const ButtonSave: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="Button ButtonSave" onClick={onClick}>
      <img src={res_save} alt="Save Playlist" />
    </div>
  );
};

export const ButtonClose: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="Button ButtonClose" onClick={onClick}>
      <img src={res_close} alt="Close" />
    </div>
  );
};
