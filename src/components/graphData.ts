/* import haversineDistance from "./haversineDistance"
import { Graph } from "./dijkstra"

export const graph: Graph = {
   "First Gate" : {
        id: "First Gate",
        coordinates: [6.51854, 3.38490],
        neighbours : [
            {
                id: "Faculty of Education", distance: haversineDistance([6.51854, 3.38490], [6.517140,3.385583])
            },
            {
                id:"Wema Bank",
                distance: haversineDistance([6.51854, 3.38490], [6.51739, 3.38687,])
            }
        ]
   },

} */

// graphData.ts
import { locationsCoordinates } from "./locationsCoordinates";
import haversineDistance from "./haversineDistance";

interface UnilagLocation {
  location: string;
  latitude: number;
  longitude: number;
}

type Graph = {
  [key: string]: { [key: string]: number };
};

export const graph: Graph = {};

function createGraph(): Graph {
  return {};
}

function addNodeToGraph(graph: Graph, location: UnilagLocation) {
  if (!graph[location.location]) {
    graph[location.location] = {};
  }
}

function addEdgeToGraph(graph: Graph, loc1: UnilagLocation, loc2: UnilagLocation, distance: number) {
  graph[loc1.location][loc2.location] = distance;
  graph[loc2.location][loc1.location] = distance;
}

function setUpGraph() {
  for (let i = 0; i < locationsCoordinates.length; i++) {
    for (let j = i + 1; j < locationsCoordinates.length; j++) {
      const loc1 = locationsCoordinates[i];
      const loc2 = locationsCoordinates[j];

      addNodeToGraph(graph, loc1);
      addNodeToGraph(graph, loc2);

      
      const distance = haversineDistance([loc1.latitude, loc1.longitude], [loc2.latitude, loc2.longitude]);
      addEdgeToGraph(graph, loc1, loc2, distance);
    }
  }
}

const initializedGraph = createGraph();
locationsCoordinates.forEach(location => addNodeToGraph(initializedGraph, location));
setUpGraph();

export default initializedGraph;
