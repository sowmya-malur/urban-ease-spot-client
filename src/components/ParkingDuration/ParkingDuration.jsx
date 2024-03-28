import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
  //Initialize hooks
  const navigate = useNavigate();

  let userId = 1; // get this from params

  // console.log(localStorage.getItem("selectedMeterId"));

  // Initialize state variables
  const [showComponent, setShowComponent] = useState(false);
  const [selectedParkingMeter, setSelectedParkingMeter] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMins, setSelectedMins] = useState(30);
  const [availableHours, setAvailableHours] = useState([]);
  const [maxStay, setMaxStay] = useState(0);
  const [totalCost, setTotalCost] = useState(0.0);

  const availableMins = [0, 30];
  const currentTimeStamp = Date.now();
  const currentDate = new Date(currentTimeStamp);
  const currentHours = currentDate.getHours();
  const currentDay = currentDate.getDay();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Get this from param or localStorage?

  const getMaxStay = () => {
    let maximumStay;
    // If the day is Mon/Tue/Wed/Thurs/Fri
    if (currentDay >= 1 && currentDay <= 5) {
      if (currentHours >= 9 && currentHours < 18) {
        // If the time is between 9 am and 6 pm
        maximumStay = selectedParkingMeter.t_mf_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // If the time is between 6 pm and 10 pm
        maximumStay = selectedParkingMeter.t_mf_6p_10p;
      } else {
        // If the time is between 10 pm and 9 am
        maximumStay = "11 hr";
      }
    } else if (currentDay === 6) {
      // If the day is Sat

      if (currentHours >= 9 && currentHours < 18) {
        // If the time is between 9 am and 6 pm

        maximumStay = selectedParkingMeter.t_sa_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // If the time is between 6 pm and 10 pm
        maximumStay = selectedParkingMeter.r_sa_6p_10;
      } else {
        // If the time is between 10 pm and 9 am
        maximumStay = "11 hr";
      }
    } else {
      // If the day is Sun
      if (currentHours >= 9 && currentHours < 18) {
        // If the time is between 9 am and 6 pm
        maximumStay = selectedParkingMeter.r_su_9a_6;
      } else if (currentHours >= 18 && currentHours < 22) {
        // If the time is between 6 pm and 10 pm
        maximumStay = selectedParkingMeter.r_su_6p_10;
      } else {
        // If the time is between 10 pm and 9 am
        maximumStay = "11 hr";
      }
    }
    return maximumStay;
  };

  const calculateTotal = () => {
    let currentRate = 0.0;
    let totalCost = 0.0;

    // If the day is Mon/Tue/Wed/Thurs/Fri
    if (currentDay >= 1 && currentDay <= 5) {
      if (currentHours >= 9 && currentHours < 18) {
        // If the time is between 9 am and 6 pm
        currentRate = selectedParkingMeter.r_mf_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // If the time is between 6 pm and 10 pm
        currentRate = selectedParkingMeter.r_mf_6p_10p;
      } else {
        // If the time is between 10 pm and 9 am
        currentRate = 0.0;
      }
    } else if (currentDay === 6) {
      // If the day is Sat

      if (currentHours >= 9 && currentHours < 18) {
        // If the time is between 9 am and 6 pm
        currentRate = selectedParkingMeter.r_sa_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // If the time is between 6 pm and 10 pm
        currentRate = selectedParkingMeter.r_sa_6p_10p;
      } else {
        // If the time is between 10 pm and 9 am
        currentRate = 0.0;
      }
    } else {
      // If the day is Sun
      if (currentHours >= 9 && currentHours < 18) {
        // If the time is between 9 am and 6 pm
        currentRate = selectedParkingMeter.r_su_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // If the time is between 6 pm and 10 pm
        currentRate = selectedParkingMeter.r_su_6p_10p;
      } else {
        // If the time is between 10 pm and 9 am
        currentRate = 0.0;
      }
    }

    if (selectedHours >= 1) {
      totalCost = (currentRate * selectedHours).toFixed(2);
    }
    console.log("selectedMins", selectedMins);

    if (Number(selectedMins) === 30) {
      console.log("currentRate", currentRate);
      totalCost = (currentRate / 2).toFixed(2);
    }

    return totalCost;
  };

  useEffect(() => {
    try {
      const getParkingDetails = async () => {
        const meterId = localStorage.getItem("selectedMeterId") || 680504;
        const parkingResponse = await axios.get(
          `http://localhost:8080/api/parking/${meterId}`
        ); // TODO: use env variable

        if (parkingResponse.data) {
          setSelectedParkingMeter(parkingResponse.data);

          // Calculate available hours from maximum stay
          const maximumStayAllowed = getMaxStay();
          if (maximumStayAllowed) {
            const maximumStay = parseInt(maximumStayAllowed.match(/\d+/)[0]); // extract the number from string.
            setMaxStay(maximumStay);
            const availableHrs = Array.from(
              { length: maximumStay },
              (_, i) => i + 1
            );
            setAvailableHours(availableHrs);
          }

          // calculate total cost on mount for the default minutes
          const cT = calculateTotal();
          setTotalCost(cT);
        }
      };

      // const getVehicleDetails = async () => {
      //   // call get to vehicle table for the user id
      //   const vehicleResponse = await axios.get(
      //     `http://localhost:8080/api/user/${userId}/vehicle`
      //   );
      //   // console.log("vehicleResponse", vehicleResponse.data); //TODO: del
      //   if (vehicleResponse.data) {
      //     setVehicleDetails(vehicleResponse.data);
      //   }
      // };
      // call async func
      getParkingDetails();
    } catch (error) {
      console.error(`Error fetching parking data for}`);
    }
  }, []);

  useEffect(() => {
    try {
      const getVehicleDetails = async () => {
        // call get to vehicle table for the user id
        const vehicleResponse = await axios.get(
          `http://localhost:8080/api/user/${userId}/vehicle`
        );
        if (vehicleResponse.data) {
          setVehicleDetails(vehicleResponse.data);
        }
      };
      // call async func
      getVehicleDetails();
    } catch (error) {
      console.error(
        `Error fetching vehicles data for ${userId}
          )}`
      );
    }
  }, []);

  useEffect(() => {
    setTotalCost(calculateTotal());
  }, [selectedHours, selectedMins]);

  // Remove the item from the localStorage for meterid and navigate to home page
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

  const handleHourChange = (event) => {
    setSelectedHours(event.target.value);

    // Set minutes to "0" (zero) if hours is selected
    setSelectedMins(0);
  };

  const handleMinsChange = (event) => {
    setSelectedMins(Number(event.target.value)); // convert to number to keep type consistent for calculations

    // Set hours to "0" (zero) if minimum time 30 mins is selected
    if (Number(event.target.value) === 30) {
      setSelectedHours(0);
    }
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
              <h2>{selectedParkingMeter.meterid}</h2>
              {/* parking.location */}
              <p>{selectedParkingMeter.geo_local_area}</p>
              <div>
                <img src={infoIcon} alt="info-icon" />
                <p>Maximum Stay: {getMaxStay()}</p>
              </div>
              <div>
                <img src={timeIcon} alt="time-icon" />
                <h3>Parking Duration</h3>
                <div>
                  <p>Hours:</p>
                  {/* TODO: which is better input field or select and setting the available values */}
                  <select
                    name="hours"
                    id="hours"
                    value={selectedHours}
                    onChange={handleHourChange}
                  >
                    <option value="">Select hours</option>
                    {availableHours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour === maxStay ? maxStay + " (maximum)" : hour}
                      </option>
                    ))}
                  </select>

                  <p>Minutes:</p>
                  <select
                    name="minutes"
                    id="minutes"
                    value={selectedMins}
                    onChange={handleMinsChange}
                  >
                    <option value="">Select Minutes</option>
                    {availableMins.map((mins) => (
                      <option key={mins} value={mins}>
                        {mins === 30 ? "30 (minimum)" : mins}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {/* <p>{calculateTotal()}</p> */}
                  <p>$ {totalCost}</p>
                  <p>Total Cost</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="vehicle"
                    name="vehicle"
                    value={vehicleDetails?.license_plate}
                    style={{ display: "none" }}
                    defaultChecked
                  />
                  <label htmlFor="vehicle">
                    <div>
                      <img src={carIcon} alt="car-icon" />
                      <h3>Your Vehicle</h3>
                    </div>
                    <div>
                      <img src={radioCheckedIcon} alt={"radio-checked-icon"} />
                      <p>{vehicleDetails?.license_plate}</p>
                    </div>
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
