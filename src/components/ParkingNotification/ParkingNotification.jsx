import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import formatDateToLocale from "../../util";

// Import components
import LoginPage from "../../pages/LoginPage/LoginPage";

// Import styling
import "../ParkingNotification/ParkingNotification.scss";

// Import icons
import warningIcon from "../../assets/icons/round_warning_amber_black_24dp.png";
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";

function ParkingNotification({ setIsLoggedIn }) {
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

  // Set the isloggedIn state variable from localStorage on mount
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, []);

  // Get active bookings for the user id to display
  // If there are no active bookings, display default message
  useEffect(() => {
    const getActiveBooking = async () => {
      try {
        if (localStorage.getItem("isLoggedIn")) {
          const response = await axios.get(
            `http://localhost:8080/api/booking/user/${userId}`
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
        `http://localhost:8080/api/booking/${bookingData.meter_id}/user/${userId}`,
        {
          id: bookingData.id,
          status: "complete",
        }
      );

      if (response.data && response.status === 200) {
        alert("Parking session ended successfully.");
        setBookingData(null);
        setExpireSoon(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error ending the parking session", error);
    }
  };

  const handleDismiss = () => {
    navigate("/");
  };

  return (
    <main>
      {/* Redirect user to Login page if user is not logged in */}
      {!localStorage.getItem("isLoggedIn") ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
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
                <p className="notification__info">
                  Your parking will expire at
                </p>
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
                <button
                  className="notification__cta"
                  onClick={handleEndSession}
                >
                  End Parking Session
                </button>
              </div>
            </>
          )}
          {/* Display default message if there are no active bookings for the user */}
          {!bookingData && !expireSoon && (
            <p className="notification__default">
              Currently, there are no active parking sessions associated with
              this account.
            </p>
          )}
        </section>
      )}
    </main>
  );
}

export default ParkingNotification;
