import React, { useState, useEffect } from "react";
import "./SongList.scss";
import SongListItem from "./SongListItem";
import { Song } from "types/Song";
import { useTransition, animated, config } from "react-spring";
import { OptionItemData } from "types/Option";
import Option from "components/Option/Option";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { findIndex } from "lodash";
import { useMeasure } from "react-use";

type Props = PassingProps & StateProps;

interface PassingProps {
  songs: Song[];
  resetPlaylist: boolean;
  optionList: OptionItemData[];
}
interface StateProps {
  collection: Song[];
}

const SongList: React.FC<Props> = ({
  songs,
  optionList,
  resetPlaylist,
  collection,
}: Props) => {
  const [contentHeight, setContentHeight] = useState(0);

  const [ref, { height }] = useMeasure();

  useEffect(() => {
    setContentHeight(height);
    console.log("H" + height);
  }, [height]);

  const transitions = useTransition(
    songs.map((data, i) => ({ ...data, y: i * contentHeight, x: 0 })),
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
        optionState={optionState}
      />
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => {
        var like =
          findIndex(collection, (el) => el.id == item.id) !== -1 ? true : false;
        return (
          <animated.div
            key={key}
            style={{
              ...rest,
              transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
            }}
          >
            <div ref={ref}>
              <SongListItem
                index={index}
                song={item}
                resetPlaylist={resetPlaylist}
                setOptionState={setOptionState}
                like={like}
                key={item.id}
              />
            </div>
          </animated.div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    collection: state.library.collection,
  };
};

export default connect(mapStateToProps)(SongList);
