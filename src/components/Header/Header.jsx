// Import libraries
import { Link, NavLink } from "react-router-dom";

// Import icons
import menu from "../../assets/icons/round_menu_black_24dp.png";
import alertIcon from "../../assets/icons/round_notifications_none_black_24dp.png";

// Import styling
import "../Header/Header.scss";

/**
 * Header component
 * @param {isLoggedIn} isLoggedIn state variable to track if the user is logged in
 * @param {setIsLoggedIn} setIsLoggedIn callback function to update Login status
 * @returns {JSX.Element} Returns Header component
 */
function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleSignOut = () => {
    // Reset the isLoggedIn state variable to false
    // Remove isLoggedIn, userId variables from localStorage.
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("selectedMeterId");
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
          <>
            <NavLink to="/" className="header__sign-out">
              <p onClick={handleSignOut}>Sign Out</p>
            </NavLink>
            <NavLink to="/notification">
              <img src={alertIcon} alt="alert-icon" className="header__icon" />
            </NavLink>
          </>
        )}
        <img src={menu} alt="burger-menu-icon" className="header__icon" />
      </div>
    </header>
  );
}

export default Header;
