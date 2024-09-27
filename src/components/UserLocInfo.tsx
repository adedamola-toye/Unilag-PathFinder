import { useState } from "react";
import Input from "./Input";
import { locations } from "./locations.ts";
import { dijkstra} from "./dijkstra"; // Importing Dijkstra and the graph
import { graph } from "./graphData.ts";
/* import {Coordinates} from './locationsCoordinates.ts' */

interface DirectionsProps {
  directions: string[];
  onBack: () => void;
}

function Directions({ directions, onBack }: DirectionsProps) {
  return (
    <div>
      <h2>{`Directions from ${directions[0]} to ${directions[directions.length - 1]}`}</h2>
      <ul>
        {directions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <button onClick={onBack}>Back Home</button>
    </div>
  );
}


function UserLocInfo({ onShowDirections }: { onShowDirections: (path: string[], distance: number) => void }) {
  const [currentLocationInput, setCurrentLocationInput] = useState(""); //User's raw input for current location
  const [filteredCurrentLocationSuggestions, setFilteredCurrentLocationSuggestions] = useState<string[]>([]); //Suggestions array for current location
  const [currentLocation, setCurrentLocation] =  useState<string| null>(""); //Validated current location
  const [currentLocationError, setCurrentLocationError] = useState<string | null>(null);

  const [destinationInput, setDestinationInput] = useState(""); //User's raw input for destination
  const [filteredDestinationSuggestions, setFilteredDestinationSuggestions] = useState<string[]>([]); //Suggestions array for destination location
  const [destination, setDestination] =  useState<string| null>(""); //Validated destination location
  const [destinationLocationError, setDestinationLocationError] = useState<string | null>(null);
  const [directions, setDirections] = useState<string[] | null>(null);

  const handleCurrentLocationInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setCurrentLocationInput(userInput);
    const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredCurrentLocationSuggestions(filteredLocations);
    setCurrentLocationError(null);
  };

  const handleDestinationInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setDestinationInput(userInput);
    const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredDestinationSuggestions(filteredLocations);
    setDestinationLocationError(null);
  };

  const handleCurrentLocationSuggestionClick = (suggestion: string) => {
    setCurrentLocation(suggestion);
    setCurrentLocationInput(suggestion);
    setFilteredCurrentLocationSuggestions([]);
    setCurrentLocationError(null);
  };

  const handleDestinationSuggestionClick = (suggestion: string) => {
    setDestination(suggestion);
    setDestinationInput(suggestion);
    setFilteredDestinationSuggestions([]);
    setDestinationLocationError(null);
  };

  const handleCalculateRoute = () => {
    if (currentLocation && destination) {
      const result = dijkstra(graph, currentLocation, destination);
      if (result && result.path.length > 0) {
        const { path, distance } = result;
  
        const directionsSteps = path.map(locId => graph[locId].id);
  
        setDirections(directionsSteps);
  
        const pathCoordinates = path.map(locId => ({
          location: graph[locId].id,
          latitude: graph[locId].coordinates[0],
          longitude: graph[locId].coordinates[1],
        }));
        console.log(pathCoordinates)
  
        onShowDirections(directionsSteps, distance); 
      } else {
       
        setCurrentLocationError("No valid path found.");
      }
    } else {
      // Handle missing inputs
      if (!currentLocation) setCurrentLocationError("Please select your current location.");
      if (!destination) setDestinationLocationError("Please select your destination.");
    }
  };
  

  const handleBackHome = () => {
    setDirections(null);
    setCurrentLocation(null);
    setDestination(null);
  };

  if (directions) {
    return <Directions directions={directions} onBack={handleBackHome} />;
  }

  return (
    <div className="userLocSection">
      <Input
        label="Where are you?"
        placeholder="Your current location"
        value={currentLocationInput}
        onChange={handleCurrentLocationInput}
      />
      {filteredCurrentLocationSuggestions.length > 0 && (
        <ul className="location-suggestions">
          {filteredCurrentLocationSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                handleCurrentLocationSuggestionClick(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {currentLocationError && <p className="error-message">{currentLocationError}</p>}

      <Input
        label="Where are you going?"
        placeholder="Your destination"
        value={destinationInput}
        onChange={handleDestinationInput}
      />
      {filteredDestinationSuggestions.length > 0 && (
        <ul className="location-suggestions">
          {filteredDestinationSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                handleDestinationSuggestionClick(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {destinationLocationError && <p className="error-message">{destinationLocationError}</p>}

      <button type="submit" onClick={handleCalculateRoute} className="direct-me-btn">
        Direct Me
      </button>
    </div>
  );
}

export default UserLocInfo;
