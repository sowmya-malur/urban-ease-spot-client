// Import libraries
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Import components
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";

/**
 * 
 * @param {setIsLoggedIn} setIsLoggedIn callback function to set isLoggedIn state variable
 * @param {setUserId} setUserId callback function to set the user id state variable
 * @returns {JSX.Element} ParkingDuration component
 */
function BookingPage({ setIsLoggedIn, setUserId}) {

  const { userId } = useParams();

  useEffect(() => {
    console.log("in useeffect bookinpage");
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return <ParkingDuration setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} userId={userId}/>;
}

export default BookingPage;
