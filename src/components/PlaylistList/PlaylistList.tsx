import React from "react";
import { connect } from "react-redux";
import { animated } from "react-spring";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "redux/store/configureStore";
import { AppActionTypes } from "redux/types/app";
import { res_library, res_plus } from "res";
import { Playlist } from "types/Playlist";
import { PopupMenuType } from "types/PopupMenuType";
import "./PlaylistList.scss";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  playlistListStyle: any;
  onClickPlaylist: (playlist: Playlist) => any;
  onClickNewPlaylist: () => any;
  popupMenuState: PopupMenuType;
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
  popupMenuState,
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
            />
          </div>
        );
      })}
      {popupMenuState === PopupMenuType.ADDING_SONG_TO_PLAYLIST ? (
        <PlaylistListAdd onClick={onClickNewPlaylist} />
      ) : null}
    </animated.div>
  );
};

const PlaylistListItem: React.FC<{
  playlist: Playlist;
  onClick: (playlist: Playlist) => any;
}> = ({ playlist, onClick }) => {
  return (
    <div
      className="PlaylistListItem"
      onClick={() => {
        onClick(playlist);
      }}
    >
      <img src={res_library} alt="Icon" />
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
      <img src={res_plus} alt="Icon" />
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
