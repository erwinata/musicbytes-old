import React from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { changeTab, setClickOverlay } from "redux/actions/app";
import { showPlayer } from "redux/actions/player";
import { AllActions } from "redux/types/app";
import {
  res_discover,
  res_discover_active,
  res_library,
  res_library_active,
  res_listen,
  res_listen_active,
} from "res";
import { NavigationTab } from "types/Navigation";
import "_base.scss";
import "./Navbar.scss";

type Props = PassingProps & DispatchProps;

interface PassingProps {
  active: boolean;
  type: number;
}
interface DispatchProps {
  showPlayer: (show: boolean) => any;
  changeTab: (to: NavigationTab) => any;
  setClickOverlay: (show: boolean) => any;
}

const NavbarItem: React.FC<Props> = ({
  active,
  type,
  showPlayer,
  changeTab,
  setClickOverlay,
}) => {
  var name = "";
  var img;
  var imgActive;

  switch (type) {
    case NavigationTab.DISCOVER:
      name = "Discover";
      img = res_discover;
      imgActive = res_discover_active;
      break;
    case NavigationTab.LISTEN:
      name = "Listen";
      img = res_listen;
      imgActive = res_listen_active;
      break;
    case NavigationTab.LIBRARY:
      name = "Library";
      img = res_library;
      imgActive = res_library_active;
      break;
  }

  const navbarClick = () => {
    showPlayer(false);
    setClickOverlay(true);
    changeTab(type);
  };

  const spanStyle = useSpring({
    color: active ? "#fff" : "rgb(58, 89, 140)",
  });

  return (
    <div className="NavbarItem" onClick={(e) => navbarClick()}>
      <div>
        <img src={active ? imgActive : img} alt="Navbar Icon" />
      </div>
      <animated.span style={spanStyle}>{name}</animated.span>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActions>
  // ownProps: DiscoverProps
) => ({
  showPlayer: bindActionCreators(showPlayer, dispatch),
  changeTab: bindActionCreators(changeTab, dispatch),
  setClickOverlay: bindActionCreators(setClickOverlay, dispatch),
});

export default connect(null, mapDispatchToProps)(NavbarItem);
