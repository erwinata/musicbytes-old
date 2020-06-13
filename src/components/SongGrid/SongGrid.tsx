import React, { useEffect } from "react";
import "./SongGrid.scss";
import SongGridItem from "./SongGridItem";
import { Song } from "types/Song";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Playlist } from "types/Playlist";
import { useMeasure } from "react-use";
import { useSpring, animated } from "react-spring";
import { OptionActionType } from "types/Option";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { bindActionCreators } from "redux";
import { setOption } from "redux/actions/app";
import { XY } from "types/XY";
import { find } from "lodash";
import { Loading } from "components/Loading/Loading";
import { LoadingType } from "types/LoadingType";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  items: {
    song?: Song;
    playlist?: Playlist;
  }[];
  optionList: OptionActionType[];
  isLoading?: boolean;
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

const SongGrid: React.FC<Props> = ({
  items,
  optionList,
  isLoading,
  collection,
  setOption,
}) => {
  const onWheel = (e: any) => {
    // e.preventDefault();
    var container = document.getElementsByClassName("SongGrid")[0];
    var containerScrollPosition = container!.scrollLeft;
    // var to: number = containerScrollPosition + e.deltaY / 10;
    // container.scrollLeft = to;
    // container.scrollLeft -= chg * 50;
    container!.scrollTo({
      left: containerScrollPosition + e.deltaY * 2.5,
      behavior: "smooth", //if you want smooth scrolling
    });
  };

  const [ref, { height }] = useMeasure();

  // useEffect(()=>{

  // }, height)

  const style = {
    songGrid: useSpring({
      height: height < 120 ? 120 : height,
    }),
  };

  const clickSong = (index: number, event: any) => {
    // setOptionState({
    //   index,
    //   song,
    // });

    setOption(true, items![index].song, optionList, {
      x: event.pageX,
      y: event.pageY,
    });
  };

  return (
    <animated.div className="SongGrid" style={style.songGrid}>
      <Loading show={isLoading ? true : false} type={LoadingType.Scale} />
      {/* <div className="SongGrid" onWheel={(e) => onWheel(e)}> */}
      <div className="container" ref={ref}>
        {items !== undefined
          ? items!.map((item, index) => {
              if (item.song) {
                var like = find(collection, (el) => el.id == item.song?.id)
                  ? true
                  : false;
                return (
                  <SongGridItem
                    song={item.song}
                    key={item.song.id}
                    index={index}
                    like={like}
                    clickSong={clickSong}
                  />
                );
              } else {
                return (
                  <SongGridItem
                    playlist={item.playlist}
                    key={item.playlist!.title}
                    index={index}
                    clickSong={clickSong}
                  />
                );
              }
            })
          : null}
      </div>
    </animated.div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SongGrid);
