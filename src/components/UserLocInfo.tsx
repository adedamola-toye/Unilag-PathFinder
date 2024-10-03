import { useState } from "react";
import Input from "./Input";
import { locations } from "./locations";
import { getDirections } from "./Directions"; 
import { findShortestPath } from "./dijkstra";
import graph from './graphData';
import Map from './Map';

function UserLocInfo() {
  // Keep existing state variables
  const [currentLocationInput, setCurrentLocationInput] = useState("");
  const [filteredCurrentLocationSuggestions, setFilteredCurrentLocationSuggestions] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [currentLocationError, setCurrentLocationError] = useState<string | null>(null);

  const [destinationInput, setDestinationInput] = useState("");
  const [filteredDestinationSuggestions, setFilteredDestinationSuggestions] = useState<string[]>([]);
  const [destination, setDestination] = useState<string>("");
  const [destinationLocationError, setDestinationLocationError] = useState<string | null>(null);

  const [directionError, setDirectionError] = useState<string|null>(null);
  const [showDirections, setShowDirections] = useState(false);
  
  // Add state for path
  const [pathNodes, setPathNodes] = useState<string[]>([]);

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
    setFilteredCurrentLocationSuggestions([]); // Clear the suggestions after selection
    setCurrentLocationError(null);
  };

  const handleDestinationSuggestionClick = (suggestion: string) => {
    setDestination(suggestion);
    setDestinationInput(suggestion);
    setFilteredDestinationSuggestions([]); // Clear the suggestions after selection
    setDestinationLocationError(null);
  };

  const handleDirectMeBtn = () => {
    setCurrentLocationError(null);
    setDestinationLocationError(null);

    if(!currentLocation || !locations.includes(currentLocation)){
      setCurrentLocationError("Please enter a valid current location");
    }
    if(!destination || !locations.includes(destination)){
      setDestinationLocationError("Please enter a valid destination");
    }

    if (currentLocation && destination && locations.includes(currentLocation) && locations.includes(destination)){
      const shortestPath = findShortestPath(graph, currentLocation, destination);
      if(shortestPath){
        setPathNodes(shortestPath.path); // Store the path nodes
        setShowDirections(true);
        console.log(`Shortest path from ${currentLocation} to ${destination}:`, shortestPath.path);
        console.log(`Total distance: ${shortestPath.distance} km`); 
      } else {
        setDirectionError(`No path found between ${currentLocation} and ${destination}.`);
      }
    }
  };

  const handleBackHomeBtn = () => {
    setShowDirections(false);
    setCurrentLocation("");
    setDestination("");
    setCurrentLocationInput("");
    setDestinationInput("");
    setPathNodes([]); // Clear the path
  };

  return (
    <div className="userLocSection">
      <div>
      {showDirections ? (
        <div className="directions-phase">
          <h2>
            Directions from {currentLocationInput} to {destinationInput}
          </h2>
          {directionError ? (<p>{directionError}</p>): (
            <ul>{getDirections(currentLocation, destination) ?. map((location, index) => (
                <li key={index}>{location}</li>
            ))}
            </ul>
          )
        }
          <button onClick={handleBackHomeBtn} className="back-home-btn">
            Back Home
          </button>
        </div>
      ) : (
        <>
        <div className="input-flex">
          <Input
            label="Where are you?"
            placeholder="Your current location"
            value={currentLocationInput}
            onChange={handleCurrentLocationInput}
          />
          {filteredCurrentLocationSuggestions.length > 0 && (
            <ul className="location-suggestions">
              {filteredCurrentLocationSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleCurrentLocationSuggestionClick(suggestion)}>
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
                <li key={index} onClick={() => handleDestinationSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          </div>
          {destinationLocationError && <p className="error-message">{destinationLocationError}</p>} 
          <button onClick={handleDirectMeBtn} className="direct-me-btn">
            Direct Me
          </button>
        </>
      )}
      </div>
        <div className="map-container">
        <Map pathNodes={pathNodes} />
        </div>
    </div>
  );
  
 

}


export default UserLocInfo;
