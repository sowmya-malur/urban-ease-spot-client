// Import libraries
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Import components
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";

/**
 * Displays parking duration component 
 * @param {setIsLoggedIn} setIsLoggedIn callback function to parent component (Header) to update Login status
 * @returns {JSX.Element} Returns ParkingDuration component
 */
function BookingPage({ setIsLoggedIn}) {

  //Initialize hooks
  const navigate = useNavigate();

  useEffect(() => {
    // setIsLoggedIn(localStorage.getItem("isLoggedIn"));
     if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, []);
  return <ParkingDuration setIsLoggedIn={setIsLoggedIn}/>;
}

export default BookingPage;
