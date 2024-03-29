import { useEffect } from "react";
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";

function BookingPage({setIsLoggedIn}) {

    useEffect(()=>{
        console.log("inuseeffect bookinpage");
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    },[])
   
    return(
        <ParkingDuration />
    );
}

export default BookingPage;