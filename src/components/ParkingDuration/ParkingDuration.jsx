import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ConfirmParking from "../ConfirmParking/ConfirmParking"
import Notification from "../Notification/Notification";
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";

function ParkingDuration({ handleClick }) {
    const [showComponent, setShowComponent] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO: Get this from param or localStorage?

    const navigate = useNavigate();

    const handleCancel = () => {
        handleClick(false);
        setShowComponent("home-page");
    };

    const handlePark = () => {
        setShowComponent("confirm-parking")
    }
    return(
        <main>
            {!isLoggedIn ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ): (
        <>
         {!showComponent && (
            <>
            <img 
            src={backIcon}
            onClick={() => { 
                handleClick(false); 
                setShowComponent("home-page");}}
            alt="back-icon"/>
            <p>Parking Duration</p>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handlePark}>Proceed to Park</button>
    
            
            </>
        )}
         {showComponent === "confirm-parking" && (
            <ConfirmParking 
            handleCancel={() => setShowComponent("home-page")}
            handlePay={() => setShowComponent("notification-page")}/>
          )}

        {showComponent === "home-page" && <HomePage handleClick={handleClick}/>}
        {showComponent === "notification-page" && <Notification handleEndSession={() => setShowComponent("home-page")}/>}

        </>
      )}
        </main>
    );
}

export default ParkingDuration;