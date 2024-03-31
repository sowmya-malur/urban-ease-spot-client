// Import Leaflet map components
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

// Import styles
import "leaflet/dist/leaflet.css";
import "../HomePage/HomePage.scss"; // add to override any default styles in popup from leaflet.css

// Import libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import icons
import filter from "../../assets/icons/round_tune_black_24dp.png";

// Import components
// import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";
import Filter from "../../components/Filter/Filter";

// Create custom icons
const customAvailableIcon = new Icon({
  iconUrl: require("../../assets/icons/parking_available.png"),
  iconSize: [26, 36], // size of the icon
});

const customUnavailableIcon = new Icon({
  iconUrl: require("../../assets/icons/parking_unavailable.png"),
  iconSize: [26, 36], // size of the icon
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    iconSize: point(33, 33, true),
  });
};

/**
 * @param {setIsLoggedIn} setIsLoggedIn callback function to set if user is logged in
 * @param {userId} ?
 * @returns
 */
function HomePage({ setIsLoggedIn, userId }) {
  // Initialize hooks
  const navigate = useNavigate();

  console.log("userId", userId);

  // Initialize state variables
  const [showComponent, setShowComponent] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [parkingMeters, setParkingMeters] = useState([]);
  const [filteredParkingMeters, setFilteredParkingMeters] = useState([]);
  // const [selectedParkingMeter, setSelectedParkingMeter] = useState("");

  // Initialize constants
  const currentTimeStamp = Date.now();
  const currentDate = new Date(currentTimeStamp);
  const currentHours = currentDate.getHours();
  const currentDay = currentDate.getDay();

  // Set isLoggedIn from the localStorage on mount
  useEffect(() => {
    console.log("in useeffect homepage"); // TODO: del
    console.log("localstorage", localStorage.getItem("isLoggedIn"));
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  // Get all parking meter data on mount and set filter options from localStorage if any on mount
  useEffect(() => {
    console.log("on mount");
    const getAllParkingMeters = async () => {
      try {
        // TODO: test why env varaible is not working
        // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/parking`);
        const response = await axios.get("http://localhost:8080/api/parking");

        if (response.data && response.status === 200) {
          setParkingMeters(response.data);
        }
      } catch (error) {
        console.error("Error fetching parking meter data:", error);
      }
    };

    // Call async func
    getAllParkingMeters();

    // Set filter options
    const storedFilterOptions = {
      acceptCreditCard: localStorage.getItem("isPaymentChecked") === "true",
      disability: localStorage.getItem("isDisabilityChecked") === "true",
      motorbike: localStorage.getItem("isMotorbikeChecked") === "true",
      available: localStorage.getItem("isAvailableChecked") === "true",
    };

    setFilterOptions(storedFilterOptions);
  }, []);

  // Set filtered parking meter data for the selected filter options
  useEffect(() => {
    console.log("in filtering");
    let filterParkingMeters = [...parkingMeters];

    if (filterOptions.available) {
      filterParkingMeters = filterParkingMeters.filter(
        (parking) => parking.status === "vacant"
      );
    }
    if (filterOptions.acceptCreditCard) {
      filterParkingMeters = filterParkingMeters.filter(
        (parking) => parking.creditcard.toLowerCase() === "yes"
      );
    }
    if (filterOptions.disability) {
      filterParkingMeters = filterParkingMeters.filter((parking) =>
        parking.meterhead.toLowerCase().includes("disability")
      );
    }
    if (filterOptions.motorbike) {
      filterParkingMeters = filterParkingMeters.filter((parking) =>
        parking.meterhead.toLowerCase().includes("motorbike")
      );
    }

    setFilteredParkingMeters(filterParkingMeters);
  }, [filterOptions, parkingMeters]);

  const displayParkingRate = (parking) => {
    // TODO: del after testing
    // let currentDay = 1;
    // let currentHours = 10;

    let parkingInfo = {
      day: "",
      time: "",
      rate: "",
    };

    // Weekday: M-F
    if (currentDay >= 1 && currentDay <= 5) {
      parkingInfo.day = "Mon-Fri: ";

      if (currentHours >= 9 && currentHours < 18) {
        // M-F: Between 9 am and 6 pm
        parkingInfo.time = "9 am - 6 pm";
        parkingInfo.rate = "$" + parking.r_mf_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // M-F: Between 6 pm and 10 pm
        parkingInfo.time = "6 pm - 10 pm";
        parkingInfo.rate = "$" + parking.r_mf_6p_10p;
      } else {
        // M-F: Between 10 pm and 9 am
        parkingInfo.time = "10pm - 9 am";
        parkingInfo.rate = "$0.00";
      }
    } else if (currentDay === 6) {
      // Sat
      parkingInfo.day = "Sat: ";

      if (currentHours >= 9 && currentHours < 18) {
        // Sat: Between 9 am and 6 pm
        parkingInfo.time = "9 am - 6 pm";
        parkingInfo.rate = "$" + parking.r_sa_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // Sat: Between 6 pm and 10 pm
        parkingInfo.time = "6 pm - 10 pm";
        parkingInfo.rate = "$" + parking.r_sa_6p_10p;
      } else {
        // Sat: Between 10 pm and 9 am
        parkingInfo.time = "10pm - 9 am";
        parkingInfo.rate = "$0.00";
      }
    } else {
      // Sun
      if (currentHours >= 9 && currentHours < 18) {
        // Sun: Between 9 am and 6 pm
        parkingInfo.time = "9 am - 6 pm";
        parkingInfo.rate = "$" + parking.r_su_9a_6p;
      } else if (currentHours >= 18 && currentHours < 22) {
        // Sun: Between 6 pm and 10 pm
        parkingInfo.time = "6 pm - 10 pm";
        parkingInfo.rate = "$" + parking.r_su_6p_10p;
      } else {
        // Sun: Between 10 pm and 9 am
        parkingInfo.time = "10pm - 9 am";
        parkingInfo.rate = "$0.00";
      }
    }

    return parkingInfo;
  };

  const handleSelect = (meter_id) => {
    localStorage.setItem("selectedMeterId", meter_id);
    if(localStorage.getItem("isLoggedIn")) {
      navigate(`/booking/${userId}`);
    } else {
      navigate(`/login`);
    }
  };

  const handleFilterOptions = (data) => {
    setFilterOptions(data);
    setShowComponent(false);
  };

  return (
    <main>
      {!showComponent && (
        <>
          <section className="search">
            <input
              type="search"
              className="search__input"
              placeholder="Search by location or address"
            ></input>
            <div className="search__filter-cont">
              <img
                src={filter}
                alt="filter-icon"
                className="search__icon"
                onClick={() => {
                  setShowComponent("filter");
                }}
              />
              <p className="search__filter">Filter</p>
            </div>
          </section>
          <MapContainer
            className="full-height-map"
            center={[49.26328581657055, -123.13380465835546]}
            zoom={13}
            minZoom={3}
            maxZoom={19}
            maxBounds={[
              [-85.06, -180],
              [85.06, 180],
            ]}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              {!filteredParkingMeters
                ? ""
                : filteredParkingMeters.map((parking) => {
                    const parkingInfo = displayParkingRate(parking);
                    return (
                      <Marker
                        key={parking.meter_id}
                        position={[
                          parking.geo_point_2d.lat,
                          parking.geo_point_2d.lon,
                        ]}
                        icon={
                          parking.status === "vacant"
                            ? customAvailableIcon
                            : customUnavailableIcon
                        }
                      >
                        <Popup>
                          <div className="pop-up">
                            <p className="pop-up__header">METER HEAD: </p>
                            <p className="pop-up__info">{parking.meterhead}</p>
                            <p className="pop-up__header">METER ID:</p>
                            <p className="pop-up__info">{parking.meter_id}</p>
                            {parking.status === "vacant" ? (
                              <>
                                <p className="pop-up__header">CURRENT RATE:</p>
                                <p className="pop-up__info">
                                  {parkingInfo.day} {parkingInfo.time}
                                </p>
                                <p className="pop-up__info">
                                  {parkingInfo.rate} per hour
                                </p>
                              </>
                            ) : (
                              ""
                            )}
                            <p className="pop-up__header">LOCATION:</p>
                            <p className="pop-up__info">
                              {parking.geo_local_area}
                            </p>
                            {!(parking.status === "vacant") ? (
                              <p className="pop-up__info pop-up__info--alert">
                                {parking.status.toUpperCase()}
                              </p>
                            ) : (
                              <button
                                className="pop-up__cta"
                                onClick={() => handleSelect(parking.meter_id)}
                              >
                                Select
                              </button>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
            </MarkerClusterGroup>
          </MapContainer>
        </>
      )}

      {/* Add conditional rendering here */}
      {/* {showComponent === "parking-duration" && (
        // <ParkingDuration handleClick={() => setShowComponent(false)} />
        <ParkingDuration handleClick={handleClick} />
      )} */}
      {showComponent === "filter" && (
        <Filter
          handleClick={() => setShowComponent(false)}
          handleFilterOptions={handleFilterOptions}
        />
      )}
    </main>
  );
}

export default HomePage;
