import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ConfirmParking from "../ConfirmParking/ConfirmParking";
import Notification from "../Notification/Notification";

// Import icons
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";
import timeIcon from "../../assets/icons/round_schedule_black_24dp.png";
import radioCheckedIcon from "../../assets/icons/round_radio_button_checked_black_24dp.png";
import carIcon from "../../assets/icons/round_directions_car_black_24dp.png";
import infoIcon from "../../assets/icons/round_info_outline_black_24dp.png";

function ParkingDuration() {
  // console.log(localStorage.getItem("selectedMeterId"));

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
    setShowComponent("confirm-parking");
  };
  return (
    <main>
      {!localStorage.getItem("isLoggedIn") ? (
        <LoginPage />
      ) : (
        <>
          {!showComponent && (
            <>
              <img
                src={backIcon}
                onClick={() => {
                  // handleClick(false);
                  // setShowComponent("home-page");
                  navigate("/");
                }}
                alt="back-icon"
              />
              <h1>Select Parking Duration</h1>
              <p>Meter #</p>
              {/* parking.meterid */}
              <h2>872503</h2>
              {/* parking.location */}
              <p>Fairview</p>
              <div>
                <img src={infoIcon} alt="info-icon" />
                <p>Maximum Stay: {"4 hours"}</p>
              </div>
              <div>
                <img src={timeIcon} alt="time-icon" />
                <h3>Parking Duration</h3>
                <div>
                  <p>Hours:</p>
                  {/* TODO: which is better input field or select and setting the available values */}
                  <select name="hours"></select>
                  <p>Minutes:</p>
                  <select name="minutes"></select>
                </div>
                <div>
                  <p>$2.00</p>
                  <p>Total Cost</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="vehicle"
                    name="vehicle"
                    value="FKL-00A"
                    style={{ display: "none" }}
                    defaultChecked
                  />
                  <label htmlFor="vehicle">
                    <div>
                      <img src={carIcon} alt="car-icon" />
                      <h3>Your Vehicle</h3>
                    </div>
                    <img src={radioCheckedIcon} alt={"radio-checked-icon"} />
                  </label>
                </div>
              </div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handlePark}>Proceed to Park</button>
            </>
          )}
          
          {showComponent === "confirm-parking" && (
            <ConfirmParking
              // handleCancel={() => setShowComponent("home-page")}
              handleCancel={() => {
                localStorage.removeItem("selectedMeterId");
                navigate(-1);
              }}
              handlePay={() => {
                localStorage.removeItem("selectedMeterId");
                setShowComponent("notification-page");
              }}
            />
          )}

          {/* {showComponent === "home-page" && <HomePage />} */}
          {/* {showComponent === "notification-page" && <Notification handleEndSession={() => setShowComponent("home-page")}/>} */}
          {showComponent === "notification-page" && (
            <Notification handleEndSession={() => navigate("/")} />
          )}
        </>
      )}
    </main>
  );
}

export default ParkingDuration;
