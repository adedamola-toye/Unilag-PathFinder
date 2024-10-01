import { useState } from "react";
import Input from "./Input";
import { locations } from "./locations";
import { getDirections } from "./Directions"; 
import { findShortestPath } from "./dijkstra";
import graph from './graphData'
/* import { Coordinates } from './locationsCoordinates'; */ 

function UserLocInfo() {
  const [currentLocationInput, setCurrentLocationInput] = useState(""); // User's raw input for current location
  const [filteredCurrentLocationSuggestions, setFilteredCurrentLocationSuggestions] = useState<string[]>([]); // Suggestions array for current location
  const [currentLocation, setCurrentLocation] = useState<string>(""); // Validated current location
  const [currentLocationError, setCurrentLocationError] = useState<string | null>(null);

  const [destinationInput, setDestinationInput] = useState(""); // User's raw input for destination
  const [filteredDestinationSuggestions, setFilteredDestinationSuggestions] = useState<string[]>([]); // Suggestions array for destination location
  const [destination, setDestination] = useState<string>(""); // Validated destination location
  const [destinationLocationError, setDestinationLocationError] = useState<string | null>(null);



  //State to toggle between input and directions phase
  const [showDirections, setShowDirections] = useState(false)

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
   if (currentLocation && destination){
      const shortestPath = findShortestPath(graph, currentLocation, destination);
      if(shortestPath){
        setShowDirections(true);
      }
      else{
        setCurrentLocationError("No path found between the selected locations.")
      }
   }
  }

  const handleBackHomeBtn = () => {
    setShowDirections(false);
    setCurrentLocation("");
    setDestination("");
    setCurrentLocationInput("");
    setDestinationInput("")
  }

  return (
    <div className="userLocSection">
      {showDirections ? (
        <div className="directions-phase">
          <h2>
            Directions from {currentLocationInput} to {destinationInput}
          </h2>
          <ul>
          <li>{getDirections(currentLocationInput, destinationInput)}</li>
          </ul>
          
          <button onClick={handleBackHomeBtn} className="back-home-btn">
            Back Home
          </button>
        </div>
      ) : (
        <>
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
          {destinationLocationError && <p className="error-message">{destinationLocationError}</p>}
  
          <button onClick={handleDirectMeBtn} className="direct-me-btn">
            Direct Me
          </button>
        </>
      )}
    </div>
  );
  
 

}



      


export default UserLocInfo;
