import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Import styling
import "../ParkingNotification/ParkingNotification.scss";

// Import icons
import warningIcon from "../../assets/icons/round_warning_amber_black_24dp.png";
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";

function ParkingNotification({setIsLoggedIn, setUserId, userId}) {
  // Initialize hooks
  const navigate = useNavigate();
  console.log("userId", userId);
  // Initialize state variables
  const [expireSoon, setExpireSoon] = useState(false);

  const handleEndSession = () => {
    console.log("handleEndSession");
    navigate("/");
  };

  return (
    <main>
      <section className="notification">
        <div className="notification__page-header">
          <img
            className="notification__icon"
            src={backIcon}
            onClick={() => {
              // handleClick(false);
              // setShowComponent("home-page");
              navigate("/");
            }}
            alt="back-icon"
          />
          <h1 className="notification__title">Notification</h1>
        </div>
        <div className="notification__meter-info">
          <p>Meter #</p>
          {/* parking.meterid */}
          <h2 className="notification__sub-title">872503</h2>
          {/* parking.location */}
          <p>Fairview</p>
        </div>
        {expireSoon ? (
          <>
            <div className="notification__container notification__container--top-spacing">
              <img
                src={warningIcon}
                alt="warning-icon"
                className="notification__icon notification__icon--warning"
              />
              <p className="notification__info">
                Your parking will expire soon, at
              </p>
              <p className="notification__time">March 19, 12:30 pm</p>
              <p className="notification__info">
                Please remove your car to avoid penalties.
              </p>
            </div>
            <div className="notification__wrapper">
              <button className="notification__cta" onClick={handleEndSession}>
                End Parking Session
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="notification__container">
              <p className="notification__info">
                Your parking is set to expire at
              </p>
              <p className="notification__time">March 19, 12:30 pm</p>
              <p className="notification__info">
                We will notify you 15 minutes before your parking session
                expires.
              </p>
            </div>
            <div className="notification__wrapper">
              <button
                className="notification__cta"
                onClick={() => navigate("/")}
              >
                Okay
              </button>
            </div>
          </>
        )}{" "}
      </section>
    </main>
  );
}

export default ParkingNotification;
