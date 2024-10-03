

export const directionsMap: { [key: string]: { [key: string]: string } } = {
    "First Gate": {
      "First Gate": "You are already at First Gate.",
      "Wema Bank": "Walk straight down from the first gate for 5 mins (350m) towards Wema Bank.",
      "Education Cab Park": "Walk from first gate to the first right, then turn left to Education Cab Park.",
      "Faculty of Education": "From first gate, turn right, then left towards Faculty of Education.",
    },
    // Add more locations and directions here
  };
  
/*   export function getDirections(currentLocation: string, destination: string): string {
    if (directionsMap[currentLocation] && directionsMap[currentLocation][destination]) {
      return directionsMap[currentLocation][destination];
    } else {
      return "Directions not found for the given locations.";
    }
  } */

import {PathResult, findShortestPath} from './dijkstra'
import graph  from './graphData';
export function getDirections(start: string, end: string): string[] | null{
  const result: PathResult| null = findShortestPath(graph, start, end)
  if(!result){
    return null;
  }

  return result.path
}
  