import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet"; 
import { locationsCoordinates } from "./locationsCoordinates";
import markerIcon from "leaflet/dist/images/marker-icon.png";


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

function createLabelIcon(locationName: string) {
  return divIcon({
    className: "custom-marker-label", // Custom class for the marker
    html: `<div class="marker-icon-label">
            <img src="${markerIcon}" style="display: block; margin-bottom: 5px;" />
            <span>${locationName}</span>
           </div>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

function Map() {
  return (
    <MapContainer
      className="map"
      center={[6.51870, 3.39732]}  
      zoom={18} 
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
          icon={createLabelIcon(location.location)} 
        >
          <Popup>{location.location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;