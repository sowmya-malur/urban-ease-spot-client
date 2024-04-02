// Import components
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";
import LoginPage from "../LoginPage/LoginPage";

/**
 * Displays parking duration component 
 * @param {setIsLoggedIn} setIsLoggedIn callback function to parent component (Header) to update Login status
 * @returns {JSX.Element} Returns ParkingDuration component
 */
function BookingPage({ setIsLoggedIn}) {

  return (
    <>
    {/* Redirect user to Login page if user is not logged in */}
    {!localStorage.getItem("isLoggedIn") ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
   
  <ParkingDuration setIsLoggedIn={setIsLoggedIn}/>)
}
</>
  );
}

export default BookingPage;
