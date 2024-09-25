import {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { getCoordinates } from './getCoordinates';
import { locations } from './locations';

interface Coordinate {
    latitude : number;
    longitude: number;
    name: string
}

function Map(){
    const [locationCoordinates, setLocationCoordinates] = useState<Coordinate[]>([])

    useEffect(() => {
        const getAllCoordinates = async() => {
            const coordinatesArray: Coordinate[] = [];
            for(const location of locations){
                const result = await getCoordinates(location);
                if(result){
                    coordinatesArray.push({
                        latitude: parseFloat(result.latitude),
                        longitude: parseFloat(result.longitude),
                        name: location,  
                    });
                }
            }
            setLocationCoordinates(coordinatesArray)
        };
        getAllCoordinates();
    }, []);


    return (
        <MapContainer center={[6.5244, 3.3792]} zoom={15} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locationCoordinates.map((location, index) => (
            <Marker key={index} position={[location.latitude, location.longitude]}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      );
    
}
export default Map