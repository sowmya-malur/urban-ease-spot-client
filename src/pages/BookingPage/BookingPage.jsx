// Import components
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";

/**
 * Displays parking duration component 
 * @param {setIsLoggedIn} setIsLoggedIn callback function to parent component (Header) to update Login status
 * @returns {JSX.Element} Returns ParkingDuration component
 */
function BookingPage({ setIsLoggedIn}) {
  return <ParkingDuration setIsLoggedIn={setIsLoggedIn}/>;
}

export default BookingPage;
