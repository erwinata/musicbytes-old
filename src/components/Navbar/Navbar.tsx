import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { showPlayer } from "redux/actions/player";
import { connect } from "react-redux";
import { Navigation } from "types/Navigation";
import NavbarItem from "./NavbarItem";

type Props = DispatchProps;

interface DispatchProps {
  showPlayer: (show: boolean) => any;
}

export const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to="/Discover">
        <NavbarItem type={Navigation.DISCOVER} />
      </Link>
      <Link to="/">
        <NavbarItem type={Navigation.LIBRARY} />
      </Link>
      <Link to="/Library">
        <NavbarItem type={Navigation.LIBRARY} />
      </Link>
    </div>
  );
};
