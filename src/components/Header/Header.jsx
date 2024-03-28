import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import menu from "../../assets/icons/round_menu_black_24dp.png";
import alertIcon from "../../assets/icons/round_notifications_none_black_24dp.png";

function Header() {
    const [isNotifyChecked, setIsNotifyChecked] = useState(
        localStorage.getItem("isNotifyChecked") === "true" || false
      );

      useEffect(() => {
        const storedIsNotifyChecked = localStorage.getItem("isNotifyChecked") === "true";
        setIsNotifyChecked(storedIsNotifyChecked);
      }, []);

    return(
        <header>
            <Link to="/"><h2>UrbanEaseSpot</h2></Link>
            {!localStorage.getItem("isLoggedIn")? (
                 <Link to="/login"><p>Sign In</p></Link>
            ):<Link to="/"><p>Sign Out</p></Link>} 

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