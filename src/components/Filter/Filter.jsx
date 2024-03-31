import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import style
import "../Filter/Filter.scss";

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
  // Initialize hooks
  const navigate = useNavigate();

  // Initialize state variables
  const [isPaymentChecked, setIsPaymentChecked] = useState(
    localStorage.getItem("isPaymentChecked") === "true" || false
  );
  const [isDisabilityChecked, setIsDisabilityChecked] = useState(
    localStorage.getItem("isDisabilityChecked") === "true" || false
  );
  const [isMotorbikeChecked, setIsMotorbikeChecked] = useState(
    localStorage.getItem("isMotorbikeChecked") === "true" || false
  );
  const [isAvailableChecked, setIsAvailableChecked] = useState(
    localStorage.getItem("isAvailableChecked") === "true" || false
  );

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

    // set the localStorage only when "apply" is clicked
    localStorage.setItem("isPaymentChecked", isPaymentChecked);
    localStorage.setItem("isDisabilityChecked", isDisabilityChecked);
    localStorage.setItem("isMotorbikeChecked", isMotorbikeChecked);
    localStorage.setItem("isAvailableChecked", isAvailableChecked);

    // Call the callback function with the filter data
    handleFilterOptions(filterOptions);
    handleClick(false);
    navigate("/");
  };

  return (
    <main>
      <section className="filter">
        <div className="filter__page-header">
          <img
            className="filter__icon"
            src={backIcon}
            onClick={() => {
              handleClick(false);
              navigate("/");
            }}
            alt="back-icon"
          />
          <h1 className="filter__title">Filter</h1>
        </div>

        <div className="filter__outer-cont">
        {/* Accept Credit Card Payment */}
        <div className="filter__options">
          <input
            type="checkbox"
            id="acceptCreditCard"
            className="filter__checkbox"
          />

          <div className="filter__container">
            <img
              src={paymentIcon}
              alt="payment-icon"
              className="filter__icon"
            />
            Accept credit cards
          </div>
          <label
            htmlFor="acceptCreditCard"
            onClick={handlePaymentChange}
            className="filter__label"
          >
            <img
              className="filter__icon"
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
        <div className="filter__options">
          <input
            type="checkbox"
            id="disabilityParking"
            className="filter__checkbox"
          />

          <div className="filter__container">
            <img
              src={disabilityIcon}
              alt="disability-icon"
              className="filter__icon"
            />
            Disability Parking
          </div>
          <label
            htmlFor="disabilityParking"
            onClick={handleDisabilityChange}
            className="filter__label"
          >
            <img
              className="filter__icon"
              src={
                isDisabilityChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon
              }
              alt={
                isDisabilityChecked
                  ? "check-box-selected-icon"
                  : "check-box-unselected-icon"
              }
            />
          </label>
        </div>

        {/* Show Motorbike Parking Spots */}
        <div className="filter__options">
          <input
            type="checkbox"
            id="motorbikeParking"
            className="filter__checkbox"
          />

          <div className="filter__container">
            <img
              src={motorbikeIcon}
              alt="motorbike-icon"
              className="filter__icon"
            />
            Motorbike Parking
          </div>
          <label
            htmlFor="motorbikeParking"
            onClick={handleMotorbikeChange}
            className="filter__label"
          >
            <img
              className="filter__icon"
              src={
                isMotorbikeChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon
              }
              alt={
                isMotorbikeChecked
                  ? "check-box-selected-icon"
                  : "check-box-unselected-icon"
              }
            />
          </label>
        </div>

        {/* Show Available Parking Spots */}
        <div className="filter__options">
          <input
            type="checkbox"
            id="availableParking"
            className="filter__checkbox"
          />
          <div className="filter__container">
            <img
              src={availableIcon}
              alt="available-icon"
              className="filter__icon"
            />
            Show Available Parking
          </div>
          <label
            htmlFor="availableParking"
            onClick={handleAvailableChange}
            className="filter__label"
          >
            <img
              className="filter__icon"
              src={
                isAvailableChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon
              }
              alt={
                isAvailableChecked
                  ? "check-box-selected-icon"
                  : "check-box-unselected-icon"
              }
            />
          </label>
        </div>
        </div>
        <div className="filter__button-cont">
          <button className="filter__secondary" onClick={handleClear}>
            Clear Filters
          </button>
          <button className="filter__cta" onClick={sendDataToHomePage}>
            Apply
          </button>
        </div>
      </section>
    </main>
  );
}

export default Filter;
