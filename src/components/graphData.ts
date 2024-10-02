// import { locationsCoordinates } from "./locationsCoordinates";
// import haversineDistance from "./haversineDistance";

// interface UnilagLocation {
//   location: string;
//   latitude: number;
//   longitude: number;
// }

// type Graph = {
//   [key: string]: { [key: string]: number };
// };

// export const graph: Graph = {};

// function createGraph(): Graph {
//   return {};
// }

// function addNodeToGraph(graph: Graph, location: UnilagLocation) {
//   if (!graph[location.location]) {
//     graph[location.location] = {};
//   }
// }

// function addEdgeToGraph(graph: Graph, loc1: UnilagLocation, loc2: UnilagLocation, distance: number) {
//   graph[loc1.location][loc2.location] = distance;
//   graph[loc2.location][loc1.location] = distance;
// }

// function setUpGraph() {
//   for (let i = 0; i < locationsCoordinates.length; i++) {
//     for (let j = i + 1; j < locationsCoordinates.length; j++) {
//       const loc1 = locationsCoordinates[i];
//       const loc2 = locationsCoordinates[j];

//       addNodeToGraph(graph, loc1);
//       addNodeToGraph(graph, loc2);

      
//       const distance = haversineDistance([loc1.latitude, loc1.longitude], [loc2.latitude, loc2.longitude]);
//       addEdgeToGraph(graph, loc1, loc2, distance);
//     }
//   }
// }

// const initializedGraph = createGraph();
// locationsCoordinates.forEach(location => addNodeToGraph(initializedGraph, location));
// setUpGraph();

// export default initializedGraph;
import { locationsCoordinates } from "./locationsCoordinates";
import haversineDistance from "./haversineDistance";

interface UnilagLocation {
  location: string;
  latitude: number;
  longitude: number;
}

export type Graph = {
  [key: string]: { [key: string]: number };
};

function createGraph(locations: UnilagLocation[]): Graph {
  const graph: Graph = {};

  // Initialize all locations in the graph
  locations.forEach(loc => {
    graph[loc.location] = {};
  });

  // Connect each location to every other location
  for (let i = 0; i < locations.length; i++) {
    for (let j = i + 1; j < locations.length; j++) {
      const loc1 = locations[i];
      const loc2 = locations[j];

      const distance = haversineDistance(
        [loc1.latitude, loc1.longitude],
        [loc2.latitude, loc2.longitude]
      );

      // Add bidirectional edges
      graph[loc1.location][loc2.location] = distance;
      graph[loc2.location][loc1.location] = distance;
    }
  }

  return graph;
}

export const initializedGraph = createGraph(locationsCoordinates);

export default initializedGraph;