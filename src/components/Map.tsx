import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { Icon, divIcon, LatLngExpression } from "leaflet";
import { locationsCoordinates } from "./locationsCoordinates";
import markerIcon from "leaflet/dist/images/marker-icon.png";

// URL for different colored markers
const greenMarkerIconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png";
const redMarkerIconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
//const blueMarkerIconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png";

const redIcon = new Icon({
  iconUrl: redMarkerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new Icon({
  iconUrl: greenMarkerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  pathNodes: string[];
}

// Helper function to get coordinates for a location name
const getCoordinatesForLocation = (locationName: string): LatLngExpression | null => {
  const location = locationsCoordinates.find(coord => coord.location === locationName);
  return location ? [location.latitude, location.longitude] : null;
};

// Component to handle map bounds
function MapBounds({ coordinates }: { coordinates: typeof locationsCoordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = coordinates.map(
        coord => [coord.latitude, coord.longitude] as [number, number]
      );
      map.fitBounds(bounds);
    }
  }, [coordinates, map]);

  return null;
}

// Progressive path drawing component
function ProgressivePath({ pathNodes }: { pathNodes: string[] }) {
  const [visiblePath, setVisiblePath] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    setVisiblePath([]);
    
    if (pathNodes.length === 0) return;

    const firstCoord = getCoordinatesForLocation(pathNodes[0]);
    if (!firstCoord) return;
    
    setVisiblePath([firstCoord]);

    let currentIndex = 1;
    const interval = setInterval(() => {
      if (currentIndex < pathNodes.length) {
        const nextCoord = getCoordinatesForLocation(pathNodes[currentIndex]);
        if (nextCoord) {
          setVisiblePath(prev => [...prev, nextCoord]);
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pathNodes]);

  return (
    <Polyline 
      positions={visiblePath}
      color="red"
      weight={3}
      opacity={0.7}
    />
  );
}


function createLabelIcon(locationName: string) {
  return divIcon({
    className: "custom-marker-label",
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

function Map({ pathNodes }: MapProps) {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  // Get center coordinates (prioritize: first path node > user location > default)
  const firstPathCoord = pathNodes.length > 0 ? getCoordinatesForLocation(pathNodes[0]) : null;
  const centerCoord = firstPathCoord || userLocation || [6.51870, 3.39732];

  return (
    <MapContainer
      center={centerCoord}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Fit map to show all locations */}
      <MapBounds coordinates={locationsCoordinates} />

      {/* Show all available locations */}
      {locationsCoordinates.map((location, index) => (
        <Marker
          key={`location-${index}`}
          position={[location.latitude, location.longitude]}
          icon={createLabelIcon(location.location)}
        >
          <Popup>{location.location}</Popup>
        </Marker>
      ))}

      {/* Show user's location */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={greenIcon}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Progressive path drawing */}
      <ProgressivePath pathNodes={pathNodes} />

      {/* Highlight path nodes */}
      {pathNodes.map((node, index) => {
        const coord = getCoordinatesForLocation(node);
        if (!coord) return null;
        
        return (
          <Marker
            key={`path-${index}`}
            position={coord}
            icon={redIcon}
          >
            <Popup>
              {node}
              {index === 0 && " (Start)"}
              {index === pathNodes.length - 1 && " (Destination)"}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;