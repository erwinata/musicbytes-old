import React from "react";
import "./SongGrid.scss";
import SongGridItem from "./SongGridItem";
import { Song } from "types/Song";
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
import { Playlist } from "types/Playlist";

type Props = PassingProps & StateProps;

interface PassingProps {
  songs?: Song[];
  playlists?: Playlist[];
  // optionList: OptionItemData[];
}
interface StateProps {
  collection: Song[];
}

const SongGrid: React.FC<Props> = ({ songs, playlists }) => {
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

  return (
    <div className="SongGrid">
      {/* <div className="SongGrid" onWheel={(e) => onWheel(e)}> */}
      {songs !== undefined
        ? songs!.map((song, index) => {
            return <SongGridItem song={song} key={song.id} index={index} />;
          })
        : playlists!.map((playlist, index) => {
            return (
              <SongGridItem
                playlist={playlist}
                key={playlist.createdAt}
                index={index}
              />
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

export default connect(mapStateToProps)(SongGrid);
