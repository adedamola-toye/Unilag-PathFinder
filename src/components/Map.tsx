import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon, LatLngExpression, Icon } from "leaflet"; 
import { locationsCoordinates } from "./locationsCoordinates";
import markerIcon from "leaflet/dist/images/marker-icon.png";

// URL for red marker icon
const redMarkerIconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";

// Default blue marker icon configuration
const defaultIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom red marker icon configuration for the current location
const redIcon = new Icon({
  iconUrl: redMarkerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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

// Custom label for marker with location name
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
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Set the user location
        setUserLocation([userLat, userLng]);
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  return (
    <MapContainer
      className="map"
      center={userLocation || [6.51870, 3.39732]}  // Center on user location or fallback location
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
          icon={createLabelIcon(location.location)} // Custom label for each location
        >
          <Popup>{location.location}</Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker
          position={userLocation}
          icon={redIcon} // Red icon for the user's current location
        >
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
