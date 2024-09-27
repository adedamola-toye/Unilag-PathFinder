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