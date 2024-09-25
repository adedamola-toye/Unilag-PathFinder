import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { locationsCoordinates } from "./locationsCoordinates";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface Coordinate {
  location: string;
  latitude: number;
  longitude: number;
}

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

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Map() {
  return (
    <MapContainer
      center={[6.51854, 3.38890]}
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
          position={[location.latitude, location.longitude]}
          icon={defaultIcon}
        >
          <Popup>{location.location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
