import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import menu from "../../assets/icons/round_menu_black_24dp.png";
import alertIcon from "../../assets/icons/round_notifications_none_black_24dp.png";

function Header( {isLoggedIn, setIsLoggedIn}) {

  const handleSignOut = () => {
    // reset the isLoggedIn state variable to false and clear localStorage.
    setIsLoggedIn(false);
    // localStorage.setItem("isLoggedIn", false);
    localStorage.clear();

  };

  return (
    <header>
      <Link to="/">
        <h2>UrbanEaseSpot</h2>
      </Link>
      {!isLoggedIn ? (
        <Link to="/login">
          <p>Sign In</p>
        </Link>
      ) : (
        <Link to="/">
          <p onClick={handleSignOut}>Sign Out</p>
        </Link>
      )}

      {/* {!localStorage.getItem("isNotifyChecked") ? "" : (
              <Link to="/notification">
                <img 
                src={alertIcon}
                alt="alert-icon"
              /></Link> 
            )} */}
      {/* {!isNotifyChecked && (
        <Link to="/notification">
          <img src={alertIcon} alt="alert-icon" />
        </Link>
      )} */}
      <img src={menu} alt="burger-menu-icon" />
    </header>
  );
}

export default Header;
