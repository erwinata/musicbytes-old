import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Buttons.scss";
import { useSpring, animated, config } from "react-spring";
import { Repeat } from "types/Repeat";
import { PlayState } from "types/PlayState";

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
      <img src="/res/video.svg" alt="Video" />
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
        <img src="/res/like-active.svg" alt="Like" />
      ) : (
        <img src="/res/like.svg" alt="Like" />
      )}
    </div>
  );
};

export const ButtonOption: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="Button ButtonOption" onClick={onClick}>
      <img src="/res/option.svg" alt="Option" />
    </div>
  );
};

export const ButtonPlay: React.FC<{ onClick: any; playState: PlayState }> = ({
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
        onClick();
      }}
      style={animation}
    >
      {playState == PlayState.PLAYING ||
      playState == PlayState.BUFFERING ||
      playState == PlayState.CUED ? (
        <img src="/res/pause.svg" alt="Pause" />
      ) : (
        <img src="/res/play.svg" alt="Play" />
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
      <img src="/res/prev.svg" alt="Prev" />
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
      <img src="/res/next.svg" alt="Next" />
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
        <img src="/res/shuffle-active.svg" alt="Shuffle" />
      ) : (
        <img src="/res/shuffle.svg" alt="Shuffle" />
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
        <img src="/res/repeat-one.svg" alt="Shuffle" />
      ) : repeat == Repeat.REPEAT_ALL ? (
        <img src="/res/repeat-all.svg" alt="Shuffle" />
      ) : (
        <img src="/res/repeat.svg" alt="Shuffle" />
      )}
    </animated.div>
  );
};

export const ButtonSave = () => {
  return (
    <div className="Button ButtonSave">
      <img src="/res/save.svg" alt="Save Playlist" />
    </div>
  );
};

export const ButtonClose: React.FC<any> = ({ onClick }: any) => {
  return (
    <div className="Button ButtonClose" onClick={onClick}>
      <img src="/res/close.svg" alt="Close" />
    </div>
  );
};
