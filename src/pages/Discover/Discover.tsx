import { InfoImage } from "components/InfoImage/InfoImage";
import { Loading } from "components/Loading/Loading";
import SearchBar from "components/SearchBar/SearchBar";
import SongList from "components/SongList/SongList";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useMeasure, useScroll } from "react-use";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setPopupMenu } from "redux/actions/app";
import { searchSong } from "redux/actions/discover";
import { likeSong } from "redux/actions/library";
import { addToNowPlaying } from "redux/actions/player";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { InfoImageType } from "types/InfoImage";
import { LoadingType } from "types/LoadingType";
import { OptionActionType } from "types/Option";
import { PopupMenuType } from "types/PopupMenuType";
import { Song } from "types/Song";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  query: string;
  songs?: Song[];
  songPlaying?: Song;
  deviceInfo: {
    isLandscape: boolean;
    isTouch: boolean;
  };
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
  setPopupMenu: (menuState: PopupMenuType, songAdding?: Song) => any;
  likeSong: (song: Song) => any;
  searchSong: (query: string, nextPage?: boolean) => any;
}

export const Discover: React.FC<Props> = ({
  query,
  songs,
  songPlaying,
  deviceInfo,
  addToNowPlaying,
  setPopupMenu,
  likeSong,
  searchSong,
}: Props) => {
  const optionList: OptionActionType[] = [
    OptionActionType.ADD_TO_NOW_PLAYING,
    OptionActionType.ADD_TO_PLAYLIST,
    OptionActionType.LIKE_SONG,
  ];

  const [loadingMore, setLoadingMore] = useState({
    show: false,
    top: 0,
  });

  const [showMore, setShowMore] = useState(false);

  const [contentHeight, setContentHeight] = useState(500);
  const [ref, { height }] = useMeasure();
  // const [refScroll, { y }] = useScroll(refScroll);

  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);

  useEffect(() => {
    setLoadingMore({ ...loadingMore, show: false });
  }, [songs]);

  const handleScroll = (e: any) => {
    const target = e.target;

    let pos = target.scrollHeight - target.scrollTop;

    //   target.scrollTop = target.scrollHeight + 100;
    // }

    if (pos >= target.clientHeight - 5 && pos <= target.clientHeight) {
      // if (!loadingMore.show) {
      //   startSearchSong(query, true);
      // }
      setShowMore(true);
      setTimeout(() => {
        setShowMore(false);
      }, 100);
    }
  };

  const startSearchSong = (query: string, nextPage?: boolean) => {
    setLoadingMore({
      ...loadingMore,
      show: true,
    });
    searchSong(query, nextPage);
  };

  return (
    <div
      className={`Discover ${deviceInfo.isLandscape ? "desktop" : ""}`}
      onScroll={handleScroll}
    >
      <SearchBar startSearchSong={startSearchSong} />
      <div ref={ref}>
        {songs ? (
          <SongList
            songs={songs}
            optionList={optionList}
            resetPlaylist={true}
            showMore={showMore}
            textNodata="No song matches"
          />
        ) : null}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <InfoImage
          show={songs ? false : true}
          type={InfoImageType.DISCOVER}
          text="Search by title, artist, or albums"
        />
      </div>
      <div style={{ position: "relative", height: 100 }}>
        <Loading show={loadingMore.show} type={LoadingType.Beat} />
      </div>

      {songPlaying && !deviceInfo.isLandscape ? (
        <div className="miniPlayerPadding"></div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    query: state.discover.query,
    songs: state.discover.songs,
    songPlaying: state.player.songs?.playing,
    deviceInfo: state.app.deviceInfo,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
  setPopupMenu: bindActionCreators(setPopupMenu, dispatch),
  likeSong: bindActionCreators(likeSong, dispatch),
  searchSong: bindActionCreators(searchSong, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
