import React from "react";
import "./SongListItem.scss";
import { Song } from "types/Song";
import { useHistory } from "react-router";
import { AppState } from "store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { startPlaySong } from "actions/player";

type Props = PassingProps & DispatchProps;

interface PassingProps {
  song: Song;
}
interface DispatchProps {
  startPlaySong: (song: Song) => any;
}

const SongListItem: React.FC<Props> = ({ song, startPlaySong }) => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    startPlaySong(song);
    history.push("/player");
  };

  return (
    <div className="SongListItem" onClick={handleClick}>
      <img src={song.thumbnails?.default} alt="Thumbnail Image" />
      <div className="info">
        <h1>{song.title}</h1>
        <h2>{song.channel}</h2>
      </div>
      <div className="option">
        <img src="/res/like.svg" className="btnLike" alt="Like Song" />
        <img src="/res/option.svg" className="btnOption" alt="Option" />
      </div>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({
  startPlaySong: bindActionCreators(startPlaySong, dispatch)
});

export default connect(null, mapDispatchToProps)(SongListItem);
