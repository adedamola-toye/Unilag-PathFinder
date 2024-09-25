import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { getCoordinates } from './getCoordinates';
import { locations } from './locations';

interface Coordinate {
    latitude: number;
    longitude: number;
    name: string;
}

const getRandomOffset = () => {
    const offsetFactor = 0.0001; 
    return Math.random() * offsetFactor - offsetFactor / 2;
};

function FitMapToBounds({ coordinates }: { coordinates: Coordinate[] }) {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            const bounds = coordinates.map(coord => [coord.latitude, coord.longitude] as [number, number]);
            map.fitBounds(bounds);
        }
    }, [coordinates, map]);

    return null;
}

function Map() {
    const [locationCoordinates, setLocationCoordinates] = useState<Coordinate[]>([]);

    useEffect(() => {
        const getAllCoordinates = async () => {
            const coordinatesArray: Coordinate[] = [];
            for (const location of locations) {
                const result = await getCoordinates(location);
                if (result) {
                    coordinatesArray.push({
                        latitude: parseFloat(result.latitude),
                        longitude: parseFloat(result.longitude),
                        name: location,
                    });
                }
            }
            setLocationCoordinates(coordinatesArray);
        };
        getAllCoordinates();
    }, []);

    return (
        <MapContainer 
            center={[6.5244, 3.3792]} 
            zoom={19} 
            minZoom={20}
            style={{ height: "500px", width: "100%" }} 
            scrollWheelZoom={false} 
        >
            
            <FitMapToBounds coordinates={locationCoordinates} />

           
            {locationCoordinates.map((location, index) => (
                <Marker 
                    key={index} 
                    position={[
                        location.latitude + getRandomOffset(), 
                        location.longitude + getRandomOffset()
                    ]}
                >
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;
