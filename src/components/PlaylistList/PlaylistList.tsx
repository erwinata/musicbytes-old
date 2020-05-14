import React from "react";
import "./PlaylistList.scss";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { AppState } from "redux/store/configureStore";
import { Playlist } from "types/Playlist";
import { animated } from "react-spring";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  playlistListStyle: any;
  onClickPlaylist: (playlistIndex: number) => any;
  onClickNewPlaylist: () => any;
}
interface StateProps {
  playlists?: Playlist[];
}
interface DispatchProps {
  // playPlaylist: (playlist: Playlist) => any;
}

const PlaylistList: React.FC<Props> = ({
  playlistListStyle,
  onClickPlaylist,
  onClickNewPlaylist,
  playlists,
}) => {
  return (
    <animated.div className="PlaylistList" style={playlistListStyle}>
      {playlists?.map((playlist, index) => {
        return (
          <div>
            <PlaylistListItem
              playlist={playlist}
              onClick={onClickPlaylist}
              key={index}
              index={index}
            />
          </div>
        );
      })}
      <PlaylistListAdd onClick={onClickNewPlaylist} />
    </animated.div>
  );
};

const PlaylistListItem: React.FC<{
  playlist: Playlist;
  onClick: (playlistIndex: number) => any;
  index: number;
}> = ({ playlist, onClick, index }) => {
  return (
    <div
      className="PlaylistListItem"
      onClick={() => {
        onClick(index);
      }}
    >
      <img src="/res/library.svg" alt="Icon" />
      <div className="info">
        <h1>{playlist.title}</h1>
        <h2>{playlist.songs.length} songs</h2>
      </div>
    </div>
  );
};

const PlaylistListAdd: React.FC<{ onClick: () => any }> = ({ onClick }) => {
  return (
    <div className="PlaylistListItem Add" onClick={onClick}>
      <img src="/res/plus.svg" alt="Icon" />
      <div className="info">
        <h1>New Playlist</h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    playlists: state.library.playlists,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  // playPlaylist: bindActionCreators(playPlaylist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);
