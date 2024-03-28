import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import menu from "../../assets/icons/round_menu_black_24dp.png";
import alertIcon from "../../assets/icons/round_notifications_none_black_24dp.png";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true" || false);
  const [isNotifyChecked, setIsNotifyChecked] = useState(localStorage.getItem("isNotifyChecked") === "true" || false);

//   TODO: fix the logic with displaying the icons in header based on logged in / notification on states.
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true" || false);
  }, [isLoggedIn]);

  useEffect(() => {
    setIsNotifyChecked(localStorage.getItem("isNotifyChecked") === "true" || false);
  }, [localStorage.getItem("isNotifyChecked")]);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isNotifyChecked");
  };

    return(
        <header>
            <Link to="/"><h2>UrbanEaseSpot</h2></Link>
            {!isLoggedIn ? (
                 <Link to="/login"><p>Sign In</p></Link>
            ):<Link to="/"><p onClick={handleSignOut}>Sign Out</p></Link>} 

            {/* {!localStorage.getItem("isNotifyChecked") ? "" : (
              <Link to="/notification">
                <img 
                src={alertIcon}
                alt="alert-icon"
              /></Link> 
            )} */}
            {!isNotifyChecked && (
        <Link to="/notification">
          <img 
            src={alertIcon}
            alt="alert-icon"
          />
        </Link>
      )}
            <img src={menu} alt="burger-menu-icon"/>
        </header>
    );
}

export default Header;