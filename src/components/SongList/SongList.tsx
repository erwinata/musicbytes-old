import React from "react";
import "./SongList.scss";
import SongListItem from "./SongListItem";
import { Song } from "types/Song";
import { useTransition, animated, SpringValue, config } from "react-spring";

interface Props {
  songs: Song[];
  resetPlaylist: boolean;
}

export const SongList: React.FC<Props> = ({ songs, resetPlaylist }: Props) => {
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

  return (
    <div className="SongList">
      {/* {songs.map((song) => (
        <SongListItem song={song} resetPlaylist={resetPlaylist} key={song.id} />
      ))} */}

      {/* {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <SongListItem
            song={item}
            resetPlaylist={resetPlaylist}
            key={item.id}
          />
        </animated.div>
      ))} */}

      {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
        <animated.div
          key={key}
          style={{
            ...rest,
            transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
          }}
        >
          <SongListItem
            song={item}
            resetPlaylist={resetPlaylist}
            key={item.id}
          />
        </animated.div>
      ))}
    </div>
  );
};
