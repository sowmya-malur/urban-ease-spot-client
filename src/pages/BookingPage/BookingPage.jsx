// Import libraries
import { useEffect } from "react";

// Import components
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";

/**
 * Displays parking duration component 
 * @param {setIsLoggedIn} setIsLoggedIn callback function to parent component (Header) to update Login status
 * @returns {JSX.Element} Returns ParkingDuration component
 */
function BookingPage({ setIsLoggedIn}) {
  // Set isLoggedIn on mount in a callback
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return <ParkingDuration setIsLoggedIn={setIsLoggedIn}/>;
}

export default BookingPage;
