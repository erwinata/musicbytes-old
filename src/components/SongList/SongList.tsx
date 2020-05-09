import React, { useState } from "react";
import "./SongList.scss";
import SongListItem from "./SongListItem";
import { Song } from "types/Song";
import {
  useTransition,
  animated,
  SpringValue,
  config,
  useSpring,
} from "react-spring";
import { OptionItemData } from "types/Option";
import Option from "components/Option/Option";

interface Props {
  songs: Song[];
  resetPlaylist: boolean;
  optionList: OptionItemData[];
}

export const SongList: React.FC<Props> = ({
  songs,
  optionList,
  resetPlaylist,
}: Props) => {
  // const transitions = useTransition(songs, (item) => item.order, {
  //   initial: { transform: "translate3d(0%, 0%,0)" },
  //   from: { transform: "translate3d(0%,-100%,0)" },
  //   enter: { transform: "translate3d(0%, 0%,0)" },
  //   leave: { transform: "translate3d(100%,0%,0)" },
  // });

  const height = 50;
  // const position: SpringValue<PositionProperty> = "absolute";

  const transitions = useTransition(
    songs.map((data, i) => ({ ...data, y: i * height, x: 0 })),
    (d) => d.id,
    {
      from: {
        position: "absolute" as "absolute",
        opacity: 0,
        marginLeft: "0%",
      },
      leave: { height: 0, opacity: 0, marginLeft: "100%" },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
      config: config.stiff,
    }
  );

  const [optionState, setOptionState] = useState({
    index: -1,
  });

  const optionStyle = useSpring({
    to: {
      opacity: optionState.index == -1 ? 0 : 1,
      height: optionState.index == -1 ? 0 : "auto",
      top: optionState.index == -1 ? 0 : optionState.index * 50,
    },
    config: config.stiff,
  });

  const dismissOption = () => {
    setOptionState({
      index: -1,
    });
  };

  const clickOptionItem = (index: number) => {
    console.log("lewat");
    optionList[index].action(songs[optionState.index]);
  };

  return (
    <div className="SongList">
      <Option
        dismissOption={dismissOption}
        clickOptionItem={clickOptionItem}
        optionList={optionList}
        style={optionStyle}
      />
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
        <animated.div
          key={key}
          style={{
            ...rest,
            transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
          }}
        >
          <SongListItem
            index={index}
            song={item}
            resetPlaylist={resetPlaylist}
            setOptionState={setOptionState}
            key={item.id}
          />
        </animated.div>
      ))}
    </div>
  );
};
