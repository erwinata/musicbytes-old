import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { showPlayer } from "redux/actions/player";
import { connect } from "react-redux";
import { NavigationTab } from "types/Navigation";
import { changeTab } from "redux/actions/app";

type Props = PassingProps & DispatchProps;

interface PassingProps {
  type: number;
}
interface DispatchProps {
  showPlayer: (show: boolean) => any;
  changeTab: (to: NavigationTab) => any;
}

const NavbarItem: React.FC<Props> = ({ type, showPlayer, changeTab }) => {
  var name = "";
  var img = "";

  switch (type) {
    case NavigationTab.DISCOVER:
      name = "Discover";
      img = "search";
      break;
    case NavigationTab.LISTEN:
      name = "Listen";
      img = "music";
      break;
    case NavigationTab.LIBRARY:
      name = "Library";
      img = "library";
      break;
  }

  const navbarClick = () => {
    showPlayer(false);
    changeTab(type);
  };

  return (
    <div className="NavbarItem" onClick={(e) => navbarClick()}>
      <div>
        <img src={`/res/${img}.svg`} alt="Navbar Icon" />
      </div>
      <span>{name}</span>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  showPlayer: bindActionCreators(showPlayer, dispatch),
  changeTab: bindActionCreators(changeTab, dispatch),
});

export default connect(null, mapDispatchToProps)(NavbarItem);
