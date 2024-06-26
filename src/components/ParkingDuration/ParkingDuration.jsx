// Import libraries
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Import styling
import "../ParkingDuration/ParkingDuration.scss";

// Import components
import ConfirmParking from "../ConfirmParking/ConfirmParking";

// Import icons
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";
import timeIcon from "../../assets/icons/round_schedule_black_24dp.png";
import radioCheckedIcon from "../../assets/icons/round_radio_button_checked_black_24dp.png";
import carIcon from "../../assets/icons/round_directions_car_black_24dp.png";
import infoIcon from "../../assets/icons/round_info_outline_black_24dp.png";
import errorIcon from "../../assets/icons/error-24px.svg";

/**
 * Component to allow user to select parking duration for the selected parking meter
 * @returns {JSX.Element} Returns parking duration component
 */
function ParkingDuration() {
  let userId;
  if (localStorage.getItem("isLoggedIn")) {
    userId = localStorage.getItem("userId");
  }

  //Initialize hooks
  const navigate = useNavigate();

  // Initialize state variables
  const [showComponent, setShowComponent] = useState(false);
  const [selectedParkingMeter, setSelectedParkingMeter] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMins, setSelectedMins] = useState(30);
  const [availableHours, setAvailableHours] = useState([]);
  const [maxStay, setMaxStay] = useState(0);
  const [totalCost, setTotalCost] = useState(0.0);

  // Initialize constants
  const availableMins = [0, 30];
  const currentTimeStamp = Date.now();
  const currentDate = new Date(currentTimeStamp);
  const currentHours = currentDate.getHours();
  const currentDay = currentDate.getDay();

  // Func to get max stay from the selectedParkingMeter object based on current day and hours
  const getMaxStay = () => {
    let maximumStay;

    if (selectedParkingMeter?.meterid) {
      // Weekday: M-F
      if (currentDay >= 1 && currentDay <= 5) {
        if (currentHours >= 9 && currentHours < 18) {
          // M-F: Between 9 am and 6 pm
          maximumStay = selectedParkingMeter.t_mf_9a_6p;
        } else if (currentHours >= 18 && currentHours < 22) {
          // M-F: Between 6 pm and 10 pm
          maximumStay = selectedParkingMeter.t_mf_6p_10;
        } else {
          // M-F: between 10 pm and 9 am
          maximumStay = "11 hr";
        }
      } else if (currentDay === 6) {
        // Sat
        if (currentHours >= 9 && currentHours < 18) {
          // Sat: Between 9 am and 6 pm

          maximumStay = selectedParkingMeter.t_sa_9a_6p;
        } else if (currentHours >= 18 && currentHours < 22) {
          // Sat: Between 6 pm and 10 pm
          maximumStay = selectedParkingMeter.t_sa_6p_10;
        } else {
          // Sat: Between 10 pm and 9 am
          maximumStay = "11 hr";
        }
      } else {
        // Sun
        if (currentHours >= 9 && currentHours < 18) {
          // Sun: Between 9 am and 6 pm
          maximumStay = selectedParkingMeter.t_su_9a_6p;
        } else if (currentHours >= 18 && currentHours < 22) {
          // Sun: Between 6 pm and 10 pm
          maximumStay = selectedParkingMeter.t_su_6p_10;
        } else {
          // Sun: Between 10 pm and 9 am
          maximumStay = "11 hr";
        }
      }
    } else {
      maximumStay = 0;
    }
    return maximumStay;
  };

  // Func to calculate Total Cost based on rate for current hours and day and selected duration
  const calculateTotal = () => {
    let currentRate = 0.0;
    let totalCost = 0.0;

    // Weekday: M-F
    if (currentDay >= 1 && currentDay <= 5) {
      if (currentHours >= 9 && currentHours < 18) {
        // M-F: Between 9 am and 6 pm
        currentRate = selectedParkingMeter.r_mf_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // M-F: Between 6 pm and 10 pm
        currentRate = selectedParkingMeter.r_mf_6p_10;
      } else {
        // M-F: Between 10 pm and 9 am
        currentRate = 0.0;
      }
    } else if (currentDay === 6) {
      // Sat

      if (currentHours >= 9 && currentHours < 18) {
        // Sat: Between 9 am and 6 pm
        currentRate = selectedParkingMeter.r_sa_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // Sat: Between 6 pm and 10 pm
        currentRate = selectedParkingMeter.r_sa_6p_10;
      } else {
        // Sat: Between 10 pm and 9 am
        currentRate = 0.0;
      }
    } else {
      // Sun
      if (currentHours >= 9 && currentHours < 18) {
        // Sun: Between 9 am and 6 pm
        currentRate = selectedParkingMeter.r_su_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // Sun: Between 6 pm and 10 pm
        currentRate = selectedParkingMeter.r_su_6p_10;
      } else {
        // Sun: Between 10 pm and 9 am
        currentRate = 0.0;
      }
    }

    if (selectedHours >= 1) {
      totalCost = (currentRate * selectedHours).toFixed(2);
    }
    if (Number(selectedMins) === 30) {
      totalCost = (currentRate / 2).toFixed(2);
    }
    return totalCost;
  };

  // Prevent the user from booking if it is free parking hours
  useEffect(() => {
    if (currentHours >= 22 || currentHours < 9) {
      navigate("/");
    }
  }, []);

  // Prevent the user from booking if there is an active parking session and redirect the user to notification page
  useEffect(() => {
    const getActiveBooking = async () => {
      try {
        if (localStorage.getItem("isLoggedIn")) {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/booking/user/${userId}`
          );
          if (response.data && response.status === 200) {
            navigate("/notification");
          }
        }
      } catch (error) {
        console.error("Error retrieving active booking:", error);
      }
    };

    // call to async func
    getActiveBooking();
  }, [userId]);

  // Get parking details for the selected Meter Id on mount
  useEffect(() => {
    const getParkingDetails = async () => {
      try {
        if (localStorage.getItem("selectedMeterId")) {
          const meterId = localStorage.getItem("selectedMeterId");
          const parkingResponse = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/parking/${meterId}`
          );

          if (parkingResponse.data) {
            setSelectedParkingMeter(parkingResponse.data);
          }
        }
      } catch (error) {
        setSelectedParkingMeter({});
        console.error(`Error fetching parking data: ${error}`);
      }
    };

    // call async func
    getParkingDetails();
  }, []);

  // Calculate the available hours based on max stay information if selectedParkingMetter data is available
  // Calculate total cost for default 30 mins on mount
  useEffect(() => {
    try {
      // Check if selectedParkingMeter has been fetched before calling getMaxStay and calculateTotal
      if (selectedParkingMeter?.meterid) {
        const maximumStayAllowed = getMaxStay();
        if (maximumStayAllowed) {
          // Calculate available hours based on maximum stay
          const maximumStay = parseInt(maximumStayAllowed.match(/\d+/)[0]);
          const availableHrs = Array.from(
            { length: maximumStay },
            (_, i) => i + 1
          );
          setMaxStay(maximumStay);
          setAvailableHours(availableHrs);
        }
        // Calculate total cost
        const output = calculateTotal();
        setTotalCost(output);
      }
    } catch (error) {
      console.error(
        `Error calculating maximum stay allowed and total cost, ${error}
          )}`
      );
    }
  }, [selectedParkingMeter]);

  // Get vehicle details for the user Id on mount
  useEffect(() => {
    const getVehicleDetails = async () => {
      try {
        if (localStorage.getItem("isLoggedIn")) {
          // call get to vehicle table for the user id
          const vehicleResponse = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/vehicle`
          );

          if (vehicleResponse.data && vehicleResponse.status === 200) {
            setVehicleDetails(vehicleResponse.data);
          }
        }
      } catch (error) {
        setVehicleDetails({});
        console.error(`Error fetching vehicles data for ${userId}: ${error}`);
      }
    };

    // call async func
    getVehicleDetails();
  }, [localStorage.getItem("isLoggedIn") === "true"]);

  // Set total cost when user picks hours and mins from drop down
  useEffect(() => {
    setTotalCost(calculateTotal());
  }, [selectedHours, selectedMins]);

  // Remove the item from the localStorage for meterid and navigate to home page
  const handleCancel = () => {
    localStorage.removeItem("selectedMeterId");
    navigate("/");
  };

  // Render confirm parking component on proceed to park
  const handlePark = () => {
    setShowComponent("confirm-parking");
  };

  // Set hours and mins on change to drop down fields
  // If user chooses hrs, set to default "0" minutes
  const handleHourChange = (event) => {
    setSelectedHours(event.target.value);

    // Set minutes to "0" (zero) if hours is selected
    setSelectedMins(0);
  };

  // Set hours and mins on change to drop down fields
  // If user chooses minutes, set to default "0" hours
  const handleMinsChange = (event) => {
    setSelectedMins(Number(event.target.value)); // convert to number to keep type consistent for calculations

    // Set hours to "0" (zero) if minimum time 30 mins is selected
    if (Number(event.target.value) === 30) {
      setSelectedHours(0);
    }
  };

  return (
    <main>
      <>
        {!showComponent ? (
          Object.keys(selectedParkingMeter).length > 0 &&
          Object.keys(vehicleDetails).length > 0 ? (
            <section className="duration">
              {/* Page header */}
              <div className="duration__page-header">
                <img
                  className="duration__icon"
                  src={backIcon}
                  onClick={() => {
                    localStorage.removeItem("selectedMeterId");
                    navigate("/");
                  }}
                  alt="back-icon"
                />
                <h1 className="duration__title">Select Parking Duration</h1>
              </div>

              {/* Meter Info  */}
              <div className="duration__meter-info">
                <p>Meter #</p>
                <h2 className="duration__sub-title">
                  {selectedParkingMeter.meterid}
                </h2>
                <p>{selectedParkingMeter.geo_local_area}</p>
              </div>

              {/* Maximum Stay */}
              <div className="duration__wrapper duration__wrapper--background">
                <img
                  className="duration__icon"
                  src={infoIcon}
                  alt="info-icon"
                />
                <p className="duration__stay">Maximum Stay: {getMaxStay()}</p>
              </div>

              {/* Select Parking Duration */}
              <div className="duration__time-container">
                <div className="duration__wrapper">
                  <img
                    className="duration__icon"
                    src={timeIcon}
                    alt="time-icon"
                  />
                  <h3 className="duration__sub-header">Parking Duration</h3>
                </div>

                <div className="three-column">
                  <div className="duration__hrs-wrapper">
                    <p className="duration__heading">Hours:</p>
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
                  </div>
                  <div className="duration__mins-wrapper">
                    <p className="duration__heading">Minutes:</p>
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
                  <div className="duration__cost-wrapper">
                    <p className="duration__heading">Total Cost:</p>
                    <p className="duration__cost">$ {totalCost}</p>
                  </div>
                </div>
              </div>

              {/* Your Vehicle */}
              <div>
                <input
                  type="radio"
                  id="vehicle"
                  name="vehicle"
                  value={
                    vehicleDetails
                      ? vehicleDetails.license_plate
                      : "Missing information"
                  }
                  style={{ display: "none" }}
                  defaultChecked
                />
                <label htmlFor="vehicle" className="className__label">
                  <div className="duration__wrapper duration__wrapper--border-top">
                    <img
                      className="duration__icon"
                      src={carIcon}
                      alt="car-icon"
                    />
                    <h3 className="duration__sub-header">Your Vehicle</h3>
                  </div>
                </label>
              </div>
              <div className="duration__inner-wrapper">
                <img
                  className="duration__radio-icon"
                  src={radioCheckedIcon}
                  alt={"radio-checked-icon"}
                />
                <p className="duration__info">
                  {vehicleDetails
                    ? vehicleDetails.license_plate
                    : "Missing information"}
                </p>
              </div>

              <div className="duration__button-cont">
                <button className="filter__secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="filter__cta" onClick={handlePark}>
                  Proceed to Park
                </button>
              </div>
            </section>
          ) : (
            <div className="duration__error-message duration__error-message--align">
              <img src={errorIcon} alt="error icon" />
              <p>Something went wrong. Please try again later.</p>
            </div>
          )
        ) : (
          ""
        )}

        {showComponent === "confirm-parking" && (
          <ConfirmParking
            currentTimeStamp={currentTimeStamp}
            userId={userId}
            licensePlate={vehicleDetails?.license_plate}
            totalCost={totalCost}
            selectedHours={selectedHours}
            selectedMins={selectedMins}
            selectedParkingMeter={selectedParkingMeter}
            handleCancel={() => {
              localStorage.removeItem("selectedMeterId");
              setShowComponent(false);
              navigate("/");
            }}
          />
        )}
      </>
    </main>
  );
}

export default ParkingDuration;
