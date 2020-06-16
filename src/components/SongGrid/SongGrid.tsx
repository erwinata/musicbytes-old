import { InfoImage } from "components/InfoImage/InfoImage";
import { Loading } from "components/Loading/Loading";
import { find } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setOption } from "redux/actions/app";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { res_circle_left, res_circle_right } from "res";
import { InfoImageType } from "types/InfoImage";
import { LoadingType } from "types/LoadingType";
import { OptionActionType } from "types/Option";
import { Playlist } from "types/Playlist";
import { Song } from "types/Song";
import { XY } from "types/XY";
import "./SongGrid.scss";
import SongGridItem from "./SongGridItem";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  items: {
    song?: Song;
    playlist?: Playlist;
  }[];
  optionList: OptionActionType[];
  isLoading?: boolean;
  textNodata?: string;
}
interface StateProps {
  collection: Song[];
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
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
  textNodata,
  collection,
  deviceInfo,
  setOption,
}) => {
  // const onWheel = (e: any) => {
  //   // e.preventDefault();
  //   var container = document.getElementsByClassName("SongGrid")[0];
  //   var containerScrollPosition = container!.scrollLeft;
  //   // var to: number = containerScrollPosition + e.deltaY / 10;
  //   // container.scrollLeft = to;
  //   // container.scrollLeft -= chg * 50;
  //   container!.scrollTo({
  //     left: containerScrollPosition + e.deltaY * 2.5,
  //     behavior: "smooth", //if you want smooth scrolling
  //   });
  // };

  const [songGridRef, songGridMeasure] = useMeasure();
  const [songGridItemRef, songGridItemMeasure] = useMeasure();

  // useEffect(()=>{

  // }, height)

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

  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollingInterval, setScrollingInterval] = useState<any>(null);
  const [tick, setTick] = useState(0);
  const [scrollLeftLimit, setScrollLeftLimit] = useState(0);
  const scrollLeftSpring = useSpring({ x: scrollLeft });
  const divRef = React.createRef<any>();
  const [mouseInside, setMouseInside] = useState(false);
  const [mouseHovering, setMouseHovering] = useState(0);

  useEffect(() => {
    if (mouseHovering !== 0) {
      let target = divRef.current.scrollLeft + mouseHovering * 150;
      if (target < 0) {
        target = 0;
      } else if (target > scrollLeftLimit) {
        target = scrollLeftLimit;
      }
      setScrollLeft(target);
    }
  }, [tick]);

  useEffect(() => {
    setScrollLeftLimit(
      Math.ceil(songGridItemMeasure.width - songGridMeasure.width)
    );
  }, [songGridItemMeasure.width, songGridMeasure.width]);

  const mouseMove = (e: any, direction: number) => {
    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.pageX - currentTargetRect.left;
    const elementWidth = currentTargetRect.right - currentTargetRect.left;
    const percentage = (offsetX / elementWidth) * 100;

    let hovering = (percentage * direction) / 100;
    if (direction < 0) {
      hovering = ((100 - percentage) * direction) / 100;
    }

    setMouseHovering(hovering);

    if (scrollingInterval === null) {
      setScrollingInterval(
        setInterval(() => {
          setTick(Date.now());
        }, 100)
      );
    }
  };

  const stopHovering = () => {
    setMouseHovering(0);
    clearInterval(scrollingInterval);
    setScrollingInterval(null);
  };

  const style = {
    arrowRight: useSpring({
      opacity:
        songGridItemMeasure.width <= songGridMeasure.width ||
        deviceInfo.isTouch ||
        Math.ceil(scrollLeft) === scrollLeftLimit
          ? 0
          : 1,
    }),
    arrowLeft: useSpring({
      opacity:
        songGridItemMeasure.width <= songGridMeasure.width ||
        deviceInfo.isTouch ||
        Math.floor(scrollLeft) === 0
          ? 0
          : 1,
    }),
  };

  return (
    <animated.div
      className={`SongGrid ${!deviceInfo.isTouch ? "desktop" : ""}`}
      // style={!deviceInfo.isTouch ? style.songgrid : undefined}
      ref={songGridRef}
    >
      <Loading show={isLoading ? true : false} type={LoadingType.Scale} />
      {/* <div className="SongGrid" onWheel={(e) => onWheel(e)}> */}

      <animated.div
        className="arrow left"
        onMouseMove={(e: any) => {
          mouseMove(e, -1);
        }}
        onMouseLeave={() => {
          stopHovering();
        }}
        style={style.arrowLeft}
      >
        <img src={res_circle_left} alt="Prev" />
      </animated.div>
      <animated.div
        className="arrow right"
        onMouseMove={(e: any) => {
          mouseMove(e, 1);
        }}
        onMouseLeave={() => {
          stopHovering();
        }}
        style={style.arrowRight}
      >
        <img src={res_circle_right} alt="Next" />
      </animated.div>
      <animated.div
        className={`wrapper ${!deviceInfo.isTouch ? "desktop" : ""}`}
        // style={!deviceInfo.isTouch ? style.wrapper : undefined}
        // ref={songGridRef}
        ref={divRef}
        scrollLeft={scrollLeftSpring.x}
      >
        <div
          className={`container ${!deviceInfo.isTouch ? "desktop" : ""}`}
          // style={!deviceInfo.isTouch ? style.container : undefined}
          ref={songGridItemRef}
        >
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

      <InfoImage
        show={items.length === 0 && !isLoading}
        text={textNodata}
        type={InfoImageType.NODATA}
      />
    </animated.div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    collection: state.library.collection,
    deviceInfo: state.app.deviceInfo,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  setOption: bindActionCreators(setOption, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongGrid);
