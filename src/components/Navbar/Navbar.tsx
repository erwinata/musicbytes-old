import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { showPlayer } from "redux/actions/player";
import { connect } from "react-redux";
import { NavigationTab } from "types/Navigation";
import NavbarItem from "./NavbarItem";

type Props = DispatchProps;

interface DispatchProps {
  showPlayer: (show: boolean) => any;
}

export const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to="/Discover">
        <NavbarItem type={NavigationTab.DISCOVER} />
      </Link>
      <Link to="/">
        <NavbarItem type={NavigationTab.LISTEN} />
      </Link>
      <Link to="/Library">
        <NavbarItem type={NavigationTab.LIBRARY} />
      </Link>
    </div>
  );
};
