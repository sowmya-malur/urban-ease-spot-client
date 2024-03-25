import "../HomePage/HomePage.scss"
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

import filter from "../../assets/icons/round_tune_black_24dp.png";

// create custom icon
const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../assets/icons/parking_available.png"),
    iconSize: [26, 36] // size of the icon
  }); 
  
  // custom cluster icon
  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };

  
function HomePage() {
    return(<main>
    <section>
        <input 
        type="search">
        </input>
        <img src={filter} alt="filter-icon" width={24} height={24} />
    </section>
    <MapContainer
      className="full-height-map"
      center={[49.26328581657055, -123.13380465835546]}
      zoom={13}
      minZoom={3}
      maxZoom={19}
      maxBounds={[[-85.06, -180], [85.06, 180]]}
      scrollWheelZoom={true}>
     <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
         <Marker position={[49.26328581657055, -123.13380465835546]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[49.25397960972006, -123.10099865961524]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[49.28108309143481, -123.06084555133712]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker>
      </MarkerClusterGroup>
    </MapContainer>    
    </main>);
}

export default HomePage;