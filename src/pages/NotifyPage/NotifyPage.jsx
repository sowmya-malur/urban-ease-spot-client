// Import libraries
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// Import components
import ParkingNotification from "../../components/ParkingNotification/ParkingNotification";

function NotifyPage({setIsLoggedIn}){

  // const userId = useParams();

  // console.log("user id in notify", userId);
  
  useEffect(() => {
    console.log("in useeffect notify page");
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return(<ParkingNotification setIsLoggedIn={setIsLoggedIn}/>
  );

}

export default NotifyPage;