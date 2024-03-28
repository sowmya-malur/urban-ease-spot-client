import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import warningIcon from "../../assets/icons/round_warning_amber_black_24dp.png";
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";

function Notification({ handleEndSession }) {

    const[expireSoon, setExpireSoon] = useState(false);
    const navigate = useNavigate();
    return (
        <main>
            <img
                src={backIcon}
                onClick={() => {
                  // handleClick(false);
                  // setShowComponent("home-page");
                  navigate("/");
                }}
                alt="back-icon"
              />
              <h1>Notification</h1>
              <p>Meter #</p>
              {/* parking.meterid */}
              <h2>872503</h2>
              {/* parking.location */}
              <p>Fairview</p>

            {expireSoon? (
                <>
                <div>
                    <img 
                    src={warningIcon}
                    alt="warning-icon"/>
                <p>Your parking will expire soon, at</p>
                <p>March 19, 12:30 pm</p>
                <p>Please remove your car to avoid penalties.</p>
            </div>
            <button onClick={handleEndSession}>End Parking Session</button>

                </>
            ) :
            ( <>
            <div>
                <p>Your parking is set to expire at</p>
                <p>March 19, 12:30 pm</p>
                <p>We will notify you 15 minutes before your parking session expires.</p>
            </div>
            <button onClick={()=> navigate("/")}>Okay</button>
            </>)
}    
        
        </main>
        
    );
    }
    
export default Notification;