import { useNavigate, useParams } from "react-router-dom";
import back from "../../assets/icons/round_arrow_back_black_24dp.png";

function ParkingDuration({ handleClick }) {
    const navigate = useNavigate();
    return(
        <>
        <img 
        src={back}
        onClick={() => { 
            handleClick(false); 
            navigate("/")}}
        alt="back-icon"/>
        <p>Parking Duration</p>
        </>
        
    );
}

export default ParkingDuration;