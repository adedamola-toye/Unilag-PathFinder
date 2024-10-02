// import { useState } from "react";
// import Input from "./Input";
// import { locations } from "./locations";
// import { getDirections } from "./Directions"; 
// import { findShortestPath } from "./dijkstra";
// import graph from './graphData'

// /* import { Coordinates } from './locationsCoordinates'; */ 

// function UserLocInfo() {
//   const [currentLocationInput, setCurrentLocationInput] = useState(""); // User's raw input for current location
//   const [filteredCurrentLocationSuggestions, setFilteredCurrentLocationSuggestions] = useState<string[]>([]); // Suggestions array for current location
//   const [currentLocation, setCurrentLocation] = useState<string>(""); // Validated current location
//   const [currentLocationError, setCurrentLocationError] = useState<string | null>(null);

//   const [destinationInput, setDestinationInput] = useState(""); // User's raw input for destination
//   const [filteredDestinationSuggestions, setFilteredDestinationSuggestions] = useState<string[]>([]); // Suggestions array for destination location
//   const [destination, setDestination] = useState<string>(""); // Validated destination location
//   const [destinationLocationError, setDestinationLocationError] = useState<string | null>(null);


//   const [directionError, setDirectionError] = useState<string|null>(null)

//   //State to toggle between input and directions phase
//   const [showDirections, setShowDirections] = useState(false)

//   const handleCurrentLocationInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const userInput = event.target.value;
//     setCurrentLocationInput(userInput);
//     const filteredLocations = locations.filter((location) =>
//       location.toLowerCase().includes(userInput.toLowerCase())
//     );
//     setFilteredCurrentLocationSuggestions(filteredLocations);
//     setCurrentLocationError(null);
//   };

//   const handleDestinationInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const userInput = event.target.value;
//     setDestinationInput(userInput);
//     const filteredLocations = locations.filter((location) =>
//       location.toLowerCase().includes(userInput.toLowerCase())
//     );
//     setFilteredDestinationSuggestions(filteredLocations);
//     setDestinationLocationError(null);
//   };

//   const handleCurrentLocationSuggestionClick = (suggestion: string) => {
//     setCurrentLocation(suggestion);
//     setCurrentLocationInput(suggestion);
//     setFilteredCurrentLocationSuggestions([]); // Clear the suggestions after selection
//     setCurrentLocationError(null);
//   };

//   const handleDestinationSuggestionClick = (suggestion: string) => {
//     setDestination(suggestion);
//     setDestinationInput(suggestion);
//     setFilteredDestinationSuggestions([]); // Clear the suggestions after selection
//     setDestinationLocationError(null);
//   };

//   const handleDirectMeBtn = () => {
//     setCurrentLocationError(null);
//     setDestinationLocationError(null);

//     if(!currentLocation || !locations.includes(currentLocation)){
//       setCurrentLocationError("Please enter a valid current location");

//     }
//     if(!destination || !locations.includes(destination)){
//       setDestinationLocationError("Please enter a valid destination")
//     }

//    if (currentLocation && destination  && locations.includes(currentLocation)  && locations.includes(destination)){
//       const shortestPath = findShortestPath(graph, currentLocation, destination);
//       if(shortestPath){
//         setShowDirections(true);
//       }
//       else{
//         setDirectionError(`No path found between ${currentLocation} and ${destination}.`)
//       }
//    }
//   }

//   const handleBackHomeBtn = () => {
//     setShowDirections(false);
//     setCurrentLocation("");
//     setDestination("");
//     setCurrentLocationInput("");
//     setDestinationInput("")
//   }

//   return (
//     <div className="userLocSection">
//       {showDirections ? (
//         <div className="directions-phase">
//           <h2>
//             Directions from {currentLocationInput} to {destinationInput}
//           </h2>
//           {directionError ? (<p>{directionError}</p>): (
//             <ul>
//             <li>{getDirections(currentLocation, destination)}</li>
//             </ul>
//           )
//         }
          
          
//           <button onClick={handleBackHomeBtn} className="back-home-btn">
//             Back Home
//           </button>
//         </div>
//       ) : (
//         <>
//           <Input
//             label="Where are you?"
//             placeholder="Your current location"
//             value={currentLocationInput}
//             onChange={handleCurrentLocationInput}
//           />
//           {filteredCurrentLocationSuggestions.length > 0 && (
//             <ul className="location-suggestions">
//               {filteredCurrentLocationSuggestions.map((suggestion, index) => (
//                 <li key={index} onClick={() => handleCurrentLocationSuggestionClick(suggestion)}>
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )}
//           {currentLocationError && <p className="error-message">{currentLocationError}</p>}
  
//           <Input
//             label="Where are you going?"
//             placeholder="Your destination"
//             value={destinationInput}
//             onChange={handleDestinationInput}
//           />
//           {filteredDestinationSuggestions.length > 0 && (
//             <ul className="location-suggestions">
//               {filteredDestinationSuggestions.map((suggestion, index) => (
//                 <li key={index} onClick={() => handleDestinationSuggestionClick(suggestion)}>
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )}
//           {destinationLocationError && <p className="error-message">{destinationLocationError}</p>}
  
//           <button onClick={handleDirectMeBtn} className="direct-me-btn">
//             Direct Me
//           </button>
//         </>
//       )}
//     </div>
//   );
  
 

// }
      


// export default UserLocInfo;

import React, { useState, useEffect } from "react";
import Input from "./Input";
import { locations } from "./locations";
import { findShortestPath, PathResult } from "./dijkstra";
import initializedGraph, { Graph } from './graphData';

function UserLocInfo() {
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
  const [formattedDirections, setFormattedDirections] = useState<string>("");

  const [graph, setGraph] = useState<Graph>({});

  useEffect(() => {
    setGraph(initializedGraph);
  }, []);

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

  const formatDirections = (pathResult: PathResult): string => {
    console.log("Received path result:", pathResult);
    
    if (!pathResult || !Array.isArray(pathResult.path) || pathResult.path.length === 0) {
      console.error("Expected a PathResult with a non-empty path array, but received:", pathResult);
      return "Error: Unable to format directions.";
    }
    
    const { path, distance } = pathResult;
    
    if (path.length === 1) return "You are already at your destination.";
    
    const directions = path.reduce((directions, node, index) => {
      return directions + (index === 0 ? `Start at ${node}` : `, then go to ${node}`);
    }, "");
    
    return `${directions}. Total distance: ${distance.toFixed(2)} km.`;
  }

  const handleDirectMeBtn = () => {
    setCurrentLocationError(null);
    setDestinationLocationError(null);
    setDirectionError(null);

    if(!currentLocation || !locations.includes(currentLocation)){
      setCurrentLocationError("Please enter a valid current location");
      return;
    }
    if(!destination || !locations.includes(destination)){
      setDestinationLocationError("Please enter a valid destination");
      return;
    }

    console.log("Graph structure:", graph);
    console.log("Starting location:", currentLocation);
    console.log("Destination:", destination);

    const shortestPathResult = findShortestPath(graph, currentLocation, destination);
    console.log("Shortest path result:", shortestPathResult);
    
    if(shortestPathResult && shortestPathResult.path.length > 0){
      const directions = formatDirections(shortestPathResult);
      setFormattedDirections(directions);
      setShowDirections(true);
    } else {
      setDirectionError(`No path found between ${currentLocation} and ${destination}.`);
    }
  }

  const handleBackHomeBtn = () => {
    setShowDirections(false);
    setCurrentLocation("");
    setDestination("");
    setCurrentLocationInput("");
    setDestinationInput("");
    setFormattedDirections("");
  }

  return (
    <div className="userLocSection">
      {showDirections ? (
        <div className="directions-phase">
          <h2>
            Directions from {currentLocation} to {destination}
          </h2>
          {directionError ? (
            <p className="error-message">{directionError}</p>
          ) : (
            <p>{formattedDirections}</p>
          )}
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