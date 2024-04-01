import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import formatDateToLocale from "../../util";

// Import styling
import "../ParkingNotification/ParkingNotification.scss";

// Import icons
import warningIcon from "../../assets/icons/round_warning_amber_black_24dp.png";
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";

function ParkingNotification({setIsLoggedIn, setUserId, userId}) {

  // Initialize hooks
  const navigate = useNavigate();
  console.log("notification page userId", userId);

  // Initialize state variables
  const [expireSoon, setExpireSoon] = useState(false);
  const [bookingData, setBookingData] = useState({});

  useEffect(()=>{ 
    const getActiveBooking = async() => {

      const response = await axios.get(`http://localhost:8080/api/booking/user/1`);
      console.log("response",response.data);
      if(response.data && response.status === 200) {
        setBookingData(response.data);
        setExpireSoon(true);
      }
    }

    // call to async func
    getActiveBooking();
  },[userId]);

  const handleEndSession = async() => {
try {
  const response = await axios.put(`http://localhost:8080/api/booking/${bookingData.meter_id}/user/1`, 
    { 
      id: bookingData.id,
      status: "complete"
  });

    if(response.data && response.status === 200){
      alert("Parking session ended.");
      setBookingData({});
      setExpireSoon(false);
      navigate(`/${userId}`);
    }
} catch (error) {
  console.error("Error ending the parking session");
}
    
   
  };

  return (
    <main>
      <section className="notification">
        <div className="notification__page-header">
          <img
            className="notification__icon"
            src={backIcon}
            onClick={() => {
              navigate(`/${userId}`);
            }}
            alt="back-icon"
          />
          <h1 className="notification__title">Notification</h1>
        </div>
        {bookingData? (
          <div className="notification__meter-info">
          <p>Meter #</p>
          <h2 className="notification__sub-title">{bookingData.meter_id}</h2>
          <p>{bookingData.location}</p>
        </div>
        ): 
          <>
          <p className="notification__info">Currently, there are no active parking sessions associated with this account.</p>
          </>
        }
        {expireSoon ? (
          <>
            <div className="notification__container notification__container--top-spacing">
              <img
                src={warningIcon}
                alt="warning-icon"
                className="notification__icon notification__icon--warning"
              />
              <p className="notification__info">
                Your parking will expire at
              </p>
              <p className="notification__time">{formatDateToLocale(bookingData.end_time)}</p>
              <p className="notification__info">
                Please remove your car to avoid penalties.
              </p>
            </div>
            <div className="notification__wrapper">
              <button className="notification__secondary" onClick={()=> navigate("/")}>Dismiss</button>
              <button className="notification__cta" onClick={handleEndSession}>
                End Parking Session
              </button>
            </div>
          </>
        ) : ""}
      </section>
    </main>
  );
}

export default ParkingNotification;
