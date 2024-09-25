import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { locationsCoordinates } from "./locationCoordinates";

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

function Map() {
  const [locationCoordinates, setLocationCoordinates] = useState<Coordinate[]>(locationsCoordinates);

  // Define the bounds that cover the Unilag perimeter as LatLngBoundsLiteral
  /* const unilagBounds: LatLngBoundsLiteral = [
    [6.9021,3.3934], // North-West corner
    [6.515418, 3.405025], // South-East corner
  ]; */

  return (
    <MapContainer
      center={[6.51788, 3.38672]} 
      zoom={15} 
      minZoom={14} 
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true} 
     
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

 
      <FitMapToBounds coordinates={locationCoordinates} />


      {locationCoordinates.map((location, index) => (
        <Marker
          key={index}
          position={[
            location.latitude + getRandomOffset(), 
            location.longitude + getRandomOffset(),
          ]}
        >
          <Popup>{location.location}</Popup> 
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
