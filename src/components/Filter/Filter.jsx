import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import icons
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";
import paymentIcon from "../../assets/icons/round_payment_black_24dp.png";
import motorbikeIcon from "../../assets/icons/round_two_wheeler_black_24dp.png";
import disabilityIcon from "../../assets/icons/round_accessible_forward_black_24dp.png";
import checkBoxSelectedIcon from "../../assets/icons/round_check_box_black_24dp.png";
import checkBoxEmptyIcon from "../../assets/icons/round_check_box_outline_blank_black_24dp.png";
import availableIcon from "../../assets/icons/round_where_to_vote_black_24dp.png";

/**
 *
 * @param {Function} handleClick callback function to set show component.
 * @param {Function} handleFilterOptions callback function to send selected filter options.
 * @returns {JSX} Filter options to apply on the JSON parking information.
 */
function Filter({ handleClick, handleFilterOptions }) {
  //   TODO: retain the state of the filter options for the user
  const navigate = useNavigate();

  const [isPaymentChecked, setIsPaymentChecked] = useState(false);
  const [isDisabilityChecked, setIsDisabilityChecked] = useState(false);
  const [isMotorbikeChecked, setIsMotorbikeChecked] = useState(false);
  const [isAvailableChecked, setIsAvailableChecked] = useState(false);

  const handlePaymentChange = () => {
    setIsPaymentChecked(!isPaymentChecked);
  };

  const handleDisabilityChange = () => {
    setIsDisabilityChecked(!isDisabilityChecked);
  };

  const handleMotorbikeChange = () => {
    setIsMotorbikeChecked(!isMotorbikeChecked);
  };

  const handleAvailableChange = () => {
    setIsAvailableChecked(!isAvailableChecked);
  };

  const handleClear = () => {
    setIsPaymentChecked(false);
    setIsDisabilityChecked(false);
    setIsMotorbikeChecked(false);
    setIsAvailableChecked(false);
  };

  const sendDataToHomePage = () => {
    const filterOptions = {
      acceptCreditCard: isPaymentChecked,
      disability: isDisabilityChecked,
      motorbike: isMotorbikeChecked,
      available: isAvailableChecked,
    };

    // Call the callback function with the filter data
    handleFilterOptions(filterOptions);
    handleClick(false);
    navigate("/");
  };

  return (
    <main>
      <div>
        <img
          src={backIcon}
          onClick={() => {
            handleClick(false);
            navigate("/");
          }}
          alt="back-icon"
        />
        <p>Filter</p>
      </div>
      {/* Accept Credit Card Payment */}
      <div>
        <input
          type="checkbox"
          id="acceptCreditCard"
          style={{ display: "none" }} // hide the default checkbox. TODO: in scss
        />
        <label htmlFor="acceptCreditCard" onClick={handlePaymentChange}>
          <div>
            <img src={paymentIcon} alt="payment-icon" />
            Accept credit cards
          </div>
          <img
            src={isPaymentChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon}
            alt={
              isPaymentChecked
                ? "check-box-selected-icon"
                : "check-box-unselected-icon"
            }
          />
        </label>
      </div>

      {/* Show Disability Parking Spots */}
      <div>
        <input
          type="checkbox"
          id="disabilityParking"
          style={{ display: "none" }} // hide the default checkbox. TODO: in scss
        />
        <label htmlFor="disabilityParking" onClick={handleDisabilityChange}>
          <div>
            <img src={disabilityIcon} alt="disability-icon" />
            Disability Parking
          </div>
          <img
            src={isDisabilityChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon}
            alt={
              isDisabilityChecked
                ? "check-box-selected-icon"
                : "check-box-unselected-icon"
            }
          />
        </label>
      </div>

      {/* Show Motorbike Parking Spots */}
      <div>
        <input
          type="checkbox"
          id="motorbikeParking"
          style={{ display: "none" }} // hide the default checkbox. TODO: in scss
        />
        <label htmlFor="motorbikeParking" onClick={handleMotorbikeChange}>
          <div>
            <img src={motorbikeIcon} alt="motorbike-icon" />
            Motorbike Parking
          </div>
          <img
            src={isMotorbikeChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon}
            alt={
              isMotorbikeChecked
                ? "check-box-selected-icon"
                : "check-box-unselected-icon"
            }
          />
        </label>
      </div>

      {/* Show Available Parking Spots */}
      <div>
        <input
          type="checkbox"
          id="availableParking"
          style={{ display: "none" }} // hide the default checkbox. TODO: in scss
        />
        <label htmlFor="availableParking" onClick={handleAvailableChange}>
          <div>
            <img src={availableIcon} alt="available-icon" />
            Show Available Parking
          </div>
          <img
            src={isAvailableChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon}
            alt={
              isAvailableChecked
                ? "check-box-selected-icon"
                : "check-box-unselected-icon"
            }
          />
        </label>
      </div>
      <button onClick={handleClear}>Clear</button>
      <button onClick={sendDataToHomePage}>Apply</button>
    </main>
  );
}

export default Filter;
