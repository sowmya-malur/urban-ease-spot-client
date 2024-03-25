import { useNavigate, useParams } from "react-router-dom";
import back from "../../assets/icons/round_arrow_back_black_24dp.png";
import payment from "../../assets/icons/round_payment_black_24dp.png";

function Filter({ handleClick, handleFilterOptions }) {
    const navigate = useNavigate();

    const sendDataToHomePage = () => {
        // Example data
        const filterOptions = {
          acceptCreditCard: true,
        };
        // Call the callback function with the filter data
        handleFilterOptions(filterOptions);
      };

    return(
        <>
        <img 
        src={back}
        onClick={() => { 
            handleClick(false); 
            navigate("/")}}
        alt="back-icon"/>
        <p>Filter</p>
        <img 
        src={payment} 
        alt="payment-icon"
        onClick={sendDataToHomePage}/>
        Show spots that accept credit card
        </>
        
    );
}

export default Filter;