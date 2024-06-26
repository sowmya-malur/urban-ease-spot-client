// Import components
import ParkingNotification from "../../components/ParkingNotification/ParkingNotification";
import LoginPage from "../LoginPage/LoginPage";

/**
 * Displays parking notifications
 * @param {setIsLoggedIn} setIsLoggedIn callback function to parent component (Header) to update Login status
 * @returns {JSX.Element} Return parking notification component
 */
function NotifyPage({ setIsLoggedIn }) {
  return (
    <>
      {/* Redirect user to Login page if user is not logged in */}
      {!localStorage.getItem("isLoggedIn") ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <ParkingNotification />
      )}
    </>
  );
}

export default NotifyPage;
