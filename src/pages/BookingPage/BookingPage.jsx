import { useEffect } from "react";
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";

function BookingPage({ setIsLoggedIn }) {
  useEffect(() => {
    console.log("in useeffect bookinpage");
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return <ParkingDuration setIsLoggedIn={setIsLoggedIn}/>;
}

export default BookingPage;
