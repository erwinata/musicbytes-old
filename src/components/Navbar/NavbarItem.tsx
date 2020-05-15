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
import { useSpring, animated } from "react-spring";
import "_base.scss";

type Props = PassingProps & DispatchProps;

interface PassingProps {
  active: boolean;
  type: number;
}
interface DispatchProps {
  showPlayer: (show: boolean) => any;
  changeTab: (to: NavigationTab) => any;
}

const NavbarItem: React.FC<Props> = ({
  active,
  type,
  showPlayer,
  changeTab,
}) => {
  var name = "";
  var img = "";

  switch (type) {
    case NavigationTab.DISCOVER:
      name = "Discover";
      img = "discover";
      break;
    case NavigationTab.LISTEN:
      name = "Listen";
      img = "listen";
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

  const spanStyle = useSpring({
    color: active ? "#fff" : "rgb(58, 89, 140)",
  });

  return (
    <div className="NavbarItem" onClick={(e) => navbarClick()}>
      <div>
        <img
          src={`/res/${img}${active ? "-active" : ""}.svg`}
          alt="Navbar Icon"
        />
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
});

export default connect(null, mapDispatchToProps)(NavbarItem);
