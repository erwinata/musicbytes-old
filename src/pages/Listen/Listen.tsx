import React from "react";
import { CategoryTitle } from "components/CategoryTitle/CategoryTitle";
import SongGrid from "components/SongGrid/SongGrid";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActionTypes } from "redux/types/app";
import { connect } from "react-redux";

type Props = PassingProps & StateProps & DispatchProps;

interface PassingProps {}
interface StateProps {
  isDesktop: boolean;
}
interface DispatchProps {}

export const Listen: React.FC<Props> = ({ isDesktop }: Props) => {
  return (
    <div className={`Listen ${isDesktop ? "desktop" : ""}`}>
      <CategoryTitle text="Recent Playlist" />
      {/* <SongGrid /> */}

      <CategoryTitle text="You might like these" />
      {/* <SongGrid /> */}

      {/* <CategoryTitle />
      <SongGrid /> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isDesktop: state.app.isDesktop,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionTypes>
) => ({
  // addToNowPlaying: bindActionCreators(addToNowPlaying, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listen);
