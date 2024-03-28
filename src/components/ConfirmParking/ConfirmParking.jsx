import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

function ConfirmParking({ handlePay, handleCancel }) {
  const navigate = useNavigate();

  const [isNotifyChecked, setIsNotifyChecked] = useState(localStorage.getItem("isNotifyChecked") === "true" || false);

  useEffect(() => {
    const storedIsNotifyChecked = localStorage.getItem("isNotifyChecked") === "true";
    setIsNotifyChecked(storedIsNotifyChecked);
  }, []);
  
  const handleNotifyChange = () => {
    setIsNotifyChecked(!isNotifyChecked);
    localStorage.setItem("isNotifyChecked", !isNotifyChecked);
  };

  return (
    <main>
      <>
        <img
          src={backIcon}
          onClick={() => {
            // handleClick(false);
            // setShowComponent("home-page");
            navigate("/booking"); // TODO: test
          }}
          alt="back-icon"
        />
        <h1>Confirm Parking</h1>
        <div>
          <div>
            <img 
            src={locationIcon}
            alt="location-icon"/>
            <h3>Location Details</h3>
          </div>
          {/* parking.meterid */}
          <p>Meter #: 872503</p>
          {/* parking.location */}
          <p>Location: Fairview</p>
        </div>
        <div>
          <div>
            <img 
            src={carIcon}
            alt="car-icon"/>
            <h3>Vehicle Details</h3>
          </div>
          {/* vehicle.license */}
          <p>License Plate #: FKL-00A</p>
        </div>
        <div>
          <div>
            <img 
            src={paymentIcon}
            alt="payment-icon"/>
            <h3>Payment Details</h3>
          </div>
          {/* payment.card */}
          <p>Card ending with 1234</p>
        </div>
        <div>
        <div>
          <img 
          src={timeIcon} alt="time-icon" />
          <h3>Duration</h3>
          </div>
            <p>Start time:</p>
            <p>End time:</p>
            <p>Total time:</p>          
        </div>
        <div>
        <div>
          <img 
          src={priceIcon} alt="price-icon" />
          <h3>Price</h3>
          </div>
          <div>
          <p>Total Cost: </p>
          <p>$2.00</p>
          </div>
        </div>

        <div>
        <input
          type="checkbox"
          id="notifyExpire"
          style={{ display: "none" }} // hide the default checkbox. TODO: in scss
        />
         <label htmlFor="notifyExpire" onClick={handleNotifyChange}>
            <div>
            <img 
            src={alertIcon}
            alt="alert-icon"/>
            <p>Notify me 15 minutes before my parking session expires</p>
            </div>
                       
            <img 
            src={isNotifyChecked ? checkBoxSelectedIcon : checkBoxEmptyIcon}
            alt={
                isNotifyChecked
                  ? "check-box-selected-icon"
                  : "check-box-unselected-icon"
              }
           />
            </label>
        </div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handlePay}>Pay</button>
      </>
    </main>
  );
}

export default ConfirmParking;
