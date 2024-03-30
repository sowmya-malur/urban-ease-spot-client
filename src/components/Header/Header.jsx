// Import libraries
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

// Import icons
import menu from "../../assets/icons/round_menu_black_24dp.png";
import alertIcon from "../../assets/icons/round_notifications_none_black_24dp.png";

// Import styling
import "../Header/Header.scss";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function Header({ isLoggedIn, setIsLoggedIn, setUserId }) {

  const handleSignOut = () => {
    // Reset the isLoggedIn state variable to false
    // Remove logged in and notify variables from localStorage.
    setIsLoggedIn(false);
    setUserId(0);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isNotifyChecked");
    localStorage.removeItem("selectedMeterId"); // TODO: move this line of code to confirmparking page
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <h2 className="header__logo">UrbanEaseSpot</h2>
      </Link>
      <div className="header__right-container">
        {!isLoggedIn ? (
          <NavLink to="/login" className="header__sign-in">
            <p>Sign In</p>
          </NavLink>
        ) : (
          <NavLink to="/" className="header__sign-out">
            <p onClick={handleSignOut}>Sign Out</p>
          </NavLink>
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
        <img src={menu} alt="burger-menu-icon" className="header__icon" />
      </div>
    </header>
  );
}

export default Header;
