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

// create custom icon
const customIcon = new Icon({
  iconUrl: require("../../assets/icons/parking_available.png"),
  iconSize: [26, 36], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

function HomePage() {
  const [showComponent, setShowComponent] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [parkingMeters, setParkingMeters] = useState([]);

  const navigate = useNavigate();

  // Call axios to get parking meter data
  useEffect(() => {
    const getAllParkingMeters = async () => {
      // TODO: test why env varaible is not working
      // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/parking`);
      const response = await axios.get("http://localhost:8080/api/parking");
      console.log("response", response);
      if (response.data && response.status === 200) {
        setParkingMeters(response.data);
      }
    };

    getAllParkingMeters();
  }, []);

  const handleClick = () => {
    setShowComponent("parking-duration");
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
              {!parkingMeters
                ? ""
                : parkingMeters.map((parking) => {
                    // console.log(parking.geo_point_2d.lat);
                    return (
                      <Marker
                        position={[
                          parking.geo_point_2d.lat,
                          parking.geo_point_2d.lon,
                        ]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div>
                            <p>{parking.meterhead}</p>
                            <button onClick={handleClick}>More Details</button>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}

              {/* Hardcoded working code */}
              {/* <Marker
                position={[49.26328581657055, -123.13380465835546]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                 
                    This is popup 1
                    <button onClick={handleClick}>More Details</button>
                  </div>
                </Popup>
              </Marker>
              <Marker
                position={[49.25397960972006, -123.10099865961524]}
                icon={customIcon}
              >
                <Popup>This is popup 2</Popup>
              </Marker>
              <Marker
                position={[49.28108309143481, -123.06084555133712]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    
                    This is popup 3
                    <button onClick={handleClick}>More Details</button>
                  </div>
                </Popup>
              </Marker> */}
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
