import { useNavigate, useParams } from "react-router-dom";

function Notification({ handleEndSession }) {

    const navigate = useNavigate();
    return (
        <main>
            <p>Notification</p>
            <button onClick={handleEndSession}>End Session</button>
        </main>
        
    );
    }
    
export default Notification;