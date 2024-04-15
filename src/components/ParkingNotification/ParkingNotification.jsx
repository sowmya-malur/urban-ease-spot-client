// Import libraries
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Import functions from util.js
import { formatDateToLocale } from "../../util";

// Import styling
import "../ParkingNotification/ParkingNotification.scss";

// Import icons
import warningIcon from "../../assets/icons/round_warning_amber_black_24dp.png";
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";
import errorIcon from "../../assets/icons/error-24px.svg";

/**
 * Component to notify the user of active parking sessions
 * @returns {JSX.Element} Returns parking notification component
 */
function ParkingNotification() {
  // Initialize hooks
  const navigate = useNavigate();

  // Get user id from local storage if it exists
  let userId = 0;
  if (localStorage.getItem("isLoggedIn")) {
    userId = localStorage.getItem("userId");
  }

  // Initialize state variables
  const [expireSoon, setExpireSoon] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [errors, setErrors] = useState({});

  // Get active bookings for the user id to display
  // If there are no active bookings, display default message
  useEffect(() => {
    const getActiveBooking = async () => {
      try {
        if (localStorage.getItem("isLoggedIn")) {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/booking/user/${userId}`
          );

          if (response.data && response.status === 200) {
            setBookingData(response.data);
            setExpireSoon(true);
          }
        }
      } catch (error) {
        console.error("Error retrieving active booking:", error);
      }
    };

    // call to async func
    getActiveBooking();
  }, [userId]);

  // Update the active booking to complete and release the parking spot
  const handleEndSession = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/booking/${bookingData.meter_id}/user/${userId}`,
        {
          id: bookingData.id,
          status: "complete",
        }
      );

      if (response.data && response.status === 200) {
        setErrors({});
        setBookingData(null);
        setExpireSoon(false);
        alert("Parking session ended successfully.");
        navigate("/");
      }
    } catch (error) {
      setErrors({
        exception: "Error ending parking session. Please try again later.",
      });
      console.error("Error ending the parking session", error);
    }
  };

  const handleDismiss = () => {
    navigate("/");
  };

  return (
    <main className="main">
      <section className="notification">
        <div className="notification__page-header">
          <img
            className="notification__icon"
            src={backIcon}
            onClick={handleDismiss}
            alt="back-icon"
          />
          <h1 className="notification__title">Notification</h1>
        </div>

        {/* Display details of active booking if it exists */}
        {bookingData && expireSoon && (
          <>
            <div className="notification__meter-info">
              <p>Meter #</p>
              <h2 className="notification__sub-title">
                {bookingData?.meter_id}
              </h2>
              <p>{bookingData?.location}</p>
            </div>
            <div className="notification__container notification__container--top-spacing">
              <img
                src={warningIcon}
                alt="warning-icon"
                className="notification__icon notification__icon--warning"
              />
              <p className="notification__info">Your parking will expire at</p>
              <p className="notification__time">
                {formatDateToLocale(bookingData?.end_time)}
              </p>
              <p className="notification__info">
                Please remove your car to avoid penalties.
              </p>
            </div>
            <div className="notification__button-cont">
              <button
                className="notification__secondary"
                onClick={handleDismiss}
              >
                Dismiss
              </button>
              <button className="notification__cta" onClick={handleEndSession}>
                End Parking Session
              </button>
            </div>
          </>
        )}
        {/* Display default message if there are no active bookings for the user */}
        {!bookingData && !expireSoon && (
          <p className="notification__default">
            Currently, there are no active parking sessions associated with this
            account.
          </p>
        )}

        {errors.exception && (
          <div className="notification__error-message notification__error-message--align">
            <img src={errorIcon} alt="error icon" />
            <p>{errors.exception}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default ParkingNotification;
