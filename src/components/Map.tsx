import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet"; // Import Icon
import { locationsCoordinates } from "./locationCoordinates";

// Import the marker icon images from Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface Coordinate {
  location: string;
  latitude: number;
  longitude: number;
}

const getRandomOffset = () => {
  const offset = 0.0001;
  return Math.random() * offset - offset / 2;
};

function FitMapToBounds({ coordinates }: { coordinates: Coordinate[] }): null {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = coordinates.map(
        (coordinate) => [coordinate.latitude, coordinate.longitude] as [number, number]
      );
      map.fitBounds(bounds);
    }
  }, [coordinates, map]);

  return null;
}

// Define a custom default icon for Leaflet markers
const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41] // size of the shadow
});

function Map() {
  return (
    <MapContainer
      center={[6.51788, 3.38672]} 
      zoom={17} 
      minZoom={16} 
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FitMapToBounds coordinates={locationsCoordinates} />

      {locationsCoordinates.map((location, index) => (
        <Marker
          key={index}
          position={[
            location.latitude + getRandomOffset(),
            location.longitude + getRandomOffset(),
          ]}
          icon={defaultIcon} // Set the custom icon for each marker
        >
          <Popup>{location.location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
