import React, { useState, useEffect } from "react";
import SearchBar from "components/SearchBar/SearchBar";
import SongList from "components/SongList/SongList";
import { SearchSong } from "api/Search";
import { Song } from "types/Song";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions, AppActionTypes } from "redux/types/app";
import { searchSong } from "redux/actions/discover";
import { bindActionCreators } from "redux";
import { OptionAction, OptionActionType } from "types/Option";
import { addToNowPlaying } from "redux/actions/player";
import { setPopupMenu } from "redux/actions/app";
import { likeSong } from "redux/actions/library";
import { PopupMenuType } from "types/PopupMenuType";
import { useMeasure, useScroll } from "react-use";
import { Loading } from "components/Loading/Loading";
import { LoadingType } from "types/LoadingType";
import { relative } from "path";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  query: string;
  songs: Song[];
  songPlaying?: Song;
}
interface DispatchProps {
  addToNowPlaying: (song: Song) => any;
  setPopupMenu: (menuState: PopupMenuType, songAdding?: Song) => any;
  likeSong: (song: Song) => any;
  searchSong: (query: string, nextPage?: boolean) => any;
}

interface DiscoverState {}

export const Discover: React.FC<Props> = ({
  query,
  songs,
  songPlaying,
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

  const [contentHeight, setContentHeight] = useState(500);
  const [ref, { height }] = useMeasure();
  // const [refScroll, { y }] = useScroll(refScroll);

  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);

  useEffect(() => {
    setLoadingMore({ ...loadingMore, show: false });
  }, [songs]);

  useEffect(() => {
    console.log(y);
  }, [y]);

  const loadMore = () => {
    console.log("loadMore");
  };

  const handleScroll = (e: any) => {
    const target = e.target;

    let pos = target.scrollHeight - target.scrollTop;

    console.log(
      target.scrollHeight +
        " - " +
        target.scrollTop +
        " = " +
        target.clientHeight
    );

    if (pos >= target.clientHeight - 5 && pos <= target.clientHeight) {
      if (!loadingMore.show) {
        setLoadingMore({ show: true, top: target.scrollHeight - 75 });
        searchSong(query, true);
      }
    }
  };

  return (
    <div className="Discover" onScroll={handleScroll}>
      <SearchBar />
      <SongList
        songs={songs}
        optionList={optionList}
        resetPlaylist={true}
        miniPlayerShown={songPlaying ? true : false}
        loadMore={loadMore}
      />
      <div style={{ position: "relative", top: loadingMore.top }}>
        <Loading show={loadingMore.show} type={LoadingType.Beat} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    query: state.discover.query,
    songs: state.discover.songs,
    songPlaying: state.player.songs?.playing,
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
