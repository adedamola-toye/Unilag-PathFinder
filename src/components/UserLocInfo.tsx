import { useState } from "react";
import Input from "./Input";
import { locations } from "./locations.ts";


function UserLocInfo() {
  const [currentLocationInput, setCurrentLocationInput] = useState(""); //User's raw input for current location
  const [
    filteredCurrentLocationSuggestions,
    setFilteredCurrentLocationSuggestions,
  ] = useState<string[]>([]); //Suggestions array for current location
  const [currentLocation, setCurrentLocation] = useState(""); //Validated current location
  const [currentLocationError, setCurrentLocationError] = useState<string|null>(null);

  const [destinationInput, setDestinationInput] = useState(""); //User's raw input for destination
  const [filteredDestinationSuggestions, setFilteredDestinationSuggestions] =
    useState<string[]>([]); //Suggestions array for destination location
  const [destination, setDestination] = useState(""); //Validated destination location
  const [destinationLocationError, setDestinationLocationError] = useState<string|null>(null)

  const handleCurrentLocationInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userInput = event.target.value;
    setCurrentLocationInput(userInput);
    const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredCurrentLocationSuggestions(filteredLocations);
    setCurrentLocationError(null)
  };

  const handleDestinationInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userInput = event.target.value;
    setDestinationInput(userInput);
    const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredDestinationSuggestions(filteredLocations);
    setDestinationLocationError(null)
  };

  //When user clicks on a suggestion
  const handleCurrentLocationSuggestionClick = (suggestion: string) => {
    setCurrentLocation(suggestion);
    setCurrentLocationInput(suggestion);
    setFilteredCurrentLocationSuggestions([]);
    setCurrentLocationError(null);
    console.log(currentLocation)
  };

  const handleDestinationSuggestionClick = (suggestion: string) => {
    setDestination(suggestion);
    setDestinationInput(suggestion);
    setFilteredDestinationSuggestions([]);
    setDestinationLocationError(null);
    console.log(destination)
  };

  //When user leaves the current input filed without clicking anything from suggestions
  const handleCurrentLocationBlur = () => {
    //If what the user entered is not in the locations array show error
    if(!locations.includes(currentLocationInput)){
        setCurrentLocationError("Location not found. Please select a valid location");
        setCurrentLocation("")
    }
    else{//if what user entered is in locations array process it as the currentLocation
        setCurrentLocation(currentLocationInput);
        setCurrentLocationError(null)
    }
  };

  const handleDestinationLocationBlur = () => {
    if(!locations.includes(destinationInput)){
        setDestinationLocationError("Location not found. Please select a valid location");
        setDestination("")
    }
    else{
        setDestination(destinationInput);
        setDestinationLocationError(null)
    }
  }

  return (
    <div className="userLocSection">
      <Input
        label="Where are you?"
        placeholder="Your current location"
        value={currentLocationInput}
        onChange={handleCurrentLocationInput}
        onBlur = {handleCurrentLocationBlur}//when user leaves the input field
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
      {currentLocationError && <p className = "error-message">{currentLocationError}</p>}

      <Input
        label="Where are you going?"
        placeholder="Your destination"
        value={destinationInput}
        onChange={handleDestinationInput}
        onBlur = {handleDestinationLocationBlur}
      />
      {filteredDestinationSuggestions.length > 0 && (
        <ul className="location-suggestion">
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
      {destinationLocationError && <p className = "error-message">{destinationLocationError}</p>}

      <button type="submit">Direct Me</button>
    </div>
  );
}

export default UserLocInfo;
