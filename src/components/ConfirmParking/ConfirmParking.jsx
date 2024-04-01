// Import libraries
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Import styling
import "../ConfirmParking/ConfirmParking.scss";

// Import functions from util.js
import formatDateToLocale from "../../util";

// Import icons
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";
import timeIcon from "../../assets/icons/round_schedule_black_24dp.png";
import carIcon from "../../assets/icons/round_directions_car_black_24dp.png";
import locationIcon from "../../assets/icons/round_where_to_vote_black_24dp.png";
import paymentIcon from "../../assets/icons/round_payment_black_24dp.png";
import checkBoxEmptyIcon from "../../assets/icons/round_check_box_outline_blank_black_24dp.png";
import checkBoxSelectedIcon from "../../assets/icons/round_check_box_black_24dp.png";
import priceIcon from "../../assets/icons/round_attach_money_black_24dp.png";
import alertIcon from "../../assets/icons/round_notifications_none_black_24dp.png";

/**
 * Confirm Parking component with Location, Parking Duration, Payment, Vehicle and Price details
 * @param {currentTimeStamp} currentTimeStamp time stamp for the start time of the parking session
 * @param {userId} userId user id is passed from the parking duration component
 * @param {licensePlate} licensePlate vehicle details
 * @param {totalCost} totalCost total cost calculated for the selected duration and rate per hour based on day and time
 * @param {selectedHours} selectedHours hours selected by the user from parking duration component
 * @param {selectedMins} selectedMins minutes selected by the user from the parking duration component
 * @param {selectedParkingMeter} selectedParkingMeter selected parking meter details
 * @param {handleCancel} handleCancel call back function to handleCancel to conditionally render component 
 * @returns {JSX.Element} Confirm Parking Component to pay and park
 */
function ConfirmParking({
  currentTimeStamp,
  userId,
  licensePlate,
  totalCost,
  selectedHours,
  selectedMins,
  selectedParkingMeter,
  handleCancel,
}) {

  // Initialize hooks
  const navigate = useNavigate();

  // Initialize state variables
  const [isNotifyChecked, setIsNotifyChecked] = useState(true); // set it to true by default

  // Func to format duration in HH:MM:SS
  const formatDuration = () => {
    // convert hours and mins to seconds
    const durationInSeconds = selectedHours * 3600 + selectedMins * 60;

    // convert into milliseconds
    const durationInMilli = new Date(durationInSeconds * 1000);

    // Extract hours, minutes, and seconds from durationInMilli
    const hours = durationInMilli.getUTCHours().toString().padStart(2, "0");
    const minutes = durationInMilli.getUTCMinutes().toString().padStart(2, "0");
    const seconds = durationInMilli.getUTCSeconds().toString().padStart(2, "0");

    // format "HH:MM:SS"
    return `${hours}:${minutes}:${seconds}`;
  };

  // Func to convert timestamp to ISO, compatible with database format - "YYYY-MM-DD HH:MM:SS"
  const formatToISO = (timeStamp) => {
    const date = new Date(timeStamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Func to calulate end time stamp by adding current time stamp and duration
  const endTimeStamp = () => {
    // convert hours and minutes to milliseconds
    // add to the current time stamp
    const durationMilliseconds =
      selectedHours * 60 * 60 * 1000 + selectedMins * 60 * 1000;
    return currentTimeStamp + durationMilliseconds;
  };

  // Add the booking information with start, end time, duration and active status to the backend. 
  // If successful, remove the seletedMeterId from localStorage 
  // and redirect user to the notification page
  const handlePay = async () => {
    try {
      
      // create booking data information
      const bookingData = {
        start_time: formatToISO(currentTimeStamp),
        end_time: formatToISO(endTimeStamp()),
        duration: formatDuration(),
        status: "active",
      };

      // Make axios call to post booking data
      const response = await axios.post(
        `http://localhost:8080/api/booking/${selectedParkingMeter.meterid}/user/${userId}`, bookingData);

        if(response.status === 201) {
          localStorage.removeItem("selectedMeterId");
          navigate("/notification");
        }
    } catch (error) {
      // Handle errors
      console.error("Error booking parking:", error);
    }
  };

  return (
    <main>
      <section className="confirm">
        <div className="confirm__page-header">
          <img
            className="confirm__icon"
            src={backIcon}
            onClick={handleCancel}
            alt="back-icon"
          />
          <h1 className="confirm__title">Confirm Parking</h1>
        </div>

        {/* Location Details */}
        <div className="confirm__wrapper">
          <img
            className="confirm__icon"
            src={locationIcon}
            alt="location-icon"
          />
          <div className="confirm__location">
            <h2 className="confirm__sub-header">Location Details</h2>
            <p className="confirm__info confirm__info--spacing-top">
              Meter #: {selectedParkingMeter.meterid}
            </p>
            <p className="confirm__info">
              Location: {selectedParkingMeter.geo_local_area}
            </p>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={carIcon} alt="car-icon" />
          <div className="confirm__vehicle">
            <h2 className="confirm__sub-header">Vehicle Details</h2>
            <p className="confirm__info confirm__info--spacing-top">
              License Plate #: {licensePlate}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={paymentIcon} alt="payment-icon" />
          <div className="confirm__payment">
            <h2 className="confirm__sub-header">Payment Details</h2>
            {/* payment.card */}
            <p className="confirm__info confirm__info--spacing-top">
              Card ending with 1234
            </p>
          </div>
        </div>

        {/* Parking Duration */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={timeIcon} alt="time-icon" />
          <div className="confirm__duration">
            <h2 className="confirm__sub-header">Duration</h2>
            <p className="confirm__info confirm__info--spacing-top">
              Start time: {formatDateToLocale(currentTimeStamp)}
            </p>
            {}
            <p className="confirm__info">
              End time: {formatDateToLocale(endTimeStamp())}
            </p>
            <p className="confirm__info">
              Total time: {selectedHours} Hrs {selectedMins} Minutes
            </p>
          </div>
        </div>

        {/* Price Details */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={priceIcon} alt="price-icon" />
          <div className="confirm__cost">
            <h2 className="confirm__sub-header">Price</h2>
            <p className="confirm__info confirm__info--spacing-top">
              Total Cost: ${totalCost}
            </p>
          </div>
        </div>

        {/* Notification */}
        <div className="confirm__notify">
          <input
            type="checkbox"
            id="notifyExpire"
            className="confirm__checkbox"
            defaultChecked
            disabled
          />
          <div className="confirm__container">
            <img className="confirm__icon" src={alertIcon} alt="alert-icon" />
            <p>Notify me 15 minutes before my parking session expires</p>
          </div>
          <label
            htmlFor="notifyExpire"
            className="confirm__label"
            
          >
            <img
              className="confirm__icon"
              src={isNotifyChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon}
              alt={
                isNotifyChecked
                  ? "check-box-selected-icon"
                  : "check-box-unselected-icon"
              }
            />
          </label>
        </div>

        {/* Button Container */}
        <div className="confirm__button-cont">
          <button className="confirm__secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="confirm__cta" onClick={handlePay}>
            Pay & Park
          </button>
        </div>
      </section>
    </main>
  );
}

export default ConfirmParking;
