import haversineDistance from "./haversineDistance"
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

}

// import haversineDistance from "./haversineDistance";
// import { locationsCoordinates } from "./locationsCoordinates";
// import { Graph } from "./dijkstra";

// export const graph: Graph = {};

// function findNeighbours(location: { location: string, latitude: number, longitude: number }) {
//     const neighbours = locationsCoordinates
//         .filter(l => l.location !== location.location) 
//         .slice(0, 2) 
//         .map(neighbour => ({
//             id: neighbour.location,
//             distance: haversineDistance(
//                 [location.latitude, location.longitude],
//                 [neighbour.latitude, neighbour.longitude]
//             )
//         }));

//     return neighbours;
// }

// locationsCoordinates.forEach(location => {
//     graph[location.location] = {
//         id: location.location,
//         coordinates: [location.latitude, location.longitude],
//         neighbours: findNeighbours(location),
//     };
// });
