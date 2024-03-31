// Import libraries
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Import styling
import "../ConfirmParking/ConfirmParking.scss";

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
  //  console.log("selectedParkingMeter", selectedParkingMeter);

  //  console.log("currentTimestmap", currentTimeStamp);
  // Initialize hooks
  const navigate = useNavigate();

  // Initialize state variables
  const [isNotifyChecked, setIsNotifyChecked] = useState(
    localStorage.getItem("isNotifyChecked") === "true" || false
  );

  useEffect(() => {
    const storedIsNotifyChecked =
      localStorage.getItem("isNotifyChecked") === "true";
    setIsNotifyChecked(storedIsNotifyChecked);
  }, []);

  const handleNotifyChange = () => {
    setIsNotifyChecked(!isNotifyChecked);
    localStorage.setItem("isNotifyChecked", !isNotifyChecked);
  };

  // Func to format date into  Month DD, YYYY HH:MM AM/PM format
  const formatDateToLocale = (timeStamp) => {
    const date = new Date(timeStamp);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

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

  // const startTime = formatDateToLocale(currentTimeStamp);

  // const endTime = formatDateToLocale(endTimeStamp());

  const handlePay = async () => {
    try {
      // Make axios call to post booking data
      const bookingData = {
        start_time: formatToISO(currentTimeStamp),
        end_time: formatToISO(endTimeStamp()),
        duration: formatDuration(),
        status: "active",
        user_id: userId,
        meter_id: selectedParkingMeter.meterid,
      };

      console.log("bookingData", bookingData);
      // const response = await axios.post(`http://localhost:8080/api/booking/${selectedParkingMeter.meterid}/user/${userId}`, bookingData);

      // Handle successful response
      // console.log("Booking successful:", response.data);

      // Proceed with any other logic after successful booking
      // For example, you may want to navigate to another page
    } catch (error) {
      // Handle errors
      console.error("Error booking parking:", error);
      // You may want to display an error message to the user
    }
  };

  return (
    <main>
      <section className="confirm">
        <div className="confirm__page-header">
          <img
            className="confirm__icon"
            src={backIcon}
            onClick={() => {
              // handleClick(false);
              // setShowComponent("parking-duration");
              navigate("/booking"); // TODO: test
            }}
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
            <h3 className="confirm__sub-header">Location Details</h3>

            {/* parking.meterid */}
            <p className="confirm__info confirm__info--spacing-top">
              Meter #: {selectedParkingMeter.meterid}
            </p>
            {/* parking.location */}
            <p className="confirm__info">
              Location: {selectedParkingMeter.geo_local_area}
            </p>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={carIcon} alt="car-icon" />
          <div className="confirm__vehicle">
            <h3 className="confirm__sub-header">Vehicle Details</h3>
            {/* vehicle.license */}
            <p className="confirm__info confirm__info--spacing-top">
              License Plate #: {licensePlate}
            </p>
          </div>
        </div>

        {/* Payment Details */}

        <div className="confirm__wrapper">
          <img className="confirm__icon" src={paymentIcon} alt="payment-icon" />
          <div className="confirm__payment">
            <h3 className="confirm__sub-header">Payment Details</h3>
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
            <h3 className="confirm__sub-header">Duration</h3>
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
            <h3 className="confirm__sub-header">Price</h3>
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
          />
          <div className="confirm__container">
            <img className="confirm__icon" src={alertIcon} alt="alert-icon" />
            <p>Notify me 15 minutes before my parking session expires</p>
          </div>
          <label
            htmlFor="notifyExpire"
            onClick={handleNotifyChange}
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
