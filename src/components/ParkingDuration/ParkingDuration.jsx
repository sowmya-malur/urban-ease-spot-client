import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ConfirmParking from "../ConfirmParking/ConfirmParking"
import Notification from "../Notification/Notification";
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";

function ParkingDuration() {

    console.log(localStorage.getItem("selectedMeterId"));

    const [showComponent, setShowComponent] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Get this from param or localStorage?

    const navigate = useNavigate();

    // call useEffect to remove the item from the localStorage for meterid
    const handleCancel = () => {
        localStorage.removeItem("selectedMeterId");
        navigate("/");
        // handleClick(false);
        // setShowComponent("home-page");
    };

    const handlePark = () => {
        // localStorage.removeItem("selectedMeterId"); // TODO: should this be removed here?
        setShowComponent("confirm-parking")
    }
    return(
        <main>
            {/* {!isLoggedIn ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ): ( */}
        {!localStorage.getItem("isLoggedIn") ? (
            <LoginPage />
          ): (
        <>
         {!showComponent && (
            <>
            <img 
            src={backIcon}
            onClick={() => { 
                // handleClick(false); 
                // setShowComponent("home-page");
                navigate("/");
            }
            }
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

        {/* {showComponent === "home-page" && <HomePage handleClick={handleClick}/>} */}
        {showComponent === "notification-page" && <Notification handleEndSession={() => setShowComponent("home-page")}/>}

        </>
      )}
        </main>
    );
}

export default ParkingDuration;