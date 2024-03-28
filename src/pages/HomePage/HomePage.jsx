import "../HomePage/HomePage.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import filter from "../../assets/icons/round_tune_black_24dp.png";

// Import components
import ParkingDuration from "../../components/ParkingDuration/ParkingDuration";
import Filter from "../../components/Filter/Filter";

// create custom icons
const customAvailableIcon = new Icon({
  iconUrl: require("../../assets/icons/parking_available.png"), // TODO: update the icon
  iconSize: [26, 36], // size of the icon
});

const customUnavailableIcon = new Icon({
  iconUrl: require("../../assets/icons/round_clear_black_24dp.png"), // TODO: update the icon
  iconSize: [26, 36], // size of the icon
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    iconSize: point(33, 33, true),
  });
};

function HomePage() {
  const [showComponent, setShowComponent] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [parkingMeters, setParkingMeters] = useState([]);
  const [filteredParkingMeters, setFilteredParkingMeters] = useState([]);
  const [selectedParkingMeter, setSelectedParkingMeter] = useState("");

  const navigate = useNavigate();

  // Call axios to get parking meter data on mount
  useEffect(() => {
    const getAllParkingMeters = async () => {
      // TODO: test why env varaible is not working
      // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/parking`);
      const response = await axios.get("http://localhost:8080/api/parking");
      if (response.data && response.status === 200) {
        setParkingMeters(response.data);
      }
    };

    getAllParkingMeters();
  }, []);

  useEffect(() => {
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

  const displayParkingRate = (parking, currentTimeStamp) => {
    const currentDate = new Date(currentTimeStamp);
    const currentHours = currentDate.getHours();
    const currentDay = currentDate.getDay();
    // console.log(currentDate);

    if (currentDay >= 1 && currentDay <= 5) {
      if (currentHours >= 9 && currentHours < 18) {
        return parking.r_mf_9a_6;
      } else if (currentHours >= 18 && currentHours < 22) {
        return parking.r_mf_6p_10;
      } else {
        return 0.0;
      }
    } else if (currentDay === 6) {
      if (currentHours >= 9 && currentHours < 18) {
        return parking.r_sa_9a_6;
      } else if (currentHours >= 18 && currentHours < 22) {
        return parking.r_sa_6p_10;
      } else {
        return 0.0;
      }
    } else {
      if (currentHours >= 9 && currentHours < 18) {
        return parking.r_su_9a_6;
      } else if (currentHours >= 18 && currentHours < 22) {
        return parking.r_su_6p_10;
      } else {
        return 0.0;
      }
    }
  };

  const handleClick = (meter_id) => {
    console.log("meterid", meter_id);
    // console.log("selectedParkingmeter", selectedParkingMeter);
    localStorage.setItem("selectedMeterId", meter_id);
    navigate("/booking");
    // setShowComponent("parking-duration");
  };

  const handleFilterOptions = (data) => {
    setFilterOptions(data);
    setShowComponent(false);
  };

  return (
    <main>
      {!showComponent && (
        <>
          <section>
            <input type="search"></input>
            {/* TODO: Add an indication that filter is on */}
            <img
              src={filter}
              alt="filter-icon"
              width={24}
              height={24}
              onClick={() => {
                setShowComponent("filter");
              }}
            />
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
                          <div>
                            <p>Meter Head Type: {parking.meterhead}</p>
                            <p>
                              Current Rate Per Hour:{" "}
                              {displayParkingRate(parking, Date.now())}
                            </p>
                            <p>Location: {parking.geo_local_area}</p>
                            <button onClick={() => handleClick(parking.meter_id)}>Select</button>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
            </MarkerClusterGroup>
          </MapContainer>
          {filterOptions && (
            <div>
              <p>Filter Options:</p>
              <pre>{JSON.stringify(filterOptions, null, 2)}</pre>
            </div>
          )}
        </>
      )}

      {/* Add conditional rendering here */}
      {showComponent === "parking-duration" && (
        // <ParkingDuration handleClick={() => setShowComponent(false)} />
        <ParkingDuration handleClick={handleClick} />
      )}
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
