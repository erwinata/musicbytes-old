import React, { useState, useEffect } from "react";
import "./SongList.scss";
import SongListItem from "./SongListItem";
import { Song } from "types/Song";
import { useTransition, animated, config } from "react-spring";
import { OptionAction, OptionActionType } from "types/Option";
import Option from "components/Option/Option";
import { AppState } from "redux/store/configureStore";
import { connect } from "react-redux";
import { findIndex } from "lodash";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { setOverlay, setOption } from "redux/actions/app";
import { XY } from "types/XY";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  songs: Song[];
  resetPlaylist: boolean;
  optionList: OptionActionType[];
  loadMore?: (pageNumber: number) => any;
}
interface StateProps {
  collection: Song[];
}
interface DispatchProps {
  setOption: (
    show: boolean,
    item?: any,
    optionList?: OptionActionType[],
    position?: XY
  ) => any;
}

const SongList: React.FC<Props> = ({
  songs,
  optionList,
  resetPlaylist,
  collection,
  loadMore,
  setOption,
}: Props) => {
  const [contentHeight, setContentHeight] = useState("0px");
  const [itemHeight, setItemHeight] = useState(50);

  const [ref, { height }] = useMeasure();

  useEffect(() => {
    setItemHeight(height);
    setContentHeight(`${height * songs.length}px`);
  }, [height, songs]);

  const transitions = useTransition(
    songs.map((data, i) => ({ ...data, y: i * itemHeight, x: 0 })),
    (d) => d.id,
    {
      from: {
        position: "absolute" as "absolute",
        opacity: 0,
        marginLeft: "0%",
      },
      leave: { height: 0, opacity: 0, marginLeft: "25%" },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
      config: config.stiff,
    }
  );

  const [optionState, setOptionState] = useState<{
    index: number;
    song?: Song;
  }>({
    index: -1,
    song: undefined,
  });

  const dismissOption = () => {
    setOption(false);
  };

  const loadMoreFunction = (pageNumber: number) => {
    loadMore!(pageNumber);
  };

  const clickButtonOption = (index: number, song: Song, event: any) => {
    setOptionState({
      index,
      song,
    });

    setOption(true, songs[index], optionList, {
      x: event.pageX,
      y: event.pageY,
    });
  };

  return (
    <div className="SongList" style={{ height: contentHeight }}>
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => {
        var like =
          findIndex(collection, (el) => el.id == item.id) !== -1 ? true : false;
        return (
          <animated.div
            key={key}
            style={{
              ...rest,
              width: "100%",
              transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
            }}
          >
            <div className="SongListItemWrapper" ref={ref}>
              <SongListItem
                index={index}
                song={item}
                resetPlaylist={resetPlaylist}
                clickButtonOption={clickButtonOption}
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

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  setOption: bindActionCreators(setOption, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
