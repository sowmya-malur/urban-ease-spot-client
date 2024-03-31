// Import libraries
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// Import components
import ParkingNotification from "../../components/ParkingNotification/ParkingNotification";

function NotifyPage({setIsLoggedIn, setUserId}){

  const userId = useParams();

  useEffect(() => {
    console.log("in useeffect bookinpage");
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return(<ParkingNotification setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} userId={userId}/>
  );

}

export default NotifyPage;