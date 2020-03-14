import React from "react";
import "./Navbar.scss";

const NAV_DISCOVER = 0;
const NAV_LISTEN = 1;
const NAV_LIBRARY = 2;

export const Navbar = () => {
  return (
    <div className="Navbar">
      <NavbarItem type={NAV_DISCOVER} />
      <NavbarItem type={NAV_LISTEN} />
      <NavbarItem type={NAV_LIBRARY} />
    </div>
  );
};

const NavbarItem = (props: { type: number }) => {
  var name = "";
  var img = "";

  switch (props.type) {
    case NAV_DISCOVER:
      name = "Discover";
      img = "search";
      break;
    case NAV_LISTEN:
      name = "Listen";
      img = "music";
      break;
    case NAV_LIBRARY:
      name = "Library";
      img = "library";
      break;
  }

  return (
    <div className="NavbarItem">
      <div>
        <img src={`/res/${img}.svg`} alt="Navbar Icon" />
      </div>
      <span>{name}</span>
    </div>
  );
};
