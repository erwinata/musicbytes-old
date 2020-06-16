import { InfoImage } from "components/InfoImage/InfoImage";
import { concat, findIndex } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { animated, config, useTransition } from "react-spring";
import { useMeasure } from "react-use";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setOption } from "redux/actions/app";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { InfoImageType } from "types/InfoImage";
import { OptionActionType } from "types/Option";
import { Song } from "types/Song";
import { XY } from "types/XY";
import "./SongList.scss";
import SongListItem from "./SongListItem";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  songs: Song[];
  resetPlaylist: boolean;
  optionList: OptionActionType[];
  showMore?: boolean;
  textNodata?: string;
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
  showMore,
  textNodata,
  setOption,
}: Props) => {
  const [songsDisplayed, setSongsDisplayed] = useState<Song[]>([]);

  const [contentHeight, setContentHeight] = useState("0px");
  const [itemHeight, setItemHeight] = useState(50);

  const [ref, { height }] = useMeasure();

  useEffect(() => {
    setItemHeight(height);
    setContentHeight(`${height * songsDisplayed.length}px`);
  }, [height, songsDisplayed]);

  useEffect(() => {
    let songsToDisplay: Song[] = [];
    for (let i = 0; i < Math.min(songs.length, 10); i++) {
      songsToDisplay.push(songs[i]);
    }
    setSongsDisplayed(songsToDisplay);
  }, [songs]);

  useEffect(() => {
    if (songs.length > songsDisplayed.length && songsDisplayed.length !== 0) {
      let songsToDisplay = [];
      for (
        let i = songsDisplayed.length;
        i <
        songsDisplayed.length +
          Math.min(songs.length - songsDisplayed.length, 5);
        i++
      ) {
        songsToDisplay.push(songs[i]);
      }
      setSongsDisplayed(concat(songsDisplayed, songsToDisplay));
    }
  }, [showMore]);

  const transitions = useTransition(
    songsDisplayed.map((data, i) => ({ ...data, y: i * itemHeight, x: 0 })),
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

  const clickButtonOption = (index: number, song: Song, event: any) => {
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
      <InfoImage
        show={songs.length === 0}
        text={textNodata}
        type={InfoImageType.NODATA}
      />
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
