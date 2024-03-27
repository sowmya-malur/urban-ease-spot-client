// import menu from "../../assets/icons/Iconburger-menu.png";
import { Link } from "react-router-dom";


import menu from "../../assets/icons/round_menu_black_24dp.png";

function Header() {
    return(
        <header>
            <Link to="/"><h2>UrbanEaseSpot</h2></Link>
            <Link to="/login"><p>Sign In</p></Link>
            <img src={menu} alt="burger-menu-icon"/>
        </header>
    );
}

export default Header;