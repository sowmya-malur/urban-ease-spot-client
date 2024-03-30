import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Import styling
import "../ConfirmParking/ConfirmParking.scss";

// Import icons
import backIcon from "../../assets/icons/round_arrow_back_black_24dp.png";
import timeIcon from "../../assets/icons/round_schedule_black_24dp.png";
import radioCheckedIcon from "../../assets/icons/round_radio_button_checked_black_24dp.png";
import carIcon from "../../assets/icons/round_directions_car_black_24dp.png";
import infoIcon from "../../assets/icons/round_info_outline_black_24dp.png";
import locationIcon from "../../assets/icons/round_where_to_vote_black_24dp.png";
import paymentIcon from "../../assets/icons/round_payment_black_24dp.png";
import checkBoxEmptyIcon from "../../assets/icons/round_check_box_outline_blank_black_24dp.png";
import checkBoxSelectedIcon from "../../assets/icons/round_check_box_black_24dp.png";
import priceIcon from "../../assets/icons/round_attach_money_black_24dp.png";
import alertIcon from "../../assets/icons/round_notifications_none_black_24dp.png";

function ConfirmParking({ handlePay, handleCancel, selectedParkingMeter }) {
  // Initialize hooks
  const navigate = useNavigate();

  // Initialize state variables
  const [isNotifyChecked, setIsNotifyChecked] = useState(
    localStorage.getItem("isNotifyChecked") === "true" || false
  );

  useEffect(() => {
    const storedIsNotifyChecked =
      localStorage.getItem("isNotifyChecked") === "true";
    setIsNotifyChecked(storedIsNotifyChecked);
  }, []);

  const handleNotifyChange = () => {
    setIsNotifyChecked(!isNotifyChecked);
    localStorage.setItem("isNotifyChecked", !isNotifyChecked);
  };

  return (
    <main>
      <section className="confirm">
        <div className="confirm__page-header">
          <img
            className="confirm__icon"
            src={backIcon}
            onClick={() => {
              // handleClick(false);
              // setShowComponent("parking-duration");
              navigate("/booking"); // TODO: test
            }}
            alt="back-icon"
          />
          <h1 className="confirm__title">Confirm Parking</h1>
        </div>

        {/* Location Details */}
        <div className="confirm__wrapper">
          <img
            className="confirm__icon"
            src={locationIcon}
            alt="location-icon"
          />
          <div className="confirm__location">
            <h3 className="confirm__sub-header">Location Details</h3>

            {/* parking.meterid */}
            <p className="confirm__info confirm__info--spacing-top">
              Meter #: 872503
            </p>
            {/* parking.location */}
            <p className="confirm__info">Location: Fairview</p>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={carIcon} alt="car-icon" />
          <div className="confirm__vehicle">
            <h3 className="confirm__sub-header">Vehicle Details</h3>
            {/* vehicle.license */}
            <p className="confirm__info confirm__info--spacing-top">
              License Plate #: FKL-00A
            </p>
          </div>
        </div>

        {/* Payment Details */}

        <div className="confirm__wrapper">
          <img className="confirm__icon" src={paymentIcon} alt="payment-icon" />
          <div className="confirm__payment">
            <h3 className="confirm__sub-header">Payment Details</h3>
            {/* payment.card */}
            <p className="confirm__info confirm__info--spacing-top">
              Card ending with 1234
            </p>
          </div>
        </div>

        {/* Parking Duration */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={timeIcon} alt="time-icon" />
          <div className="confirm__duration">
            <h3 className="confirm__sub-header">Duration</h3>
            <p className="confirm__info confirm__info--spacing-top">
              Start time: March 19, 2024 11:45 a.m.
            </p>
            <p className="confirm__info">
              End time: March 19, 2024, 12:15 p.m.
            </p>
            <p className="confirm__info">Total time: 30 Minutes</p>
          </div>
        </div>

        {/* Price Details */}
        <div className="confirm__wrapper">
          <img className="confirm__icon" src={priceIcon} alt="price-icon" />
          <div className="confirm__cost">
            <h3 className="confirm__sub-header">Price</h3>
            <p className="confirm__info confirm__info--spacing-top">
              Total Cost: $2.00
            </p>
          </div>
        </div>

        {/* Notification */}
        <div className="confirm__notify">
          <input
            type="checkbox"
            id="notifyExpire"
            className="confirm__checkbox"
          />
          <div className="confirm__container">
            <img className="confirm__icon" src={alertIcon} alt="alert-icon" />
            <p>Notify me 15 minutes before my parking session expires</p>
          </div>
          <label
            htmlFor="notifyExpire"
            onClick={handleNotifyChange}
            className="confirm__label"
          >
            <img
              className="confirm__icon"
              src={isNotifyChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon}
              alt={
                isNotifyChecked
                  ? "check-box-selected-icon"
                  : "check-box-unselected-icon"
              }
            />
          </label>
        </div>

        {/* Button Container */}
        <div className="confirm__button-cont">
          <button className="confirm__secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="confirm__cta" onClick={handlePay}>
            Pay & Park
          </button>
        </div>
      </section>
    </main>
  );
}

export default ConfirmParking;
