import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { showPlayer } from "redux/actions/player";
import { connect } from "react-redux";
import { Navigation } from "types/Navigation";

type Props = PassingProps & DispatchProps;

interface PassingProps {
  type: number;
}
interface DispatchProps {
  showPlayer: (show: boolean) => any;
}

const NavbarItem: React.FC<Props> = ({ type, showPlayer }) => {
  var name = "";
  var img = "";

  switch (type) {
    case Navigation.DISCOVER:
      name = "Discover";
      img = "search";
      break;
    case Navigation.LISTEN:
      name = "Listen";
      img = "music";
      break;
    case Navigation.LIBRARY:
      name = "Library";
      img = "library";
      break;
  }

  return (
    <div className="NavbarItem" onClick={e => showPlayer(false)}>
      <div>
        <img src={`/res/${img}.svg`} alt="Navbar Icon" />
      </div>
      <span>{name}</span>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
  // ownProps: DiscoverProps
) => ({
  showPlayer: bindActionCreators(showPlayer, dispatch)
});

export default connect(null, mapDispatchToProps)(NavbarItem);
