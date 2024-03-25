// import menu from "../../assets/icons/Iconburger-menu.png";
import menu from "../../assets/icons/round_menu_black_24dp.png";

function Header() {
    return(
        <header>
            <h2>UrbanEaseSpot</h2>
            <p>Sign In</p>
            <img src={menu} alt="burger-menu-icon"/>
        </header>
    );
}

export default Header;