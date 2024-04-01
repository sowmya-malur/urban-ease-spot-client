// Import libraries
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// Import components
import ParkingNotification from "../../components/ParkingNotification/ParkingNotification";

/**
 * Displays parking notifications
 * @param {setIsLoggedIn} setIsLoggedIn callback function to parent component (Header) to update Login status
 * @returns {JSX.Element} Return parking notification component
 */
function NotifyPage({ setIsLoggedIn }) {
  // Set isLoggedIn on mount in a callback
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return <ParkingNotification setIsLoggedIn={setIsLoggedIn} />;
}

export default NotifyPage;
