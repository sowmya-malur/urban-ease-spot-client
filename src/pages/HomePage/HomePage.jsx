import "../HomePage/HomePage.scss"
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

import filter from "../../assets/icons/round_tune_black_24dp.png";

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
      // center={[49.2827, -123.1207]} //this is working
      zoom={13}
      minZoom={3}
      maxZoom={19}
      maxBounds={[[-85.06, -180], [85.06, 180]]}
      scrollWheelZoom={true}>
     <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>    
    </main>);
}

export default HomePage;