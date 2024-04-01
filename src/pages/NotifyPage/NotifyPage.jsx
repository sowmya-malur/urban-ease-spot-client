// Import components
import ParkingNotification from "../../components/ParkingNotification/ParkingNotification";

/**
 * Displays parking notifications
 * @param {setIsLoggedIn} setIsLoggedIn callback function to parent component (Header) to update Login status
 * @returns {JSX.Element} Return parking notification component
 */
function NotifyPage({ setIsLoggedIn }) {
  return <ParkingNotification setIsLoggedIn={setIsLoggedIn} />;
}

export default NotifyPage;
