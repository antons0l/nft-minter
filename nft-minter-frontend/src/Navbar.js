import React from "react";
import "./Navbar.css";

const Navbar = ({ userAddress }) => {
  return (
    <nav className="navbar">
      <a href="/" className="brand">
        Cool Foxez NFT
      </a>
      <span className="user-address">{userAddress}</span>
    </nav>
  );
};

export default Navbar;
