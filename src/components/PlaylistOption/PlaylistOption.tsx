import React from "react";
import "./PlaylistOption.scss";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { AppState } from "redux/store/configureStore";
import { Playlist } from "types/Playlist";
import { animated } from "react-spring";
import { savePlaylist } from "redux/actions/library";
import { bindActionCreators } from "redux";
import { Song } from "types/Song";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {
  playlistOptionStyle: any;
  playlistOptionList: { icon: string; label: string; action: () => any }[];
}
interface StateProps {
  playlists?: Playlist[];
}
interface DispatchProps {}

const PlaylistOption: React.FC<Props> = ({
  playlistOptionStyle,
  playlistOptionList,
  playlists,
}) => {
  return (
    <animated.div className="PlaylistList" style={playlistOptionStyle}>
      {playlistOptionList.map((item) => {
        return <PlaylistOptionItem data={item} />;
      })}
    </animated.div>
  );
};

const PlaylistOptionItem: React.FC<{
  data: { icon: string; label: string; action: () => any };
}> = ({ data }) => {
  return (
    <div className="PlaylistListItem" onClick={data.action}>
      <img src={data.icon} alt="Icon" />
      <div className="info">
        <h1>{data.label}</h1>
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
) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistOption);
