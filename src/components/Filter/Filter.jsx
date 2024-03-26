import { useNavigate, useParams } from "react-router-dom";

// Import icons
import back from "../../assets/icons/round_arrow_back_black_24dp.png";
import payment from "../../assets/icons/round_payment_black_24dp.png";
import motorbike from "../../assets/icons/round_two_wheeler_black_24dp.png";
import accessible from "../../assets/icons/round_accessible_forward_black_24dp.png";
import checkBoxSelected from "../../assets/icons/round_check_box_black_24dp.png";
import checkBoxEmpty from "../../assets/icons/round_check_box_outline_blank_black_24dp.png";

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

  return (
    <>
      <div>
        <img
          src={back}
          onClick={() => {
            handleClick(false);
            navigate("/");
          }}
          alt="back-icon"
        />
        <p>Filter</p>
      </div>
      <input
        type="checkbox"
        id="acceptCreditCard"
        style={{ display: "none" }} // hide the default checkbox. TODO: in scss
      />
      <label htmlFor="acceptCreditCard">
        <div>
          <img src={payment} alt="payment-icon" onClick={sendDataToHomePage} />
          Show spots that accept credit card
        </div>  
        <img src={checkBoxSelected} alt="check-box-selected" />
      </label>
    </>
  );
}

export default Filter;
